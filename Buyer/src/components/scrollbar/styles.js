// simplebar-react styles
"use client";

import { alpha, styled } from "@mui/material/styles";
import SimpleBar from "simplebar-react";

export const StyledScrollBar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&.simplebar-visible:before": {
      opacity: 1
    },
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[400], 0.6)
    }
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 9
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6
  },
  "& .simplebar-mask": {
    // CHANGE THIS LINE
    // Set a fixed low z-index. The default value for most content is 0 or auto.
    // Ensure it's lower than the z-index of your dropdown's Popover (which you set to 9999).
    zIndex: 1 // Or any small positive number, definitely not 'inherit'
  },
  // Ensure the content wrapper also doesn't have an interfering z-index
  "& .simplebar-content-wrapper": {
    // You might also need to ensure this doesn't have an interfering z-index
    // Usually, the mask is the one that causes issues with overlays.
  }
}));