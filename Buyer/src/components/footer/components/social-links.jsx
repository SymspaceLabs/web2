"use client";

import { IconButton } from "@mui/material";
import styled from "@mui/material/styles/styled"; // GLOBAL CUSTOM COMPONENT
import { FlexBox } from "@/components/flex-box"; 
import { SOCIAL_ICON_LINKS } from "../data"; // DATA

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: prop => prop !== "variant"
})(({
  variant,
  theme
}) => ({
  margin: 4,
  fontSize: 16,
  padding: "10px",
  ...(variant === "dark" && {
    ":hover": {
      backgroundColor: theme.palette.grey[800]
    }
  }),
  ".icon": {
    color: "white"
  }
})); // ==============================================================

// ==============================================================
export default function SocialLinks({
  variant = "light",
}) {
  return (
    <FlexBox className="flex" mx={-0.625}>
      {SOCIAL_ICON_LINKS.map(({Icon,url}, ind) => (
        <a href={url} target="_blank" rel="noreferrer noopenner" key={ind}>
          <StyledIconButton variant={variant}>
            <Icon fontSize="inherit" className="icon" />
          </StyledIconButton>
        </a>
      ))}
    </FlexBox>
  );
}