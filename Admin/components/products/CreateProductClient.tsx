"use client"

import { ProductForm } from "@/components/products/product-form"
import { ProtectedLayout } from "@/components/protected-layout"

export function CreateProductClient() {
  return (
    <ProtectedLayout>
      <ProductForm />
    </ProtectedLayout>
  )
}