"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBlog, updateBlog } from "@/api/blog"
import { Blog, BlogFormData } from "@/types/blog.types"
import { toast } from "sonner"
import { uploadImage } from "@/api/upload"

type BlogFormProps = {
  blog?: Blog
  onBlogUpdate?: () => Promise<Blog | void>
}

export function BlogForm({ blog, onBlogUpdate }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const isEditMode = !!blog
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  /**
   * Uploads a raw File object to the Minio backend and returns the resulting URL.
   * @param {File} file - The raw file object from the user's input.
   * @returns {Promise<string>} The permanent public URL of the uploaded file.
   */
  const uploadFileToBackend = async (file: File): Promise<string> => {
    try {
      return await uploadImage(file)
    } catch (error) {
      console.error("Image upload failed:", error)
      throw error
    }
  }

  // Handle file selection and upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a valid image file (JPG, PNG, GIF, or WebP)",
      })
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("File too large", {
        description: "Please upload an image smaller than 5MB",
      })
      return
    }

    setUploadingImage(true)
    try {
      const imageUrl = await uploadFileToBackend(file)
      updateFormData('image', imageUrl)
      
      toast.success("Image uploaded", {
        description: "Your featured image has been uploaded successfully",
      })
    } catch (error) {
      toast.error("Upload failed", {
        description: "Failed to upload image. Please try again.",
      })
    } finally {
      setUploadingImage(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  // Remove uploaded image
  const handleRemoveImage = () => {
    updateFormData('image', '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }
  useEffect(() => {
    if (editorRef.current && formData.content) {
      editorRef.current.innerHTML = formData.content
    }
  }, [])

  // Rich text editor commands
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const insertImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      execCommand('insertImage', url)
    }
  }

  const handleEditorInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      setFormData(prev => ({ ...prev, content }))
      if (errors.content) {
        setErrors(prev => ({ ...prev, content: undefined }))
      }
    }
  }

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
        
        // ✅ Refetch fresh data after update
        if (onBlogUpdate) {
          const freshBlog = await onBlogUpdate()
          if (freshBlog) {
            // Update form with fresh data from server
            setFormData({
              title: freshBlog.title || "",
              nickname: freshBlog.nickname || "",
              content: freshBlog.content || "",
              image: freshBlog.image || "",
              newsType: freshBlog.newsType || 1,
              author: freshBlog.author || "",
              slug: freshBlog.slug || "",
              handle_url: freshBlog.handle_url || "",
              handle_url_title: freshBlog.handle_url_title || "",
              article_source_url: freshBlog.article_source_url || "",
              author_url: freshBlog.author_url || "",
              tag: freshBlog.tag || "",
            })
          }
        }
        
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

              {/* Content - Rich Text Editor */}
              <div className="space-y-2">
                <Label htmlFor="content">
                  Content <span className="text-destructive">*</span>
                </Label>
                
                {/* Editor Toolbar */}
                <div className="border rounded-t-md bg-muted/50 p-2 flex items-center gap-1 flex-wrap">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => execCommand('bold')}
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => execCommand('italic')}
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => execCommand('underline')}
                    title="Underline"
                  >
                    <span className="text-sm font-bold underline">U</span>
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => execCommand('insertUnorderedList')}
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => execCommand('insertOrderedList')}
                    title="Numbered List"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={insertLink}
                    title="Insert Link"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={insertImage}
                    title="Insert Image"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <Select
                    value=""
                    onValueChange={(value) => execCommand('formatBlock', value)}
                  >
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue placeholder="Paragraph" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p">Paragraph</SelectItem>
                      <SelectItem value="h1">Heading 1</SelectItem>
                      <SelectItem value="h2">Heading 2</SelectItem>
                      <SelectItem value="h3">Heading 3</SelectItem>
                      <SelectItem value="h4">Heading 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Content Editable Area */}
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorInput}
                  className={`min-h-[300px] max-h-[500px] overflow-y-auto border rounded-b-md p-4 prose prose-sm max-w-none focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.content ? "border-destructive" : ""
                  }`}
                  style={{
                    wordBreak: 'break-word',
                  }}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Use the toolbar above to format your content
                </p>
              </div>

              {/* Featured Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {/* Upload/Preview Area */}
                {!formData.image ? (
                  <div
                    onClick={triggerFileUpload}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary hover:bg-muted/50 ${
                      uploadingImage ? 'pointer-events-none opacity-50' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        {uploadingImage ? (
                          <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                        ) : (
                          <Upload className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, GIF or WebP (max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted group">
                    <img
                      src={formData.image}
                      alt="Featured image preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL"
                      }}
                    />
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={triggerFileUpload}
                        disabled={uploadingImage}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change Image
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveImage}
                        disabled={uploadingImage}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Manual URL Input (Optional) */}
                <div className="pt-2">
                  <details className="text-sm">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Or enter image URL manually
                    </summary>
                    <div className="mt-2">
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={(e) => updateFormData('image', e.target.value)}
                        disabled={uploadingImage}
                      />
                    </div>
                  </details>
                </div>
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
                  type="button"
                  onClick={handleSubmit}
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