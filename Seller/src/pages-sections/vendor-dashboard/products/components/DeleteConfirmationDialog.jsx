import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Typography, DialogContentText} from "@mui/material";

import Delete from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import CancelIcon from "@mui/icons-material/Cancel";

import { H1 } from "@/components/Typography";

// ========================================================================
// Reusable Delete Confirmation Dialog Component
// ========================================================================
const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  itemName, // e.g., "Samsung TV"
  itemType = "item" // e.g., "product", "user", "item"
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
            borderRadius: 4, // Increased rounding for the dialog (e.g., 16px)
            maxWidth: 500, // Set a max width for a modal feel
            width: '100%',
        }
      }}
    >
      {/* Custom Dialog Title with Red Background */}
      <DialogTitle sx={{ 
        padding: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <H1 fontSize={18}>Delete {itemType}</H1>
        <IconButton 
          aria-label="close" 
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
            <DialogContentText>
            Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
            </DialogContentText>
        </DialogContent>

      {/* Custom Dialog Content */}
      {/* <DialogContent sx={{ 
        textAlign: 'center', 
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <WarningIcon sx={{ 
          fontSize: 60, 
          color: '#FF6B6B', // Custom red color
          marginBottom: 2,
        }} />

        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Are you sure you want to delete the {itemType}: <strong>{itemName}</strong>?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This action cannot be undone.
        </Typography>
      </DialogContent> */}

      {/* Custom Dialog Actions */}
      <DialogActions sx={{ p: 3 }}>
        {/* Cancel Button */}
        <Button 
            onClick={onClose} 
            variant="contained" // Contained variant for the cancel button
            startIcon={<CancelIcon />}
            sx={{
              backgroundColor: '#E0E0E0', // Light gray background
              color: 'black', // Black text
              borderRadius: 10, // Increased rounding
              padding: '10px 20px', // Increased size
              '&:hover': {
                backgroundColor: '#D0D0D0',
              }
            }}
          >
            Cancel
          </Button>
          
          <Button 
            onClick={onConfirm} 
            variant="contained"
            startIcon={<Delete />}
            sx={{ 
              backgroundColor: '#FF6B6B', // Custom red color
              color: 'white',
              borderRadius: 10, // Increased rounding
              padding: '10px 20px', // Increased size
              '&:hover': {
                backgroundColor: '#E55A5A', // Slightly darker red on hover
              }
            }}
            autoFocus
          >
            Delete
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
