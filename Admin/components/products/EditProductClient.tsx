"use client"

import { useEffect, useState } from "react"
import { API_ENDPOINTS, authFetch } from "@/lib/api"
import { ProductForm } from "@/components/products/product-form"
import { ProtectedLayout } from "@/components/protected-layout"
import { Loader2 } from "lucide-react"

// ✅ Import the shared Product type
import type { Product } from "@/types/product.type"

export function EditProductClient({ initialId }: { initialId: string }) {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await authFetch(`${API_ENDPOINTS.products}/${initialId}`)

        // ✅ Validate that we have the required category IDs
        if (!response?.subcategoryItemId) {
          console.warn('Product missing subcategoryItemId - category selector will not pre-populate')
        }

        setProduct(response || {})
      } catch (err) {
        console.error("[EditProduct] Error fetching product:", err)
        setError("Failed to load product. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [initialId])

  // Add a refetch function
  const refetchProduct = async () => {
    try {
      const response = await authFetch(`${API_ENDPOINTS.products}/${initialId}`)
      setProduct(response)
      return response
    } catch (err) {
      console.error("Error refetching product:", err)
    }
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </ProtectedLayout>
    )
  }

  if (error) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
            <a href="/products" className="text-primary hover:underline">
              Back to Products
            </a>
          </div>
        </div>
      </ProtectedLayout>
    )
  }

  if (!product) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Product not found.</p>
            <a href="/products" className="text-primary hover:underline">
              Back to Products
            </a>
          </div>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <ProductForm
        product={product}
        onStepChange={refetchProduct}
      />
    </ProtectedLayout>
  )
}