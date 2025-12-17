"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BasicInfoStep } from "@/components/products/product-form/basic-info-step"
import { VariantsStep } from "@/components/products/product-form/variants-step"
import { MediaStep } from "@/components/products/product-form/media-step"
import { ReviewStep } from "@/components/products/product-form/review-step"
import { updateProduct, createProduct } from "@/api/product"

// ✅ Import shared types instead of redefining them
import type { Product, FormData } from "@/types/product"

type ProductFormProps = {
  product?: Product
  initialStep?: number  // ✅ NEW: Support starting at different steps
  onStepChange?: () => Promise<Product | void> // ✅ NEW: Add this prop
}

// Re-export FormData for other components that import it from here
export type { FormData }

export function ProductForm({ product, initialStep = 1, onStepChange  }: ProductFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(initialStep)  // ✅ Use initialStep
  const [loading, setLoading] = useState(false)

  const isCreateMode = !product  // ✅ Clear flag to determine mode

  // Helper to normalize category to string
  const normalizeCategoryToString = (category: any): string => {
    if (!category) return ""
    if (typeof category === 'string') return category
    if (typeof category === 'object') {
      return category.fullPath || category.name || category.code || ""
    }
    return String(category)
  }

  const [formData, setFormData] = useState<FormData>({
    name: product?.name || "",
    companyId: product?.company?.id || "",  
    companyName: product?.company?.entityName || "",
    category: normalizeCategoryToString(product?.category),
    description: product?.description || "",
    selectedColors: product?.colors || [],
    selectedSizes: product?.sizes || [],
    variants: product?.variants || [],
    images: product?.images?.map((img, i) => ({
      id: img.id || `img_init_${i}`,
      url: img.url,
      colorId: img.colorId || null,
      isPrimary: i === 0,
      sortOrder: img.sortOrder ?? i
    })) || [],
    model3d: undefined,
  })

  const steps = [
    { number: 1, name: "Basic Info" },
    { number: 2, name: "Variants & Inventory" },
    { number: 3, name: "Media" },
    { number: 4, name: "Review & Publish" },
  ]

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('main.overflow-auto')
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const updateFormData = (data: Partial<FormData>) => {
    if (data.category !== undefined) {
      data.category = normalizeCategoryToString(data.category)
    }
    setFormData(prev => ({ ...prev, ...data }))
  }

  const buildPayload = (
    step: number,
    data: FormData,
    isFinalSubmission: boolean,
    finalStatus: "active" | "draft" | "archived" = "draft"
  ) => {
    const colorsForApi = data.selectedColors.map(color => ({
      name: color.name,
      code: color.code,
    }))
    const sizesForApi = data.selectedSizes.map(size => ({
      size: size.size,
      sizeChartUrl: size.sizeChartUrl || null,
    }))
    // ✅ Build a lookup map: colorId -> colorCode
    const colorCodeMap = new Map<string, string>()
    data.selectedColors.forEach(color => {
      colorCodeMap.set(color.id, color.code)
    })
    const imagesForApi = data.images.map(img => ({
      url: img.url,
      colorId: img.colorId ?? null,
      colorCode: img.colorId ? colorCodeMap.get(img.colorId) ?? null : null
    }))

    let payload: any = { status: isFinalSubmission ? finalStatus : "draft" }

    if (step === 1) {
      payload = {
        name: data.name,
        description: data.description,
        company: data.companyId,
        // ⭐ Send the most granular category ID to the backend
        ...(data.categoryId && { subcategoryItem: data.categoryId })
      }
    } else if (step === 2) {
      payload = {
        colors: colorsForApi,
        sizes: sizesForApi,
      }
    } else if (step === 3) {
      payload = {
        images: imagesForApi,
        model3d: data.model3d,
      }
    } else if (step === 4 && isFinalSubmission) {
      payload = {
        status: finalStatus
      }
    }

    return payload
  }

  // ✅ CRITICAL FIX: Map old color IDs to new ones after refetch
  const handleNext = async (values: Partial<FormData>) => {
    setLoading(true)
    try {
      
      // Merge the new values with existing formData
      const updatedFormData = { ...formData, ...values }
      
      
      // Update the state for UI consistency
      updateFormData(values)

      if (isCreateMode && currentStep === 1) {
        // CREATE MODE: First step creates product and routes to edit page
        const createPayload = buildPayload(1, updatedFormData, false)
        const response = await createProduct(createPayload)
        
        
        // Route to edit page with step 2
        router.push(`/products/edit/${response.id}?step=2`)
        
      } else if (!isCreateMode) {
        // EDIT MODE: Update existing product
        const payload = buildPayload(currentStep, updatedFormData, false)
        
        await updateProduct(product.id, payload)
        
        
        // ✅ CRITICAL FIX: Refetch product data to get fresh IDs
        if (onStepChange) {
          const freshProduct = await onStepChange()
          
          
          if (freshProduct) {
            // ✅ Update formData with fresh API data (real database IDs)
            const updates: Partial<FormData> = {}
            
            // ✅ STEP 2 → 3: Map old temporary color IDs to new database IDs
            if (freshProduct.colors && currentStep === 2) {
              
              // Build mapping: old temp ID → new UUID
              const colorMapping = new Map<string, string>()
              
              // Match by name and code since temp IDs won't match
              formData.selectedColors.forEach(oldColor => {
                
                const matchingNewColor = freshProduct.colors.find(
                  newColor => newColor.name === oldColor.name && newColor.code === oldColor.code
                )
                
                if (matchingNewColor) {
                  colorMapping.set(oldColor.id, matchingNewColor.id)
                } else {
                }
              })
              
              
              // Update colors with real IDs
              updates.selectedColors = freshProduct.colors
              
              // ✅ CRITICAL: Remap existing images to use new color IDs
              if (formData.images.length > 0) {
                updates.images = formData.images.map(img => {
                  if (img.colorId && colorMapping.has(img.colorId)) {
                    const newColorId = colorMapping.get(img.colorId)!
                    return { ...img, colorId: newColorId }
                  } else {
                    return img
                  }
                })
              }
            }
            
            // Sync sizes
            if (freshProduct.sizes && currentStep === 2) {
              updates.selectedSizes = freshProduct.sizes
            }
            
            // Sync images from API (Step 3 only)
            if (freshProduct.images && currentStep === 3) {
              updates.images = freshProduct.images.map((img, i) => ({
                id: img.id,
                url: img.url,
                colorId: img.colorId || null,
                isPrimary: img.isPrimary ?? (i === 0),
                sortOrder: img.sortOrder ?? i
              }))
            }
            
            // Apply all updates at once
            if (Object.keys(updates).length > 0) {
              updateFormData(updates)
            } else {
            }
          } else {
          }
        } else {
        }
        
        if (currentStep < 4) {
          const nextStep = currentStep + 1
          // Update URL with new step
          router.push(`/products/edit/${product.id}?step=${nextStep}`)
          setCurrentStep(nextStep)
        }
      }

      scrollToTop()
    } catch (error) {
      console.error("❌ Next step failed:", error)
    } finally {
      setLoading(false)
    }
  }


  // ✅ UPDATED: Back button with proper URL updates
  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      
      // ✅ Update URL when going back (only in edit mode)
      if (!isCreateMode && product?.id) {
        router.push(`/products/edit/${product.id}?step=${prevStep}`)
      }
      
      scrollToTop()
    } else {
      // Going back from step 1 returns to products list
      router.push("/products")
    }
  }

  // ✅ UPDATED: Final submission
  const handleSubmit = async (isDraft: boolean) => {
    const finalStatus = isDraft ? "draft" : "active"
    setLoading(true)

    try {
      if (!isCreateMode && product?.id) {
        const payload = buildPayload(4, formData, true, finalStatus as "active" | "draft" | "archived")
        await updateProduct(product.id, payload)
        
      }
      
      router.push("/products")
    } catch (error) {
      console.error("Final submission failed:", error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ UPDATED: Jump to step with URL update
  const jumpToStep = async (step: number) => {
    setLoading(true)
    try {
      // Save current progress before jumping
      if (!isCreateMode && product?.id) {
        const payload = buildPayload(currentStep, formData, false)
        await updateProduct(product.id, payload)
      }
      
      setCurrentStep(step)
      
      // Update URL
      if (!isCreateMode && product?.id) {
        router.push(`/products/edit/${product.id}?step=${step}`)
      }
      
      scrollToTop()
    } catch (error) {
      console.error("Jump to step failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen bg-background ${loading ? 'pointer-events-none opacity-70' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/products")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {product ? "Edit Product" : "Create New Product"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {product ? "Update your product details" : "Add a new product to your catalog"}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep > step.number
                        ? "bg-primary border-primary text-primary-foreground"
                        : currentStep === step.number
                          ? "border-primary text-primary"
                          : "border-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.number}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium text-center ${
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors ${
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {currentStep === 1 && (
              <BasicInfoStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                subcategoryItemId={product?.subcategoryItemId}
                subcategoryItemChildId={product?.subcategoryItemChildId}
                companyId={product?.company?.id}
              />
            )}
            {currentStep === 2 && (
              <VariantsStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <MediaStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 4 && (
              <ReviewStep
                formData={formData}
                onBack={handleBack}
                onSubmit={handleSubmit}
                jumpToStep={jumpToStep}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}