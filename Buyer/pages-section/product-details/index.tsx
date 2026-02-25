// components/product-details/index.tsx
"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useCart } from "@/contexts/CartContext"
import { toast } from "sonner"
import { Product, AvailabilityData } from "@/types/products"
import { ProductColor, ProductSize } from "@/types/favorites"
import { fetchProductAvailability, fetchProductBySlug } from "@/api/product"
import ProductGallery from "./product-gallery"
import ProductInfoArea from "./product-info-area"

interface ProductDetailsProps {
  slug: string
}

function useProductData(slug: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const data = await fetchProductBySlug(slug)
        setProduct(data)
        setError(null)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [slug])

  return { product, loading, error }
}

function useProductAvailability(
  productId: string | undefined,
  colorId: string | undefined,
  sizeId: string | undefined,
) {
  const [availability, setAvailability] = useState<AvailabilityData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!productId || !colorId || !sizeId) { setAvailability(null); return }
    const run = async () => {
      setLoading(true)
      try {
        setAvailability(await fetchProductAvailability(productId, colorId, sizeId))
      } catch {
        setAvailability({ variantId: '', stock: 0, available: false, price: 0, hasSale: false, status: 'Error', statusColor: '#ef4444', sku: '' })
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [productId, colorId, sizeId])

  return { availability, loading }
}

export default function ProductDetail({ slug }: ProductDetailsProps) {
  const { product, loading, error } = useProductData(slug)
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [selectedSize, setSelectedSize]   = useState<ProductSize | null>(null)
  const [sizeError, setSizeError]         = useState(false)

  const { availability, loading: loadingAvailability } = useProductAvailability(
    product?.id, selectedColor?.id, selectedSize?.id,
  )

  const { dispatch: favoritesDispatch, isFavorited } = useFavorites()
  const { dispatch: cartDispatch, getCartItem }       = useCart()

  useEffect(() => {
    if (!product) return
    if (product.colors?.length > 0 && !selectedColor) setSelectedColor(product.colors[0])
    if (product.sizes?.length  > 0 && !selectedSize)  setSelectedSize(product.sizes[0])
  }, [product, selectedColor, selectedSize])

  const handleColorSelect = useCallback((color: ProductColor) => setSelectedColor(color), [])
  const handleSizeSelect  = useCallback((size: ProductSize) => { setSelectedSize(size); setSizeError(false) }, [])

  const handleAddToCart = useCallback(() => {
    if (!selectedSize)            { setSizeError(true); toast.error("Please select a size"); return }
    if (!availability?.variantId) { toast.error("Product information not loaded"); return }
    if (availability.stock === 0) { toast.error("Product is out of stock"); return }
    const qty = getCartItem(availability.variantId)?.quantity ?? 0
    if (qty >= availability.stock) { toast.warning(`Maximum stock (${availability.stock}) already in cart`); return }
    cartDispatch({ type: "ADD_TO_CART", payload: { variantId: availability.variantId, quantity: 1 } })
    setSizeError(false)
    toast.success(`${product?.name} added to cart!`)
  }, [selectedSize, availability, getCartItem, cartDispatch, product?.name])

  const handleBuyNow = useCallback(() => {
    if (!selectedSize) { setSizeError(true); toast.error("Please select a size"); return }
    handleAddToCart()
    window.location.href = '/checkout'
  }, [selectedSize, handleAddToCart])

  const handleToggleFavorite = useCallback(() => {
    if (!product || !selectedColor || !selectedSize) return
    favoritesDispatch({
      type: "TOGGLE_FAVORITE",
      payload: {
        id: product.id,
        selectedColor,
        selectedSize: selectedSize.id,
        snapshot: {
          id: product.id, name: product.name, slug: product.slug,
          thumbnail: product.thumbnail, displayPrice: product.displayPrice,
          stock: product.stock, selectedColor, selectedSize: selectedSize.id,
          colors: product.colors || [], sizes: product.sizes || [], images: product.images || [],
        } as any,
      },
    })
  }, [product, selectedColor, selectedSize, favoritesDispatch])

  const isCurrentlyFavorited = useMemo(
    () => isFavorited(product?.id || '', selectedColor?.code, selectedSize?.id),
    [isFavorited, product?.id, selectedColor?.code, selectedSize?.id],
  )

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  )

  if (error || !product) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-center p-4">
      <div>
        <p className="text-lg font-semibold">Product not found</p>
        <p className="text-muted-foreground">{error}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background py-24">

      {/* Breadcrumb */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Homepage</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.category?.parent?.parent?.parent && (<><BreadcrumbItem><BreadcrumbLink href="#">{product.category.parent.parent.parent.name}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /></>)}
            {product.category?.parent?.parent && (<><BreadcrumbItem><BreadcrumbLink href="#">{product.category.parent.parent.name}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /></>)}
            {product.category?.parent && (<><BreadcrumbItem><BreadcrumbLink href="#">{product.category.parent.name}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /></>)}
            <BreadcrumbItem><BreadcrumbPage>{product.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="container mx-auto max-w-7xl px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          <ProductGallery
            product={product}
            selectedColor={selectedColor?.code ?? null}
            isCurrentlyFavorited={isCurrentlyFavorited}
            onToggleFavorite={handleToggleFavorite}
          />

          <ProductInfoArea
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            availability={availability}
            loadingAvailability={loadingAvailability}
            sizeError={sizeError}
            setSizeError={setSizeError}
            onColorSelect={handleColorSelect}
            onSizeSelect={handleSizeSelect}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenSidenav={() => {}}
            onOpenSizeChart={() => {}}
            openModal={false}
          />
        </div>
      </main>

      <Separator />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden z-40">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button size="lg" className="flex-1"
            disabled={availability?.stock === 0 || loadingAvailability}
            onClick={handleAddToCart}
          >
            {availability?.stock === 0 ? 'Out of Stock' : 'Add To Cart'}
          </Button>
          <Button size="lg" variant="outline" className="flex-1 bg-transparent"
            disabled={availability?.stock === 0 || loadingAvailability}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
}