// app/company/[slug]/company-details-page.tsx
"use client"

import Section1 from "./section-1"
import Section2 from "./section-2";
import { Loader2 } from "lucide-react"
import { Company } from "@/types/company"
import { useEffect, useState } from "react"

// ====================================================================
// Type Definitions
// ====================================================================

interface CompanyDetailsPageProps {
  slug: string
}

// ====================================================================
// Main Component
// ====================================================================

export default function CompanyDetailsPage({ slug }: CompanyDetailsPageProps) {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true)
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/slug/${slug}`
        const response = await fetch(url)
        
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Company not found (${response.status}): ${errorText}`)
        }
        
        const data: Company = await response.json()
        setCompany(data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching company details:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyDetails()
  }, [slug])

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="size-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading company details...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error || !company) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Company Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            {error || "Unable to load company details. Please try again later."}
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    )
  }

  // Success State - Render Company Details
  return (
    <div className="bg-white">
      <Section1 company={company} />
      <Section2 products={company.products} company={company} />
    </div>
  )
}