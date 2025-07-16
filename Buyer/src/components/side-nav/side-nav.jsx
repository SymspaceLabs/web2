"use client";

// ================================================================
// Side Nav
// ================================================================

import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer"; // GLOBAL CUSTOM COMPONENT

import Scrollbar from "../../components/scrollbar"; 

// ================================================================
export default function SideNav(props) {
  const {
    position = "left",
    open = false,
    width = 280,
    children,
    handler,
    toggle,
    mode = "light"
  } = props;
  const [sideNavOpen, setSideNavOpen] = useState(open);

  const handleToggleSideNav = () => setSideNavOpen(!sideNavOpen);

  useEffect(() => setSideNavOpen(open), [open]);
  const handleClose = toggle || handleToggleSideNav;
  return (
    <div>
      <Drawer
        anchor={position}
        open={sideNavOpen}
        onClose={handleClose}
        SlideProps={{
          style: {
            width
          }
        }}
        sx={{
          zIndex: 15001,
          "& .MuiDrawer-paper": {
            // FIX: Changed backgroundColor to background to support linear-gradient
            background:
              mode === "dark"
                ? "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)"
                : "#fff",
            color: mode === "dark" ? "#fff" : "#000",
            // boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
            // backdropFilter: 'blur(12px)',
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingBottom: "1.5rem",
            width
          }
        }}
      >
        <Scrollbar autoHide={false}>{children}</Scrollbar>
      </Drawer>

      {handler(handleClose)}
    </div>
  );
}