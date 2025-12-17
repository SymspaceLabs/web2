"use client"

import React from "react"
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
  salePrice: number
  cost: number
  profit: number
  material: string
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
          salePrice: existing?.salePrice || 0,
          cost: existing?.cost || 0,
          profit: existing?.profit || 0,
          material: existing?.material || "",
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
        field === "stock" || field === "profit"
          ? Number.parseInt(value.toString()) || 0
          : field === "price" || field === "salePrice" || field === "cost"
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

  // Group variants by color
  const variantsByColor = variants.reduce((acc, variant) => {
    if (!acc[variant.color]) {
      acc[variant.color] = []
    }
    acc[variant.color].push(variant)
    return acc
  }, {} as Record<string, VariantRow[]>)

  const handleSupermasterChange = (field: keyof VariantRow, value: string) => {
    const newVariants = variants.map(v => ({
      ...v,
      [field]: field === 'stock' || field === 'profit'
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
        [field]: field === 'stock' || field === 'profit'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const stepTwoData: Partial<FormData> = {
        variants: variants,
        selectedColors: colors.map(c => ({
            id: c.id,
            name: c.name,
            code: c.hex, 
        })),
        selectedSizes: sizes.map(s => ({
            id: s.id,
            size: s.value, 
        })),
    };
    
    await onNext(stepTwoData)
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
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox checked={selectedVariants.size === variants.length} onCheckedChange={handleToggleAll} />
                  </TableHead>
                  <TableHead className="min-w-[180px]">Variant</TableHead>
                  <TableHead className="w-28">Price ($)</TableHead>
                  <TableHead className="w-28">Sale Price ($)</TableHead>
                  <TableHead className="w-24">Stock</TableHead>
                  <TableHead className="w-28">Cost ($)</TableHead>
                  <TableHead className="w-24">Profit (%)</TableHead>
                  <TableHead className="min-w-[150px]">Material</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Supermaster Row */}
                <TableRow className="bg-primary/5 hover:bg-primary/10 border-b-2">
                  <TableCell>
                    <Checkbox 
                      checked={selectedVariants.size === variants.length} 
                      onCheckedChange={handleToggleAll} 
                    />
                  </TableCell>
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
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Set all"
                      onChange={(e) => handleSupermasterChange('profit', e.target.value)}
                      className="bg-background"
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Set all materials"
                      onChange={(e) => handleSupermasterChange('material', e.target.value)}
                      className="bg-background"
                    />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>

                {/* Color Groups */}
                {Object.entries(variantsByColor).map(([colorName, colorVariants]) => {
                  const colorHex = colorVariants[0]?.colorHex || '#000000'
                  return (
                    <React.Fragment key={colorName}>
                      {/* Color Master Row */}
                      <TableRow className="bg-muted/50 hover:bg-muted/70 border-b">
                        <TableCell>
                          <Checkbox 
                            checked={colorVariants.every(v => selectedVariants.has(`${v.color}-${v.size}`))}
                            onCheckedChange={(checked) => {
                              const newSelected = new Set(selectedVariants)
                              colorVariants.forEach(v => {
                                const key = `${v.color}-${v.size}`
                                if (checked) {
                                  newSelected.add(key)
                                } else {
                                  newSelected.delete(key)
                                }
                              })
                              setSelectedVariants(newSelected)
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border flex-shrink-0"
                              style={{ backgroundColor: colorHex }}
                            />
                            <span className="font-semibold text-sm">{colorName}</span>
                            <span className="text-xs text-muted-foreground">({colorVariants.length})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Set price"
                            onChange={(e) => handleColorMasterChange(colorName, 'price', e.target.value)}
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
                            className="bg-background"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="Set stock"
                            onChange={(e) => handleColorMasterChange(colorName, 'stock', e.target.value)}
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
                            className="bg-background"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="Set profit"
                            onChange={(e) => handleColorMasterChange(colorName, 'profit', e.target.value)}
                            className="bg-background"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Set material"
                            onChange={(e) => handleColorMasterChange(colorName, 'material', e.target.value)}
                            className="bg-background"
                          />
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>

                      {/* Individual Variant Rows */}
                      {colorVariants.map((variant) => {
                        const key = `${variant.color}-${variant.size}`
                        const index = variants.findIndex(v => v.color === variant.color && v.size === variant.size)
                        return (
                          <TableRow key={key} className="hover:bg-muted/30">
                            <TableCell className="pl-8">
                              <Checkbox
                                checked={selectedVariants.has(key)}
                                onCheckedChange={() => handleToggleVariant(key)}
                              />
                            </TableCell>
                            <TableCell className="pl-8">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">└</span>
                                <div>
                                  <div className="font-medium text-sm">{variant.size}</div>
                                  <div className="text-xs text-muted-foreground font-mono">{variant.sku}</div>
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
                            <TableCell>
                              <Input
                                type="number"
                                value={variant.profit || ""}
                                onChange={(e) => handleVariantChange(index, "profit", e.target.value)}
                                placeholder="0"
                                min="0"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={variant.material || ""}
                                onChange={(e) => handleVariantChange(index, "material", e.target.value)}
                                placeholder="e.g., Cotton, Polyester"
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