// product-form/index.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { MediaStep } from "@/components/products/product-form/media-step"
import { ReviewStep } from "@/components/products/product-form/review-step"
import { VariantsStep } from "@/components/products/product-form/variants-step"
import { BasicInfoStep } from "@/components/products/product-form/basic-info-step"
import { updateProduct, createProduct, updateProductVariants } from "@/api/product"

// ✅ Import shared types
import type { Product, FormData } from "@/types/product.type"
import { toast } from "sonner"

// ✅ Import optimized thumbnail utilities
import { 
  saveThumbnailToBackend, 
  uploadNewThumbnail, 
  transformApiImagesToFormImages 
} from "@/utils/thumbnail.utils"

type ProductFormProps = {
  product?: Product
  initialStep?: number
  onStepChange?: () => Promise<Product | void>
}

// Re-export FormData for other components
export type { FormData }

// ✅ Helper function to transform API variants to form variants
const transformApiVariantsToFormVariants = (apiVariants: any[]) => {
  return apiVariants
    .filter(v => v.color && v.size)
    .map(v => ({
      id: v.id,
      color: v.color.name,
      size: v.size.size,
      sku: v.sku,
      stock: v.stock || 0,
      price: v.price || 0,
      salePrice: v.salePrice || 0,
      cost: v.cost || 0,
      colorHex: v.color.code
    }))
}

