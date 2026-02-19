// app/article/[slug]/page.tsx
// Server Component - Handles routing and metadata

import { Metadata } from "next"
import ArticleDetailsPageView from "./article-details-page"

// ====================================================================
// Type Definitions
// ====================================================================

interface Article {
  id: string
  slug: string
  title: string
  description?: string
  content?: string
  thumbnail?: string
  author?: string
  publishedAt?: string
}

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

// ====================================================================
// Data Fetching Function
// ====================================================================

async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/slug/${slug}`
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      return null
    }
    
    return response.json()
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

// ====================================================================
// Metadata Generation (Server-side)
// ====================================================================

export async function generateMetadata({ 
  params 
}: ArticlePageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const article = await fetchArticleBySlug(slug)
    
    if (!article) {
      return {
        title: "Article Not Found - Press Releases",
        description: "The article you're looking for could not be found."
      }
    }

    return {
      title: `${article.title} - Press Releases`,
      description: article.description || "Symspace is an E-commerce website.",
      authors: [{
        name: article.author || "SYMSPACE LABS",
        url: "https://www.symspacelabs.com"
      }],
      keywords: ["e-commerce", "press release", "news"],
      openGraph: {
        title: article.title,
        description: article.description || "Read the latest from Symspace",
        images: article.thumbnail ? [article.thumbnail] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.description || "Read the latest from Symspace",
      }
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Press Releases",
      description: "Symspace is an E-commerce website.",
      authors: [{
        name: "SYMSPACE LABS",
        url: "https://www.symspacelabs.com"
      }],
      keywords: ["e-commerce"]
    }
  }
}

// ====================================================================
// Main Page Component - Just passes slug to ArticleDetailsPageView
// ====================================================================

export default async function ArticleDetailsPage({ params }: ArticlePageProps) {
  const { slug } = await params
  return <ArticleDetailsPageView slug={slug} />
}

// ====================================================================
// Optional: Generate static paths at build time
// ====================================================================

export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`)
    const articles: Article[] = await response.json()
    
    return articles.map((article) => ({
      slug: article.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}