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
import { Box, Chip } from "@mui/material"; // Import Box and Chip for styling

// ==============================================================
export default function AddressListItem({
  address, // The full address object (contains id, name, address1, etc., including isDefault)
  handleDelete // This prop is now expected to be the handleOpenConfirmation function from parent
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
    country,
    isDefault // Destructure isDefault from the address object
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
    <TableRow
      sx={{
        border: isDefault ? '2px solid #007bff' : 'none', // Apply blue border if isDefault is true
        mb: 2, // Add some margin-bottom for separation if needed
      }}
    >
      {/* Display Address Name */}
      {/* Fallback to 'Unnamed Address' if 'name' is empty or null */}
      <Box display="flex" alignItems="center" gap={1}> {/* Use Box for flex container */}
        <Paragraph ellipsis>{name || 'Unnamed Address'}</Paragraph>
        {isDefault && ( // Conditionally render the Chip if isDefault is true
          <Chip
            label="Default"
            size="small"
            sx={{
              backgroundColor: '#c1d4f7', // Blue background for the chip
              color: '#0004ff', // White text color
              fontWeight: 'bold',
              height: '20px', // Adjust height as needed
            }}
          />
        )}
      </Box>

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
