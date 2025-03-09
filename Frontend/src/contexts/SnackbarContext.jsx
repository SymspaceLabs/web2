"use client";

import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext(null);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export default function SnackbarProvider({ 
  children
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showSnackbar = (msg, sev = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}  {/* Ensure children are passed directly */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }}
      >
        <Alert 
          onClose={handleClose} 
          severity={severity} 
          sx={{ 
            background: "linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)", 
            borderRadius: "35px",
            backdropFilter: "blur(10px)", // Optional for a glass effect
            color: "#fff", // Ensure text is visible
            fontWeight: 500,
            px: 3, // Padding for better appearance
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%", // Ensure it takes proper space
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};