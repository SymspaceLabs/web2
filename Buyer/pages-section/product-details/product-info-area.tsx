"use client"

// ==============================================================================
// ProductInfoArea — mirrors MUI structure exactly:
// - productCard glass card wraps ONLY the product info
// - Accordions are SIBLINGS below the card, not inside it
// ==============================================================================

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"
import { Product, AvailabilityData } from "@/types/products"
import { ProductColor, ProductSize } from "@/types/favorites"
import { Loader2, ChevronDown } from "lucide-react"

const GLASSMORPHIC_BG = "linear-gradient(117.54deg, rgba(255,255,255,0.5) -19.85%, rgba(235,235,235,0.367354) 4.2%, rgba(224,224,224,0.287504) 13.88%, rgba(212,212,212,0.21131) 27.98%, rgba(207,207,207,0.175584) 37.8%, rgba(202,202,202,0.143432) 44.38%, rgba(200,200,200,0.126299) 50.54%, rgba(196,196,196,0.1) 60.21%)"
const GLASSMORPHIC_SHADOW = "0px 1px 24px -1px rgba(0,0,0,0.18)"

function currency(val: number | undefined) {
  if (val === undefined) return "$0.00"
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val)
}

// ── Glassmorphic Accordion ────────────────────────────────────────────────────

