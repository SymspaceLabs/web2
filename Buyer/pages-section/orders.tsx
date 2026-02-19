"use client";

// ====================================================
// Orders Page View
// ====================================================

import { useState, useEffect } from "react";
import { fetchUserOrders } from "@/api/order";
import OrderRow from "@/components/order-row";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingBag, Loader2 } from "lucide-react";
import CustomPagination from "@/components/pagination";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";

// ====================================================

interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalAmount: number;
}

const ORDERS_PER_PAGE = 10;

// ====================================================

export default function OrdersPageView() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const { data, totalPages } = await fetchUserOrders(
          user?.id,
          currentPage,
          ORDERS_PER_PAGE
        );
        setOrders(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error loading orders in component:", error);
        setOrders([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadOrders();
    } else {
      setLoading(false);
      setOrders([]);
      setTotalPages(1);
    }
  }, [user?.id, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="p-[15px] rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px] flex flex-col gap-2"
      style={{
        background:
          "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
      }}
    >
      {/* Header */}
      <SymDashboardHeader
        title="My Orders"
        Icon={ShoppingBag}
        buttonText=""
        onClick={() => {}}
        loading={false}
      />

      {/* Orders list */}
      <div className="mt-2">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-sm text-white/70 py-8">
            No orders found.
          </p>
        ) : (
          orders.map((order) => <OrderRow order={order} key={order.id} />)
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <CustomPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}