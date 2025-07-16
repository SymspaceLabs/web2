"use client"

// =========================================================
// Address Dialog Form
// =========================================================

import { Fragment } from "react";
import { Paragraph } from "../Typography";
import { LogoWithTitle } from './components';
import { AddressForm } from "../custom-forms";
import { SymTextField } from "../custom-inputs";
import { SymButton } from "../custom-components";
import { IconButton, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

// =========================================================

const AddressDialog = ({
    open,
    onClose,
    dialogTitle,
    error,
    loading,
    handleSave,
    addressFormData,
    fieldErrors,
    handleAddressFormChange

}) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            PaperProps={{
                style: {
                    maxWidth: "650px", // Set custom max width here
                    width: "100%", // Ensure responsiveness
                    backgroundColor: "rgba(128, 128, 128, 0.4)", // Changed to grey with transparency
                    backdropFilter: 'blur(10px)',
                    borderRadius: '40px',
                    boxShadow:
                        "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
                },
            }}
        >
            <DialogTitle id="scroll-dialog-title" sx={{ position: "relative" }}>
                <LogoWithTitle title={dialogTitle} />
                <IconButton
                    onClick={onClose}
                    sx={styles.closeBtn}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ padding: {xs:0, sm:3}, background: 'transparent' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                            <CircularProgress />
                            <Paragraph ml={2}>Loading address details...</Paragraph>
                        </Box>
                    ) : error ? (
                        <Paragraph color="error" sx={{ textAlign: "center", mt: 2 }}>Error: {error}</Paragraph>
                    ) : (
                        <Fragment>
                            {/* Address Name Input Field */}
                            <SymTextField
                                title="Address Name"
                                value={addressFormData.name}
                                placeholder="Enter address name (e.g., Home, Work)"
                                onChange={(e) => handleAddressFormChange('name', e.target.value)}
                                mandatory={true}
                                error={!!fieldErrors.name}
                                helperText={fieldErrors.name}
                                color="#000"
                                sx={{ mb: 3 }}
                            />
                            {/* Address Details Form */}
                            <AddressForm
                                section="address"
                                color="#000"
                                data={addressFormData}
                                onChange={(field, value) => handleAddressFormChange(field, value)}
                                errors={fieldErrors}
                            />
                        </Fragment>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ display: "flex", justifyContent: "space-between", padding: {xs:2, sm:"35px"} }}>
                <Box sx={{width:'100%', p:'10px' }}>
                    <SymButton
                        sx={styles.saveBtn}
                        loading={loading}
                        onClick={handleSave}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </SymButton>
                </Box>
            </DialogActions>
        </Dialog>
    );
};


export default AddressDialog


const styles = {
    saveBtn : {
        background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
        boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(50px)",
        borderRadius: "12px",
        color: '#fff',
        py: 1.5,
        '&:hover': {
            background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)"
        },
    },
    closeBtn : {
        position: "absolute",
        top: 15,
        right: 25,
        color: "#ffffff",
        backgroundColor: "rgba(0,0,0,0.5)",
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
        },
    }
}
