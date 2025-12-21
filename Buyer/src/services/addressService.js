export const fetchAddressesByUserId = async (userId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// New function to fetch a single address by ID
export const fetchAddressById = async (addressId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${addressId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch address details: ${errorData.message || response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching address details:", err);
        throw err;
    }
};


// New function to delete an address by ID
export const deleteAddressById = async (addressId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${addressId}`, {
            method: "DELETE", // Correct HTTP method for deletion
        });

        if (!response.ok) {
            // Attempt to parse error data if available, even for non-OK responses
            const errorData = await response.json().catch(() => ({ message: 'No error message from server.' }));
            throw new Error(`Failed to delete address: ${errorData.message || response.statusText}`);
        }
        return true; 
    } catch (err) {
        console.error("Error deleting address:", err);
        throw err; // Re-throw the error to be handled by the caller
    }
};