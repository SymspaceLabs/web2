// api/blog.ts
import { authFetch, API_ENDPOINTS } from "@/lib/api"
import { Blog, BlogFormData } from "@/types/blog.types"

/**
 * Fetch all blogs from the API
 * @returns Promise<Blog[]> Array of all blogs
 */
export async function getBlogs(): Promise<Blog[]> {
  try {
    const response = await authFetch(API_ENDPOINTS.blogs)
    
    // Handle different response formats from API
    // Some APIs return data directly, others wrap it in a data property
    const blogsData = Array.isArray(response) 
      ? response 
      : response.data || response.blogs || []
    
    return blogsData
  } catch (error) {
    console.error("Error fetching blogs:", error)
    throw new Error("Failed to fetch blogs")
  }
}

/**
 * Fetch a single blog by ID
 * @param id - Blog ID
 * @returns Promise<Blog> Single blog object
 */
export async function getBlog(id: string): Promise<Blog> {
  try {
    const response = await authFetch(`${API_ENDPOINTS.blogs}/${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error)
    throw new Error("Failed to fetch blog")
  }
}

/**
 * Create a new blog
 * @param data - Blog form data
 * @returns Promise<Blog> Created blog object
 */
export async function createBlog(data: BlogFormData): Promise<Blog> {
  try {
    const response = await authFetch(API_ENDPOINTS.blogs, {
      method: "POST",
      body: JSON.stringify(data),
    })
    return response
  } catch (error) {
    console.error("Error creating blog:", error)
    throw new Error("Failed to create blog")
  }
}

/**
 * Update an existing blog
 * @param id - Blog ID
 * @param data - Partial blog form data (only fields to update)
 * @returns Promise<Blog> Updated blog object
 */
export async function updateBlog(id: string, data: Partial<BlogFormData>): Promise<Blog> {
  try {
    const response = await authFetch(`${API_ENDPOINTS.blogs}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
    return response
  } catch (error) {
    console.error(`Error updating blog ${id}:`, error)
    throw new Error("Failed to update blog")
  }
}

/**
 * Delete a blog by ID
 * @param id - Blog ID to delete
 * @returns Promise<void>
 */
export async function deleteBlog(id: string): Promise<void> {
  try {
    await authFetch(`${API_ENDPOINTS.blogs}/${id}`, {
      method: "DELETE",
    })
    
    // Some APIs return 204 No Content on successful deletion
    // Some return a success message
    // Both are handled by authFetch
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error)
    throw new Error("Failed to delete blog")
  }
}