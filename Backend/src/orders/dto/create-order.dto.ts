// src/orders/dto/create-order.dto.ts
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreateOrderDto {
    @IsUUID()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsUUID()
    shippingAddressId: string;

    @IsString()
    paymentMethod: string;

    @IsOptional()
    @IsString()
    notes?: string;
}

export class OrderItemDto {
  @IsUUID()
  variantId: string;

  @IsInt()
  quantity: number;
}
