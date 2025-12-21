"use client";

import { Fragment, useState, useEffect, useCallback } from "react";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useAuth } from "@/contexts/AuthContext"; // Assuming this is the correct import path for your authContext

import ListCard from "../list-card";
import Pagination from "../../pagination"; // Assuming this is your Material-UI Pagination component
import DashboardHeader from "../../dashboard-header";
import CreditCard from "@mui/icons-material/CreditCard";

export default function PaymentMethodsPageView() {
  const { showSnackbar } = useSnackbar();
  const { user, token } = useAuth(); // Get user from authContext

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const itemsPerPage = 5; // Define items per page, match backend default or make configurable

  // The userId will now come from the authenticated user context
  // No longer hardcoded: const currentUserId = 'cc674c38-3785-405a-b6c0-97f6a6d462e5';

  const fetchCreditCards = useCallback(async () => {
    // Only attempt to fetch if user.id is available
    if (!user || !user.id) {
      setLoading(false);
      setError("User not authenticated or user ID not available.");
      showSnackbar("User not authenticated. Please log in.", 'error');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
      // Call the new endpoint to fetch cards by userId
      const response = await fetch(`${backendUrl}/credit-cards/user/${user.id}?page=${currentPage}&limit=${itemsPerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization if needed
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch payment methods.");
      }

      const paginatedResponse = await response.json(); // Expect paginated response object

      // Extract data and pagination metadata from the response
      const data = paginatedResponse.data;
      setTotalPages(paginatedResponse.totalPages);
      // setCurrentPage(paginatedResponse.currentPage); // Optionally update currentPage from backend if it differs

      const formattedData = data.map(card => ({
        id: card.id, // ID is now a number from backend
        card_no: `**** **** **** ${card.last4}`, // Display last 4 digits
        // Use expiryMonth and expiryYear from the entity, convert to string for display
        exp: `${String(card.expiryMonth).padStart(2, '0')}/${String(card.expiryYear).slice(-2)}`,
        payment_method: card.cardBrand, // Use cardBrand as payment_method
        isDefault: card.isDefault,
      }));

      setPaymentMethods(formattedData);
    } catch (err) {
      console.error("Error fetching credit cards:", err.message);
      setError(err.message);
      showSnackbar(`Error fetching cards: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, showSnackbar, user]); // Added user to dependencies

  useEffect(() => {
    // Trigger fetch when component mounts or currentPage/itemsPerPage changes, AND user is available
    if (user && user.id) {
      fetchCreditCards();
    } else {
      // If user is not available on mount, set loading to false and error
      setLoading(false);
      setError("User not authenticated or user ID not available.");
    }
  }, [fetchCreditCards, user]); // Dependency on the memoized fetchCreditCards and user

  const handleSetDefault = useCallback(async (cardId) => {
    // Only proceed if user.id is available
    if (!user || !user.id) {
      showSnackbar("User not authenticated. Cannot set default card.", 'error');
      return;
    }

    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
      // cardId is already a number, no need to parse
      const response = await fetch(`${backendUrl}/credit-cards/${cardId}/set-default`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization if needed
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to set default card.");
      }

      // After setting default, re-fetch the list to get the updated default status
      // This ensures the pagination state is maintained and the list is fresh.
      await fetchCreditCards();
      showSnackbar("Default card updated successfully!", "success");

    } catch (err) {
      console.error("Error setting default card:", err.message);
      showSnackbar(`Error setting default: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [fetchCreditCards, showSnackbar, user]); // Dependencies for useCallback

  // Handler for deleting a credit card
  const handleDeleteCard = useCallback(async (cardId) => {
    // Only proceed if user.id is available
    if (!user || !user.id) {
      showSnackbar("User not authenticated. Cannot delete card.", 'error');
      return;
    }

    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
      const response = await fetch(`${backendUrl}/credit-cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete card.");
      }

      // Re-fetch the list to update the UI
      await fetchCreditCards();
      showSnackbar("Card deleted successfully!", "success");

    } catch (err) {
      console.error("Error deleting card:", err.message);
      showSnackbar(`Error deleting card: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [fetchCreditCards, showSnackbar, user]); // Dependencies for useCallback

  // Handler for pagination change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Fragment>
        <DashboardHeader Icon={CreditCard} buttonText="Add New" title="Payment Methods" href="/payment-methods/add" />
        <p>Loading payment methods...</p>
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        <DashboardHeader Icon={CreditCard} buttonText="Add New" title="Payment Methods" href="/payment-methods/add" />
        <p style={{ color: 'red' }}>Error: {error}</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={CreditCard} buttonText="Add New" title="Payment Methods" href="/payment-methods/add" />

      {/* ALL PAYMENT LIST AREA */}
      {paymentMethods.length > 0 ? (
        paymentMethods.map(item => (
          <ListCard
            id={item.id} // Ensure id is passed as a number
            key={item.id}
            exp={item.exp}
            card_no={item.card_no}
            payment_method={item.payment_method}
            isDefault={item.isDefault}
            onSetDefault={handleSetDefault}
            onDelete={handleDeleteCard} // NEW: Pass the delete handler to ListCard
          />
        ))
      ) : (
        <p>No payment methods found. Add a new one!</p>
      )}

      {/* PAGINATION AREA */}
      {paymentMethods.length > 0 && totalPages > 1 && ( // Only show pagination if there are items and more than 1 page
        <Pagination
          count={totalPages} // Total pages from backend
          page={currentPage} // Current page
          onChange={handlePageChange} // Handle page change
        />
      )}
    </Fragment>
  );
}
