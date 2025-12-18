"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBlog, updateBlog } from "@/api/blog"
import { Blog, BlogFormData } from "@/types/blog"
import { toast } from "sonner"

type BlogFormProps = {
  blog?: Blog
}

export function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isEditMode = !!blog

  const [formData, setFormData] = useState<BlogFormData>({
    title: blog?.title || "",
    nickname: blog?.nickname || "",
    content: blog?.content || "",
    image: blog?.image || "",
    newsType: blog?.newsType || 1,
    author: blog?.author || "",
    slug: blog?.slug || "",
    handle_url: blog?.handle_url || "",
    handle_url_title: blog?.handle_url_title || "",
    article_source_url: blog?.article_source_url || "",
    author_url: blog?.author_url || "",
    tag: blog?.tag || "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof BlogFormData, string>>>({})

  const updateFormData = (field: keyof BlogFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Auto-generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    updateFormData('slug', slug)
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BlogFormData, string>> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author is required"
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }
    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required"
    }
    if (!formData.tag.trim()) {
      newErrors.tag = "Tag is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Validation failed", {
        description: "Please fill in all required fields.",
      })
      return
    }

    setLoading(true)
    try {
      if (isEditMode && blog) {
        await updateBlog(blog.id, formData)
        toast.success("Blog updated", {
          description: "Your blog post has been successfully updated.",
        })
      } else {
        await createBlog(formData)
        toast.success("Blog created", {
          description: "Your blog post has been successfully created.",
        })
      }
      
      router.push("/blogs")
    } catch (error) {
      console.error("Failed to save blog:", error)
      toast.error("Save failed", {
        description: "Failed to save the blog post. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen bg-background ${loading ? 'pointer-events-none opacity-70' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/blogs")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEditMode ? "Update your blog post details" : "Add a new blog post to your catalog"}
          </p>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Blog Details</CardTitle>
              <CardDescription>
                Fill in the information below to {isEditMode ? "update" : "create"} your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  onBlur={generateSlug}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              {/* Nickname */}
              <div className="space-y-2">
                <Label htmlFor="nickname">Subtitle / Nickname</Label>
                <Input
                  id="nickname"
                  placeholder="Enter blog subtitle"
                  value={formData.nickname}
                  onChange={(e) => updateFormData('nickname', e.target.value)}
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">
                  Author <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => updateFormData('author', e.target.value)}
                  className={errors.author ? "border-destructive" : ""}
                />
                {errors.author && (
                  <p className="text-sm text-destructive">{errors.author}</p>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">
                  Content <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="Enter blog content"
                  value={formData.content}
                  onChange={(e) => updateFormData('content', e.target.value)}
                  rows={12}
                  className={errors.content ? "border-destructive" : ""}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => updateFormData('image', e.target.value)}
                />
                {formData.image && (
                  <div className="mt-2 w-full h-48 rounded bg-muted flex items-center justify-center overflow-hidden">
                    <img 
                      src={formData.image} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL"
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tag */}
                <div className="space-y-2">
                  <Label htmlFor="tag">
                    Tag <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="tag"
                    placeholder="e.g., augmented reality"
                    value={formData.tag}
                    onChange={(e) => updateFormData('tag', e.target.value)}
                    className={errors.tag ? "border-destructive" : ""}
                  />
                  {errors.tag && (
                    <p className="text-sm text-destructive">{errors.tag}</p>
                  )}
                </div>

                {/* News Type */}
                <div className="space-y-2">
                  <Label htmlFor="newsType">News Type</Label>
                  <Select
                    value={formData.newsType.toString()}
                    onValueChange={(v) => updateFormData('newsType', parseInt(v))}
                  >
                    <SelectTrigger id="newsType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Type 1</SelectItem>
                      <SelectItem value="2">Type 2</SelectItem>
                      <SelectItem value="3">Type 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="slug"
                  placeholder="blog-post-slug"
                  value={formData.slug}
                  onChange={(e) => updateFormData('slug', e.target.value)}
                  className={errors.slug ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground">
                  URL-friendly version of the title (auto-generated from title)
                </p>
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug}</p>
                )}
              </div>

              {/* External URLs */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">External Links (Optional)</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="article_source_url">Article Source URL</Label>
                  <Input
                    id="article_source_url"
                    type="url"
                    placeholder="https://example.com/original-article"
                    value={formData.article_source_url}
                    onChange={(e) => updateFormData('article_source_url', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handle_url">Handle URL</Label>
                  <Input
                    id="handle_url"
                    type="url"
                    placeholder="https://example.com/handle"
                    value={formData.handle_url}
                    onChange={(e) => updateFormData('handle_url', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handle_url_title">Handle URL Title</Label>
                  <Input
                    id="handle_url_title"
                    placeholder="e.g., Information Technology & Innovation Foundation"
                    value={formData.handle_url_title}
                    onChange={(e) => updateFormData('handle_url_title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author_url">Author URL</Label>
                  <Input
                    id="author_url"
                    type="url"
                    placeholder="https://example.com/author/profile"
                    value={formData.author_url}
                    onChange={(e) => updateFormData('author_url', e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/blogs")}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 gap-2"
                >
                  {loading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {isEditMode ? "Update Blog" : "Create Blog"}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}