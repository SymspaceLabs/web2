// src/promo-code/promo-code.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards, Req, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PromoCodeService } from './promo-codes.service';

@Controller('promo-codes')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt')) // Example: Protect this endpoint for admin users
  async createPromoCode(
    @Body()
    createPromoCodeDto: {
      code: string;
      discountPercentage: number; // Now expects whole numbers like 10, 20, 50
      startDate: Date;
      endDate: Date;
      maxTotalUsages?: number;
    },
  ) {
    return this.promoCodeService.createPromoCode(createPromoCodeDto);
  }

  @Post('apply')
  @UseGuards(AuthGuard('jwt'))
  async applyPromoCode(@Req() req: any, @Body('code') code: string) {
    const userId = req.user.id;

    // Call the new validation-only method
    const { discountPercentage, promoCodeId } = await this.promoCodeService.validatePromoCode(userId, code);

    return {
      message: 'Promo code applied successfully!',
      discountPercentage,
      promoCodeId, // Still return promoCodeId, you'll need it for markPromoCodeAsUsed
    };
  }

  // --- NEW ENDPOINT TO GET ALL PROMO CODES ---
  @Get() // GET request to /promo-codes
  @UseGuards(AuthGuard('jwt')) // Protect this route
  // You might add @Roles('admin') here if you have an RBAC system
  async findAll() {
    return this.promoCodeService.findAllPromoCodes();
  }

  // --- NEW ENDPOINT TO DELETE A USER PROMO CODE USAGE ---
  @Delete('usage/:id') // DELETE request to /promo-codes/usage/:id
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
  async deleteUserUsage(@Param('id') id: string): Promise<void> {
    await this.promoCodeService.deleteUserPromoCodeUsage(id);
  }
}