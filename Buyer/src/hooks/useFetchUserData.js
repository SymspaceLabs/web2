// src/hooks/useFetchUserData.js
import { useState, useEffect } from 'react';
import { fetchUserById } from '@/services/userService'; // Assuming this path

/**
 * Custom hook to fetch user data for authenticated users.
 * @param {object} user - The authenticated user object (e.g., from AuthContext).
 * @param {boolean} isAuthenticated - The authentication status.
 * @returns {object | null} The fetched user data, or null if not authenticated or an error occurred.
 */
export const useFetchUserData = (user, isAuthenticated) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated && user?.id) { // Ensure user.id exists
                try {
                    const data = await fetchUserById(user.id);
                    setUserData(data);
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                    setUserData(null); // Clear data on error
                }
            } else if (!isAuthenticated) {
                setUserData(null); // Clear data if not authenticated
            }
        };

        fetchData();
    }, [user, isAuthenticated]); // Re-run when user or authentication status changes

    return userData;
};