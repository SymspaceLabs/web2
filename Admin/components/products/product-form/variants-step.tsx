"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { X, MoreVertical, Plus, Upload, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { uploadImage } from "@/api/upload"
import { ImageUploader } from "@/components/products/product-form/components/image-uploader"

// Mock FormData type - replace with your actual type
type FormData = {
  selectedColors: Array<{ id: string; name: string; code: string }>
  selectedSizes: Array<{ 
    id: string; 
    size: string; 
    dimensions?: any; 
    sizeChartUrl?: string;
    productWeight?: { value: number | null; unit: 'kg' | 'lbs' }
  }>
  variants: VariantRow[]
  material?: string
}

type VariantsStepProps = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: (values: Partial<FormData>) => Promise<void>
  onBack: () => void
}

interface Color {
  id: string
  name: string
  hex: string
}

interface Size {
  id: string
  value: string
  dimensions?: {
    length?: string
    width?: string
    height?: string
    unit?: 'cm' | 'in'
  }
  productWeight?: {
    value: number | null // ✅ Must be number, not string
    unit: 'kg' | 'lbs'
  } | null
  sizeChartUrl?: string
}

interface VariantRow {
  color: string
  size: string
  sku: string
  stock: number
  price: number
  salePrice: number
  cost: number
  colorHex?: string
}

// Helper function to convert weight units
const convertWeight = (value: number, fromUnit: 'kg' | 'lbs', toUnit: 'kg' | 'lbs'): number => {
  if (fromUnit === toUnit) return value
  if (fromUnit === 'lbs' && toUnit === 'kg') {
    return value * 0.453592 // lbs to kg
  }
  return value * 2.20462 // kg to lbs
}

