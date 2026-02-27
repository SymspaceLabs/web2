"use client"

// =================================================
// Product Review
// =================================================

import Link from "next/link"
import { Loader2 } from "lucide-react"
import ProductComment from "./product-comment"

interface Review {
  user?: { firstName?: string; lastName?: string; email?: string }
  rating?: number
  content?: string
  createdAt?: string
}

interface ProductReviewProps {
  reviews: Review[]
  rating: number
  setRating: (v: number) => void
  content: string
  setContent: (v: string) => void
  handleSubmit: (e: React.FormEvent) => void
  loading: boolean
  errors: { rating?: string; content?: string }
  isAuthenticated: boolean
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none cursor-pointer"
        >
          <svg
            className={`size-7 transition-colors ${star <= value ? "text-yellow-400" : "text-gray-200 hover:text-yellow-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function ProductReview({
  reviews,
  rating,
  setRating,
  content,
  setContent,
  handleSubmit,
  loading,
  errors,
  isAuthenticated,
}: ProductReviewProps) {
  return (
    <div className="flex flex-col gap-6">
      {!isAuthenticated ? (
        <p className="text-[18px] text-[#000]">
          <Link href="/sign-in" className="underline font-semibold hover:text-[#0366FE] transition-colors">
            Sign in
          </Link>
          &nbsp;to add a review.
        </p>
      ) : (
        <>
          {/* Star Rating */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-[18px] font-bold text-[#353535]">Your Rating</span>
              <span className="text-red-500 font-bold">*</span>
            </div>
            <StarInput value={rating} onChange={setRating} />
            {errors?.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}
          </div>

          {/* Review Textarea */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <label className="text-sm font-semibold text-[#353535]">Your Review</label>
              <span className="text-red-500 font-bold">*</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a review here"
              rows={4}
              className="w-full resize-none rounded-[12px] border border-black/20 bg-white/60 px-4 py-3 text-sm text-[#353535] placeholder:text-gray-400 outline-none focus:border-black/50 transition-colors"
              style={{ fontFamily: "Helvetica", fontSize: "14px" }}
            />
            {errors?.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit as any}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-black bg-black text-white text-sm font-semibold transition-all hover:bg-transparent hover:text-black disabled:opacity-50 disabled:cursor-not-allowed mb-5"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Submit
            </button>
          </div>
        </>
      )}

      {/* Existing Reviews */}
      {reviews.length > 0 && (
        <div className="flex flex-col">
          {reviews.map((item, index) => (
            <ProductComment key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}