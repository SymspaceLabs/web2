"use client";

// =================================================
// Address List Item Component
// =================================================

import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// =================================================

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

interface AddressListItemProps {
  address: Address;
  handleDelete: (address: Address) => void;
}

// =================================================

export default function AddressListItem({
  address,
  handleDelete,
}: AddressListItemProps) {
  const router = useRouter();

  const {
    name,
    id,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    isDefault,
  } = address ?? {};

  const address2Text = address2 ? `${address2},` : "";
  const fullAddress = `${address1}, ${address2Text} ${city}, ${state}, ${zip}, ${country}`;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/addresses/${id}/edit`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDelete(address);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0",
        isDefault && "border-l-4 border-l-blue-500"
      )}
    >
      {/* Left: name + address */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-800 truncate">
            {name || "Unnamed Address"}
          </p>
          {isDefault && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 font-semibold text-[10px] h-5 px-1.5 shrink-0"
            >
              Default
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{fullAddress}</p>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-gray-800"
          onClick={handleEditClick}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-red-600"
          onClick={handleDeleteClick}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}