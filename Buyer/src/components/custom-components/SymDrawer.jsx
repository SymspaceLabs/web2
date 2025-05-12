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
        PaperProps={{
          sx: {
            zIndex: 13000,
            height: '100vh', // Make sure it's full height
            position: 'fixed',
            top: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(50px)',
          }
        }}        
      >
        {children}
      </Drawer>

    </Fragment>
  );
}