// GLOBAL CUSTOM COMPONENTS

import Section2 from "../section-2";
import Section1 from "../section-1";

export default async function FurnitureOnePageView({slug}) {

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
      return data;
    } catch (error) {
      console.error("Error fetching company details:", error);
      return null; // Fallback in case of an error
    }
  };

  // Fetch company details
  const company = await fetchCompanyDetails(slug);
  console.log(company.products);

  return (
    <div className="bg-white">
      <Section1 company={company} />
      <Section2 products={company.products} />
    </div>
  )
}