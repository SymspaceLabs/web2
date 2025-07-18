"use client";

// =====================================================
// Addresses Table
// =====================================================

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { SymDashboardHeader } from "@/components/custom-components";
import { useSnackbar } from '@/contexts/SnackbarContext'; // Import useSnackbar


// MUI Dialog Components
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Card
} from '@mui/material';

import Pagination from "../../pagination";
import Place from "@mui/icons-material/Place";
import AddressListItem from "../address-item";
import { FlexCol } from "@/components/flex-box";

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

      let data = await response.json();

      // Sort addresses: default address first, then by ID or any other consistent order
      data.sort((a, b) => {
        if (a.isDefault && !b.isDefault) return -1; // a comes before b if a is default and b is not
        if (!a.isDefault && b.isDefault) return 1;  // b comes before a if b is default and a is not
        return 0; // Maintain original order for non-default addresses, or sort by another criterion if needed
      });

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
    <FlexCol sx={style.box}>


      <Box>
        {/* TITLE HEADER AREA */}
        <SymDashboardHeader
          title="My Addresses"
          Icon={Place}
          buttonText={"Add New Address"}
          onClick={() => router.push('/address/new')}
          loading={loading}
        />
        <Card
          sx={{
            background:'#FFF',
            borderRadius: "0px 0px 15px 15px",
            minHeight: '25vh'
          }}
        >

        
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

      </Card>
      </Box>


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
    </FlexCol>
  );
}

const style = {
  box : { 
    padding:'15px',
    borderRadius:'15px',
    background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(12px)',
    gap:'25px'
  }
}
