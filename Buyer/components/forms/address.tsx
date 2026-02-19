"use client";

// =========================================================
// Address Form Component
// =========================================================

import { RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countryList from "@/data/countryList";

// =========================================================

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

// In address form component
interface AddressFormProps {
  data: Address;
  onChange: (field: keyof Address, value: string | boolean) => void;
  errors?: FieldErrors;
  formRef?: RefObject<HTMLDivElement | null>;  // Add | null here
}

interface CountryOption {
  label: string;
  value: string;
}

// =========================================================

export default function AddressForm({
  data,
  onChange,
  errors = {},
}: AddressFormProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Address Line 1 */}
      <div>
        <Label htmlFor="address1" className="text-gray-700 mb-1.5">
          Address Line 1 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="address1"
          value={data.address1}
          placeholder="Enter address line 1"
          onChange={(e) => onChange("address1", e.target.value)}
          className={errors.address1 ? "border-red-500" : ""}
        />
        {errors.address1 && (
          <p className="text-xs text-red-500 mt-1">{errors.address1}</p>
        )}
      </div>

      {/* Address Line 2 (Optional) */}
      <div>
        <Label htmlFor="address2" className="text-gray-700 mb-1.5">
          Address Line 2 (Optional)
        </Label>
        <Input
          id="address2"
          value={data.address2}
          placeholder="Enter address line 2 (optional)"
          onChange={(e) => onChange("address2", e.target.value)}
        />
      </div>

      {/* City, State, Country, Zip Code Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* City */}
        <div className="flex-1">
          <Label htmlFor="city" className="text-gray-700 mb-1.5">
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            value={data.city}
            placeholder="Enter city"
            onChange={(e) => onChange("city", e.target.value)}
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div className="flex-1">
          <Label htmlFor="state" className="text-gray-700 mb-1.5">
            State <span className="text-red-500">*</span>
          </Label>
          <Input
            id="state"
            value={data.state}
            placeholder="Enter state"
            onChange={(e) => onChange("state", e.target.value)}
            className={errors.state ? "border-red-500" : ""}
          />
          {errors.state && (
            <p className="text-xs text-red-500 mt-1">{errors.state}</p>
          )}
        </div>

        {/* Country */}
        <div className="flex-1">
          <Label htmlFor="country" className="text-gray-700 mb-1.5">
            Country <span className="text-red-500">*</span>
          </Label>
          <Select
            value={data.country}
            onValueChange={(val) => onChange("country", val)}
          >
            <SelectTrigger
              id="country"
              className={errors.country ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {(countryList as CountryOption[]).map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-xs text-red-500 mt-1">{errors.country}</p>
          )}
        </div>

        {/* Zip Code */}
        <div className="flex-1">
          <Label htmlFor="zip" className="text-gray-700 mb-1.5">
            Zip Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="zip"
            value={data.zip}
            placeholder="Enter zip code"
            onChange={(e) => onChange("zip", e.target.value)}
            className={errors.zip ? "border-red-500" : ""}
          />
          {errors.zip && (
            <p className="text-xs text-red-500 mt-1">{errors.zip}</p>
          )}
        </div>
      </div>

      {/* Make as Default Checkbox */}
      <div className="flex items-center gap-2 mt-2">
        <Checkbox
          id="isDefault"
          checked={data.isDefault}
          onCheckedChange={(checked) =>
            onChange("isDefault", checked === true)
          }
        />
        <Label
          htmlFor="isDefault"
          className="text-sm text-gray-700 cursor-pointer"
        >
          Save as Default Address
        </Label>
      </div>
    </div>
  );
}