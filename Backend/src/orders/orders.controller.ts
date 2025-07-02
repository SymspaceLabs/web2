import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateGuestOrderDto } from './dto/create-guest-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Endpoint for creating an order for an authenticated user.
   * Expects userId and shippingAddressId to link to existing entities.
   * @param createOrderDto Data for creating the order.
   * @returns Order creation result.
   */
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  /**
   * Endpoint for creating an order for a guest user.
   * Expects raw customer and address data directly.
   * @param createGuestOrderDto Data for creating the guest order.
   * @returns Guest order creation result.
   */
  @Post('guest-checkout') // New endpoint for guest checkouts
  createGuestOrder(@Body() createGuestOrderDto: CreateGuestOrderDto) {
    return this.ordersService.createGuestOrder(createGuestOrderDto);
  }
  
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  @Get('user/:userId')
  async findUserOrders(
    @Param('userId') userId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    return this.ordersService.findByUser(userId, pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }


}
