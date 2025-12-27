// BasicInfoStep.tsx
"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { ArrowRight } from "lucide-react" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import type { FormData } from "@/components/products/product-form"
import { CategorySelector } from "@/components/products/product-form/components/category-selector"
import { CompanySelector } from "./components/company-selector"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { useCategoryLogic } from "@/hooks/useCategoryLogic"
import { useCategoryTags } from "@/hooks/useCategoryTags"
import { CategoryTagsRenderer } from "./components/category-tags-renderer"

// ✅ Import tag options (these should come from constants)
import { ageGroups, genders } from "@/utils/tag.utils"

type BasicInfoStepProps = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: (values: Partial<FormData>) => Promise<void>
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
  
  const [subcategoryDetails, setSubcategoryDetails] = useState(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // ✅ Stable callbacks
  const stableSetFieldValue = useCallback((name: string, value: any) => {
    updateFormData({ [name]: value });
  }, [updateFormData]);

  // ✅ Use category logic hook
  const {
    handleCategorySelect,
    selectedCategory,
    subcategoryDetails: currentSubcategoryDetails
  } = useCategoryLogic(
    {
      category_slug: formData.category,
      subcategoryItem: subcategoryItemId ? { 
        slug: subcategoryItemId,
        path: formData.category 
      } : undefined
    },
    stableSetFieldValue,
    setIsCategoryLoading,
    setSubcategoryDetails,
    ageGroups,
    genders,
    formData
  );

  // ✅ Use category tags hook
  const {
    tags,
    hasRequiredTags,
    validateTags
  } = useCategoryTags({
    subcategoryDetails: currentSubcategoryDetails,
    ageGroups,
    genders
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous validation errors
    setValidationErrors({})

    // Validate basic fields
    if (!formData.name || !formData.category || !formData.description || !formData.companyId) {
      alert("Please fill in all required fields (Name, Company, Category, Description).")
      return
    }

    // ✅ Validate category tags if they exist
    if (hasRequiredTags) {
      const { isValid, errors } = validateTags(formData)
      
      if (!isValid) {
        setValidationErrors(errors)
        
        // Scroll to tags section
        const tagsSection = document.getElementById('category-tags-section')
        if (tagsSection) {
          tagsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
        return
      }
    }

    // ✅ Prepare step data
    const stepOneData: Partial<FormData> = {
      name: formData.name,
      category: formData.category,
      categoryId: formData.categoryId,
      description: formData.description,
      companyId: formData.companyId,
      companyName: formData.companyName,
      // ✅ Include all tag values
      ...(hasRequiredTags ? {
        age_group: formData.age_group,
        gender: formData.gender,
        // Add other dynamic tags as needed
      } : {})
    }
    
    onNext(stepOneData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Start with the essential details about your product
        </p>
      </div>

      {/* Product Name */}
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

      {/* Company Selector */}
      <CompanySelector
        value={formData.companyId}
        onSelect={(company) => updateFormData({ 
          companyId: company.id,
          companyName: company.name
        })}
        companyId={companyId}
      />

      {/* Category Selector */}
      <CategorySelector
        value={formData.category}
        onSelect={(category) => {
          updateFormData({ 
            category: category.fullPath,
            categoryId: category.id
          });
          handleCategorySelect(category);
        }}
        subcategoryItemId={subcategoryItemId}
        subcategoryItemChildId={subcategoryItemChildId}
      />

      {/* ✅ Loading State */}
      {isCategoryLoading && (
        <Alert>
          <AlertDescription>Loading category requirements...</AlertDescription>
        </Alert>
      )}

      {/* ✅ Dynamic Category Tags Section */}
      {hasRequiredTags && !isCategoryLoading && (
        <div id="category-tags-section" className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Category Requirements</h3>
            <Badge variant="destructive" className="text-xs">
              Required
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground">
            The selected category requires the following information
          </p>

          {/* ✅ Render tags dynamically */}
          <CategoryTagsRenderer
            tags={tags}
            values={formData}
            errors={validationErrors}
            onChange={(tagKey, value) => updateFormData({ [tagKey]: value })}
          />
        </div>
      )}

      {/* Description */}
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
        <p className="text-xs text-muted-foreground">
          Keep it concise - detailed specifications can be added later
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isCategoryLoading}>
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}