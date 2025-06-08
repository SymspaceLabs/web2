// src/reviews/dto/create-review.dto.ts
export class CreateReviewDto {
  productId: string;
  userId: string;
  content: string;
  rating: number;
}
