// Checkout Form
// =================================================================

import { useState, useEffect } from "react";
import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { FlexBox, FlexCol } from "@/components/flex-box";
import {
    Typography,
    Button,
    Card,
    Box,
    Grid,
    IconButton,
    Dialog,         // Import Dialog for the popup
    DialogTitle,    // Import DialogTitle
    DialogContent,  // Import DialogContent
    DialogActions,  // Import DialogActions
    CircularProgress // For loading indicator in the dialog
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ShippingForm, BillingForm } from "@/components/custom-forms/checkout";
import { useSnackbar } from '@/contexts/SnackbarContext'; // Assuming you have this context
import { fetchAddressesByUserId, fetchAddressById, deleteAddressById } from "@/services/addressService"; // Import deleteAddressById
import { AddressDialog } from "@/components/dialog";

// =================================================================

// Function to add an address
const addAddress = async (newAddressData) => {
    try {
        // console.log("Adding new address:", newAddressData);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAddressData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to add address: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Address added successfully:", data);
        return data;
    } catch (error) {
        console.error("Error adding address:", error);
        throw error;
    }
};

// Function to update an address
const updateAddress = async (addressId, updatedAddressData) => {
    try {
        // console.log(`Updating address ${addressId} with data:`, updatedAddressData);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${addressId}`, {
            method: "PATCH", // Using PATCH for partial updates, change to PUT if your API expects full replacement
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAddressData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to update address: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Address updated successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating address:", error);
        throw error;
    }
};

// ==========================================
// Checkout Form Component
// ==========================================

