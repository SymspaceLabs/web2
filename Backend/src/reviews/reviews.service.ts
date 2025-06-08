// src/reviews/reviews.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const product = await this.productRepo.findOneBy({ id: createReviewDto.productId });
    if (!product) throw new NotFoundException('Product not found');

    const user = await this.userRepo.findOneBy({ id: createReviewDto.userId });
    if (!user) throw new NotFoundException('User not found');

    const review = this.reviewRepo.create({
      content: createReviewDto.content,
      rating: createReviewDto.rating,
      product,
      user,
    });

    return this.reviewRepo.save(review);
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return this.reviewRepo.find({
      where: { product: { id: productId } },
      relations: ['user', 'product'],
      order: { createdAt: 'DESC' },
    });
  }
}
