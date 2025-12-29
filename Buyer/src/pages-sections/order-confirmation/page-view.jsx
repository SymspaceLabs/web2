"use client";

// =============================================================
// Order Details Page View
// =============================================================


import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchOrderById } from "@/services/orderService";
import { SymDashboardHeader } from "@/components/custom-components";

import ShoppingBag from "@mui/icons-material/ShoppingBag"; // Local CUSTOM COMPONENTS
import OrderSummary from "../customer-dashboard/orders/order-summary";
import OrderProgress from "../customer-dashboard/orders/order-progress";
import OrderedProducts from "../customer-dashboard/orders/ordered-products";

// =============================================================
export default function OrderConfirmationPageView({
  orderId
}) {

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      setLoading(true);
      setError(null);

      try {
        const orderData = await fetchOrderById(orderId)
        setOrder(orderData);
      } catch (err) {
        console.error("Failed to load order:", err);
        setError("Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);


  if (loading) {
    return <p>Loading order details…</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!order) {
    return <p>No order found.</p>;
  }

  return (
    <Container sx={{ py:{xs:5, sm:10} }}>
      
      {/* TITLE HEADER AREA */}
      <SymDashboardHeader
        href="/orders"
        Icon={ShoppingBag}
        title="Order Details"
        buttonText="Order Again"
      />

      {/* ORDER PROGRESS AREA */}
      <OrderProgress />

      {/* ORDERED PRODUCT LIST */}
      <OrderedProducts order={order} />

      {/* SHIPPING AND ORDER SUMMERY */}
      <OrderSummary order={order} />
    </Container>
  );
}