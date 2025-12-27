// app/products/[id]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Edit, Trash2, Package, ExternalLink } from "lucide-react"
import { getProduct, deleteProduct } from "@/api/product"
import { Product } from "@/types/product.types"
import { toast } from "sonner"

export default function ViewProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [productId])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await getProduct(productId)
      setProduct(data)
      setError(null)
    } catch (err) {
      console.error('Failed to load product:', err)
      setError('Failed to load product details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!product) return

    setIsDeleting(true)
    try {
      await deleteProduct(product.id)
      
      toast.success("Product deleted", {
        description: `${product.name} has been successfully deleted.`,
      })
      
      router.push("/products")
    } catch (error) {
      console.error("Failed to delete product:", error)
      
      toast.error("Delete failed", {
        description: "Failed to delete the product. Please try again.",
      })
      setIsDeleting(false)
    }
  }

  const getCategoryDisplay = (category: any): string => {
    if (!category) return "Not set"
    if (typeof category === 'string') return category
    if (typeof category === 'object') {
      return category.fullPath || category.name || category.code || "Not set"
    }
    return "Not set"
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </ProtectedLayout>
    )
  }

  if (error || !product) {
    return (
      <ProtectedLayout>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <p className="text-destructive">{error || "Product not found"}</p>
          <Button onClick={() => router.push("/products")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/products")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
              {product.status && (
                <Badge variant={product.status === 'published' ? "default" : "secondary"} className="mt-2">
                  {product.status}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {product.slug && (
              <Button
                variant="outline"
                onClick={() => window.open(`${process.env.NEXT_PUBLIC_BUYER_URL}/products/${product.slug}`, '_blank')}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View in Marketplace
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => router.push(`/products/edit/${product.id}`)}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Product Name</p>
              <p className="font-medium">{product.name || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{getCategoryDisplay(product.category)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium whitespace-pre-wrap">{product.description || "Not set"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Variants & Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            {product.variants && product.variants.length > 0 ? (
              <div className="space-y-4">
                <div className="flex gap-4">
                  {product.selectedColors && product.selectedColors.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Colors</p>
                      <div className="flex flex-wrap gap-2">
                        {product.selectedColors.map((color: any) => (
                          <span key={color.id} className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium">
                            <span 
                              className="w-3 h-3 rounded-full border" 
                              style={{ backgroundColor: color.code }}
                            />
                            {color.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.selectedSizes && product.selectedSizes.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Sizes</p>
                      <div className="flex flex-wrap gap-2">
                        {product.selectedSizes.map((size: any) => (
                          <span key={size.id} className="px-3 py-1 rounded-full bg-muted text-sm font-medium">
                            {size.size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Variants: {product.variants.length}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Stock:</span>{" "}
                      <span className="font-medium">{product.variants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price Range:</span>{" "}
                      <span className="font-medium">
                        ${Math.min(...product.variants.map((v: any) => v.price || 0)).toFixed(2)} - $
                        {Math.max(...product.variants.map((v: any) => v.price || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No variants added</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Media</CardTitle>
          </CardHeader>
          <CardContent>
            {product.images && product.images.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm">
                  <span className="text-muted-foreground">Total Images:</span>{" "}
                  <span className="font-medium">{product.images.length}</span>
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 8).map((image: any, index: number) => (
                    <div key={index} className="aspect-square rounded border bg-muted overflow-hidden">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x400?text=Image+Not+Available"
                        }}
                      />
                    </div>
                  ))}
                </div>
                {product.images.length > 8 && (
                  <p className="text-xs text-muted-foreground">+{product.images.length - 8} more images</p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">No images added</p>
            )}
            {product.model3d && (
              <p className="text-sm mt-3">
                <span className="text-muted-foreground">3D Model:</span> <span className="font-medium">Uploaded</span>
              </p>
            )}
          </CardContent>
        </Card>

        {(product.createdAt || product.updatedAt) && (
          <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
            {product.createdAt && (
              <p>Created: {new Date(product.createdAt).toLocaleString()}</p>
            )}
            {product.updatedAt && (
              <p>Last updated: {new Date(product.updatedAt).toLocaleString()}</p>
            )}
          </div>
        )}

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <span className="font-semibold">{product.name}</span> and remove
                all associated data including variants, images, and inventory. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                style={{ color: 'white' }}
                className="bg-destructive hover:bg-destructive/90 gap-2"
              >
                {isDeleting ? (
                  <>Deleting...</>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Product
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedLayout>
  )
}