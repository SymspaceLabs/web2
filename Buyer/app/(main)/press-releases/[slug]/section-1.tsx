// app/article/[slug]/section-1.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import DOMPurify from "isomorphic-dompurify"
import { Article } from "@/types/article"

// ====================================================================
// Type Definitions
// ====================================================================

interface Section1Props {
  article: Article
}

// ====================================================================
// Utility Functions
// ====================================================================

function DateToString(date: string): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

// ====================================================================
// Main Component
// ====================================================================

export default function Section1({ article }: Section1Props) {
  // If the article prop isn't loaded yet, don't try to render
  if (!article || !article.content) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  // Format content by replacing escaped newlines
  const formattedContent = article?.content?.replace(/\\n/g, "\n") || ""
  
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(formattedContent, {
    ADD_TAGS: ['iframe'], // Allow iframes if needed for embeds
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'], // Allow iframe attributes
  })
  
  // Default fallback image
  const articleImage = article.image || ''

  return (
    <div className="min-h-[75vh] flex flex-col items-center py-4 px-4 sm:px-0 pt-[100px] md:pt-[200px]">
      <div className="w-full max-w-[1200px] flex flex-col gap-5">
        
        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList className="text-white text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/press-releases" 
                className="text-primary hover:text-primary/80 font-semibold font-[Helvetica]"
              >
                Press Releases
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="size-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white font-semibold">
                {article.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Banner Image */}
        <div className="relative w-full aspect-[7/4] rounded-lg overflow-hidden">
          <Image 
            src={articleImage}
            alt="Article Banner" 
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Glass Card */}
        <div className="py-4 px-3 sm:px-5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          
          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            {article.title}
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pt-3 gap-4">
            {/* Author & Date Info */}
            <div className="flex flex-col gap-1 w-full">
              <p className="text-white text-sm sm:text-lg">
                Written By{" "}
                {article.author_url ? (
                  <Link 
                    href={article.author_url}
                    className="text-[#0044ff] font-medium hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.author}
                  </Link>
                ) : (
                  <span className="text-[#0044ff] font-medium">
                    {article.author}
                  </span>
                )}
              </p>
              <p className="text-white text-sm sm:text-lg">
                {DateToString(article.createdAt)}
              </p>
            </div>

            {/* Original Post Button */}
            {article.article_source_url && (
              <div className="flex justify-start sm:justify-end w-full pt-5 sm:pt-0">
                <a 
                  href={article.article_source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline"
                    className="bg-gray-900/80 text-white border-white/30 hover:bg-gray-800 hover:text-white"
                  >
                    Original Post
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Content - HTML */}
        <div 
          className="mt-3 text-white text-sm sm:text-[22px] font-[Helvetica] prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        
        <style jsx global>{`
          .prose ul {
            margin-left: 1.5rem;
          }
          .prose li {
            list-style-type: disc;
          }
          .prose a {
            color: #0366FE;
            text-decoration: underline;
          }
          .prose a:hover {
            color: #0052CC;
          }
          .prose h1, .prose h2, .prose h3 {
            color: white;
            font-weight: 700;
          }
          .prose p {
            margin-bottom: 1rem;
          }
          .prose strong {
            font-weight: 700;
            color: white;
          }
          .prose code {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.9em;
          }
          .prose pre {
            background-color: rgba(0, 0, 0, 0.3);
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
          }
          .prose img {
            border-radius: 0.5rem;
            margin: 1rem 0;
            max-width: 100%;
            height: auto;
          }
          .prose blockquote {
            border-left: 4px solid #0366FE;
            padding-left: 1rem;
            font-style: italic;
            color: rgba(255, 255, 255, 0.8);
          }
          .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
          }
          .prose th, .prose td {
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
          }
          .prose th {
            background-color: rgba(255, 255, 255, 0.1);
            font-weight: 700;
          }
        `}</style>

      </div>
    </div>
  )
}