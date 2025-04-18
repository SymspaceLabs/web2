"use client";

// CUSTOM ICON COMPONENTS
import appIcons from "@/icons"; // ==============================================================

// ==============================================================
export default function IconComponent({
  icon,
  isActive,
  ...props
}) {
  const Icon = appIcons[icon];
  return <Icon sx={{ fontSize: 24, color: isActive ? "#007BFF" : "#FFF" }} {...props} />;
}