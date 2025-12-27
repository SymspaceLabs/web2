// ===== FILE: components/products/product-form/variants-step.tsx =====

"use client"

import React, { useState, useMemo, useCallback } from "react"
import { ArrowRight, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadImage } from "@/api/upload"
import { ImageUploader } from "@/components/products/product-form/components/image-uploader"
import { VariantsTable, useVariantsTable, type VariantRow, type Size } from "./components/variants-table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// ===== TYPE DEFINITIONS =====
type FormData = {
  selectedColors: Array<{ id: string; name: string; code: string }>
  selectedSizes: Array<{ 
    id: string; 
    size: string; 
    dimensions?: any; 
    sizeChartUrl?: string;
    productWeight?: { value: number | null; unit: 'kg' | 'lbs' | 'oz' }
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

// ===== UTILITY FUNCTIONS =====
const convertWeight = (value: number, fromUnit: 'kg' | 'lbs' | 'oz', toUnit: 'kg' | 'lbs' | 'oz'): number => {
  if (fromUnit === toUnit) return value
  
  // Convert to kg first
  let valueInKg: number
  if (fromUnit === 'lbs') {
    valueInKg = value * 0.453592
  } else if (fromUnit === 'oz') {
    valueInKg = value * 0.0283495
  } else {
    valueInKg = value
  }
  
  // Convert from kg to target unit
  if (toUnit === 'lbs') {
    return valueInKg * 2.20462
  } else if (toUnit === 'oz') {
    return valueInKg * 35.274
  }
  return valueInKg
}

const generateVariants = (colors: Color[], sizes: Size[], existingVariants: VariantRow[]): VariantRow[] => {
  if (colors.length === 0 || sizes.length === 0) {
    return []
  }

  const newVariants: VariantRow[] = []
  colors.forEach((color) => {
    sizes.forEach((size) => {
      const colorAbbr = color.name.substring(0, 3).toUpperCase()
      const sizeAbbr = size.value.replace(/\s/g, "").substring(0, 3).toUpperCase()
      const sku = `${colorAbbr}-${sizeAbbr}`

      const existing = existingVariants.find((v) => v.color === color.name && v.size === size.value)

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

// ===== MAIN COMPONENT =====
export function VariantsStep({ formData, updateFormData, onNext, onBack }: VariantsStepProps) {
  // ===== STATE MANAGEMENT =====
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
    unit: "cm" as 'cm' | 'in' | 'mm',
    weightValue: "",
    weightUnit: "kg" as 'kg' | 'lbs' | 'oz',
    sizeChartUrl: ""
  })
  
  // ===== MEMOIZED VALUES =====
  const variants = useMemo(() => 
    generateVariants(colors, sizes, formData.variants),
    [colors, sizes, formData.variants]
  )
  
  const isColorEditMode = editingColorId !== null
  const isSizeEditMode = editingSizeId !== null
  
  // ===== VARIANTS TABLE HANDLERS =====
  const {
    handleVariantChange,
    handleBulkUpdate,
    handleColorBulkUpdate,
    handleDeleteVariant
  } = useVariantsTable(variants, updateFormData)
  
  // ===== COLOR MANAGEMENT =====
  const openAddColorModal = useCallback(() => {
    setEditingColorId(null)
    setNewColorData({ name: "", hex: "#000000" })
    setIsColorModalOpen(true)
  }, [])

  const openEditColorModal = useCallback((colorId: string) => {
    const color = colors.find(c => c.id === colorId)
    if (!color) return

    setEditingColorId(colorId)
    setNewColorData({ name: color.name, hex: color.hex })
    setIsColorModalOpen(true)
  }, [colors])

  const handleSaveColor = useCallback(() => {
    if (!newColorData.name.trim()) return

    if (isColorEditMode) {
      setColors(prev => prev.map(color => 
        color.id !== editingColorId ? color : {
          ...color,
          name: newColorData.name.trim(),
          hex: newColorData.hex
        }
      ))
    } else {
      const newColor: Color = {
        id: Date.now().toString(),
        name: newColorData.name.trim(),
        hex: newColorData.hex,
      }
      setColors(prev => [...prev, newColor])
    }
    
    setNewColorData({ name: "", hex: "#000000" })
    setEditingColorId(null)
    setIsColorModalOpen(false)
  }, [newColorData, isColorEditMode, editingColorId])

  const handleRemoveColor = useCallback((id: string) => {
    setColors(prev => prev.filter((c) => c.id !== id))
  }, [])

  // ===== SIZE MANAGEMENT =====
  const handleWeightUnitChange = useCallback((newUnit: 'kg' | 'lbs' | 'oz') => {
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
  }, [newSizeData.weightValue, newSizeData.weightUnit])

  const openAddSizeModal = useCallback(() => {
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
  }, [])

  const openEditSizeModal = useCallback((sizeId: string) => {
    const size = sizes.find(s => s.id === sizeId)
    if (!size) return

    setEditingSizeId(sizeId)
    setNewSizeData({
      name: size.value,
      length: size.dimensions?.length || "",
      width: size.dimensions?.width || "",
      height: size.dimensions?.height || "",
      unit: size.dimensions?.unit || "cm",
      weightValue: size.productWeight?.value?.toString() || "",
      weightUnit: size.productWeight?.unit || "kg",
      sizeChartUrl: size.sizeChartUrl || ""
    })
    setIsSizeModalOpen(true)
  }, [sizes])

  const handleSaveSize = useCallback(() => {
    if (!newSizeData.name.trim()) return

    const weightValue = parseFloat(newSizeData.weightValue)
    const weightInKg = !isNaN(weightValue) && weightValue > 0
      ? convertWeight(weightValue, newSizeData.weightUnit, 'kg')
      : null

    const sizeObject: Size = {
      id: isSizeEditMode ? editingSizeId! : Date.now().toString(),
      value: newSizeData.name.trim(),
      dimensions: (newSizeData.length || newSizeData.width || newSizeData.height) ? {
        length: newSizeData.length || undefined,
        width: newSizeData.width || undefined,
        height: newSizeData.height || undefined,
        unit: newSizeData.unit
      } : undefined,
      productWeight: weightInKg !== null ? {
        value: weightInKg,
        unit: 'kg' as const
      } : null,
      sizeChartUrl: newSizeData.sizeChartUrl || undefined
    }

    if (isSizeEditMode) {
      setSizes(prev => prev.map(size => 
        size.id !== editingSizeId ? size : sizeObject
      ))
    } else {
      setSizes(prev => [...prev, sizeObject])
    }
    
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
  }, [newSizeData, isSizeEditMode, editingSizeId])

  const handleRemoveSize = useCallback((id: string) => {
    setSizes(prev => prev.filter((s) => s.id !== id))
  }, [])

  // ===== FORM SUBMISSION =====
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    const stepTwoData: Partial<FormData> = {
      variants: variants,
      material: material,
      selectedColors: colors.map(c => ({
        id: c.id,
        name: c.name,
        code: c.hex, 
      })),
      selectedSizes: sizes.map(s => ({
        id: s.id,
        size: s.value,
        dimensions: s.dimensions,
        sizeChartUrl: s.sizeChartUrl,
        productWeight: s.productWeight ? {
          value: s.productWeight.value,
          unit: s.productWeight.unit
        } : null
      })),
    }
    
    await onNext(stepTwoData)
  }, [variants, material, colors, sizes, onNext])

  // ===== RENDER =====
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Variants & Inventory</h2>
        <p className="text-sm text-muted-foreground">Configure product colors, sizes, and inventory details</p>
      </div>

      {/* Material Field */}
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

      {/* Color Modal */}
      <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
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
                placeholder="e.g., Navy Blue, Forest Green"
                value={newColorData.name}
                onChange={(e) => setNewColorData(prev => ({ ...prev, name: e.target.value }))}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label>Color Code *</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={newColorData.hex}
                  onChange={(e) => setNewColorData(prev => ({ ...prev, hex: e.target.value }))}
                  className="w-16 h-16 rounded-lg border-2 cursor-pointer"
                />
                <Input
                  type="text"
                  value={newColorData.hex}
                  onChange={(e) => setNewColorData(prev => ({ ...prev, hex: e.target.value }))}
                  className="font-mono flex-1"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsColorModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveColor} disabled={!newColorData.name.trim()}>
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
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button" 
                    onClick={() => openEditSizeModal(size.id)} 
                    className="text-muted-foreground hover:text-primary p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSize(size.id)} 
                    className="text-muted-foreground hover:text-destructive p-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Size Modal */}
      <Dialog open={isSizeModalOpen} onOpenChange={setIsSizeModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isSizeEditMode ? 'Edit Size' : 'Add New Size'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Size Name *</Label>
              <Input
                placeholder="e.g., S, M, L, XL"
                value={newSizeData.name}
                onChange={(e) => setNewSizeData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Dimensions (Optional)</Label>
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
                  onChange={(e) => setNewSizeData(prev => ({ ...prev, unit: e.target.value as 'cm' | 'in' | 'mm' }))}
                  className="px-3 py-2 rounded-md border bg-background text-sm"
                >
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Weight (Optional)</Label>
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
                  onChange={(e) => handleWeightUnitChange(e.target.value as 'kg' | 'lbs' | 'oz')}
                  className="px-3 py-2 rounded-md border bg-background text-sm w-20"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                  <option value="oz">oz</option>
                </select>
              </div>
            </div>

            <ImageUploader
              label="Size Chart (Optional)"
              currentImageUrl={newSizeData.sizeChartUrl}
              onUploadComplete={(url) => setNewSizeData(prev => ({ ...prev, sizeChartUrl: url }))}
              onRemove={() => setNewSizeData(prev => ({ ...prev, sizeChartUrl: "" }))}
              uploadFunction={uploadImage}
              maxSizeMB={5}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsSizeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveSize} disabled={!newSizeData.name.trim()}>
              {isSizeEditMode ? 'Update Size' : 'Add Size'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border-t" />

      {/* Variants Table - Separated Component */}
      <VariantsTable
        variants={variants}
        sizes={sizes}
        onVariantChange={handleVariantChange}
        onBulkUpdate={handleBulkUpdate}
        onColorBulkUpdate={handleColorBulkUpdate}
        onDeleteVariant={handleDeleteVariant}
      />

      {/* Form Actions */}
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