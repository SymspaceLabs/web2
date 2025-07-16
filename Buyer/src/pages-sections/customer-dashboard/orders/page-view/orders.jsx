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
import { fetchUserOrders } from '@/services/orderService';

// ====================================================
export default function OrdersPageView() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [totalPages, setTotalPages] = useState(1);   // New state for total pages
  const ordersPerPage = 10; // Consistent with backend limit

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        // Call the isolated API function
        const { data, totalPages } = await fetchUserOrders(user?.id, currentPage, ordersPerPage);
        setOrders(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error loading orders in component:", error);
        setOrders([]); // Clear orders on error
        setTotalPages(1); // Reset total pages on error
      } finally {
        setLoading(false);
      }
    };

    // Only load orders if user is available
    if (user?.id) {
      loadOrders();
    } else {
      setLoading(false); // If no user, stop loading and show no orders
      setOrders([]);
      setTotalPages(1);
    }
  }, [user?.id, currentPage]); // Re-fetch when user.id or currentPage changes

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