export function ProductForm({ product, initialStep = 1, onStepChange }: ProductFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [loading, setLoading] = useState(false)

  const isCreateMode = !product

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
    
    // ✅ Standard tags
    gender: typeof product?.gender === 'string' ? product.gender : '',
    age_group: product?.age_group || '',
    
    // ✅ NEW: Include ALL optional tag fields from API
    season: product?.season || '',
    occasion: product?.occasion || '',
    indoor_outdoor: product?.indoor_outdoor || '',
    shape: product?.shape || '',
    pattern: product?.pattern || '',
    pile_height: product?.pile_height || '',
    style: product?.style || '',
    room_type: product?.room_type || '',
    washable: product?.washable ?? false, // Boolean field
    non_slip: product?.non_slip ?? false,
    
    // ✅ Colors, sizes, material
    selectedColors: product?.colors || [],
    selectedSizes: product?.sizes || [],
    material: product?.material || "",
    
    // ✅ Variants
    variants: product?.variants ? transformApiVariantsToFormVariants(product.variants) : [],
    
    // ✅ Images
    images: product?.images ? transformApiImagesToFormImages(product.images) : [],
    
    // ✅ 3D Models
    models: product?.threeDModels?.map((model, i) => {
      const matchingColor = product?.colors?.find(c => c.code === model.colorCode);
      return {
        id: model.id || `model_init_${i}`,
        colorId: matchingColor?.id || null,
        url: model.url,
        fileName: model.url.split('/').pop() || `model_${i}.glb`,
        fileSize: 0,
      };
    }) || [],
    model3d: undefined
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
    // Build a lookup map: colorId -> colorCode
    const colorCodeMap = new Map<string, string>()
    data.selectedColors.forEach(color => {
      colorCodeMap.set(color.id, color.code)
    })

    const imagesForApi = data.images.map(img => ({
      url: img.url,
      colorId: img.colorId ?? null,
      colorCode: img.colorId ? colorCodeMap.get(img.colorId) ?? null : null,
      sortOrder: img.sortOrder,
      isThumbnail: img.isThumbnail ?? false
    }))

    // Build 3D models payload
    const modelsForApi = (data.models || [])
      .filter(model => model.colorId && model.url)
      .map(model => ({
        url: model.url,
        colorId: model.colorId,
        colorCode: model.colorId ? colorCodeMap.get(model.colorId) ?? null : null
      }))
      .filter(model => model.colorCode !== null)

    let payload: any = { status: isFinalSubmission ? finalStatus : "draft" }

    if (step === 1) {
      payload = {
        name: data.name,
        description: data.description,
        company: data.companyId,
        ...(data.categoryId && { subcategoryItem: data.categoryId })
      }
      
      // ✅ Dynamically include ALL tag fields
      const tagFields = [
        'age_group', 'gender', 'season', 'occasion',
        'indoor_outdoor', 'shape', 'pattern', 'pile_height',
        'style', 'room_type', 'washable', 'non_slip', 'material'
      ]
      
      tagFields.forEach(field => {
        const value = data[field]
        
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'boolean') {
            payload[field] = value
          }
          else if (typeof value === 'string' && value.trim() !== '') {
            payload[field] = value
          }
          else if (Array.isArray(value) && value.length > 0) {
            payload[field] = value
          }
        }
      })
    } else if (step === 2) {
      const colorsForApi = data.selectedColors.map(color => ({
        name: color.name,
        code: color.code,
      }))

      const sizesForApi = data.selectedSizes.map(size => ({
        size: size.size,
        dimensions: size.dimensions ? {
          length: size.dimensions.length ? parseFloat(size.dimensions.length) : null,
          width: size.dimensions.width ? parseFloat(size.dimensions.width) : null,
          height: size.dimensions.height ? parseFloat(size.dimensions.height) : null,
          unit: size.dimensions.unit || 'cm'
        } : null,
        sizeChart: size.sizeChartUrl || null,
        productWeight: size.productWeight ? {
          value: size.productWeight.value,
          unit: size.productWeight.unit
        } : null
      }))

      const variantsForApi = data.variants.map(variant => ({
        ...(variant.id && { id: variant.id }),
        colorName: variant.color,
        sizeName: variant.size,
        sku: variant.sku,
        stock: variant.stock,
        price: variant.price > 0 ? variant.price : undefined,
        salePrice: variant.salePrice > 0 ? variant.salePrice : undefined,
        cost: variant.cost > 0 ? variant.cost : undefined,
      }))

      return {
        material: data.material || undefined,
        colors: colorsForApi,
        sizes: sizesForApi,
        variants: variantsForApi,
      }
    } else if (step === 3) {
      return {
        images: imagesForApi,
        threeDModels: modelsForApi.length > 0 ? modelsForApi : undefined,
      }
    } else if (step === 4 && isFinalSubmission) {
      return {
        status: finalStatus,
        images: imagesForApi 
      }
    }

    return payload
  }

  // ✅ OPTIMIZED: Save thumbnail changes immediately
  const handleSaveThumbnail = async (updatedImages: FormData['images']) => {
    if (isCreateMode || !product?.id) {
      updateFormData({ images: updatedImages })
      return
    }

    try {
      await saveThumbnailToBackend(product.id, updatedImages, formData.selectedColors)
      updateFormData({ images: updatedImages })
    } catch (error) {
      console.error('❌ Failed to save thumbnail:', error)
      throw error
    }
  }

  // ✅ OPTIMIZED: Handle new image upload in thumbnail selector
  const handleNewThumbnailUpload = async (file: File) => {
    if (isCreateMode || !product?.id) {
      toast.error("Cannot upload yet", {
        description: "Please save the product first before uploading thumbnail"
      })
      return
    }

    try {
      await uploadNewThumbnail(file, product.id, formData.images, formData.selectedColors)
      
      // Refetch product to get updated images
      if (onStepChange) {
        const freshProduct = await onStepChange()
        if (freshProduct?.images) {
          updateFormData({
            images: transformApiImagesToFormImages(freshProduct.images)
          })
        }
      }
      
      toast.success("Image uploaded", {
        description: "New thumbnail has been set successfully"
      })
    } catch (error) {
      console.error('Failed to upload image:', error)
      toast.error("Upload failed", {
        description: "Failed to upload image. Please try again."
      })
      throw error
    }
  }

  // ✅ Handle next step with color ID remapping
  const handleNext = async (values: Partial<FormData>) => {
    setLoading(true)
    try {
      const updatedFormData = { ...formData, ...values }
      updateFormData(values)

      if (isCreateMode && currentStep === 1) {
        // CREATE MODE: First step creates product and routes to edit page
        const createPayload = buildPayload(1, updatedFormData, false)
        const response = await createProduct(createPayload)       
        router.push(`/products/edit/${response.id}?step=2`)
      } else if (!isCreateMode) {
        // EDIT MODE
        if (currentStep === 2) {
          const variantsPayload = buildPayload(2, updatedFormData, false);
          await updateProductVariants(product.id, variantsPayload);
        } else {
          const payload = buildPayload(currentStep, updatedFormData, false);
          await updateProduct(product.id, payload);
        }     
        
        // Refetch fresh data
        if (onStepChange) {
          const freshProduct = await onStepChange()
          
          if (freshProduct) {
            const updates: Partial<FormData> = {}

            // Update colors with real IDs
            if (freshProduct.colors && currentStep === 2) {
              updates.selectedColors = freshProduct.colors;
            }

            // Update sizes with real IDs
            if (freshProduct.sizes && currentStep === 2) {
              updates.selectedSizes = freshProduct.sizes;
            }

            // Update variants with real IDs
            if (freshProduct.variants && currentStep === 2) {
              updates.variants = transformApiVariantsToFormVariants(freshProduct.variants);
            }

            if (Object.keys(updates).length > 0) {
              updateFormData(updates);
            }
            
            // STEP 2 → 3: Map old temporary color IDs to new database IDs
            if (freshProduct.colors && currentStep === 2) {
              const colorMapping = new Map<string, string>()
              
              formData.selectedColors.forEach(oldColor => {
                const matchingNewColor = freshProduct.colors.find(
                  newColor => newColor.name === oldColor.name && newColor.code === oldColor.code
                )
                
                if (matchingNewColor) {
                  colorMapping.set(oldColor.id, matchingNewColor.id)
                }
              })
              
              updates.selectedColors = freshProduct.colors
              
              // Remap existing images to use new color IDs
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

              // Remap existing 3D models to use new color IDs
              if (formData.models && formData.models.length > 0) {
                updates.models = formData.models.map(model => {
                  if (model.colorId && colorMapping.has(model.colorId)) {
                    const newColorId = colorMapping.get(model.colorId)!
                    return { ...model, colorId: newColorId }
                  } else {
                    return model
                  }
                })
              }
            }
            
            // Sync sizes
            if (freshProduct.sizes && currentStep === 2) {
              updates.selectedSizes = freshProduct.sizes
            }
            
            // Sync images with isThumbnail from API (Step 3)
            if (freshProduct.images && currentStep === 3) {
              updates.images = transformApiImagesToFormImages(freshProduct.images)
            }

            // Sync 3D models from API (Step 3 only)
            if (freshProduct.threeDModels && currentStep === 3) {
              updates.models = freshProduct.threeDModels.map((model, i) => {
                const matchingColor = freshProduct.colors?.find(c => c.code === model.colorCode);
                return {
                  id: model.id || `model_${i}`,
                  colorId: matchingColor?.id || null,
                  url: model.url,
                  fileName: model.url.split('/').pop() || `model_${i}.glb`,
                  fileSize: 0,
                };
              });
            }
            
            // Apply all updates at once
            if (Object.keys(updates).length > 0) {
              updateFormData(updates)
            }
          }
        }
        
        if (currentStep < 4) {
          const nextStep = currentStep + 1
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

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      
      if (!isCreateMode && product?.id) {
        router.push(`/products/edit/${product.id}?step=${prevStep}`)
      }
       
      scrollToTop()
    } else {
      router.push("/products")
    }
  }

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

  const jumpToStep = async (step: number) => {
    setLoading(true)
    try {
      if (!isCreateMode && product?.id) {
        const payload = buildPayload(currentStep, formData, false)
        await updateProduct(product.id, payload)
      }
      
      setCurrentStep(step)
      
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

        <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

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
                updateFormData={updateFormData}
                onSaveThumbnail={handleSaveThumbnail}
                onNewImageUpload={handleNewThumbnailUpload}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}