"use client"

// ====================================================================
// Company Details
// ====================================================================

import Section1 from "../section-1";
import Section2 from "../section-2";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { fetchCompanyBySlug } from "@/services/companyService";

// ====================================================================

export default function CompanyPageView({ slug }) {

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const data = await fetchCompanyBySlug(slug);
        setCompany(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-white">
        <CircularProgress />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="bg-white">
        <p>Unable to load company details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Section1 company={company} />
      <Section2 products={company.products} company={company}  />
    </div>
  );
}
