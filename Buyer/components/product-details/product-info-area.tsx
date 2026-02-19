// components/product-details/product-info-area.tsx
"use client"

import { useMemo, useCallback } from "react"
import { Loader2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Product } from "@/types/products"
import { ProductColor, ProductSize } from "@/types/favorites"
import { AvailabilityData } from "@/types/products"

interface ProductInfoAreaProps {
  product: Product;
  selectedColor: ProductColor | null;
  selectedSize: ProductSize | null;
  availability: AvailabilityData | null;
  loadingAvailability: boolean;
  sizeError: boolean;
  showFullDescription: boolean;
  onColorSelect: (color: ProductColor) => void;
  onSizeSelect: (size: ProductSize) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onToggleDescription: () => void;
}

const cleanDescription = (html: string | undefined): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export default function ProductInfoArea({
  product,
  selectedColor,
  selectedSize,
  availability,
  loadingAvailability,
  sizeError,
  showFullDescription,
  onColorSelect,
  onSizeSelect,
  onAddToCart,
  onBuyNow,
  onToggleDescription
}: ProductInfoAreaProps) {
  
  const description = useMemo(() => cleanDescription(product?.description), [product?.description])

  const priceInfo = useMemo(() => {
    if (availability && selectedColor && selectedSize) {
      return {
        current: availability.hasSale ? availability.salePrice : availability.price,
        original: availability.price,
        hasSale: availability.hasSale,
        showRange: false
      }
    }
    
    return {
      range: product?.displayPrice?.range || '$0',
      hasSale: product?.displayPrice?.hasSale || false,
      showRange: true
    }
  }, [availability, selectedColor, selectedSize, product?.displayPrice])

  const isOutOfStock = availability?.stock === 0 || false

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        {product.company?.entityName && (
          <a 
            href={`/company/${product.slug}`}
            className="text-sm text-blue-600 mb-1 hover:underline inline-block uppercase"
          >
            {product.company.entityName}
          </a>
        )}
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground text-balance mt-1">
          {product.name}
        </h1>
      </div>

      {/* Price & Stock */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-baseline gap-2">
          {loadingAvailability && selectedColor && selectedSize ? (
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          ) : priceInfo.showRange ? (
            <span className="text-2xl font-semibold text-foreground">
              {priceInfo.range}
            </span>
          ) : (
            <>
              <span className="text-2xl font-semibold text-foreground">
                ${priceInfo.current?.toFixed(2)}
              </span>
              {priceInfo.hasSale && (
                <span className="text-muted-foreground line-through text-sm">
                  ${priceInfo.original?.toFixed(2)}
                </span>
              )}
            </>
          )}
        </div>
        
        {selectedColor && selectedSize && availability?.status && (
          <>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <div className="flex items-center gap-2 text-sm">
              <span 
                className="font-medium px-3 py-1 rounded-full text-xs"
                style={{ 
                  color: availability.statusColor,
                  backgroundColor: `${availability.statusColor}20`
                }}
              >
                {availability.status}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Description */}
      {description && (
        <div>
          <h3 className="font-semibold text-foreground mb-2">Description:</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {showFullDescription ? description : `${description.slice(0, 200)}${description.length > 200 ? '...' : ''}`}
            {description.length > 200 && (
              <button
                onClick={onToggleDescription}
                className="ml-1 font-medium text-foreground hover:underline"
              >
                {showFullDescription ? "See Less" : "See More..."}
              </button>
            )}
          </p>
        </div>
      )}

      {/* Material */}
      {product.material && (
        <div>
          <span className="text-sm text-muted-foreground">Material: </span>
          <span className="text-sm font-medium text-foreground">{product.material}</span>
        </div>
      )}

      {/* Color Selector */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-muted-foreground">Color:</span>
            <span className="text-sm font-medium text-foreground">
              {selectedColor?.name || 'Not selected'}
            </span>
          </div>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => onColorSelect(color)}
                className={cn(
                  "size-10 rounded-md transition-all",
                  selectedColor?.id === color.id
                    ? "ring-2 ring-foreground ring-offset-2"
                    : "ring-1 ring-border hover:ring-muted-foreground",
                )}
                style={{ backgroundColor: color.code }}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Size:</span>
              <span className="text-sm font-medium text-foreground">
                {selectedSize?.size || 'Not selected'}
              </span>
            </div>
            {selectedSize?.sizeChartUrl && (
              <a 
                href={selectedSize.sizeChartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground underline hover:no-underline"
              >
                View Size Chart
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size.id}
                variant={selectedSize?.id === size.id ? "default" : "outline"}
                className={cn(
                  "min-w-14",
                  sizeError && !selectedSize && "border-red-500"
                )}
                onClick={() => onSizeSelect(size)}
              >
                {size.size}
              </Button>
            ))}
          </div>
          {selectedSize?.dimensions && (
            <p className="text-xs text-muted-foreground mt-2">
              Dimensions: {selectedSize.dimensions.length}" L × {selectedSize.dimensions.width}" W × {selectedSize.dimensions.height}" H
            </p>
          )}
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button 
          size="lg" 
          className="flex-1 text-base"
          disabled={isOutOfStock || loadingAvailability}
          onClick={onAddToCart}
        >
          {loadingAvailability ? (
            <Loader2 className="size-4 mr-2 animate-spin" />
          ) : (
            <ShoppingCart className="size-4 mr-2" />
          )}
          {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="flex-1 text-base bg-transparent"
          disabled={isOutOfStock || loadingAvailability}
          onClick={onBuyNow}
        >
          Buy Now
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        Status: <span className="font-medium text-foreground">{product.availability}</span>
      </div>
    </div>
  )
}