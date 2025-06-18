"use client";

// =====================================================
// Addresses Table
// =====================================================

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState, Fragment, useEffect } from "react";
import { SymDashboardHeader } from "@/components/custom-components";
import { useSnackbar } from '@/contexts/SnackbarContext'; // Import useSnackbar

// MUI Dialog Components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'; // Import Button for dialog actions

import Pagination from "../../pagination";
import Place from "@mui/icons-material/Place";
import AddressListItem from "../address-item";

// =======================================================
export default function AddressPageView() {
  const { user } = useAuth();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [allAddress, setAllAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for confirmation dialog
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null); // Stores { id, name } of the address to delete

  // Function to fetch addresses (moved inside component for reusability)
  const fetchUserAddresses = async () => {
    if (!user || !user.id) {
      setError("User ID is required to fetch addresses.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/user/${user.id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch addresses: ${response.statusText}`);
      }

      const data = await response.json();
      setAllAddress(data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError(err.message || "An unexpected error occurred while fetching addresses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAddresses();
  }, [user.id]); // Dependency on user.id to re-fetch if user changes

  // Handler to open the confirmation dialog
  const handleOpenConfirmation = (address) => {
    setAddressToDelete(address); // Store the entire address object (including name)
    setShowConfirmationDialog(true);
  };

  // Handler to close the confirmation dialog
  const handleCloseConfirmation = () => {
    setShowConfirmationDialog(false);
    setAddressToDelete(null); // Clear the stored address
  };

  // HANDLE ADDRESS DELETE after confirmation
  const handleConfirmDelete = async () => {
    if (!addressToDelete) return; // Should not happen if dialog is opened correctly

    const idToDelete = addressToDelete.id;
    
    // Close the dialog immediately
    handleCloseConfirmation();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${idToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete address: ${response.statusText}`);
      }

      showSnackbar("Address deleted successfully!", "success");
      await fetchUserAddresses(); // Re-fetch addresses to update the list
    } catch (err) {
      console.error("Error deleting address:", err);
      setError(err.message || "An unexpected error occurred while deleting the address.");
      showSnackbar(err.message || "Failed to delete address.", "error");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE EDIT (already existed, just keeping it here for context)
  const handleEdit = (id) => {
    router.push(`/address/${id}/edit`);
  };

  if (loading && allAddress.length === 0) {
    return <p>Loading addresses...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</p>;
  }

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <SymDashboardHeader
        title={"My Addresses"}
        Icon={Place}
        buttonText={"Add New Address"}
        onClick={() => router.push('/address/new')}
        loading={loading}
      />

      {/* ALL ADDRESS LIST AREA */}
      {allAddress.length === 0 && !loading && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No addresses found. Click "Add New Address" to add one.</p>
      )}

      {allAddress.map(address => (
        <AddressListItem
          key={address.id}
          address={address}
          // Pass the handler to open the confirmation dialog
          handleDelete={() => handleOpenConfirmation(address)} // Pass the entire address object
          handleEdit={handleEdit}
        />
      ))}

      {/* PAGINATION AREA */}
      {allAddress.length > 10 &&
        <Pagination
          count={5}
          onChange={data => console.log(data)}
        />
      }

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmationDialog}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete "${addressToDelete ? addressToDelete.name : ''}"? This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus disabled={loading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
