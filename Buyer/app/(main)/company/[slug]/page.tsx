// app/company/[slug]/page.tsx
// Server Component - Handles routing and metadata

import { Metadata } from "next"
import CompanyDetailsPage from "./company-details"
import { Company } from "@/types/company"
// ====================================================================
// Type Definitions
// ====================================================================

interface CompanyPageProps {
  params: {
    slug: string
  }
}

// ====================================================================
// Data Fetching Function
// ====================================================================

async function fetchCompanyBySlug(slug: string): Promise<Company | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/slug/${slug}`
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      return null
    }
    
    return response.json()
  } catch (error) {
    console.error("Error fetching company:", error)
    return null
  }
}

// ====================================================================
// Metadata Generation (Server-side)
// ====================================================================

export async function generateMetadata({ 
  params 
}: CompanyPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const company = await fetchCompanyBySlug(slug)
    
    if (!company) {
      return {
        title: "Company Not Found",
        description: "The company you're looking for could not be found."
      }
    }

    return {
      title: `${company.entityName} - Symspace Marketplace`,
      description: `Discover and Augment ${company.entityName} like never before. View with AR for more convenience and confidence when shopping - only on Symspace.`,
      openGraph: {
        title: `${company.entityName} - Symspace Marketplace`,
        description: `Shop ${company.entityName} products with AR visualization`,
        images: company.logo ? [company.logo] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${company.entityName} - Symspace Marketplace`,
        description: `Shop ${company.entityName} products with AR visualization`,
      }
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Symspace Marketplace",
      description: "Shop with AR visualization"
    }
  }
}

// ====================================================================
// Main Page Component - Just passes slug to CompanyDetailsPage
// ====================================================================

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params
  return <CompanyDetailsPage slug={slug} />
}

// ====================================================================
// Optional: Generate static paths at build time
// ====================================================================

export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies`)
    const companies: Company[] = await response.json()
    
    return companies.map((company) => ({
      slug: company.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}