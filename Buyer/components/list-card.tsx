"use client";

// =====================================================
// Payment Method List Card
// =====================================================

import { useState, useEffect } from "react";
import Image from "next/image";
import { CreditCard, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

// =====================================================

const cardLogoPaths: Record<string, string> = {
  visa:       "/images/credit-cards/visa.svg",
  mastercard: "/images/credit-cards/mastercard.svg",
  amex:       "/images/credit-cards/amex.svg",
  discover:   "/images/credit-cards/discover.svg",
  diners:     "/images/credit-cards/diners.svg",
  jcb:        "/images/credit-cards/jcb.svg",
};

interface ListCardProps {
  id: string | number;
  exp: string;
  card_no: string;
  payment_method: string;
  isDefault?: boolean;
  onSetDefault: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

// =====================================================

export default function ListCard({
  id,
  exp,
  card_no,
  payment_method,
  isDefault,
  onSetDefault,
  onDelete,
}: ListCardProps) {
  const logoSrc = cardLogoPaths[payment_method?.toLowerCase()];
  const [imageLoadError, setImageLoadError] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // Reset image error when card brand changes
  useEffect(() => {
    setImageLoadError(false);
  }, [logoSrc]);

  const handleConfirmDelete = () => {
    onDelete(id);
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 gap-3",
          isDefault && "border-l-4 border-l-blue-500"
        )}
      >
        {/* Card logo + default badge */}
        <div className="flex items-center gap-2 min-w-[145px]">
          <div className="w-[42px] h-[28px] rounded flex items-center justify-center overflow-hidden bg-gray-50 border border-gray-200 shrink-0">
            {logoSrc && !imageLoadError ? (
              <Image
                src={logoSrc}
                alt={payment_method}
                width={42}
                height={28}
                className="object-contain"
                onError={() => setImageLoadError(true)}
              />
            ) : (
              <CreditCard className="h-5 w-5 text-gray-400" />
            )}
          </div>

          {isDefault && (
            <Badge
              variant="outline"
              className="text-blue-600 border-blue-500 font-medium text-[10px] h-5 px-1.5 rounded-full shrink-0"
            >
              Default
            </Badge>
          )}
        </div>

        {/* Card number */}
        <p className="text-sm text-gray-700 flex-1 min-w-0 truncate">{card_no}</p>

        {/* Expiry */}
        <p className="text-sm text-gray-500 shrink-0">{exp}</p>

        {/* Set as default */}
        <Button
          variant="outline"
          size="sm"
          disabled={isDefault}
          onClick={() => onSetDefault(id)}
          className="shrink-0"
        >
          Set as Default
        </Button>

        {/* Delete */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-red-600 shrink-0"
          onClick={() => setOpenConfirmDialog(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this credit card? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenConfirmDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}