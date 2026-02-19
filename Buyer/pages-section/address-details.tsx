"use client";

// =============================================================
// Address Details Page View
// =============================================================

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import AddressForm from "@/components/forms/address";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";

// =============================================================

interface Address {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  isDefault: boolean;
}

interface FieldErrors {
  [key: string]: string;
}

interface AddressDetailsPageViewProps {
  addressId?: string;
}

// =============================================================

export default function AddressDetailsPageView({
  addressId = "",
}: AddressDetailsPageViewProps) {
  const router = useRouter();
  const { user } = useAuth();

  const isEditMode = !!addressId;

  const [address, setAddress] = useState<Address>({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    isDefault: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const formRef = useRef<HTMLDivElement>(null);

  // Fetch address details in edit mode
  useEffect(() => {
    async function fetchAddressDetails() {
      if (!isEditMode) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${addressId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message ||
              `Failed to fetch address details: ${response.statusText}`
          );
        }

        const data = await response.json();
        setAddress(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while fetching address details.";
        console.error("Error fetching address details:", err);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchAddressDetails();
  }, [addressId, isEditMode]);

  // Handle field changes
  const handleChange = (field: keyof Address, value: string | boolean) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[field];
        return updatedErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    let isValid = true;

    if (!address.name.trim()) {
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

    setFieldErrors(newErrors);
    return isValid;
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    const requestBody = {
      name: address.name,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      isDefault: address.isDefault,
    };

    try {
      let response;
      if (isEditMode) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${addressId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }
        );
      } else {
        if (!user?.id) {
          throw new Error(
            "User not authenticated. User ID is required to create a new address."
          );
        }
        response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...requestBody, userId: user.id }),
          }
        );
      }

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody.message || "Failed to save address.");
      }

      toast.success(responseBody.message);
      router.push("/addresses");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while saving address details.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <p className="text-center py-10">Loading address details...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-center mt-5">Error: {error}</p>;
  }

  return (
    <div
      className="rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px] overflow-hidden"
      style={{
        background:
          "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
      }}
    >
      {/* Header */}
      <SymDashboardHeader
        title={isEditMode ? "Edit Address" : "Add New Address"}
        Icon={MapPin}
        buttonText="Save Changes"
        onClick={handleSave}
        loading={loading}
      />

      {/* Form */}
      <div ref={formRef} className="bg-white p-6 rounded-b-[15px]">
        {/* Address Name */}
        <div className="mb-6">
          <Label htmlFor="address-name" className="text-gray-700 mb-1.5">
            Address Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address-name"
            value={address.name}
            placeholder="Enter address name"
            onChange={(e) => handleChange("name", e.target.value)}
            className={fieldErrors.name ? "border-red-500" : ""}
          />
          {fieldErrors.name && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>
          )}
        </div>

        {/* Address Form */}
        <AddressForm
          data={address}
          onChange={handleChange}
          errors={fieldErrors}
          formRef={formRef}
        />
      </div>
    </div>
  );
}