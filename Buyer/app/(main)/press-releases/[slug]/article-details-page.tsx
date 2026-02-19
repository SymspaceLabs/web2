// app/article/[slug]/article-details-page.tsx
"use client"

import Section1 from "./section-1"
import Section2 from "./section-2"
import { Loader2 } from "lucide-react"
import { Article } from "@/types/article"
import { useEffect, useState } from "react"

// ====================================================================
// Type Definitions
// ====================================================================
interface ArticleDetailsPageViewProps {
  slug: string
}

// ====================================================================
// Blob Background Component
// ====================================================================

function BlobBox({
  top,
  left,
  right,
  background,
  widthHeight = "500px",
  displayNoneMobile = false
}: {
  top: string
  left?: string
  right?: string
  background: string
  widthHeight?: string
  displayNoneMobile?: boolean
}) {
  return (
    <div
      className={`absolute rounded-full blur-[120px] opacity-30 ${
        displayNoneMobile ? "hidden lg:block" : ""
      }`}
      style={{
        top,
        left,
        right,
        background,
        width: widthHeight,
        height: widthHeight,
      }}
    />
  )
}

// ====================================================================
// Main Component
// ====================================================================

export default function ArticleDetailsPageView({ slug }: ArticleDetailsPageViewProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/slug/${slug}`
        const response = await fetch(url)
        
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Article not found (${response.status}): ${errorText}`)
        }
        
        const data: Article = await response.json()
        setArticle(data)
        setError(null)
      } catch (err: any) {
        console.error("Failed to fetch article:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="size-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-white/70">Loading article...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-2">
            Article Not Found
          </h1>
          <p className="text-white/70 mb-6">
            {error || "Unable to load article details. Please try again later."}
          </p>
          <a
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0366FE] text-white font-medium rounded-md hover:bg-[#0366FE]/90 transition-colors"
          >
            Back to Articles
          </a>
        </div>
      </div>
    )
  }

  // Success State - Render Article Details
  return (
    <div className="relative overflow-hidden bg-[#1F1F1F] flex justify-center">
      {/* GRADIENT BLOB BACKGROUNDS */}
      
      {/* Blob 1: Hero Section Right */}
      <BlobBox 
        top="-5%" 
        right="-10%" 
        background="#0366FE" 
        widthHeight="750px" 
        displayNoneMobile={true} 
      />

      {/* Blob 2: Articles Left */}
      <BlobBox 
        top="20%" 
        left="0" 
        background="#FFF" 
        displayNoneMobile={true} 
      />
      <BlobBox 
        top="20%" 
        left="5%" 
        background="#0366FE" 
        displayNoneMobile={true} 
      />

      {/* Blob 3: Articles Right */}
      <BlobBox 
        top="45%" 
        right="0" 
        background="#FFF" 
        displayNoneMobile={true} 
      />
      <BlobBox 
        top="45%" 
        right="5%" 
        background="#0366FE" 
        displayNoneMobile={true} 
      />

      {/* Blob 4: Articles Left */}
      <BlobBox 
        top="70%" 
        left="30%" 
        background="#FFF" 
        displayNoneMobile={true} 
      />
      <BlobBox 
        top="70%" 
        left="20%" 
        background="#0366FE" 
        displayNoneMobile={true} 
      />

      {/* Blob 5: Articles Right */}
      <BlobBox 
        top="80%" 
        right="-5%" 
        background="#0366FE" 
        displayNoneMobile={true} 
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full">
        <Section1 article={article} />
        <Section2 />
      </div>
    </div>
  )
}