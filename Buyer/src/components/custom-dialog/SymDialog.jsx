"use client";

// =========================================================
// SymDialog | Custom Dialog Component for:
// - user login 
// =========================================================

import { Fragment } from "react";
import { Dialog } from '@mui/material';

// ==============================================================

export default function SymDialog({ 
  dialogOpen, 
  toggleDialog,
  children
}) {  
  return (
    <Fragment>
      {/* Login Dialog */}
      <Dialog 
        PaperProps={{ 
          style: { 
            background: 'rgba(255, 255, 255, 0.39)', 
            borderRadius: '40px', 
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
            backdropFilter: 'blur(7.2px)', 
            WebkitBackdropFilter: 'blur(7.2px)', 
            border: '1px solid rgba(255, 255, 255, 0.72)' 
          }
        }}
        scroll="body" 
        open={dialogOpen} 
        fullWidth 
        onClose={toggleDialog} 
        sx={{ zIndex: 9999 }}
      >
        {children}
      </Dialog>
    </Fragment>
  );
}