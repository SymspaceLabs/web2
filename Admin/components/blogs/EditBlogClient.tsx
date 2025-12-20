// app/blogs/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, ExternalLink, Calendar, User, Tag } from "lucide-react"
import { getBlog } from "@/api/blog"
import { Blog } from "@/types/blog.types"

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const blogId = params.id as string
  
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlog()
  }, [blogId])

  const loadBlog = async () => {
    try {
      setLoading(true)
      const data = await getBlog(blogId)
      setBlog(data)
    } catch (error) {
      console.error('Failed to load blog:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading blog...</p>
        </div>
      </ProtectedLayout>
    )
  }

  if (!blog) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-destructive">Blog not found</p>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/blogs")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
          <Button onClick={() => router.push(`/blogs/edit/${blog.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Blog
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-3xl">{blog.title}</CardTitle>
                  {blog.nickname && (
                    <CardDescription className="text-lg">{blog.nickname}</CardDescription>
                  )}
                </div>
                <Badge variant="secondary" className="mt-1">
                  <Tag className="h-3 w-3 mr-1" />
                  {blog.tag}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <Badge variant={blog.newsType === 1 ? "default" : "outline"}>
                  Type {blog.newsType}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {blog.image && (
              <div className="w-full rounded-lg overflow-hidden bg-muted">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800x400?text=Image+Not+Available"
                  }}
                />
              </div>
            )}

            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {blog.content}
              </div>
            </div>

            {(blog.article_source_url || blog.handle_url || blog.author_url) && (
              <div className="pt-6 border-t space-y-3">
                <h3 className="text-sm font-semibold">External Links</h3>
                <div className="space-y-2">
                  {blog.article_source_url && (
                    <a 
                      href={blog.article_source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Original Article Source
                    </a>
                  )}
                  {blog.handle_url && (
                    <a 
                      href={blog.handle_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {blog.handle_url_title || "Handle URL"}
                    </a>
                  )}
                  {blog.author_url && (
                    <a 
                      href={blog.author_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Author Profile
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 border-t text-xs text-muted-foreground">
              <p>Last updated: {new Date(blog.updatedAt).toLocaleString()}</p>
              <p className="mt-1">Slug: {blog.slug}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}