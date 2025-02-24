/**
 * CompanyPageView Component
 *
 * This component fetches and displays company details based on the provided slug.
 * It uses two main sections:
 * - Section1: Displays general company information.
 * - Section2: Displays a list of the company's products.
 *
 * @param {Object} props - Component properties
 * @param {string} props.slug - Unique identifier for the company to fetch details
 *
 * @returns {JSX.Element} Rendered company page view
 */

import Section2 from "../section-2";
import Section1 from "../section-1";

export default async function CompanyPageView({ slug }) {
  /**
   * Fetches company details from the backend using the provided slug.
   *
   * @param {string} slug - Unique identifier for the company
   * @returns {Object|null} Company details or null if fetching fails
   */
  const fetchCompanyDetails = async (slug) => {
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
      return data; // Successfully fetched data
    } catch (error) {
      console.error("Error fetching company details:", error);
      return null; // Fallback in case of an error
    }
  };

  // Fetch company details
  const company = await fetchCompanyDetails(slug);

  if (!company) {
    // Handle case when company data is not available
    return (
      <div className="bg-white">
        <p>Unable to load company details. Please try again later.</p>
      </div>
    );
  }

  // Log products for debugging purposes
  console.log(company.products);

  return (
    <div className="bg-white">
      <Section1 company={company} />
      <Section2 products={company.products} />
    </div>
  );
}
