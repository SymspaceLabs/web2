// app/products/edit/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { ProductForm } from "@/components/products/product-form"
import { ProtectedLayout } from "@/components/protected-layout"
import { getProduct } from "@/api/product"
import { Product } from "@/types/product"

export default function EditProductClient() {
  const params = useParams()
  const searchParams = useSearchParams()
  const productId = params.id as string
  const initialStep = parseInt(searchParams.get('step') || '1', 10)
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true);

  // Fetch product initially
  useEffect(() => {
    loadProduct()
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await getProduct(productId)
      setProduct(data)
      console.log('✅ Product loaded:', data)
    } catch (error) {
      console.error('Failed to load product:', error)
    } finally {
      setLoading(false)
    }
  }

    // ✅ THIS IS THE CRITICAL FIX: Refetch handler
  const handleStepChange = async (): Promise<Product | void> => {
    console.log('🔄 Refetching product after step change...')
    try {
      const freshData = await getProduct(productId)
      console.log('✅ Fresh product data fetched:', freshData)
      
      // Update local state
      setProduct(freshData)
      
      // Return fresh data for ProductForm to use
      return freshData
    } catch (error) {
      console.error('❌ Failed to refetch product:', error)
    }
  }

  // useEffect(() => {
  //   async function loadProduct() {
  //     try {
  //       const data = await getProduct(productId)
  //       setProduct(data)
  //     } catch (error) {
  //       console.error('Failed to load product:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   loadProduct()
  // }, [productId])

  if (loading) return <div>Loading...</div>

  return (
    <ProtectedLayout>
      <ProductForm 
        product={product} 
        initialStep={initialStep}
        onStepChange={handleStepChange}
      />
    </ProtectedLayout>
  )
}