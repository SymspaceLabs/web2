// app/sellers/edit/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { SellerForm } from "@/components/sellers/seller-form"
import { ProtectedLayout } from "@/components/protected-layout"
import { getSeller } from "@/api/seller"
import { Seller } from "@/types/seller.types"

export default function EditSellerPage() {
  const params = useParams()
  const sellerId = params.id as string
  
  const [seller, setSeller] = useState<Seller>()
  const [loading, setLoading] = useState(true)

  // Fetch seller initially
  useEffect(() => {
    loadSeller()
  }, [sellerId])

  const loadSeller = async () => {
    try {
      setLoading(true)
      const data = await getSeller(sellerId)
      setSeller(data)
    } catch (error) {
      console.error('Failed to load seller:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Refetch handler for real-time updates after save
  const handleSellerUpdate = async (): Promise<Seller | void> => {
    try {
      const freshData = await getSeller(sellerId)
      
      // Update local state
      setSeller(freshData)
      
      // Return fresh data for SellerForm to use
      return freshData
    } catch (error) {
      console.error('❌ Failed to refetch seller:', error)
    }
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading seller...</p>
        </div>
      </ProtectedLayout>
    )
  }

  if (!seller) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-destructive">Seller not found</p>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <SellerForm 
        seller={seller}
        onSellerUpdate={handleSellerUpdate}
      />
    </ProtectedLayout>
  )
}