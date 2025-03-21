// =========================================================
// Custom Side drawer for
//   - shopping cart
//   - favourites
// =========================================================

import { Fragment } from "react";
import { Drawer } from '@mui/material';

// ==============================================================

export default function SymDrawer(props) {  
  const { open, toggleOpen, children, anchor="right" } = props;

  return (
    <Fragment>

      {/* Side Drawer */}
      <Drawer
        open={open}
        anchor={anchor}
        onClose={toggleOpen}
        // sx={{ zIndex: 9999,
        //   "& .MuiDrawer-paper": {
        //     backgroundColor: "transparent",
        //     boxShadow: "none", // Removes shadow if needed
        //   }
        // }}
        PaperProps={{
          sx: {
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(50px)',
          },
        }}
      >
        {children}
      </Drawer>

    </Fragment>
  );
}