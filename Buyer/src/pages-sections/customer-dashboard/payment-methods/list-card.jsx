"use client";

import React, { useState } from 'react'; // Import useState
import { Box, Card, Typography, Button, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Import a default icon
import Link from "next/link"; // Import Link for navigation
import Image from "next/image";
import Edit from "@mui/icons-material/Edit"; // Import Edit icon
import Delete from "@mui/icons-material/Delete"; // Import Delete icon
import TableRow from "../table-row";
import { Paragraph } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";

// Define the mapping for card brand names to their SVG paths
const cardLogoPaths = {
  visa: '/assets/images/credit-cards/visa.svg', // Assuming /visa.svg is directly in public
  mastercard: '/assets/images/credit-cards/mastercard.svg',
  amex: '/assets/images/credit-cards/amex.svg',
  discover: '/assets/images/credit-cards/discover.svg',
  diners: '/assets/images/credit-cards/diners.svg',
  jcb: '/assets/images/credit-cards/jcb.svg',
};

export default function ListCard({
  id,
  exp,
  card_no,
  payment_method,
  isDefault,
  onSetDefault,
  onDelete
}) {
    
  const logoSrc = cardLogoPaths[payment_method?.toLowerCase()];
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State for confirmation dialog
  const [imageLoadError, setImageLoadError] = useState(false); // NEW: State to track image loading errors

  // Reset imageLoadError when logoSrc changes (e.g., if payment_method updates)
  React.useEffect(() => {
    setImageLoadError(false);
  }, [logoSrc]);

  // Handler to open the confirmation dialog
  const handleOpenConfirmDialog = (e) => {
    e.stopPropagation(); // Prevent row click event if any
    setOpenConfirmDialog(true);
  };

  // Handler to close the confirmation dialog
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  // Handler to confirm deletion
  const handleConfirmDelete = () => {
    onDelete(id); // Call the actual delete function passed from parent
    handleCloseConfirmDialog(); // Close the dialog
  };

  return (
    <TableRow
      sx={{
        boxShadow: isDefault ? 4 : 1, // Stronger shadow for default card
        borderColor: isDefault ? 'primary.main' : 'transparent', // Highlight border for default
        borderWidth: isDefault ? 2 : 0,
        borderStyle: 'solid',
        '&:hover': {
          boxShadow: isDefault ? 6 : 3, // Even stronger shadow on hover for default
        }
      }}
    >
      <FlexBox alignItems="center" gap={2} minWidth={145}> {/* Adjusted minWidth for better spacing */}
        <Card sx={{
          width: 42,
          height: 28,
          borderRadius: 1,
          display: 'flex', // Ensures content is centered
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // Hides overflow if image is too big
        }}>
          {/* Conditional rendering: If logoSrc exists AND no image loading error, show Image. Otherwise, show CreditCardIcon. */}
          {(logoSrc && !imageLoadError) ? (
            <Image
              width={42}
              height={30} // Adjusted height for better aspect ratio with 42 width
              alt={payment_method}
              src={logoSrc}
              style={{ objectFit: 'contain' }} // Ensures image fits within bounds
              onError={() => setImageLoadError(true)} // Set error state if image fails to load
            />
          ) : (
            // Default icon if logoSrc is not found or image failed to load
            <CreditCardIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
          )}
        </Card>

        {isDefault && (
          <Chip
            label="Default"
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              color: 'primary.main',
              borderColor: 'primary.main',
              fontWeight: 'medium',
              borderRadius: '16px',
              height: 24,
              px: '8px',
            }}
          />
        )}
      </FlexBox>

      {/* Card Number and Expiration Date */}
      <Paragraph>{card_no}</Paragraph>
      <Paragraph>{exp}</Paragraph>

      {/* Set as Default Button */}
      <Button
        variant="outlined"
        size="small"
        disabled={isDefault} // Disable if already default
        sx={{ ml: 2, flexShrink: 0 }}
        onClick={() => onSetDefault(id)} // Call the handler with card ID
      >
        Set as Default
      </Button>

      {/* Action Buttons (Edit and Delete) */}
      <Paragraph textAlign="center" color="grey.600">
        <IconButton LinkComponent={Link} href={`/payment-methods/${id}`}>
          <Edit fontSize="small" color="inherit" />
        </IconButton>

        {/* Attach onDelete handler to the Delete button */}
        <IconButton onClick={handleOpenConfirmDialog}> {/* Call the new handler */}
          <Delete fontSize="small" color="inherit" />
        </IconButton>
      </Paragraph>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this credit card?</Typography>
          <Typography variant="body2" color="text.secondary">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
