// =========================================================
// Side drawer for shopping cart.
// =========================================================

import { Fragment } from "react";
import { Drawer } from '@mui/material';
import { MiniCart } from "@/components/mini-cart";

// ==============================================================

export default function SymRightDrawer(props) {  
  const { sidenavOpen, toggleSidenav } = props;

  return (
    <Fragment>

      {/* Side Drawer for MiniCart */}
      <Drawer
        open={sidenavOpen}
        anchor="right"
        onClose={toggleSidenav}
        sx={{ zIndex: 9999,
          "& .MuiDrawer-paper": {
            backgroundColor: "transparent",
            boxShadow: "none", // Removes shadow if needed
          }
        }}
      >
        <MiniCart
          toggleSidenav={toggleSidenav}
        />
      </Drawer>

    </Fragment>
  );
}