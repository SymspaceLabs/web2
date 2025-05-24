"use client";

import { Fragment, useState, useEffect } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag"; // Local CUSTOM COMPONENTS

import OrderSummery from "../order-summery";
import OrderProgress from "../order-progress";
import OrderedProducts from "../ordered-products";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL

// =============================================================
export default function OrderDetailsPageView({
  orderId
}) {

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      console.log(orderId)
      if (!orderId) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${orderId}`);
        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        setOrder(data);
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
    <Fragment>
      
      {/* TITLE HEADER AREA */}
      <DashboardHeader
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
      <OrderSummery order={order} />
    </Fragment>
  );
}