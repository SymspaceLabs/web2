"use client"

// =================================================
// Product Tabs (Description + Reviews)
// =================================================

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import ProductReview from "./product-review"

const GLASSMORPHIC_BG =
  "linear-gradient(117.54deg, rgba(255,255,255,0.5) -19.85%, rgba(235,235,235,0.367354) 4.2%, rgba(224,224,224,0.287504) 13.88%, rgba(212,212,212,0.21131) 27.98%, rgba(207,207,207,0.175584) 37.8%, rgba(202,202,202,0.143432) 44.38%, rgba(200,200,200,0.126299) 50.54%, rgba(196,196,196,0.1) 60.21%)"
const GLASSMORPHIC_SHADOW = "0px 1px 24px -1px rgba(0,0,0,0.18)"

interface Review {
  user?: { firstName?: string; lastName?: string; email?: string }
  rating?: number
  content?: string
  createdAt?: string
}

interface ProductTabsProps {
  productId: string
  description?: string
}

export default function ProductTabs({ productId, description }: ProductTabsProps) {
  const { user, isAuthenticated } = useAuth() as any

  const [selectedTab, setSelectedTab] = useState(0)
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ rating?: string; content?: string }>({})

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/product/${productId}`)
      const data = await res.json()
      setReviews(data)
    } catch (err) {
      console.error("Failed to fetch reviews:", err)
    }
  }

  useEffect(() => {
    if (productId) fetchReviews()
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formErrors: { rating?: string; content?: string } = {}
    if (!rating) formErrors.rating = "Rating is required"
    if (!content.trim()) formErrors.content = "Review needs to be filled"
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId: user.id, rating, content }),
      })

      if (response.ok) {
        setRating(0)
        setContent("")
        await fetchReviews()
        toast.success("Review submitted successfully!")
      } else {
        toast.error("Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { label: "Description" },
    { label: `Review (${reviews.length})` },
  ]

  return (
    <div
      className="my-8 px-5 sm:px-8 py-6 box-border rounded-[30px]"
      style={{
        background: GLASSMORPHIC_BG,
        boxShadow: GLASSMORPHIC_SHADOW,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300 mt-4 mb-6 gap-6">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTab(idx)}
            className="cursor-pointer relative pb-3 text-[16px] sm:text-[24px] font-elemental lowercase transition-colors"
            style={{ color: selectedTab === idx ? "#353535" : "#9CA3AF" }}
          >
            {tab.label}
            {/* Active indicator */}
            {selectedTab === idx && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: "#353535" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mb-6">
        {selectedTab === 0 && (
          <div
            dangerouslySetInnerHTML={{ __html: description ?? "<p>No description available.</p>" }}
            style={{ fontFamily: "Helvetica", fontSize: "16px", color: "#000" }}
          />
        )}

        {selectedTab === 1 && (
          <ProductReview
            reviews={reviews}
            rating={rating}
            setRating={setRating}
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
            loading={loading}
            errors={errors}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </div>
  )
}