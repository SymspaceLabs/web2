import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENTS
import CancelIcon from "@mui/icons-material/Cancel"; // Added CancelIcon for the button

import { H1 } from "@/components/Typography";

import { FlexBox } from "@/components/flex-box";

import BazaarSwitch from "@/components/BazaarSwitch";
import { Paragraph } from "@/components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "@/lib"; // STYLED COMPONENTS

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; 

import { deleteProduct } from "@/services/productService";

import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";

// ========================================================================

/**
 * Utility function to truncate a string to a specified maximum length.
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum desired length.
 * @returns {string} The truncated string followed by "..." if it was too long, otherwise the original string.
 */
const truncateName = (str, maxLength = 40) => {
    if (!str || str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength) + '...';
};


// ========================================================================
const ProductRow = ({
  product,
  onDeleteSuccess
}) => {

  const {
    category,
    name,
    price,
    image,
    id,
    published,
    slug
  } = product || {};
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(published);

  const [openDialog, setOpenDialog] = useState(false); // State for controlling the dialog

  // Function to open the confirmation dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle the actual product deletion
  const handleDeleteConfirm = async ()  => {
    // Close the dialog
    handleCloseDialog();
    try {
      // Call the service function to delete the product
      await deleteProduct(id);
      if (onDeleteSuccess) {
        onDeleteSuccess(id); // Pass the deleted product's ID back to the parent
      }
    } catch (error) {
      // Error feedback
      console.error(`ERROR: Failed to delete product "${name}" (ID: ${id}).`, error);
    }
  };

  // Apply truncation here
  const truncatedName = truncateName(name, 40); // You can adjust 40 to any character limit you prefer

  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox">
        <StyledTableCell align="left">
          <FlexBox alignItems="center" gap={1.5}>
            <Avatar
              alt={name}
              src={image}
              sx={{
                borderRadius: 2
              }}
            />

            <div>
              <Paragraph fontWeight={600}>
                {truncatedName}
              </Paragraph>
            </div>
          </FlexBox>
        </StyledTableCell>

        <StyledTableCell align="left">
          <CategoryWrapper>{category}</CategoryWrapper>
        </StyledTableCell>

        <StyledTableCell align="left">{currency(price)}</StyledTableCell>

        <StyledTableCell align="left">
          <BazaarSwitch color="info" checked={productPublish} onChange={() => setProductPublish(state => !state)} />
        </StyledTableCell>

        <StyledTableCell align="center">
          <StyledIconButton onClick={() => router.push(`/vendor/products/${id}`)}>
            <Edit />
          </StyledIconButton>

          <StyledIconButton>
            <RemoveRedEye />
          </StyledIconButton>

          <StyledIconButton onClick={handleOpenDialog}>
            <Delete />
          </StyledIconButton>
        </StyledTableCell>
      </StyledTableRow>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteConfirm}
        itemName={name}
        itemType="product" // Pass the specific item type
      />
    </>

  )
  
};

export default ProductRow;