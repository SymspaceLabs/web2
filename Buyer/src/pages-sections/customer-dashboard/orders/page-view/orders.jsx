"use client";

// ====================================================
// Orders Page View
// ====================================================

import { useAuth } from '@/contexts/AuthContext';
import { CircularProgress } from "@mui/material";
import { useState, useEffect, Fragment } from "react";

import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import ShoppingBag from "@mui/icons-material/ShoppingBag"; // Local CUSTOM COMPONENTS

// ====================================================
export default function OrdersPageView() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [totalPages, setTotalPages] = useState(1);   // New state for total pages
  const ordersPerPage = 10; // Consistent with backend limit

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true); // Set loading to true before fetching
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/user/${user.id}?page=${currentPage}&limit=${ordersPerPage}`, {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`, // Uncomment if needed
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const responseData = await res.json();
        setOrders(responseData.data || []); // Update orders with the 'data' array
        setTotalPages(responseData.totalPages || 1); // Update total pages
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]); // Clear orders on error
        setTotalPages(1); // Reset total pages on error
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, currentPage]); // Re-fetch when user or currentPage changes

  // Handler for pagination change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    // Scroll to the top of the page when pagination number is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />

      {/* ORDER LIST AREA */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress/>
        </div>
      ) : orders.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>No orders found.</p>
      ) : (
        orders.map(order => <OrderRow order={order} key={order.id} />)
      )}

      {/* ORDERS PAGINATION */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </div>
    </Fragment>
  );
}
