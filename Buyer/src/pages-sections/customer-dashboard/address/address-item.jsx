// =================================================
// Address List Item Component
// This component displays an individual address with edit and delete actions.
// It is designed to work with the confirmation dialog in AddressPageView.
// =================================================

import Link from "next/link"; // Keep if you use Link for other purposes, otherwise can be removed.
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete"; // GLOBAL CUSTOM COMPONENTS
import TableRow from "../table-row"; // CUSTOM DATA MODEL
import { useRouter } from "next/navigation"; // Import useRouter for navigation

import { Paragraph } from "@/components/Typography"; // LOCAL CUSTOM COMPONENT

// ==============================================================
export default function AddressListItem({
  address, // The full address object (contains id, name, address1, etc.)
  handleDelete, // This prop is now expected to be the handleOpenConfirmation function from parent
  handleEdit // This prop is for navigating to the edit page
}) {
  const router = useRouter(); // Initialize useRouter for navigation

  const {
    name, // Address Name, used in the confirmation dialog message
    id,
    address1,
    address2,
    city,
    state,
    zip,
    country
  } = address || {};

  const address2Text = address2 ? `${address2},` : '';

  // Handler for clicking the Edit button
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent the TableRow's general click event from firing
    router.push(`/address/${id}/edit`); // Navigate to the edit page for this address
  };

  // Handler for clicking the Delete button
  // This will now correctly pass the entire 'address' object to the 'handleDelete' prop (which is handleOpenConfirmation)
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent the TableRow's general click event from firing
    handleDelete(address); // Pass the entire address object to the parent's handler
  };

  return (
    <TableRow>
      {/* Display Address Name */}
      {/* Fallback to 'Unnamed Address' if 'name' is empty or null */}
      <Paragraph ellipsis>{name || 'Unnamed Address'}</Paragraph>

      {/* Display Full Address Details */}
      <Paragraph ellipsis>{`${address1}, ${address2Text} ${city}, ${state}, ${zip}, ${country}`}</Paragraph>
      
      {/* Action Buttons: Edit and Delete */}
      <Paragraph color="grey.600">
        {/* Edit Button */}
        <IconButton onClick={handleEditClick}>
          <Edit fontSize="small" color="inherit" />
        </IconButton>

        {/* Delete Button - Triggers Confirmation Dialog in Parent */}
        <IconButton onClick={handleDeleteClick}>
          <Delete fontSize="small" color="inherit" />
        </IconButton>
      </Paragraph>
    </TableRow>
  );
}
