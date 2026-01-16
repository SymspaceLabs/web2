"use client"

// ====================================================================
// Company Details
// ====================================================================

import Section1 from "../section-1";
import Section2 from "../section-2";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { fetchCompanyBySlug } from "@/services/companyService";
import { useTitle } from "@/contexts/TitleContext"; // 1. Import the hook

// ====================================================================

export default function CompanyPageView({ slug }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setTitle } = useTitle(); // 2. Initialize setTitle

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const data = await fetchCompanyBySlug(slug);
        setCompany(data); 
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [slug]);

  // 3. Update the Tab Title once company data exists
  useEffect(() => {
    if (company && company.entityName) {
      setTitle(`${company.entityName} - Symspace Marketplace`);
    }
  }, [company, setTitle]);

  if (loading) {
    return (
      <div className="bg-white flex justify-center items-center min-h-[400px]">
        <CircularProgress />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="bg-white p-4">
        <p>Unable to load company details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Section1 company={company} />
      <Section2 products={company.products} company={company} />
    </div>
  );
}