"use client"

// ==============================================================
// SideDrawer — a reusable right-side slide-in drawer
// Drop-in replacement for MUI <Drawer anchor="right">
// ==============================================================

import { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SideDrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  /** Width of the drawer panel, default "w-[380px]" */
  width?: string
}

export default function SideDrawer({ open, onClose, children, width = "w-[380px] max-w-[95vw]" }: SideDrawerProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else       document.body.style.overflow = ""
    return ()  => { document.body.style.overflow = "" }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[1200] transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full z-[1201] flex flex-col transition-transform duration-300 ease-in-out",
          width,
          open ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          background:
            "linear-gradient(117.54deg, rgba(255,255,255,0.95) -19.85%, rgba(245,245,245,0.6) 4.2%, rgba(240,240,240,0.5) 13.88%, rgba(230,230,230,0.4) 27.98%, rgba(225,225,225,0.35) 37.8%, rgba(220,220,220,0.3) 44.38%, rgba(215,215,215,0.25) 50.54%, rgba(210,210,210,0.2) 60.21%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "15px 0 0 15px",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
        }}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>
  )
}