function Accordion({ title, content }: { title: string; content?: string }) {
  const [open, setOpen] = useState(false)
  if (!content) return null
  return (
    <div
      className="rounded-[15px] sm:rounded-[30px] overflow-hidden"
      style={{
        background: GLASSMORPHIC_BG,
        boxShadow: GLASSMORPHIC_SHADOW,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 relative z-10 rounded-[15px] sm:rounded-[30px] text-left cursor-pointer"
        style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.15)" }}
      >
        <span className="font-elemental lowercase text-[16px] sm:text-[24px] text-[#353535]">{title}</span>
        <ChevronDown className={cn("size-5 text-[#353535] flex-shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-6 py-6">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ fontFamily: "Helvetica", fontSize: "16px", color: "#000" }}
          />
        </div>
      )}
    </div>
  )
}

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ value = 4, count = 50 }: { value?: number; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className={cn("size-5", star <= value ? "text-yellow-400" : "text-gray-200")} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-500 leading-none">({count})</span>
    </div>
  )
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  product:             Product
  selectedColor:       ProductColor | null
  selectedSize:        ProductSize | null
  availability:        AvailabilityData | null
  loadingAvailability: boolean
  sizeError:           boolean
  setSizeError:        (v: boolean) => void
  onColorSelect:       (color: ProductColor) => void
  onSizeSelect:        (size: ProductSize) => void
  onAddToCart:         () => void
  onBuyNow:            () => void
  onOpenSidenav:       () => void
  onOpenSizeChart:     () => void
  openModal:           boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductInfoArea({
  product,
  selectedColor,
  selectedSize,
  availability,
  loadingAvailability,
  sizeError,
  setSizeError,
  onColorSelect,
  onSizeSelect,
  onAddToCart,
  onBuyNow,
  onOpenSidenav,
  onOpenSizeChart,
}: Props) {
  const { colors, sizes, description, name, company, sizeFit, displayPrice } = product || {}

  const priceInfo = useMemo(() => {
    if (availability && selectedColor && selectedSize) {
      return {
        current:   availability.hasSale ? availability.salePrice : availability.price,
        original:  availability.price,
        hasSale:   availability.hasSale,
        showRange: false,
      }
    }
    return {
      range:     displayPrice?.range ?? "$0",
      hasSale:   displayPrice?.hasSale ?? false,
      showRange: true,
    }
  }, [availability, selectedColor, selectedSize, displayPrice])

  const isOutOfStock = availability?.stock === 0
  const sizeChartUrl = selectedSize?.sizeChartUrl ?? null

  return (
    <div className="flex flex-col gap-4">

      {/* ══ GLASS CARD ══ */}
      <div
        className="flex flex-col gap-4 rounded-[30px] p-6 sm:p-10 box-border"
        style={{
          background: GLASSMORPHIC_BG,
          boxShadow: GLASSMORPHIC_SHADOW,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Brand */}
        <Link href={`/company/${company?.slug}`} className="text-[#0366FE] text-xs sm:text-sm uppercase font-medium hover:underline">
          {company?.entityName}
        </Link>

        {/* Title */}
        <h1 className="text-[18px] sm:text-[20px] font-bold text-black leading-snug">
          {name}
        </h1>

        {/* Rating */}
        <StarRating value={4} count={50} />

        {/* Price + status */}
        <div className="flex flex-wrap items-center gap-3">
          {loadingAvailability && selectedColor && selectedSize ? (
            <Loader2 className="size-6 animate-spin text-gray-400" />
          ) : priceInfo.showRange ? (
            <span style={{ fontSize: "32px", fontWeight: 700, lineHeight: 1, color: "#000" }}>
              {priceInfo.range}
            </span>
          ) : (
            <>
              <span style={{ fontSize: "32px", fontWeight: 700, lineHeight: 1, color: "#000" }}>
                {currency(priceInfo.current)}
              </span>
              {priceInfo.hasSale && (
                <span style={{ fontFamily: "Helvetica", fontWeight: 400, fontSize: "24px", color: "#A0A0A0", textDecoration: "line-through" }}>
                  {currency(priceInfo.original)}
                </span>
              )}
            </>
          )}
          {selectedColor && selectedSize && availability?.status && (
            <span style={{
              padding: "5px 10px",
              background: "linear-gradient(94.91deg, #858585 0%, #FFFFFF 100%)",
              boxShadow: "0px 4px 4px rgba(0,0,0,0.1)",
              borderRadius: "100px",
              fontSize: "14px",
              fontWeight: 600,
              color: availability.statusColor,
            }}>
              {availability.status}
            </span>
          )}
        </div>

        {/* Color selection */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#353535]">
            COLOR: <span className="font-bold">{selectedColor?.name ?? selectedColor?.code ?? "Not selected"}</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {colors?.map((color) => {
              const isSelected = selectedColor?.id === color.id
              return (
                <button
                  key={color.id}
                  onClick={() => onColorSelect(color)}
                  title={color.name ?? color.code}
                  className={cn(
                    "cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-full border-2 transition-all bg-white text-sm font-medium",
                    isSelected ? "border-[#0366FE]" : "border-[#D1D5DB] hover:border-[#9CA3AF]"
                  )}
                >
                  <span className="w-[18px] h-[18px] rounded-full border border-black/10 flex-shrink-0" style={{ backgroundColor: color.code }} />
                  <span className="text-gray-800">{color.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Size selection */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#353535]">
              SIZE: <span className="font-bold">{selectedSize?.size ?? ""}</span>
            </p>
            <button
              onClick={sizeChartUrl ? onOpenSizeChart : undefined}
              disabled={!sizeChartUrl}
              className={cn(
                "text-sm font-medium underline transition-colors",
                sizeChartUrl ? "text-black cursor-pointer hover:text-[#0366FE]" : "text-gray-300 cursor-not-allowed pointer-events-none"
              )}
            >
              View Size Chart
            </button>
          </div>
          <div className="flex gap-3 sm:gap-4 py-2 items-stretch">

            {/* Size dropdown */}
            <div className="flex-1 relative">
              <select
                value={selectedSize?.id ?? ""}
                onChange={(e) => {
                  const found = sizes?.find((s) => s.id === e.target.value)
                  if (found) { onSizeSelect(found); setSizeError(false) }
                }}
                className="w-full h-full appearance-none bg-white outline-none cursor-pointer"
                style={{
                  padding: "16px 40px 16px 16px",
                  border: sizeError ? "2px solid red" : "1px solid #000",
                  borderRadius: "8px",
                  fontFamily: "Helvetica",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#000",
                }}
              >
                <option value="" disabled>Select a size</option>
                {sizes?.map((size) => (
                  <option key={size.id} value={size.id}>{size.size}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown className="size-4" />
              </span>
            </div>

            {/* ── Personalized Sizing button ───────────────────────────
                Hover: blue gradient fill + glow, matching the Buy Now button
                Uses inline onMouseEnter/Leave for precise style control,
                consistent with the existing CTA button pattern in this file.
            ─────────────────────────────────────────────────────────── */}
            <button
              onClick={onOpenSidenav}
              className="flex-shrink-0 cursor-pointer font-elemental lowercase relative overflow-hidden"
              style={{
                padding: "15px 14px",
                border: "2px solid #000",
                borderRadius: "50px",
                fontSize: "13px",
                color: "#000",
                background: "transparent",
                whiteSpace: "nowrap",
                transition: "color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.background  = "rgba(0,0,0,0.04)"
                t.style.borderColor = "#555"
                t.style.boxShadow   = "0px 2px 6px rgba(0,0,0,0.08)"
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.background  = "transparent"
                t.style.borderColor = "#000"
                t.style.boxShadow   = "none"
              }}
            >
              Personalized Sizing
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 py-1">
          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className="flex-1 transition-all font-elemental lowercase"
            style={{
              padding: "16px",
              border: isOutOfStock ? "2px solid #FFF" : "2px solid #000",
              borderRadius: "50px",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              background: isOutOfStock ? "rgba(128,128,128,0.55)" : "transparent",
              color: isOutOfStock ? "#FFF" : "#000",
              cursor: isOutOfStock ? "not-allowed" : "pointer",
              pointerEvents: isOutOfStock ? "none" : "auto",
            }}
            onMouseEnter={(e) => {
              if (isOutOfStock) return
              const t = e.currentTarget
              t.style.background = "linear-gradient(94.44deg, #666666 29%, #000000 100%)"
              t.style.color = "#FFF"
              t.style.border = "2px solid #FFF"
            }}
            onMouseLeave={(e) => {
              if (isOutOfStock) return
              const t = e.currentTarget
              t.style.background = "transparent"
              t.style.color = "#000"
              t.style.border = "2px solid #000"
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={onBuyNow}
            disabled={isOutOfStock}
            className="flex-1 transition-all font-elemental lowercase"
            style={{
              padding: "16px",
              border: isOutOfStock ? "2px solid #FFF" : "2px solid #000",
              borderRadius: "50px",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              background: isOutOfStock ? "rgba(128,128,128,0.55)" : "#000",
              color: "#FFF",
              cursor: isOutOfStock ? "not-allowed" : "pointer",
              pointerEvents: isOutOfStock ? "none" : "auto",
            }}
            onMouseEnter={(e) => {
              if (isOutOfStock) return
              const t = e.currentTarget
              t.style.background = "linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)"
              t.style.border = "2px solid #FFF"
            }}
            onMouseLeave={(e) => {
              if (isOutOfStock) return
              const t = e.currentTarget
              t.style.background = "#000"
              t.style.border = "2px solid #000"
            }}
          >
            Buy now
          </button>
        </div>
      </div>
      {/* ══ END GLASS CARD ══ */}

      {/* ══ ACCORDIONS ══ */}
      <Accordion title="Product Details" content={description} />
      <Accordion title="Brand"           content={company?.description} />
      <Accordion title="Size and fit"    content={sizeFit} />

    </div>
  )
}