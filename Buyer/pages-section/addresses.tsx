"use client";

// =====================================================
// Addresses Page View
// =====================================================

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

import CustomPagination from "@/components/pagination";
import AddressListItem from "@/components/address-list-item";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// =======================================================

interface Address {
  id: string;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  isDefault?: boolean;
}

const PAGE_SIZE = 10;

// =======================================================

export default function AddressPageView() {
  const { user } = useAuth();
  const router = useRouter();

  const [allAddress, setAllAddress] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  // Slice addresses for current page
  const paginatedAddresses = allAddress.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // -------------------------------------------------------

  const fetchUserAddresses = async () => {
    if (!user?.id) {
      setError("User ID is required to fetch addresses.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/user/${user.id}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to fetch addresses: ${response.statusText}`
        );
      }

      const data: Address[] = await response.json();

      // Default address always first
      data.sort((a, b) => {
        if (a.isDefault && !b.isDefault) return -1;
        if (!a.isDefault && b.isDefault) return 1;
        return 0;
      });

      setAllAddress(data);
      setCurrentPage(1); // Reset to first page on fresh fetch
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("Error fetching addresses:", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAddresses();
  }, [user?.id]);

  // -------------------------------------------------------

  const handleOpenConfirmation = (address: Address) => {
    setAddressToDelete(address);
    setShowConfirmationDialog(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationDialog(false);
    setAddressToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!addressToDelete) return;

    const idToDelete = addressToDelete.id;
    handleCloseConfirmation();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${idToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to delete address: ${response.statusText}`
        );
      }

      toast.success("Address deleted successfully!");
      await fetchUserAddresses();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete address.";
      console.error("Error deleting address:", err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------
  // Loading / error states
  // -------------------------------------------------------

  if (loading && allAddress.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-400 text-center mt-5">Error: {error}</p>
    );
  }

  // -------------------------------------------------------

  return (
    <div
      className="p-[15px] rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px] flex flex-col gap-6"
      style={{
        background:
          "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
      }}
    >
      <div>
        {/* Header */}
        <SymDashboardHeader
          title="My Addresses"
          Icon={MapPin}
          buttonText="Add New Address"
          onClick={() => router.push("/addresses/new")}
          loading={loading}
        />

        {/* Address list card */}
        <div className="bg-white rounded-b-[15px] min-h-[25vh]">
          {/* Empty state */}
          {allAddress.length === 0 && !loading && (
            <p className="text-center text-sm text-gray-500 py-8 px-4">
              No addresses found. Click &quot;Add New Address&quot; to add one.
            </p>
          )}

          {/* Address rows */}
          {paginatedAddresses.map((address) => (
            <AddressListItem
              key={address.id}
              address={address}
              handleDelete={() => handleOpenConfirmation(address)}
            />
          ))}

          {/* Pagination */}
          {allAddress.length > PAGE_SIZE && (
            <CustomPagination
              count={Math.ceil(allAddress.length / PAGE_SIZE)}
              page={currentPage}
              onChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={showConfirmationDialog}
        onOpenChange={(open) => !open && handleCloseConfirmation()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;
              {addressToDelete?.name ?? "this address"}&quot;? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={loading}
              onClick={handleCloseConfirmation}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}