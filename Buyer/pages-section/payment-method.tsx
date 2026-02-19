"use client";

// =====================================================
// Payment Methods Page View
// =====================================================

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation"; // ADD THIS IMPORT
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import ListCard from "@/components/list-card";
import CustomPagination from "@/components/pagination";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";

// =====================================================

interface PaymentMethod {
  id: string | number;
  card_no: string;
  exp: string;
  payment_method: string;
  isDefault: boolean;
}

interface PaginatedCardsResponse {
  data: {
    id: string | number;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    cardBrand: string;
    isDefault: boolean;
  }[];
  totalPages: number;
  currentPage: number;
}

const ITEMS_PER_PAGE = 5;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

// =====================================================

export default function PaymentMethodsPageView() {
  const router = useRouter(); // ADD THIS LINE
  const { user, token } = useAuth();

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // -------------------------------------------------------

  const authHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // -------------------------------------------------------

  const fetchCreditCards = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      setError("User not authenticated or user ID not available.");
      toast.error("User not authenticated. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BACKEND_URL}/credit-cards/user/${user.id}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        { method: "GET", headers: authHeaders }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ?? "Failed to fetch payment methods.");
      }

      const paginatedResponse: PaginatedCardsResponse = await response.json();

      setTotalPages(paginatedResponse.totalPages);
      setPaymentMethods(
        paginatedResponse.data.map((card) => ({
          id: card.id,
          card_no: `**** **** **** ${card.last4}`,
          exp: `${String(card.expiryMonth).padStart(2, "0")}/${String(card.expiryYear).slice(-2)}`,
          payment_method: card.cardBrand,
          isDefault: card.isDefault,
        }))
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("Error fetching credit cards:", message);
      setError(message);
      toast.error(`Error fetching cards: ${message}`);
    } finally {
      setLoading(false);
    }
  }, [currentPage, user]);

  useEffect(() => {
    if (user?.id) {
      fetchCreditCards();
    } else {
      setLoading(false);
      setError("User not authenticated or user ID not available.");
    }
  }, [fetchCreditCards, user]);

  // -------------------------------------------------------

  const handleSetDefault = useCallback(
    async (cardId: string | number) => {
      if (!user?.id) {
        toast.error("User not authenticated. Cannot set default card.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${BACKEND_URL}/credit-cards/${cardId}/set-default`,
          { method: "PATCH", headers: authHeaders }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message ?? "Failed to set default card.");
        }

        await fetchCreditCards();
        toast.success("Default card updated successfully!");
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to set default card.";
        console.error("Error setting default card:", message);
        toast.error(`Error setting default: ${message}`);
      } finally {
        setLoading(false);
      }
    },
    [fetchCreditCards, user]
  );

  const handleDeleteCard = useCallback(
    async (cardId: string | number) => {
      if (!user?.id) {
        toast.error("User not authenticated. Cannot delete card.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/credit-cards/${cardId}`, {
          method: "DELETE",
          headers: authHeaders,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message ?? "Failed to delete card.");
        }

        await fetchCreditCards();
        toast.success("Card deleted successfully!");
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to delete card.";
        console.error("Error deleting card:", message);
        toast.error(`Error deleting card: ${message}`);
      } finally {
        setLoading(false);
      }
    },
    [fetchCreditCards, user]
  );

  // -------------------------------------------------------
  // Loading / error states
  // -------------------------------------------------------

  if (loading) {
    return (
      <div
        className="rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px] overflow-hidden"
        style={{
          background: "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
        }}
      >
        <SymDashboardHeader
          title="Payment Methods"
          Icon={CreditCard}
          buttonText="Add New"
          onClick={() => router.push("/payment-methods/new")}
          loading={true}
        />
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px] overflow-hidden"
        style={{
          background: "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
        }}
      >
        <SymDashboardHeader
          title="Payment Methods"
          Icon={CreditCard}
          buttonText="Add New"
          onClick={() => router.push("/payment-methods/new")}
          loading={false}
        />
        <p className="text-red-400 text-center py-8 px-4">Error: {error}</p>
      </div>
    );
  }

  // -------------------------------------------------------

  return (
    <div
      className="rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px] overflow-hidden"
      style={{
        background: "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
      }}
    >
      {/* Header */}
      <SymDashboardHeader
        title="Payment Methods"
        Icon={CreditCard}
        buttonText="Add New"
        onClick={() => router.push("/payment-methods/new")}
        loading={loading}
      />

      {/* Card list */}
      <div className="bg-white rounded-b-[15px] min-h-[25vh]">
        {paymentMethods.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-8 px-4">
            No payment methods found. Add a new one!
          </p>
        ) : (
          paymentMethods.map((item) => (
            <ListCard
              key={item.id}
              id={item.id}
              exp={item.exp}
              card_no={item.card_no}
              payment_method={item.payment_method}
              isDefault={item.isDefault}
              onSetDefault={handleSetDefault}
              onDelete={handleDeleteCard}
            />
          ))
        )}

        {/* Pagination */}
        {paymentMethods.length > 0 && totalPages > 1 && (
          <CustomPagination
            count={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}