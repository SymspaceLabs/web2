// src/orders/orders.service.ts

import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';

@Injectable()
export class OrdersService {
  constructor(

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(ProductVariant)
    private readonly variantRepo: Repository<ProductVariant>,

    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, items, shippingAddressId, paymentMethod } = createOrderDto;

    // shippingAddressId is now a string
    const address = await this.addressRepo.findOne({
      where: { id: shippingAddressId },
      relations: ['user'],
    });

    if (!address || address.user.id !== userId) {
      throw new NotFoundException('Shipping address not found or not associated with user');
    }

    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

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

      totalAmount += orderItem.subtotal;
      orderItems.push(orderItem);

      // Update stock
      variant.stock -= item.quantity;
      await this.variantRepo.save(variant);
    }

    const order = this.orderRepo.create({
      user: { id: userId },
      shippingAddress: address,
      paymentMethod,
      status: 'pending',
      totalAmount,
      items: orderItems,
    });

    await this.orderRepo.save(order); // ✅ This is enough

    return {
      status: 'success',
      message: 'Order placed successfully',
      data: order,
    };
  }

  findAll() {
    return this.orderRepo.find({ relations: ['items', 'shippingAddress'] });
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
        'items.variant.product.images', // include images here
        'items.variant.color',
        'items.variant.size',
        'shippingAddress',
      ],
    });

    if (!order) return null;

    // Sort images by sortOrder for each product
    for (const item of order.items) {
      if (item.variant?.product?.images) {
        item.variant.product.images.sort((a, b) => a.sortOrder - b.sortOrder);
      }
    }

    return order;
  }


  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
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
}
