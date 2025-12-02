/**
 * Fetches a single user by ID from the backend API.
 * @param {string} userId - The unique ID of the user to fetch.
 * @returns {Promise<Object>} A promise that resolves directly to the user data object.
 * @throws {Error} If the fetch fails.
 */
export const fetchUserById = async (userId) => { // <-- Using const/arrow style, like product services
  if (!userId) {
    throw new Error("User ID is required for fetching user data.");
  }
  
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to fetch user ${userId}: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
  }
  
  const data = await response.json();
  return data; // <-- Return the user object directly
};