export function VariantsStep({ formData, updateFormData, onNext, onBack }: VariantsStepProps) {
  const [colors, setColors] = useState<Color[]>(
    formData.selectedColors.length > 0 
      ? formData.selectedColors.map(c => ({
          id: c.id,
          name: c.name,
          hex: c.code
        }))
      : []
  )
  const [sizes, setSizes] = useState<Size[]>(
    formData.selectedSizes.length > 0
      ? formData.selectedSizes.map(s => ({
          id: s.id,
          value: s.size,
          dimensions: s.dimensions,
          productWeight: s.productWeight || { value: null, unit: 'kg' },
          sizeChartUrl: s.sizeChartUrl
        }))
      : []
  )
  
  const [material, setMaterial] = useState(formData.material || "")
  
  // Color modal state
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [editingColorId, setEditingColorId] = useState<string | null>(null)
  const [newColorData, setNewColorData] = useState({
    name: "",
    hex: "#000000"
  })
  
  // Size modal state
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false)
  const [editingSizeId, setEditingSizeId] = useState<string | null>(null)
  const [newSizeData, setNewSizeData] = useState({
    name: "",
    length: "",
    width: "",
    height: "",
    unit: "cm" as 'cm' | 'in',
    weightValue: "",
    weightUnit: "kg" as 'kg' | 'lbs',
    sizeChartUrl: ""
  });
  const [isUploadingSizeChart, setIsUploadingSizeChart] = useState(false)

  
  const [expandedColors, setExpandedColors] = useState<Set<string>>(new Set())
  
  const isColorEditMode = editingColorId !== null
  const isSizeEditMode = editingSizeId !== null
  
  const toggleColorExpanded = (colorName: string) => {
    const newExpanded = new Set(expandedColors)
    if (newExpanded.has(colorName)) {
      newExpanded.delete(colorName)
    } else {
      newExpanded.add(colorName)
    }
    setExpandedColors(newExpanded)
  }
  
  const expandAllColors = () => {
    const allColors = Object.keys(variantsByColor)
    setExpandedColors(new Set(allColors))
  }
  
  const collapseAllColors = () => {
    setExpandedColors(new Set())
  }

  // Color modal functions
  const openAddColorModal = () => {
    setEditingColorId(null)
    setNewColorData({
      name: "",
      hex: "#000000"
    })
    setIsColorModalOpen(true)
  }

  const openEditColorModal = (colorId: string) => {
    const color = colors.find(c => c.id === colorId)
    if (!color) return

    setEditingColorId(colorId)
    setNewColorData({
      name: color.name,
      hex: color.hex
    })
    setIsColorModalOpen(true)
  }

  const handleAddColor = () => {
    if (!newColorData.name.trim()) return

    const newColor: Color = {
      id: Date.now().toString(),
      name: newColorData.name.trim(),
      hex: newColorData.hex,
    }
    setColors([...colors, newColor])
    
    // Reset and close modal
    setNewColorData({ name: "", hex: "#000000" })
    setEditingColorId(null)
    setIsColorModalOpen(false)
  }

  const handleUpdateColor = () => {
    if (!newColorData.name.trim() || !editingColorId) return

    const updatedColors = colors.map(color => {
      if (color.id !== editingColorId) return color
      
      return {
        ...color,
        name: newColorData.name.trim(),
        hex: newColorData.hex
      }
    })
    
    setColors(updatedColors)
    
    // Reset and close modal
    setNewColorData({ name: "", hex: "#000000" })
    setEditingColorId(null)
    setIsColorModalOpen(false)
  }

  const handleSaveColor = () => {
    if (isColorEditMode) {
      handleUpdateColor()
    } else {
      handleAddColor()
    }
  }

  const handleRemoveColor = (id: string) => {
    setColors(colors.filter((c) => c.id !== id))
  }

  const generateVariants = (): VariantRow[] => {
    const newVariants: VariantRow[] = []

    if (colors.length === 0 || sizes.length === 0) {
      return []
    }

    colors.forEach((color) => {
      sizes.forEach((size) => {
        const colorAbbr = color.name.substring(0, 3).toUpperCase()
        const sizeAbbr = size.value.replace(/\s/g, "").substring(0, 3).toUpperCase()
        const sku = `${colorAbbr}-${sizeAbbr}`

        const existing = formData.variants.find((v) => v.color === color.name && v.size === size.value)

        newVariants.push({
          color: color.name,
          size: size.value,
          sku: existing?.sku || sku,
          stock: existing?.stock || 0,
          price: existing?.price || 0,
          salePrice: existing?.salePrice || 0,
          cost: existing?.cost || 0,
          colorHex: color.hex,
        })
      })
    })

    return newVariants
  }

  const variants = generateVariants()

  const variantsByColor = variants.reduce((acc, variant) => {
    if (!acc[variant.color]) {
      acc[variant.color] = []
    }
    acc[variant.color].push(variant)
    return acc
  }, {} as Record<string, VariantRow[]>)

  const calculateProfit = (variant: VariantRow): number => {
    const sellingPrice = variant.salePrice > 0 ? variant.salePrice : variant.price
    const profit = (sellingPrice - variant.cost) * variant.stock
    return Math.round(profit * 100) / 100
  }

  const handleSizeImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingSizeChart(true)
    
    try {
      const url = await uploadImage(file)
      setNewSizeData(prev => ({ ...prev, sizeChartUrl: url }))
    } catch (error) {
      alert('Upload failed. Please try again.')
    } finally {
      setIsUploadingSizeChart(false)
    }
  }

  const openAddSizeModal = () => {
    setEditingSizeId(null)
    setNewSizeData({
      name: "",
      length: "",
      width: "",
      height: "",
      unit: "cm",
      weightValue: "",
      weightUnit: "kg",
      sizeChartUrl: ""
    })
    setIsSizeModalOpen(true)
  }

  const openEditSizeModal = (sizeId: string) => {
    const size = sizes.find(s => s.id === sizeId)
    if (!size) return

    setEditingSizeId(sizeId)
    setNewSizeData({
      name: size.value,
      length: size.dimensions?.length || "",
      width: size.dimensions?.width || "",
      height: size.dimensions?.height || "",
      unit: size.dimensions?.unit || "cm",
      // ✅ FIX: Handle null productWeight properly
      weightValue: size.productWeight?.value?.toString() || "",
      weightUnit: size.productWeight?.unit || "kg",
      sizeChartUrl: size.sizeChartUrl || ""
    })
    setIsSizeModalOpen(true)
  }

  // Handle weight unit change with auto-conversion
  const handleWeightUnitChange = (newUnit: 'kg' | 'lbs') => {
    const currentValue = parseFloat(newSizeData.weightValue)
    
    if (!isNaN(currentValue) && currentValue > 0) {
      const convertedValue = convertWeight(currentValue, newSizeData.weightUnit, newUnit)
      setNewSizeData(prev => ({
        ...prev,
        weightValue: convertedValue.toFixed(2),
        weightUnit: newUnit
      }))
    } else {
      setNewSizeData(prev => ({ ...prev, weightUnit: newUnit }))
    }
  }

  const handleAddSize = () => {
    if (!newSizeData.name.trim()) return;

    // Convert weight to kg for storage (SI unit)
    const weightValue = parseFloat(newSizeData.weightValue)
    const weightInKg = !isNaN(weightValue) && weightValue > 0
      ? convertWeight(weightValue, newSizeData.weightUnit, 'kg')
      : null

    const newSizeObj: Size = {
      id: Date.now().toString(),
      value: newSizeData.name.trim(),
      dimensions: (newSizeData.length || newSizeData.width || newSizeData.height) ? {
        length: newSizeData.length || undefined,
        width: newSizeData.width || undefined,
        height: newSizeData.height || undefined,
        unit: newSizeData.unit
      } : undefined,
      // ✅ FIX: Ensure this matches the backend DTO structure
      productWeight: weightInKg !== null ? {
        value: weightInKg,
        unit: 'kg' as const  // ✅ Always kg for storage
      } : null,  // ✅ Explicitly null, not undefined
      sizeChartUrl: newSizeData.sizeChartUrl || undefined
    }
    
    setSizes([...sizes, newSizeObj])
    
    setNewSizeData({
      name: "",
      length: "",
      width: "",
      height: "",
      unit: "cm",
      weightValue: "",
      weightUnit: "kg",
      sizeChartUrl: ""
    })
    setEditingSizeId(null)
    setIsSizeModalOpen(false)
  }

  const handleUpdateSize = () => {
    if (!newSizeData.name.trim() || !editingSizeId) return

    // Convert weight to kg for storage
    const weightValue = parseFloat(newSizeData.weightValue)
    const weightInKg = !isNaN(weightValue) && weightValue > 0
      ? convertWeight(weightValue, newSizeData.weightUnit, 'kg')
      : null

    const updatedSizes = sizes.map(size => {
      if (size.id !== editingSizeId) return size
      
      return {
        ...size,
        value: newSizeData.name.trim(),
        dimensions: (newSizeData.length || newSizeData.width || newSizeData.height) ? {
          length: newSizeData.length || undefined,
          width: newSizeData.width || undefined,
          height: newSizeData.height || undefined,
          unit: newSizeData.unit
        } : undefined,
        // ✅ FIX: Match the structure exactly
        productWeight: weightInKg !== null ? {
          value: weightInKg,
          unit: 'kg' as const
        } : null
      }
    })
    
    setSizes(updatedSizes)
    
    setNewSizeData({
      name: "",
      length: "",
      width: "",
      height: "",
      unit: "cm",
      weightValue: "",
      weightUnit: "kg",
      sizeChartUrl: ""
    })
    setEditingSizeId(null)
    setIsSizeModalOpen(false)
  }

  const handleSaveSize = () => {
    if (isSizeEditMode) {
      handleUpdateSize()
    } else {
      handleAddSize()
    }
  }

  const handleRemoveSize = (id: string) => {
    setSizes(sizes.filter((s) => s.id !== id))
  }

  const handleVariantChange = (index: number, field: keyof VariantRow, value: string | number) => {
    const newVariants = [...variants]
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
  }

  const handleSupermasterChange = (field: keyof VariantRow, value: string) => {
    const newVariants = variants.map(v => ({
      ...v,
      [field]: field === 'stock'
        ? (value ? Number.parseInt(value) : v[field])
        : field === 'price' || field === 'salePrice' || field === 'cost'
        ? (value ? Number.parseFloat(value) : v[field])
        : (value || v[field])
    }))
    updateFormData({ variants: newVariants })
  }

  const handleColorMasterChange = (colorName: string, field: keyof VariantRow, value: string) => {
    const newVariants = variants.map(v => {
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
  }

  const handleDeleteVariant = (index: number) => {
    const variant = variants[index]
    if (confirm(`Delete variant ${variant.color} / ${variant.size}?`)) {
      const newVariants = variants.filter((_, i) => i !== index)
      updateFormData({ variants: newVariants })
    }
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
    
  //   const stepTwoData: Partial<FormData> = {
  //       variants: variants,
  //       material: material,
  //       selectedColors: colors.map(c => ({
  //           id: c.id,
  //           name: c.name,
  //           code: c.hex, 
  //       })),
  //       selectedSizes: sizes.map(s => ({
  //           id: s.id,
  //           size: s.value,
  //           dimensions: s.dimensions,
  //           sizeChartUrl: s.sizeChartUrl,
  //           // ✅ FIX: Ensure productWeight is properly included
  //           productWeight: s.productWeight ? {
  //             value: s.productWeight.value,
  //             unit: s.productWeight.unit
  //           } : null  // ✅ Send null if not set
  //       })),
  //   }
    
  //   await onNext(stepTwoData)
  // }

  const getSizeDimensions = (sizeValue: string): string => {
    const size = sizes.find(s => s.value === sizeValue)
    if (!size?.dimensions) return ""
    
    const { length, width, height, unit } = size.dimensions
    const parts = [length, width, height].filter(Boolean)
    return parts.length > 0 ? `${parts.join(" × ")} ${unit}` : ""
  }

  const getSizeWeight = (sizeValue: string): string => {
    const size = sizes.find(s => s.value === sizeValue)
    if (!size?.productWeight?.value) return ""
    
    return `${size.productWeight.value.toFixed(2)} kg`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
        
    const stepTwoData: Partial<FormData> = {
        variants: variants,
        material: material,
        selectedColors: colors.map(c => ({
            id: c.id,
            name: c.name,
            code: c.hex, 
        })),
        selectedSizes: sizes.map(s => {
          const mappedSize = {
            id: s.id,
            size: s.value,
            dimensions: s.dimensions,
            sizeChartUrl: s.sizeChartUrl,
            productWeight: s.productWeight ? {
              value: s.productWeight.value,
              unit: s.productWeight.unit
            } : null
          }
          return mappedSize
        }),
    }
        
    await onNext(stepTwoData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Variants & Inventory</h2>
        <p className="text-sm text-muted-foreground">Configure product colors, sizes, and inventory details</p>
      </div>

      {/* Product-level Material */}
      <div className="space-y-2">
        <Label htmlFor="material" className="text-base font-medium">Material</Label>
        <Input
          id="material"
          placeholder="e.g., 100% Cotton, Polyester Blend, Genuine Leather"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="max-w-md"
        />
        <p className="text-xs text-muted-foreground">Material applies to all variants of this product</p>
      </div>

      <div className="border-t" />

      {/* Colors Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Colors</Label>
          <Button type="button" onClick={openAddColorModal} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Color
          </Button>
        </div>

        {colors.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div key={color.id} className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-background hover:border-primary transition-colors">
                <div className="w-4 h-4 rounded-full border flex-shrink-0" style={{ backgroundColor: color.hex }} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{color.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{color.hex}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button" 
                    onClick={() => openEditColorModal(color.id)} 
                    className="text-muted-foreground hover:text-primary p-1"
                    title="Edit color"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveColor(color.id)} 
                    className="text-muted-foreground hover:text-destructive p-1"
                    title="Delete color"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Color Modal */}
      <Dialog open={isColorModalOpen} onOpenChange={(open) => {
        setIsColorModalOpen(open)
        if (!open) {
          setEditingColorId(null)
          setNewColorData({ name: "", hex: "#000000" })
        }
      }}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>{isColorEditMode ? 'Edit Color' : 'Add New Color'}</DialogTitle>
            <DialogDescription>
              {isColorEditMode 
                ? 'Update the color name and hex code.'
                : 'Add a new color with name and hex code.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="colorName">Color Name *</Label>
              <Input
                id="colorName"
                placeholder="e.g., Navy Blue, Forest Green, Crimson Red"
                value={newColorData.name}
                onChange={(e) => setNewColorData(prev => ({ ...prev, name: e.target.value }))}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label>Color Code *</Label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={newColorData.hex}
                    onChange={(e) => setNewColorData(prev => ({ ...prev, hex: e.target.value }))}
                    className="w-16 h-16 rounded-lg border-2 cursor-pointer"
                    title="Pick a color"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    type="text"
                    value={newColorData.hex}
                    onChange={(e) => setNewColorData(prev => ({ ...prev, hex: e.target.value }))}
                    className="font-mono"
                    placeholder="#000000"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                  <p className="text-xs text-muted-foreground">Enter hex code or use color picker</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/20">
                <div 
                  className="w-12 h-12 rounded-lg border-2 shadow-sm" 
                  style={{ backgroundColor: newColorData.hex }}
                />
                <div>
                  <p className="font-medium">{newColorData.name || 'Color Name'}</p>
                  <p className="text-sm text-muted-foreground font-mono">{newColorData.hex}</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsColorModalOpen(false)
                setEditingColorId(null)
                setNewColorData({ name: "", hex: "#000000" })
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSaveColor}
              disabled={!newColorData.name.trim()}
            >
              {isColorEditMode ? 'Update Color' : 'Add Color'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border-t" />

      {/* Sizes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Sizes</Label>
          <Button type="button" onClick={openAddSizeModal} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Size
          </Button>
        </div>

        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <div key={size.id} className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-background hover:border-primary transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{size.value}</span>
                  {size.dimensions && (
                    <span className="text-xs text-muted-foreground">
                      {[size.dimensions.length, size.dimensions.width, size.dimensions.height]
                        .filter(Boolean)
                        .join(" × ")} {size.dimensions.unit}
                    </span>
                  )}
                  {size.productWeight?.value && (
                    <span className="text-xs text-blue-600">⚖️ {size.productWeight.value.toFixed(2)} kg</span>
                  )}
                  {size.sizeChartUrl && (
                    <span className="text-xs text-blue-600">📊 Chart attached</span>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button" 
                    onClick={() => openEditSizeModal(size.id)} 
                    className="text-muted-foreground hover:text-primary p-1"
                    title="Edit size"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSize(size.id)} 
                    className="text-muted-foreground hover:text-destructive p-1"
                    title="Delete size"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Size Modal */}
      <Dialog open={isSizeModalOpen} onOpenChange={(open) => {
        setIsSizeModalOpen(open)
        if (!open) {
          setEditingSizeId(null)
          setNewSizeData({
            name: "",
            length: "",
            width: "",
            height: "",
            unit: "cm",
            weightValue: "",
            weightUnit: "kg",
            sizeChartUrl: ""
          })
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isSizeEditMode ? 'Edit Size' : 'Add New Size'}</DialogTitle>
            <DialogDescription>
              {isSizeEditMode 
                ? 'Update size details, dimensions, weight, and size chart image.'
                : 'Add a size with optional dimensions, weight, and size chart image.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sizeName">Size Name *</Label>
              <Input
                id="sizeName"
                placeholder="e.g., S, M, L, XL, 32, 10.5"
                value={newSizeData.name}
                onChange={(e) => setNewSizeData(prev => ({ ...prev, name: e.target.value }))}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Dimensions (Optional)</Label>
              <div className="grid grid-cols-4 gap-2">
                <Input
                  placeholder="Length"
                  value={newSizeData.length}
                  onChange={(e) => setNewSizeData(prev => ({ ...prev, length: e.target.value }))}
                />
                <Input
                  placeholder="Width"
                  value={newSizeData.width}
                  onChange={(e) => setNewSizeData(prev => ({ ...prev, width: e.target.value }))}
                />
                <Input
                  placeholder="Height"
                  value={newSizeData.height}
                  onChange={(e) => setNewSizeData(prev => ({ ...prev, height: e.target.value }))}
                />
                <select
                  value={newSizeData.unit}
                  onChange={(e) => setNewSizeData(prev => ({ ...prev, unit: e.target.value as 'cm' | 'in' }))}
                  className="px-3 py-2 rounded-md border bg-background text-sm"
                >
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>

            {/* NEW: Product Weight Input */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Product Weight (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Weight"
                  value={newSizeData.weightValue}
                  onChange={(e) => setNewSizeData(prev => ({ ...prev, weightValue: e.target.value }))}
                  className="flex-1"
                />
                <select
                  value={newSizeData.weightUnit}
                  onChange={(e) => handleWeightUnitChange(e.target.value as 'kg' | 'lbs')}
                  className="px-3 py-2 rounded-md border bg-background text-sm w-20"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
              <p className="text-xs text-muted-foreground">
                Weight will be stored in kg (SI unit). Current: {newSizeData.weightValue && !isNaN(parseFloat(newSizeData.weightValue)) 
                  ? `${convertWeight(parseFloat(newSizeData.weightValue), newSizeData.weightUnit, 'kg').toFixed(2)} kg`
                  : 'N/A'}
              </p>
            </div>

            <ImageUploader
              label="Size Chart Image (Optional)"
              description="Upload a size chart for this size"
              currentImageUrl={newSizeData.sizeChartUrl}
              onUploadComplete={(url) => setNewSizeData(prev => ({ ...prev, sizeChartUrl: url }))}
              onRemove={() => setNewSizeData(prev => ({ ...prev, sizeChartUrl: "" }))}
              uploadFunction={uploadImage}
              maxSizeMB={5}
              aspectRatio="auto"
              showPreview={true}
            />
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsSizeModalOpen(false)
                setEditingSizeId(null)
                setNewSizeData({
                  name: "",
                  length: "",
                  width: "",
                  height: "",
                  unit: "cm",
                  weightValue: "",
                  weightUnit: "kg",
                  sizeChartUrl: ""
                })
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSaveSize}
              disabled={!newSizeData.name.trim()}
            >
              {isSizeEditMode ? 'Update Size' : 'Add Size'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border-t" />

      {variants.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Variant Details ({variants.length} variants)</Label>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={expandedColors.size === 0 ? expandAllColors : collapseAllColors}
            >
              {expandedColors.size === 0 ? 'Expand all' : 'Collapse all'}
            </Button>
          </div>

          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Variant</TableHead>
                  <TableHead className="w-28">Price ($)</TableHead>
                  <TableHead className="w-28">Sale Price ($)</TableHead>
                  <TableHead className="w-24">Stock</TableHead>
                  <TableHead className="w-28">Cost ($)</TableHead>
                  <TableHead className="w-32 bg-muted/50">Profit ($)</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-primary/5 hover:bg-primary/10 border-b-2">
                  <TableCell>
                    <span className="font-bold text-sm">ALL VARIANTS</span>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Set all"
                      onChange={(e) => handleSupermasterChange('price', e.target.value)}
                      className="bg-background"
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Set all"
                      onChange={(e) => handleSupermasterChange('salePrice', e.target.value)}
                      className="bg-background"
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Set all"
                      onChange={(e) => handleSupermasterChange('stock', e.target.value)}
                      className="bg-background"
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Set all"
                      onChange={(e) => handleSupermasterChange('cost', e.target.value)}
                      className="bg-background"
                      min="0"
                    />
                  </TableCell>
                  <TableCell className="bg-muted/50">
                    <span className="text-xs text-muted-foreground italic">Auto-calculated</span>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>

                {Object.entries(variantsByColor).map(([colorName, colorVariants]) => {
                  const colorHex = colorVariants[0]?.colorHex || '#000000'
                  const totalProfit = colorVariants.reduce((sum, v) => sum + calculateProfit(v), 0)
                  const isExpanded = expandedColors.has(colorName)
                  
                  return (
                    <React.Fragment key={colorName}>
                      <TableRow 
                        className="bg-muted/50 hover:bg-muted/70 border-b cursor-pointer"
                        onClick={() => toggleColorExpanded(colorName)}
                      >
                        <TableCell className="cursor-pointer">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleColorExpanded(colorName)
                            }}
                            className="flex items-center gap-2 hover:text-primary transition-colors w-full text-left cursor-pointer"
                          >
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                            <div
                              className="w-4 h-4 rounded-full border flex-shrink-0"
                              style={{ backgroundColor: colorHex }}
                            />
                            <span className="font-semibold text-sm">{colorName}</span>
                            <span className="text-xs text-muted-foreground">({colorVariants.length} variants)</span>
                          </button>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Set price"
                            onChange={(e) => handleColorMasterChange(colorName, 'price', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-background"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Set sale"
                            onChange={(e) => handleColorMasterChange(colorName, 'salePrice', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-background"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="Set stock"
                            onChange={(e) => handleColorMasterChange(colorName, 'stock', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-background"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Set cost"
                            onChange={(e) => handleColorMasterChange(colorName, 'cost', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-background"
                            min="0"
                          />
                        </TableCell>
                        <TableCell className="bg-muted/50">
                          <span className="font-semibold text-sm">
                            ${totalProfit.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>

                      {isExpanded && colorVariants.map((variant) => {
                        const key = `${variant.color}-${variant.size}`
                        const index = variants.findIndex(v => v.color === variant.color && v.size === variant.size)
                        const profit = calculateProfit(variant)
                        const dimensions = getSizeDimensions(variant.size)
                        const weight = getSizeWeight(variant.size)
                        
                        return (
                          <TableRow key={key} className="hover:bg-muted/30">
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
                                onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                                placeholder="0.00"
                                min="0"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={variant.salePrice || ""}
                                onChange={(e) => handleVariantChange(index, "salePrice", e.target.value)}
                                placeholder="0.00"
                                min="0"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={variant.stock || ""}
                                onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                                placeholder="0"
                                min="0"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={variant.cost || ""}
                                onChange={(e) => handleVariantChange(index, "cost", e.target.value)}
                                placeholder="0.00"
                                min="0"
                              />
                            </TableCell>
                            <TableCell className="bg-muted/50">
                              <span className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${profit.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleDeleteVariant(index)}>
                                    Delete Variant
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </React.Fragment>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/20">
          <p>Add colors and sizes above to generate variants</p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={variants.length === 0}>
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}