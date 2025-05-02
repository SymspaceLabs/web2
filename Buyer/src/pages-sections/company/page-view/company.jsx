"use client"

// ====================================================================
// Company Details Page Sections
// ====================================================================

import Section2 from "../section-2";
import Section1 from "../section-1";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function CompanyPageView({ slug }) {

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/slug/${slug}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch company details");
        }

        const data = await response.json();
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
      <Section2 products={company.products} />
    </div>
  );
}
