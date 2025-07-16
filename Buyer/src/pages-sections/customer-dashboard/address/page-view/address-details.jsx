"use client";

// =============================================================

import { Card } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/AuthContext";
import { Fragment, useState, useEffect, useRef } from "react"; // Import useRef
import { AddressForm } from "@/components/custom-forms";
import { useSnackbar } from '@/contexts/SnackbarContext';
import { SymTextField } from "@/components/custom-inputs"; // Make sure SymTextField is imported
import { SymDashboardHeader } from "@/components/custom-components";

import Place from "@mui/icons-material/Place";

// =============================================================
export default function AddressDetailsPageView({
  addressId = "", // addressId is now the single source of truth for edit/create
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();

  // Determine if it's an edit or create operation based on addressId presence
  const isEditMode = !!addressId;

  const [address, setAddress] = useState({
    name: "", // Added 'name' to the address state
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    isDefault: false, // Initialize isDefault here
  });
  const [loading, setLoading] = useState(false); // State for loading indicator during fetch and save
  const [error, setError] = useState(null); // State for general error handling (e.g., API fetch errors)
  const [fieldErrors, setFieldErrors] = useState({}); // State for field-specific validation errors

  const dialogContentRef = useRef(null); // Create a ref for the dialog content

  // useEffect to fetch address details when in edit mode (addressId is provided)
  useEffect(() => {
    async function fetchAddressDetails() {
      // If not in edit mode (i.e., addressId is not provided), no fetching is needed.
      if (!isEditMode) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); // Clear previous general errors

      try {
        // Construct the API endpoint with the address ID
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${addressId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Failed to fetch address details: ${response.statusText}`
          );
        }

        const data = await response.json();
        setAddress(data); // Set the fetched address details to the address state
      } catch (err) {
        console.error("Error fetching address details:", err);
        setError(err.message || "An unexpected error occurred while fetching address details.");
      } finally {
        setLoading(false); // End loading
      }
    }

    fetchAddressDetails(); // Call the fetch function
  }, [addressId, isEditMode]); // Re-run effect when addressId or isEditMode changes

  // Handles changes to the address form fields and clears corresponding errors
  const handleChange = (field, value) => {
    setAddress((prev) => ({
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

  // Client-side validation function
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check for required fields
    if (!address.name.trim()) { // Added validation for 'name'
      newErrors.name = "Address Name is required.";
      isValid = false;
    }
    if (!address.address1.trim()) {
      newErrors.address1 = "Address Line 1 is required.";
      isValid = false;
    }
    if (!address.city.trim()) {
      newErrors.city = "City is required.";
      isValid = false;
    }
    if (!address.state.trim()) {
      newErrors.state = "State is required.";
      isValid = false;
    }
    if (!address.country.trim()) {
      newErrors.country = "Country is required.";
      isValid = false;
    }
    if (!address.zip.trim()) {
      newErrors.zip = "Zip Code is required.";
      isValid = false;
    }

    setFieldErrors(newErrors); // Update the field-specific errors state
    return isValid; // Return true if all required fields are filled, false otherwise
  };

  // Handles the save/update operation for the address
  const handleSave = async () => {
    // Perform client-side validation first
    if (!validateForm()) {
      showSnackbar("Please fill in all required fields.", "error");
      return; // Stop the function if validation fails
    }

    setLoading(true);
    setError(null); // Clear previous general errors

    // Prepare the request body from the current address state
    const requestBody = {
      name: address.name, // Include 'name' in the request body
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      isDefault: address.isDefault, // Include isDefault in the request body
    };

    try {
      let response;
      if (isEditMode) {
        // If in edit mode, send a PATCH request to update the existing address
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${addressId}`, {
          method: "PATCH", // Use PATCH for updating an existing resource
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      } else {
        // If not in edit mode (creating new address), send a POST request
        // Ensure user.id is available from your authentication context
        if (!user || !user.id) {
          throw new Error("User not authenticated. User ID is required to create a new address.");
        }
        // Add userId to the request body for new addresses
        const newAddressRequestBody = { ...requestBody, userId: user.id };
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses`, { // Assuming endpoint for new address is /addresses
          method: "POST", // Use POST for creating a new resource
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAddressRequestBody),
        });
      }

      const responseBody = await response.json();

      if (!response.ok) {
        // If the response was not OK (e.g., 4xx or 5xx status code)
        throw new Error(responseBody.message || "Failed to save address.");
      }

      showSnackbar(responseBody.message, "success"); // Show success notification
      router.push("/address"); // Redirect to the address list page after successful operation
    } catch (err) {
      setError(err.message || "An unexpected error occurred while saving address details.");
      showSnackbar(err.message || "An unexpected error occurred.", "error"); // Show error notification
    } finally {
      setLoading(false); // Always stop loading, regardless of success or error
    }
  };

  if (loading && (isEditMode || (!isEditMode && Object.keys(fieldErrors).length === 0 && !error))) {
    // Show loading indicator only when initially fetching (edit mode)
    // or when saving and no validation errors are present yet
    return <p>Loading address details...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>Error: {error}</p>;
  }

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <SymDashboardHeader
        title={isEditMode ? "Edit Address" : "Add New Address"} // Dynamic title based on mode
        Icon={Place}
        buttonText={"Save Changes"} // Consistent button text for save/update
        onClick={handleSave} // Always call handleSave
        loading={loading} // Pass loading state to the header button
      />

      {/* FORM AREA */}
      <Card sx={{ p: 3, pt: 4 }}>
        {/* Address Name Input Field - Now correctly receives errors prop */}
        <SymTextField
          title="Address Name"
          value={address.name}
          placeholder="Enter address name"
          onChange={(e) => handleChange('name', e.target.value)}
          mandatory={true} // Visually marks the field as required
          error={!!fieldErrors.name} // Pass the error boolean from fieldErrors
          helperText={fieldErrors.name} // Pass the error message from fieldErrors
          color="#000" // Ensure color prop is passed if needed
          sx={{
            mb:3
          }}
        />
        <AddressForm
          section="address"
          color="#000"
          data={address}
          onChange={(field, value) => handleChange(field, value)}
          errors={fieldErrors} // Pass field-specific errors to the form
          dialogContentRef={dialogContentRef} // Pass the ref to the AddressForm
        />
      </Card>
    </Fragment>
  );
}
