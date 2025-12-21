// services/companyService.js

/**
 * Fetches company data by slug from the backend API.
 * This is required for loading company data in the company page.
 * @param {string} slug - The slug of the company to fetch.
 * @returns {Promise<Object>} A promise that resolves to the company data.
 */
export const fetchCompanyBySlug = async (slug) => {
    console.log(`[API CALL] Fetching company by slug: ${slug}`);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/slug/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch company by slug");
        return await response.json();
    } catch (error) {
        console.error("Error fetching company by slug:", error);
        // Re-throw to allow the calling component to handle it.
        throw error; 
    }
};
