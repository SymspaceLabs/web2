// ===== FILE: product-form/components/variants-table.tsx =====
import React, { useState, useMemo, useCallback, memo } from "react"
import { ChevronDown, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// ===== TYPE DEFINITIONS =====
export interface VariantRow {
  color: string
  size: string
  sku: string
  stock: number
  price: number
  salePrice: number
  cost: number
  colorHex?: string
}

export interface Size {
  id: string
  value: string
  dimensions?: {
    length?: string
    width?: string
    height?: string
    unit?: 'cm' | 'in'
  }
  productWeight?: {
    value: number
    unit: 'kg' | 'lbs'
  } | null
  sizeChartUrl?: string
}

interface VariantsTableProps {
  variants: VariantRow[]
  sizes: Size[]
  onVariantChange: (index: number, field: keyof VariantRow, value: string | number) => void
  onBulkUpdate: (field: keyof VariantRow, value: string) => void
  onColorBulkUpdate: (colorName: string, field: keyof VariantRow, value: string) => void
  onDeleteVariant: (index: number) => void
}

// ===== UTILITY FUNCTIONS =====
const calculateProfit = (variant: VariantRow): number => {
  const sellingPrice = variant.salePrice > 0 ? variant.salePrice : variant.price
  const profit = (sellingPrice - variant.cost) * variant.stock
  return Math.round(profit * 100) / 100
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

/**
 * Calculate price range for a group of variants
 * Returns formatted string like "RM 30.00 - 60.00" or "RM 50.00" if all same
 * 
 * Industry best practice: Always show the selling price (sale price if available, else regular price)
 */
const calculatePriceRange = (variants: VariantRow[], currencySymbol: string = 'RM'): string => {
  if (variants.length === 0) return `${currencySymbol} 0.00`
  
  // Get effective prices (sale price takes precedence if set)
  const prices = variants.map(v => v.salePrice > 0 ? v.salePrice : v.price)
  
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  
  // If all prices are the same, show single price
  if (minPrice === maxPrice) {
    return `${currencySymbol} ${minPrice.toFixed(2)}`
  }
  
  // Show range if prices differ
  return `${currencySymbol} ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`
}

/**
 * Calculate stock range for a group of variants
 * Useful for quick inventory overview at color level
 */
const calculateStockRange = (variants: VariantRow[]): string => {
  if (variants.length === 0) return '0'
  
  const stocks = variants.map(v => v.stock)
  const minStock = Math.min(...stocks)
  const maxStock = Math.max(...stocks)
  
  if (minStock === maxStock) {
    return minStock.toString()
  }
  
  return `${minStock} - ${maxStock}`
}

/**
 * Calculate total available stock for a color group
 */
const calculateTotalStock = (variants: VariantRow[]): number => {
  return variants.reduce((sum, v) => sum + v.stock, 0)
}

// ===== MEMOIZED SUB-COMPONENTS =====

/**
 * Bulk edit row component - allows setting values for all variants at once
 */
const BulkEditRow = memo<{
  onBulkUpdate: (field: keyof VariantRow, value: string) => void
}>(({ onBulkUpdate }) => {
  return (
    <TableRow className="bg-primary/5 hover:bg-primary/10 border-b-2 sticky top-0 z-10">
      <TableCell>
        <span className="font-bold text-sm">ALL VARIANTS</span>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.01"
          placeholder="Set all"
          onChange={(e) => onBulkUpdate('price', e.target.value)}
          className="bg-background h-9"
          min="0"
          aria-label="Set price for all variants"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.01"
          placeholder="Set all"
          onChange={(e) => onBulkUpdate('salePrice', e.target.value)}
          className="bg-background h-9"
          min="0"
          aria-label="Set sale price for all variants"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          placeholder="Set all"
          onChange={(e) => onBulkUpdate('stock', e.target.value)}
          className="bg-background h-9"
          min="0"
          aria-label="Set stock for all variants"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.01"
          placeholder="Set all"
          onChange={(e) => onBulkUpdate('cost', e.target.value)}
          className="bg-background h-9"
          min="0"
          aria-label="Set cost for all variants"
        />
      </TableCell>
      <TableCell className="bg-muted/50">
        <span className="text-xs text-muted-foreground italic">Auto-calculated</span>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
})

BulkEditRow.displayName = 'BulkEditRow'

/**
 * Color group header - Shows aggregated data for all variants of a color
 * 
 * KEY FEATURES (Shopify-inspired):
 * - Dynamic price range display
 * - Total stock indicator
 * - Bulk edit functionality
 * - Visual color indicator
 */
const ColorGroupHeader = memo<{
  colorName: string
  colorHex: string
  variantCount: number
  colorVariants: VariantRow[]
  totalProfit: number
  isExpanded: boolean
  onToggle: () => void
  onColorBulkUpdate: (field: keyof VariantRow, value: string) => void
}>(({ 
  colorName, 
  colorHex, 
  variantCount, 
  colorVariants,
  totalProfit, 
  isExpanded, 
  onToggle, 
  onColorBulkUpdate 
}) => {
  const [isPriceEditing, setIsPriceEditing] = useState(false)
  const [isStockEditing, setIsStockEditing] = useState(false)
  const [isCostEditing, setIsCostEditing] = useState(false)
  const [isSalePriceEditing, setIsSalePriceEditing] = useState(false)
  
  // Calculate dynamic ranges
  const priceRange = useMemo(() => calculatePriceRange(colorVariants), [colorVariants])
  const totalStock = useMemo(() => calculateTotalStock(colorVariants), [colorVariants])
  
  return (
    <TableRow 
      className="bg-muted/50 hover:bg-muted/70 border-b cursor-pointer"
      onClick={onToggle}
    >
      <TableCell className="cursor-pointer">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className="flex items-center gap-2 hover:text-primary transition-colors w-full text-left"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${colorName} variants`}
        >
          <ChevronDown 
            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
          <div
            className="w-4 h-4 rounded-full border flex-shrink-0"
            style={{ backgroundColor: colorHex }}
            aria-label={`Color: ${colorName}`}
          />
          <span className="font-semibold text-sm">{colorName}</span>
          <span className="text-xs text-muted-foreground">({variantCount})</span>
        </button>
      </TableCell>
      
      {/* Price Range Column - Shopify Style */}
      <TableCell>
        {isPriceEditing ? (
          <div className="flex gap-1">
            <Input
              type="number"
              step="0.01"
              placeholder="Set price"
              autoFocus
              onBlur={(e) => {
                if (e.target.value) {
                  onColorBulkUpdate('price', e.target.value)
                }
                setIsPriceEditing(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (e.currentTarget.value) {
                    onColorBulkUpdate('price', e.currentTarget.value)
                  }
                  setIsPriceEditing(false)
                } else if (e.key === 'Escape') {
                  setIsPriceEditing(false)
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background h-9 text-sm"
              min="0"
              aria-label={`Set price for all ${colorName} variants`}
            />
          </div>
        ) : (
          <div 
            className="relative group cursor-text"
            onClick={(e) => {
              e.stopPropagation()
              setIsPriceEditing(true)
            }}
          >
            <div className="h-9 px-3 py-2 rounded-md border bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span className="text-sm font-medium">{priceRange}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
          </div>
        )}
      </TableCell>
      
      {/* Sale Price Column */}
      <TableCell>
        {isSalePriceEditing ? (
          <Input
            type="number"
            step="0.01"
            placeholder="Set sale"
            autoFocus
            onBlur={(e) => {
              if (e.target.value) {
                onColorBulkUpdate('salePrice', e.target.value)
              }
              setIsSalePriceEditing(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.currentTarget.value) {
                  onColorBulkUpdate('salePrice', e.currentTarget.value)
                }
                setIsSalePriceEditing(false)
              } else if (e.key === 'Escape') {
                setIsSalePriceEditing(false)
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background h-9"
            min="0"
            aria-label={`Set sale price for all ${colorName} variants`}
          />
        ) : (
          <div 
            className="h-9 px-3 py-2 rounded-md border bg-background hover:bg-muted/30 transition-colors flex items-center cursor-text"
            onClick={(e) => {
              e.stopPropagation()
              setIsSalePriceEditing(true)
            }}
          >
            <span className="text-sm text-muted-foreground">Set sale price</span>
          </div>
        )}
      </TableCell>
      
      {/* Stock Column with Total */}
      <TableCell>
        {isStockEditing ? (
          <Input
            type="number"
            placeholder="Set stock"
            autoFocus
            onBlur={(e) => {
              if (e.target.value) {
                onColorBulkUpdate('stock', e.target.value)
              }
              setIsStockEditing(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.currentTarget.value) {
                  onColorBulkUpdate('stock', e.currentTarget.value)
                }
                setIsStockEditing(false)
              } else if (e.key === 'Escape') {
                setIsStockEditing(false)
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background h-9"
            min="0"
            aria-label={`Set stock for all ${colorName} variants`}
          />
        ) : (
          <div 
            className="relative group cursor-text"
            onClick={(e) => {
              e.stopPropagation()
              setIsStockEditing(true)
            }}
          >
            <div className="h-9 px-3 py-2 rounded-md border bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span className="text-sm font-medium">Total: {totalStock}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
          </div>
        )}
      </TableCell>
      
      {/* Cost Column */}
      <TableCell>
        {isCostEditing ? (
          <Input
            type="number"
            step="0.01"
            placeholder="Set cost"
            autoFocus
            onBlur={(e) => {
              if (e.target.value) {
                onColorBulkUpdate('cost', e.target.value)
              }
              setIsCostEditing(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.currentTarget.value) {
                  onColorBulkUpdate('cost', e.currentTarget.value)
                }
                setIsCostEditing(false)
              } else if (e.key === 'Escape') {
                setIsCostEditing(false)
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background h-9"
            min="0"
            aria-label={`Set cost for all ${colorName} variants`}
          />
        ) : (
          <div 
            className="h-9 px-3 py-2 rounded-md border bg-background hover:bg-muted/30 transition-colors flex items-center cursor-text"
            onClick={(e) => {
              e.stopPropagation()
              setIsCostEditing(true)
            }}
          >
            <span className="text-sm text-muted-foreground">Set cost</span>
          </div>
        )}
      </TableCell>
      
      {/* Profit Column */}
      <TableCell className="bg-muted/50">
        <span className="font-semibold text-sm">
          {formatCurrency(totalProfit)}
        </span>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
})

ColorGroupHeader.displayName = 'ColorGroupHeader'

/**
 * Individual variant row component
 */
const VariantRowComponent = memo<{
  variant: VariantRow
  index: number
  dimensions: string
  weight: string
  onVariantChange: (index: number, field: keyof VariantRow, value: string | number) => void
  onDelete: () => void
}>(({ variant, index, dimensions, weight, onVariantChange, onDelete }) => {
  const profit = calculateProfit(variant)
  
  const handleFieldChange = useCallback((field: keyof VariantRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onVariantChange(index, field, e.target.value)
  }, [index, onVariantChange])
  
  return (
    <TableRow className="hover:bg-muted/30">
      <TableCell className="pl-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">└</span>
          <div>
            <div className="font-medium text-sm">{variant.size}</div>
            <div className="text-xs text-muted-foreground font-mono">{variant.sku}</div>
            {dimensions && (
              <div className="text-xs text-muted-foreground">{dimensions}</div>
            )}
            {weight && (
              <div className="text-xs text-blue-600">⚖️ {weight}</div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.01"
          value={variant.price || ""}
          onChange={handleFieldChange('price')}
          placeholder="0.00"
          className="h-9"
          min="0"
          aria-label={`Price for ${variant.color} ${variant.size}`}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.01"
          value={variant.salePrice || ""}
          onChange={handleFieldChange('salePrice')}
          placeholder="0.00"
          className="h-9"
          min="0"
          aria-label={`Sale price for ${variant.color} ${variant.size}`}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={variant.stock || ""}
          onChange={handleFieldChange('stock')}
          placeholder="0"
          className="h-9"
          min="0"
          aria-label={`Stock for ${variant.color} ${variant.size}`}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.01"
          value={variant.cost || ""}
          onChange={handleFieldChange('cost')}
          placeholder="0.00"
          className="h-9"
          min="0"
          aria-label={`Cost for ${variant.color} ${variant.size}`}
        />
      </TableCell>
      <TableCell className="bg-muted/50">
        <span className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(profit)}
        </span>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Variant actions">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onDelete}>
              Delete Variant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
})

VariantRowComponent.displayName = 'VariantRowComponent'

// ===== MAIN COMPONENT =====
/**
 * VariantsTable - Enterprise-grade variants management table
 * 
 * NEW FEATURES (v2.0):
 * ✅ Dynamic price ranges at color-group level (Shopify-inspired)
 * ✅ Real-time range updates as prices change
 * ✅ Smart formatting (single price vs range)
 * ✅ Total stock aggregation per color
 * ✅ Enhanced visual hierarchy
 * 
 * Performance optimizations:
 * - useMemo for expensive range calculations
 * - useCallback for stable function references
 * - React.memo for sub-components
 * - Map-based lookups for O(1) complexity
 */
export const VariantsTable = memo<VariantsTableProps>(({ 
  variants, 
  sizes, 
  onVariantChange, 
  onBulkUpdate,
  onColorBulkUpdate,
  onDeleteVariant 
}) => {
  const [expandedColors, setExpandedColors] = useState<Set<string>>(new Set())
  
  // Memoized grouping by color
  const variantsByColor = useMemo(() => {
    return variants.reduce((acc, variant) => {
      if (!acc[variant.color]) {
        acc[variant.color] = []
      }
      acc[variant.color].push(variant)
      return acc
    }, {} as Record<string, VariantRow[]>)
  }, [variants])
  
  // Memoized size lookup map
  const sizeMap = useMemo(() => {
    return new Map(sizes.map(s => [s.value, s]))
  }, [sizes])
  
  // Helper functions
  const getSizeDimensions = useCallback((sizeValue: string): string => {
    const size = sizeMap.get(sizeValue)
    if (!size?.dimensions) return ""
    
    const { length, width, height, unit } = size.dimensions
    const parts = [length, width, height].filter(Boolean)
    return parts.length > 0 ? `${parts.join(" × ")} ${unit}` : ""
  }, [sizeMap])
  
  const getSizeWeight = useCallback((sizeValue: string): string => {
    const size = sizeMap.get(sizeValue)
    if (!size?.productWeight?.value) return ""
    
    return `${size.productWeight.value.toFixed(2)} kg`
  }, [sizeMap])
  
  // Toggle handlers
  const toggleColorExpanded = useCallback((colorName: string) => {
    setExpandedColors(prev => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(colorName)) {
        newExpanded.delete(colorName)
      } else {
        newExpanded.add(colorName)
      }
      return newExpanded
    })
  }, [])
  
  const expandAllColors = useCallback(() => {
    setExpandedColors(new Set(Object.keys(variantsByColor)))
  }, [variantsByColor])
  
  const collapseAllColors = useCallback(() => {
    setExpandedColors(new Set())
  }, [])
  
  // Memoized total profit calculation
  const totalProfit = useMemo(() => {
    return variants.reduce((sum, v) => sum + calculateProfit(v), 0)
  }, [variants])
  
  if (variants.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/20">
        <p>Add colors and sizes to generate variants</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-base font-medium">
            Variant Details ({variants.length} variants)
          </span>
          <span className="text-sm text-muted-foreground">
            Total Profit: {formatCurrency(totalProfit)}
          </span>
        </div>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={expandedColors.size === 0 ? expandAllColors : collapseAllColors}
          aria-label={expandedColors.size === 0 ? 'Expand all color groups' : 'Collapse all color groups'}
        >
          {expandedColors.size === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </div>

      <div className="rounded-lg border overflow-x-auto max-h-[600px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-20">
            <TableRow>
              <TableHead className="min-w-[200px]">Variant</TableHead>
              <TableHead className="w-32">Price ($)</TableHead>
              <TableHead className="w-32">Sale Price ($)</TableHead>
              <TableHead className="w-28">Stock</TableHead>
              <TableHead className="w-28">Cost ($)</TableHead>
              <TableHead className="w-32 bg-muted/50">Profit ($)</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <BulkEditRow onBulkUpdate={onBulkUpdate} />

            {Object.entries(variantsByColor).map(([colorName, colorVariants]) => {
              const colorHex = colorVariants[0]?.colorHex || '#000000'
              const totalProfit = colorVariants.reduce((sum, v) => sum + calculateProfit(v), 0)
              const isExpanded = expandedColors.has(colorName)
              
              return (
                <React.Fragment key={colorName}>
                  <ColorGroupHeader
                    colorName={colorName}
                    colorHex={colorHex}
                    variantCount={colorVariants.length}
                    colorVariants={colorVariants}
                    totalProfit={totalProfit}
                    isExpanded={isExpanded}
                    onToggle={() => toggleColorExpanded(colorName)}
                    onColorBulkUpdate={(field, value) => onColorBulkUpdate(colorName, field, value)}
                  />

                  {isExpanded && colorVariants.map((variant) => {
                    const index = variants.findIndex(
                      v => v.color === variant.color && v.size === variant.size
                    )
                    const dimensions = getSizeDimensions(variant.size)
                    const weight = getSizeWeight(variant.size)
                    
                    return (
                      <VariantRowComponent
                        key={`${variant.color}-${variant.size}`}
                        variant={variant}
                        index={index}
                        dimensions={dimensions}
                        weight={weight}
                        onVariantChange={onVariantChange}
                        onDelete={() => onDeleteVariant(index)}
                      />
                    )
                  })}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
})

VariantsTable.displayName = 'VariantsTable'

// ===== CUSTOM HOOK =====
export const useVariantsTable = (
  initialVariants: VariantRow[],
  updateFormData: (data: any) => void
) => {
  const handleVariantChange = useCallback((
    index: number, 
    field: keyof VariantRow, 
    value: string | number
  ) => {
    const newVariants = [...initialVariants]
    newVariants[index] = {
      ...newVariants[index],
      [field]:
        field === "stock"
          ? Number.parseInt(value.toString()) || 0
          : field === "price" || field === "salePrice" || field === "cost"
            ? Number.parseFloat(value.toString()) || 0
            : value,
    }
    updateFormData({ variants: newVariants })
  }, [initialVariants, updateFormData])

  const handleBulkUpdate = useCallback((field: keyof VariantRow, value: string) => {
    const newVariants = initialVariants.map(v => ({
      ...v,
      [field]: field === 'stock'
        ? (value ? Number.parseInt(value) : v[field])
        : field === 'price' || field === 'salePrice' || field === 'cost'
        ? (value ? Number.parseFloat(value) : v[field])
        : (value || v[field])
    }))
    updateFormData({ variants: newVariants })
  }, [initialVariants, updateFormData])

  const handleColorBulkUpdate = useCallback((
    colorName: string, 
    field: keyof VariantRow, 
    value: string
  ) => {
    const newVariants = initialVariants.map(v => {
      if (v.color !== colorName) return v
      return {
        ...v,
        [field]: field === 'stock'
          ? (value ? Number.parseInt(value) : v[field])
          : field === 'price' || field === 'salePrice' || field === 'cost'
          ? (value ? Number.parseFloat(value) : v[field])
          : (value || v[field])
      }
    })
    updateFormData({ variants: newVariants })
  }, [initialVariants, updateFormData])

  const handleDeleteVariant = useCallback((index: number) => {
    const variant = initialVariants[index]
    if (window.confirm(`Delete variant ${variant.color} / ${variant.size}?`)) {
      const newVariants = initialVariants.filter((_, i) => i !== index)
      updateFormData({ variants: newVariants })
    }
  }, [initialVariants, updateFormData])

  return {
    handleVariantChange,
    handleBulkUpdate,
    handleColorBulkUpdate,
    handleDeleteVariant
  }
}