// src/orders/orders.service.ts

import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { CreateGuestOrderDto } from './dto/create-guest-order.dto';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common'; // Import Logger for better debugging
import { MailchimpService } from 'src/mailchimp/mailchimp.service';
import User from 'src/users/entities/user.entity';
@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name); // Initialize Logger

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(ProductVariant)
    private readonly variantRepo: Repository<ProductVariant>,

    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,

    private mailChimpService: MailchimpService,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

  ) {}

  async create(createOrderDto: CreateOrderDto) {
    this.logger.log(`Attempting to create order for userId: ${createOrderDto.userId}`);
    this.logger.debug(`Received createOrderDto: ${JSON.stringify(createOrderDto)}`);

    const { userId, items, shippingAddressId, paymentMethod, paypalOrderId } = createOrderDto;

    // 1. Fetch user by ID
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.error(`User with ID ${userId} not found.`);
      throw new NotFoundException('User not found');
    }

    // 2. Fetch address and verify ownership
    const address = await this.addressRepo.findOne({
      where: { id: shippingAddressId },
      relations: ['user'], // Ensure the 'user' relation is loaded
    });

    if (!address || address.user?.id !== userId) {
      this.logger.error(`Shipping address with ID ${shippingAddressId} not found.`);
      throw new NotFoundException('Shipping address not found.');
    }

    // 3. Prepare order items
    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of items) {
      const variant = await this.variantRepo.findOne({
        where: { id: item.variantId },
        relations: ['product', 'color', 'size'],
      });

      if (!variant) {
        this.logger.error(`Product variant ${item.variantId} not found for order creation.`);
        throw new NotFoundException(`Variant ${item.variantId} not found`);
      }

      if (variant.stock < item.quantity) {
        this.logger.error(`Insufficient stock for variant ${item.variantId}. Requested: ${item.quantity}, Available: ${variant.stock}.`);
        throw new BadRequestException('Insufficient stock');
      }

      const orderItem = this.orderItemRepo.create({
        variant,
        quantity: item.quantity,
        price: variant.price,
        subtotal: variant.price * item.quantity,
      });

      totalAmount += orderItem.subtotal;
      orderItems.push(orderItem);

      // Update stock
      variant.stock -= item.quantity;
      await this.variantRepo.save(variant);
      this.logger.debug(`Updated stock for variant ${variant.id}. New stock: ${variant.stock}.`);
    }

    // 4. Create and save the order
    const order = this.orderRepo.create({
      user: { id: userId }, // Assign user by ID
      shippingAddress: address, // Assign full address object
      paymentMethod,
      status: 'pending', // Initial status, can be updated to 'completed' later
      totalAmount,
      items: orderItems,
      paypalOrderId: paypalOrderId, // Store PayPal Order ID if provided
    });

    await this.orderRepo.save(order); // ✅ This is enough

    // 5. Send confirmation email to user
    try {
      const userEmail = user.email; // Or from userRepo if not available here
      const emailHtml = `
        <h3>Thank you for your order!</h3>
        <p>Your order ID: <strong>${order.id}</strong></p>
        <p>Total Amount: <strong>$${order.totalAmount.toFixed(2)}</strong></p>
        <p>We are processing your order and will notify you once it's shipped.</p>
      `;
      await this.mailChimpService.sendEmail(userEmail, emailHtml);
      this.logger.log(`Order confirmation email sent to ${userEmail}`);
    } catch (emailErr) {
      this.logger.error(`Failed to send order confirmation email: ${emailErr.message}`);
    }

    return {
      status: 'success',
      message: 'Order placed successfully',
      data: order,
    };
  }

  async findAll(): Promise<any[]> {
    const orders = await this.orderRepo.find({
      relations: [
        'user',
        'items',
        'items.variant',
        'items.variant.product',
        'items.variant.product.images',
        'items.variant.color',
        'items.variant.size',
        'shippingAddress',
        'billingAddress',
      ],
      order: { createdAt: 'DESC' },
    });

    // Normalize and return each order
    const normalizedOrders = orders.map(order => {
      // Sort product images
      for (const item of order.items) {
        if (item.variant?.product?.images) {
          item.variant.product.images.sort((a, b) => a.sortOrder - b.sortOrder);
        }
      }

      const normalizedOrder: any = {
        id: order.id,
        isGuestOrder: order.isGuestOrder,
        paymentMethod: order.paymentMethod,
        notes: order.notes,
        status: order.status,
        totalAmount: order.totalAmount,
        paypalOrderId: order.paypalOrderId,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        items: order.items,
        user: null,
        shippingAddress: null,
        billingAddress: null,
      };

      if (order.isGuestOrder) {
        normalizedOrder.user = {
          firstName: order.firstName,
          lastName: order.lastName,
          email: order.email,
        };

        normalizedOrder.shippingAddress = {
          address1: order.shippingAddress1,
          address2: order.shippingAddress2,
          city: order.shippingCity,
          state: order.shippingState,
          zip: order.shippingZip,
          country: order.shippingCountry,
        };

        normalizedOrder.billingAddress = {
          address1: order.billingAddress1,
          address2: order.billingAddress2,
          city: order.billingCity,
          state: order.billingState,
          zip: order.billingZip,
          country: order.billingCountry,
        };
      } else {
        normalizedOrder.user = order.user;
        normalizedOrder.shippingAddress = order.shippingAddress;
        normalizedOrder.billingAddress = order.billingAddress;
      }

      return normalizedOrder;
    });

    return normalizedOrders;
  }

  async findByUser(userId: string) {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'shippingAddress'],
      order: { id: 'DESC' }, // optional: sort by latest order
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: [
        'items',
        'items.variant',
        'items.variant.product',
        'items.variant.product.images',
        'items.variant.color',
        'items.variant.size',
        'user',
        'shippingAddress',
        'billingAddress',
      ],
    });

    if (!order) return null;

    // Sort product images for each item
    for (const item of order.items) {
      if (item.variant?.product?.images) {
        item.variant.product.images.sort((a, b) => a.sortOrder - b.sortOrder);
      }
    }

    const normalizedOrder: any = {
      id: order.id,
      isGuestOrder: order.isGuestOrder,
      paymentMethod: order.paymentMethod,
      notes: order.notes,
      status: order.status,
      totalAmount: order.totalAmount,
      paypalOrderId: order.paypalOrderId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items,
      user: null,
      shippingAddress: null,
      billingAddress: null,
    };

    if (order.isGuestOrder) {
      normalizedOrder.user = {
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
      };

      normalizedOrder.shippingAddress = {
        address1: order.shippingAddress1,
        address2: order.shippingAddress2,
        city: order.shippingCity,
        state: order.shippingState,
        zip: order.shippingZip,
        country: order.shippingCountry,
      };

      normalizedOrder.billingAddress = {
        address1: order.billingAddress1,
        address2: order.billingAddress2,
        city: order.billingCity,
        state: order.billingState,
        zip: order.billingZip,
        country: order.billingCountry,
      };
    } else {
      normalizedOrder.user = order.user;
      normalizedOrder.shippingAddress = order.shippingAddress;
      normalizedOrder.billingAddress = order.billingAddress;
    }

    return normalizedOrder;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Explicitly handle status updates for captured PayPal payments
    if (order.paymentMethod === 'paypal' && updateOrderDto.status === 'completed') { // Use order.paymentMethod
        order.status = 'completed'; // Set status to completed
        order.paypalOrderId = updateOrderDto.paypalOrderId || order.paypalOrderId; // Update or confirm PayPal Order ID
    }

    Object.assign(order, updateOrderDto);
    await this.orderRepo.save(order);

    return { status: 'success', message: 'Order updated', data: order };
  }

  async remove(id: string) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderRepo.remove(order);
    return { status: 'success', message: 'Order deleted', data: order };
  }

  /**
   * Creates an order for a guest user.
   * Uses raw customer and address data directly in the order entity.
   * @param createGuestOrderDto Data for creating the guest order.
   * @returns Order creation result.
   */
  async createGuestOrder(createGuestOrderDto: CreateGuestOrderDto) {
    const {
      firstName, lastName, email,
      shippingAddress, billingAddress, // These are now raw address objects
      items, paymentMethod, totalAmount, paypalOrderId
    } = createGuestOrderDto;

    const orderItems: OrderItem[] = [];
    let calculatedTotalAmount = 0; // Use a new variable for safety

    // Process each item in the order
    for (const item of items) {
      const variant = await this.variantRepo.findOne({
        where: { id: item.variantId },
        relations: ['product', 'color', 'size'],
      });

      if (!variant) {
        throw new NotFoundException(`Variant ${item.variantId} not found`);
      }

      if (variant.stock < item.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      const orderItem = this.orderItemRepo.create({
        variant,
        quantity: item.quantity,
        price: variant.price,
        subtotal: variant.price * item.quantity,
      });

      calculatedTotalAmount += orderItem.subtotal;
      orderItems.push(orderItem);

      // Update stock
      variant.stock -= item.quantity;
      await this.variantRepo.save(variant);
    }

    // Basic validation for totalAmount consistency
    // In a real application, you should re-calculate total amount on the backend
    // and compare it with the provided totalAmount for security.
    if (parseFloat(totalAmount.toFixed(2)) !== parseFloat(calculatedTotalAmount.toFixed(2))) {
        this.logger.warn(`Provided totalAmount ${totalAmount} does not match calculated totalAmount ${calculatedTotalAmount} for guest order. Using calculated value.`);
        // Or throw new BadRequestException('Total amount mismatch.');
    }

    // Create the order entity for a guest user
    const order = this.orderRepo.create({
      // Set user and address relations to null for guest orders
      user: null,
      shippingAddress: null,
      billingAddress: null, // Assuming billing address can also be directly stored

      // Populate guest-specific fields
      isGuestOrder: true,
      firstName: firstName,
      lastName: lastName,
      email: email,
      shippingAddress1: shippingAddress.address1,
      shippingAddress2: shippingAddress.address2 || null, // Ensure nullable fields are handled
      shippingCity: shippingAddress.city,
      shippingState: shippingAddress.state,
      shippingCountry: shippingAddress.country,
      shippingZip: shippingAddress.zip,
      billingAddress1: billingAddress.address1,
      billingAddress2: billingAddress.address2 || null,
      billingCity: billingAddress.city,
      billingState: billingAddress.state,
      billingCountry: billingAddress.country,
      billingZip: billingAddress.zip,

      paymentMethod,
      status: 'pending', // Initial status
      totalAmount: calculatedTotalAmount, // Use calculated total for consistency
      items: orderItems,
      paypalOrderId: paypalOrderId, // Store PayPal Order ID if provided
    });

    await this.orderRepo.save(order);
    this.logger.log(`Guest order ${order.id} created successfully for email ${email}.`);
    
    // 1. Send confirmation email to guest
    try {

      const customerName = `${firstName} ${lastName}`;
      const orderNumber = order.id; // ✅ Dynamic order ID
      const orderTrackingUrl = `${process.env.BUYER_URL}/order-confirmation/${order.id}`; // optional, adjust path as needed
      
      await this.mailChimpService.sendOrderConfirmationEmail(email, customerName, orderNumber, orderTrackingUrl);
      this.logger.log(`Guest order confirmation email sent to ${email}`);
    } catch (emailErr) {
      this.logger.error(`Failed to send guest order confirmation email: ${emailErr.message}`);
    }

    return {
      status: 'success',
      message: 'Guest order placed successfully',
      data: order,
    };
  }

}
