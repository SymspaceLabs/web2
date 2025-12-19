// app/blogs/create/page.tsx
"use client"

import { BlogForm } from "@/components/blogs/blog-form"
import { ProtectedLayout } from "@/components/protected-layout"

export default function CreateBlogClient() {
  return (
    <ProtectedLayout>
      <BlogForm />
    </ProtectedLayout>
    
  )
}