"use client";

import clsx from "clsx"; // STYLED COMPONENT
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "@mui/material/styles/styled";

// Second Navbar's Menu Style
const StyledLink = styled(Link, {
  shouldForwardProp: prop => prop !== "active"
})(({
  theme,
  active
}) => ({
  position: "relative",
  transition: "color 150ms ease-in-out",
  color: active ? theme.palette.primary.main : "#FFF",
  "&:hover": {
    color: '#FFF'
  }
})); // ==============================================================

// ==============================================================
export default function NavLink({
  href,
  children,
  style,
  className,
  ...props
}) {
  const pathname = usePathname(); // CHECK CURRENT ROUTE

  const checkRouteMatch = () => {
    if (href === "/") return pathname === href;
    return pathname.includes(href);
  };

  return <StyledLink href={href} style={style} className={clsx(className)} active={checkRouteMatch() ? 1 : 0} {...props}>
      {children}
    </StyledLink>;
}