export default function CheckoutForm({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    shipping,
    setShipping,
    sameAsShipping,
    setSameAsShipping,
    setBilling,
    billing,
    forceShowErrors,
    selectedAddressId,
    setSelectedAddressId,
}) {

    const { user, isAuthenticated } = useAuth();
    const { showSnackbar } = useSnackbar(); // Assuming SnackbarContext is correctly set up

    const [addresses, setAddresses] = useState([]);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [addressToEditId, setAddressToEditId] = useState(null); // Only store ID for edit mode
    const [addressFormData, setAddressFormData] = useState({ // State for the address form fields
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
    });
    const [modalLoading, setModalLoading] = useState(false); // Loading for modal operations (fetch/save)
    const [modalError, setModalError] = useState(null);    // Error for modal operations
    const [fieldErrors, setFieldErrors] = useState({});     // Field-specific errors for modal form

    // State for delete confirmation dialog
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [addressToDeleteId, setAddressToDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false); // To show loading state in delete dialog

    // Function to fetch all user addresses (now reusable)
    const refreshAddresses = async () => {
        try {
            if (isAuthenticated && user?.id) {
                const userAddresses = await fetchAddressesByUserId(user.id);
                setAddresses(userAddresses);
                // Automatically select the first address if available and none selected
                if (userAddresses.length > 0 && selectedAddressId === null) {
                    setSelectedAddressId(userAddresses[0].id);
                }
            }
        } catch (error) {
            console.error("Error refreshing user addresses:", error);
            showSnackbar("Failed to load addresses.", "error");
        }
    };

    // Effect to fetch all addresses on initial load and when auth/user changes
    useEffect(() => {
        refreshAddresses();
    }, [isAuthenticated, user?.id]);

    // Effect to fetch single address data when modal opens in edit mode
    useEffect(() => {
        const fetchAddressDetailsForEdit = async () => {
            if (addressToEditId) {
                setModalLoading(true);
                setModalError(null);
                try {
                    const data = await fetchAddressById(addressToEditId);
                    setAddressFormData(data); // Populate form with fetched data
                } catch (err) {
                    setModalError(err.message || "Failed to load address for editing.");
                    showSnackbar(err.message || "Failed to load address for editing.", "error");
                } finally {
                    setModalLoading(false);
                }
            }
        };

        if (openAddressModal && addressToEditId) {
            fetchAddressDetailsForEdit();
        }
    }, [openAddressModal, addressToEditId, showSnackbar]);

    // Handles opening the modal for adding a new address
    const onAddNewAddress = () => {
        setAddressToEditId(null); // Ensure no address ID is set for 'add' mode
        setAddressFormData({ // Reset form fields for new entry
            name: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            country: "",
            zip: "",
        });
        setFieldErrors({}); // Clear any previous field errors
        setModalError(null); // Clear any previous general errors
        setOpenAddressModal(true);
        console.log("openAddressModal state set to:", true);
    }

    // Handles opening the modal for editing an existing address
    const onEditAddress = (address) => {
        console.log("Edit Address button clicked. Opening modal for ID:", address.id);
        setAddressToEditId(address.id); // Set the ID for editing
        setOpenAddressModal(true);
        // Data will be fetched by the useEffect hook when openAddressModal becomes true and addressToEditId is set
        console.log("openAddressModal state set to:", true);
    };

    // Opens the delete confirmation dialog
    const handleDeleteClick = (addressId) => {
        setAddressToDeleteId(addressId);
        setOpenDeleteConfirm(true);
    };

    // Confirms and proceeds with address deletion
    const handleConfirmDelete = async () => {
        if (!addressToDeleteId) return;

        setIsDeleting(true);
        try {
            // Use the imported deleteAddressById function
            await deleteAddressById(addressToDeleteId); 
            showSnackbar("Address deleted successfully!", "success");
            refreshAddresses(); // Refresh the list after deletion
            handleCloseDeleteConfirm(); // Close the confirmation dialog
            // If the deleted address was the selected one, clear selection
            if (selectedAddressId === addressToDeleteId) {
                setSelectedAddressId(null);
            }
        } catch (error) {
            console.error("Error deleting address:", error);
            showSnackbar("Failed to delete address.", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    // Closes the delete confirmation dialog
    const handleCloseDeleteConfirm = () => {
        setOpenDeleteConfirm(false);
        setAddressToDeleteId(null);
    };

    // The onDeleteAddress function (from user's query) is removed as it's no longer used.

    // Handles closing the address modal
    const handleCloseAddressModal = () => {
        console.log("Closing address modal.");
        setOpenAddressModal(false);
        setAddressToEditId(null); // Clear address ID when modal closes
        setAddressFormData({ // Reset form fields
            name: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            country: "",
            zip: "",
        });
        setFieldErrors({}); // Clear field errors
        setModalError(null); // Clear general errors
        console.log("openAddressModal state set to:", false);
    };

    // Handles changes to the address form fields and clears corresponding errors
    const handleAddressFormChange = (field, value) => {
        setAddressFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear the error for this specific field when the user starts typing
        if (fieldErrors[field]) {
            setFieldErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[field];
                return updatedErrors;
            });
        }
    };

    // Client-side validation for the address form
    const validateAddressForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!addressFormData.name.trim()) {
            newErrors.name = "Address Name is required.";
            isValid = false;
        }
        if (!addressFormData.address1.trim()) {
            newErrors.address1 = "Address Line 1 is required.";
            isValid = false;
        }
        if (!addressFormData.city.trim()) {
            newErrors.city = "City is required.";
            isValid = false;
        }
        if (!addressFormData.state.trim()) {
            newErrors.state = "State is required.";
            isValid = false;
        }
        if (!addressFormData.country.trim()) {
            newErrors.country = "Country is required.";
            isValid = false;
        }
        if (!addressFormData.zip.trim()) {
            newErrors.zip = "Zip Code is required.";
            isValid = false;
        }

        setFieldErrors(newErrors);
        return isValid;
    };

    // Handles saving/updating the address from the modal form
    const handleSaveAddress = async () => {
        if (!validateAddressForm()) {
            showSnackbar("Please fill in all required fields.", "error");
            return;
        }

        setModalLoading(true);
        setModalError(null);

        const requestBody = {
            name: addressFormData.name,
            address1: addressFormData.address1,
            address2: addressFormData.address2,
            city: addressFormData.city,
            state: addressFormData.state,
            zip: addressFormData.zip,
            country: addressFormData.country,
        };

        try {
            if (addressToEditId) {
                // Update existing address
                await updateAddress(addressToEditId, requestBody);
                showSnackbar("Address updated successfully!", "success");
            } else {
                // Add new address
                if (!user || !user.id) {
                    throw new Error("User not authenticated. User ID is required to create a new address.");
                }
                const newAddressRequestBody = { ...requestBody, userId: user.id };
                await addAddress(newAddressRequestBody);
                showSnackbar("Address added successfully!", "success");
            }
            refreshAddresses(); // Re-fetch all addresses to update the list in the main component
            handleCloseAddressModal(); // Close the modal
        } catch (err) {
            console.error("Error saving address:", err);
            setModalError(err.message || "An unexpected error occurred while saving address.");
            showSnackbar(err.message || "An unexpected error occurred.", "error");
        } finally {
            setModalLoading(false);
        }
    };


    return (
        <Card sx={styles.wrapper}>
            {/* TITLE */}
            <FlexBox justifyContent="flex-start" alignItems="center" mb={2} >
                <H1 color="#000" fontSize={{ xs: 14, sm: 20 }}>
                    Shipping Address
                </H1>
            </FlexBox>
            {isAuthenticated ? (
                // Render content for authenticated users (saved addresses)
                <Box>
                    <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography variant="h6" sx={styles.savedAddressesTitle}>Your Saved Addresses</Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={onAddNewAddress} // This now opens the modal
                            sx={styles.addNewAddressButton}
                        >
                            Add New Address
                        </Button>
                    </FlexBox>
                    {addresses.length > 0 ? (
                        <Grid container spacing={2}> {/* Using Material-UI Grid for responsive layout */}
                            {addresses.map((address) => (
                                <Grid item xs={12} sm={6} md={4} key={address.id}> {/* Responsive grid item sizes */}
                                    <Box
                                        sx={{
                                            ...styles.addressCard,
                                            // Apply selected address styles conditionally
                                            ...(selectedAddressId === address.id
                                                ? styles.selectedAddressCard
                                                : {}),
                                        }}
                                        onClick={() => setSelectedAddressId(address.id)} // Select address
                                    >
                                        <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
                                            <Typography variant="subtitle1" component="h3" sx={styles.addressTitle}>
                                                {address.name || 'Unnamed Address'} {/* Use address.name */}
                                            </Typography>
                                            <FlexBox>
                                                <IconButton
                                                    onClick={(e) => { e.stopPropagation(); onEditAddress(address); }}
                                                    sx={styles.iconButton}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(address.id); }} // Call handleDeleteClick here
                                                    sx={{ ...styles.iconButton, '&:hover': { color: 'error.main' } }} // Specific hover color for delete
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </FlexBox>
                                        </FlexBox>
                                        <Typography variant="body2" color="text.secondary">
                                            {address.address1} {address.address2 && `, ${address.address2}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {address.city}, {address.state} {address.zip}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {address.country}
                                        </Typography>
                                        {address.phone && (
                                            <Typography variant="body2" color="text.secondary">
                                                {address.phone}
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <FlexCol alignItems="center" justifyContent="center" py={4}>
                            <Typography variant="body1" color="text.secondary" mb={2}>
                                No saved addresses found.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onAddNewAddress} // This now opens the modal
                                sx={styles.addFirstAddressButton}
                            >
                                Add Your First Address
                            </Button>
                        </FlexCol>
                    )}
                </Box>
            ) : (
                // Render full forms for unauthenticated users (shipping and billing forms)
                <FlexCol px={2}>
                    <ShippingForm
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        shipping={shipping}
                        setShipping={setShipping}
                        sameAsShipping={sameAsShipping}
                        setSameAsShipping={setSameAsShipping}
                        setBilling={setBilling}
                        forceShowErrors={forceShowErrors}
                    />

                    <BillingForm
                        billing={billing}
                        setBilling={setBilling}
                        sameAsShipping={sameAsShipping}
                        shipping={shipping}
                    />
                </FlexCol>
            )}

            {/* Address Dialog for Add/Edit */}
            <AddressDialog
                open={openAddressModal}
                onClose={handleCloseAddressModal}
                dialogTitle={addressToEditId ? "Edit Address" : "Add New Address"}
                error={modalError}
                loading={modalLoading}
                handleSave={handleSaveAddress}
                addressFormData={addressFormData}
                fieldErrors={fieldErrors}
                handleAddressFormChange={handleAddressFormChange}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteConfirm}
                onClose={handleCloseDeleteConfirm}
                aria-labelledby="delete-address-dialog-title"
                aria-describedby="delete-address-dialog-description"
            >
                <DialogTitle id="delete-address-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography id="delete-address-dialog-description">
                        Are you sure you want to delete this address? This action cannot be undone.
                    </Typography>
                    {isDeleting && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirm} color="primary" disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus disabled={isDeleting}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Card>
    );
}

const styles = {
    wrapper: {
        p: 5,
        mb: 4,
        borderRadius: "25px",
        backdropFilter: 'blur(10.0285px)',
        boxShadow: 'inset 0px 3px 6px rgba(255,255,255,0.4), inset 0px -3px 9px rgba(255,255,255,0.5), inset 0px -1.5px 20px rgba(255,255,255,0.24), inset 0px 20px 20px rgba(255,255,255,0.24), inset 0px 1px 20.5px rgba(255,255,255,0.8)',
        background: 'rgba(255,255,255,0.35)',
    },
    btn : {
        borderRadius:'50px',
        border:'2px solid #FFF',
        background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
        color:'#FFF',
        '&:hover': {
        background:'transaparent',
        }
    },
    savedAddressContainer: {
    },
    savedAddressesTitle: {
        fontWeight: 600,
    },
    addNewAddressButton: {
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.875rem',
        px: 3,
        py: 1,
    },
    addressCard: {
        p: 2,
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 200ms ease-in-out',
        position: 'relative',
        '&:hover': {
            backgroundColor: 'grey.50',
        },
    },
    selectedAddressCard: {
        borderColor: 'primary.main',
        backgroundColor: 'primary.light',
        boxShadow: 3,
    },
    addressTitle: {
        fontWeight: 'bold',
        color: 'text.primary',
    },
    iconButton: {
        color: 'text.secondary',
        p: 1,
        '&:hover': {
            color: 'primary.main',
        },
    },
    addFirstAddressButton: {
        mt: 2,
    }
};
