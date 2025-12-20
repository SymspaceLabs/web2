// app/blogs/edit/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BlogForm } from "@/components/blogs/blog-form"
import { ProtectedLayout } from "@/components/protected-layout"
import { getBlog } from "@/api/blog"
import { Blog } from "@/types/blog.types"

export default function EditBlogClient() {
  const params = useParams()
  const blogId = params.id as string
  
  const [blog, setBlog] = useState<Blog>()
  const [loading, setLoading] = useState(true)

  // Fetch blog initially
  useEffect(() => {
    loadBlog()
  }, [blogId])

  const loadBlog = async () => {
    try {
      setLoading(true)
      const data = await getBlog(blogId)
      setBlog(data)
      console.log('✅ Blog loaded:', data)
    } catch (error) {
      console.error('Failed to load blog:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Refetch handler for real-time updates after save
  const handleBlogUpdate = async (): Promise<Blog | void> => {
    console.log('🔄 Refetching blog after update...')
    try {
      const freshData = await getBlog(blogId)
      console.log('✅ Fresh blog data fetched:', freshData)
      
      // Update local state
      setBlog(freshData)
      
      // Return fresh data for BlogForm to use
      return freshData
    } catch (error) {
      console.error('❌ Failed to refetch blog:', error)
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
      <BlogForm 
        blog={blog}
        onBlogUpdate={handleBlogUpdate}
      />
    </ProtectedLayout>
  )
}