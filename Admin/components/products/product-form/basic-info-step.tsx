"use client"

import type React from "react"
import { ArrowRight } from "lucide-react" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { FormData } from "@/components/products/product-form"
import { CategorySelector } from "@/components/products/product-form/components/category-selector"
import { CompanySelector } from "./components/company-selector"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

type BasicInfoStepProps = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: (values: Partial<FormData>) => Promise<void>
  // Add these props for pre-population
  subcategoryItemId?: string
  subcategoryItemChildId?: string | null
   companyId?: string
}

export function BasicInfoStep({ 
  formData, 
  updateFormData, 
  onNext,
  subcategoryItemId,
  subcategoryItemChildId,
  companyId
}: BasicInfoStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.category || !formData.description || !formData.companyId) {
      alert("Please fill in all required fields (Name, Company, Category, Description).")
      return
    }

    // Extract and pass data collected in this step
    const stepOneData: Partial<FormData> = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      companyId: formData.companyId,
    }
    
    // Call the parent handler
    onNext(stepOneData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <p className="text-sm text-muted-foreground mb-6">Start with the essential details about your product</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Product Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="e.g., Classic Cotton T-Shirt"
          required
        />
      </div>

      <CompanySelector
        value={formData.companyId}
        onSelect={(company) => updateFormData({ 
          companyId: company.id,
          companyName: company.name
        })}
        companyId={companyId}
      />

      <CategorySelector
        value={formData.category}
        onSelect={(category) => updateFormData({ 
          category: category.fullPath,  // Human-readable path for display
          categoryId: category.id       // ⭐ Most granular ID for API
        })}
        subcategoryItemId={subcategoryItemId}
        subcategoryItemChildId={subcategoryItemChildId}
      />

      <div className="space-y-2">
        <Label htmlFor="description">
          Brief Description<span className="text-destructive">*</span>
        </Label>
        <RichTextEditor
          id="description"
          value={formData.description}
          onChange={(value) => updateFormData({ description: value })}
          placeholder="Describe your product's key features and benefits..."
          minHeight="150px"
        />
        <p className="text-xs text-muted-foreground">Keep it concise - detailed specifications can be added later</p>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}