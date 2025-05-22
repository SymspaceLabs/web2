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

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/user/${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${token}`, // Uncomment if needed
            },
          });

          const data = await res.json();
          setOrders(data || []);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      };

    fetchOrders();
  }, []);

  return <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />

      {/* ORDER LIST AREA */}
      {loading ? (
        <CircularProgress/>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => <OrderRow order={order} key={order.id} />)
      )}
      {/* ORDERS PAGINATION */}
      <Pagination count={5} onChange={data => console.log(data)} />
    </Fragment>;
}