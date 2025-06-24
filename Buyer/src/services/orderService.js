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