export const fetchOrderById = async (id) => {
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
export async function fetchUserOrders(userId, page, limit) {
  if (!userId) {
    // Return empty data if no user ID is provided, as no orders can be fetched.
    console.warn("No user ID provided to fetch orders.");
    return { data: [], totalPages: 1 };
  }

  try {
    // Construct the API URL using environment variable and pagination parameters.
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/user/${userId}?page=${page}&limit=${limit}`;

    // Perform the fetch request to the backend.
    const res = await fetch(apiUrl, {
      method: 'GET', // Explicitly define the HTTP method
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`, // Uncomment and provide 'token' if authentication is required
      },
    });

    // Check if the response was successful (status code 200-299).
    if (!res.ok) {
      // If not successful, throw an error with the status.
      const errorText = await res.text(); // Get error message from response body
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }

    // Parse the JSON response.
    const responseData = await res.json();

    // Return the data and totalPages from the response.
    // Ensure 'data' is an array and 'totalPages' is a number, with fallbacks.
    return {
      data: responseData.data || [],
      totalPages: responseData.totalPages || 1,
    };
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling component.
    console.error("Failed to fetch orders in API service:", error);
    throw error; // Re-throw to allow the component to handle loading/error states
  }
}
