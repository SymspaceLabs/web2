// src/reviews/reviews.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Get('/product/:productId')
  findByProductId(@Param('productId') productId: string) {
    return this.reviewsService.findByProductId(productId);
  }
}
