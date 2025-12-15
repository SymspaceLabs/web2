"use client"

import type React from "react"
import { ArrowRight } from "lucide-react" 
import { useState } from "react"
import { X, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { FormData } from "."

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
}

interface VariantRow {
  color: string
  size: string
  sku: string
  stock: number
  price: number
  colorHex?: string
}

export function VariantsStep({ formData, updateFormData, onNext, onBack }: VariantsStepProps) {
  // ✅ Initialize from formData if available, otherwise use defaults
  const [colors, setColors] = useState<Color[]>(
    formData.selectedColors.length > 0 
      ? formData.selectedColors.map(c => ({
          id: c.id,
          name: c.name,
          hex: c.code  // ✅ Map 'code' to 'hex' for internal use
        }))
      : []
  )
  const [sizes, setSizes] = useState<Size[]>(
    formData.selectedSizes.length > 0
      ? formData.selectedSizes.map(s => ({
          id: s.id,
          value: s.size  // ✅ Map 'size' to 'value' for internal use
        }))
      : [{ id: "1", value: "One Size" }]
  )
  const [newColorName, setNewColorName] = useState("")
  const [newColorHex, setNewColorHex] = useState("#000000")
  const [newSize, setNewSize] = useState("")
  const [selectedVariants, setSelectedVariants] = useState<Set<string>>(new Set())
  const [bulkPrice, setBulkPrice] = useState("")
  const [bulkStock, setBulkStock] = useState("")
  const [applyTo, setApplyTo] = useState<"all" | "selected">("all")

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
          colorHex: color.hex,
        })
      })
    })

    return newVariants
  }

  const variants = generateVariants()
  const variantKeys = variants.map((v) => `${v.color}-${v.size}`)

  const handleAddColor = () => {
    if (!newColorName.trim()) return

    const newColor: Color = {
      id: Date.now().toString(),
      name: newColorName.trim(),
      hex: newColorHex,
    }
    setColors([...colors, newColor])
    setNewColorName("")
    setNewColorHex("#000000")
  }

  const handleRemoveColor = (id: string) => {
    setColors(colors.filter((c) => c.id !== id))
  }

  const handleAddSize = () => {
    if (!newSize.trim()) return

    const newSizeObj: Size = {
      id: Date.now().toString(),
      value: newSize.trim(),
    }
    setSizes([...sizes, newSizeObj])
    setNewSize("")
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
          : field === "price"
            ? Number.parseFloat(value.toString()) || 0
            : value,
    }
    updateFormData({ variants: newVariants })
  }

  const handleToggleVariant = (key: string) => {
    const newSelected = new Set(selectedVariants)
    if (newSelected.has(key)) {
      newSelected.delete(key)
    } else {
      newSelected.add(key)
    }
    setSelectedVariants(newSelected)
  }

  const handleToggleAll = () => {
    if (selectedVariants.size === variants.length) {
      setSelectedVariants(new Set())
    } else {
      setSelectedVariants(new Set(variantKeys))
    }
  }

  const handleApplyBulk = () => {
    const newVariants = variants.map((v, index) => {
      const key = variantKeys[index]
      const shouldUpdate = applyTo === "all" || selectedVariants.has(key)

      return {
        ...v,
        price: shouldUpdate && bulkPrice ? Number.parseFloat(bulkPrice) : v.price,
        stock: shouldUpdate && bulkStock ? Number.parseInt(bulkStock) : v.stock,
      }
    })

    updateFormData({ variants: newVariants })
    setBulkPrice("")
    setBulkStock("")
  }

  const handleDeleteVariant = (index: number) => {
    const variant = variants[index]
    if (confirm(`Delete variant ${variant.color} / ${variant.size}?`)) {
      // This would require more complex logic to remove from colors/sizes
      // For now, just remove from variants
      const newVariants = variants.filter((_, i) => i !== index)
      updateFormData({ variants: newVariants })
    }
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
    
  //   // ✅ Convert back to backend format when saving
  //   updateFormData({ 
  //     variants,
  //     selectedColors: colors.map(c => ({
  //       id: c.id,
  //       name: c.name,
  //       code: c.hex  // ✅ Map 'hex' back to 'code'
  //     })),
  //     selectedSizes: sizes.map(s => ({
  //       id: s.id,
  //       size: s.value  // ✅ Map 'value' back to 'size'
  //     }))
  //   })
    
  //   onNext()
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. Prepare data for submission, converting internal state back to API format
    const stepTwoData: Partial<FormData> = {
        variants: variants, // Use the latest generated variants
        selectedColors: colors.map(c => ({
            // Keep the id, name, and map 'hex' back to 'code'
            id: c.id,
            name: c.name,
            code: c.hex, 
            // NOTE: You might need to add other required fields from the parent's Color type here (e.g., createdAt/updatedAt)
        })),
        selectedSizes: sizes.map(s => ({
            // Keep the id, and map 'value' back to 'size'
            id: s.id,
            size: s.value, 
            // NOTE: You might need to add other required fields (e.g., sizeChartUrl)
        })),
    };
    
    // 2. Call the parent handler, passing the collected data
    // The parent will call updateFormData and saveProduct
    await onNext(stepTwoData) // 🔥 FIX: Now passes the required data object.
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Variants & Inventory</h2>
        <p className="text-sm text-muted-foreground">Configure product colors, sizes, and inventory details</p>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-medium">Colors</Label>

        {/* Selected Colors */}
        {colors.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div key={color.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background">
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.hex }} />
                <span className="text-sm font-medium">{color.name}</span>
                <button type="button" onClick={() => handleRemoveColor(color.id)} className="hover:text-destructive">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Color */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Color name (e.g., Navy Blue, Forest Green)"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddColor()
                }
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-10 h-10 rounded border cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              className="w-24 font-mono text-xs"
              placeholder="#000000"
            />
          </div>
          <Button type="button" onClick={handleAddColor} variant="outline" size="default">
            <Plus className="h-4 w-4 mr-2" />
            Add Color
          </Button>
        </div>
      </div>

      <div className="border-t" />

      <div className="space-y-4">
        <Label className="text-base font-medium">Sizes</Label>

        {/* Selected Sizes */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <div key={size.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background">
                <span className="text-sm font-medium">{size.value}</span>
                <button type="button" onClick={() => handleRemoveSize(size.id)} className="hover:text-destructive">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Size */}
        <div className="flex gap-3">
          <Input
            placeholder="Size (e.g., S, M, L, 32, 10.5)"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddSize()
              }
            }}
            className="flex-1"
          />
          <Button type="button" onClick={handleAddSize} variant="outline" size="default">
            <Plus className="h-4 w-4 mr-2" />
            Add Size
          </Button>
        </div>
      </div>

      <div className="border-t" />

      {variants.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Variant Details ({variants.length} variants)</Label>
          </div>

          {/* Bulk Actions */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="text-sm font-medium">Bulk Actions</div>
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[140px]">
                <Label className="text-xs text-muted-foreground mb-1.5">Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={bulkPrice}
                  onChange={(e) => setBulkPrice(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[140px]">
                <Label className="text-xs text-muted-foreground mb-1.5">Stock</Label>
                <Input type="number" placeholder="0" value={bulkStock} onChange={(e) => setBulkStock(e.target.value)} />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="applyTo"
                    checked={applyTo === "all"}
                    onChange={() => setApplyTo("all")}
                    className="w-4 h-4"
                  />
                  All variants
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="applyTo"
                    checked={applyTo === "selected"}
                    onChange={() => setApplyTo("selected")}
                    className="w-4 h-4"
                  />
                  Selected ({selectedVariants.size})
                </label>
              </div>
              <Button type="button" onClick={handleApplyBulk} disabled={!bulkPrice && !bulkStock}>
                Apply
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox checked={selectedVariants.size === variants.length} onCheckedChange={handleToggleAll} />
                  </TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="w-32">Price ($)</TableHead>
                  <TableHead className="w-28">Stock</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variants.map((variant, index) => {
                  const key = variantKeys[index]
                  return (
                    <TableRow key={key}>
                      <TableCell>
                        <Checkbox
                          checked={selectedVariants.has(key)}
                          onCheckedChange={() => handleToggleVariant(key)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border flex-shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                          <span className="font-medium">
                            {variant.color} / {variant.size}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={variant.sku}
                          onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                          className="font-mono text-xs"
                        />
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
                          value={variant.stock || ""}
                          onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                          placeholder="0"
                          min="0"
                        />
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
