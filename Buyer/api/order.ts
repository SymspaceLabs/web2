export const fetchOrderById = async (id:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch order data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * Fetches orders for a specific user with pagination.
 * @param {string} userId - The ID of the user whose orders are to be fetched.
 * @param {number} page - The current page number for pagination.
 * @param {number} limit - The number of orders per page.
 * @returns {Promise<{data: Array, totalPages: number}>} A promise that resolves to an object
 * containing the array of orders and the total number of pages.
 * @throws {Error} If the network request fails or the server responds with an error.
 */
export async function fetchUserOrders(
  userId: string | undefined,
  page: number,
  limit: number
) {
  if (!userId) {
    console.warn("No user ID provided to fetch orders.");
    return { data: [], totalPages: 1 };
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/user/${userId}?page=${page}&limit=${limit}`;
    
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }

    const responseData = await res.json();

    return {
      data: responseData.data || [],
      totalPages: responseData.totalPages || 1,
    };
  } catch (error) {
    console.error("Failed to fetch orders in API service:", error);
    throw error;
  }
}
