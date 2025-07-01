// src/orders/dto/create-order.dto.ts
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString, IsUUID, ValidateNested, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty() // Added IsNotEmpty for userId
    userId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @IsNotEmpty() // Added IsNotEmpty for items array
    items: OrderItemDto[];

    @IsUUID()
    @IsNotEmpty() // Added IsNotEmpty for shippingAddressId
    shippingAddressId: string;

    @IsString()
    @IsNotEmpty() // Added IsNotEmpty for paymentMethod
    paymentMethod: string;

    @IsNumber()
    @IsNotEmpty() // Re-added IsNotEmpty for totalAmount
    totalAmount: number; // Re-added totalAmount

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional() // Added to store PayPal's order ID (optional)
    @IsString()
    paypalOrderId?: string;

    @IsOptional() // Added 'status' property to handle order status updates
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    promoCode?: string;
}

export class OrderItemDto {
  @IsUUID()
  @IsNotEmpty() // Added IsNotEmpty for variantId
  variantId: string;

  @IsInt()
  @IsNotEmpty() // Added IsNotEmpty for quantity
  quantity: number;
}
