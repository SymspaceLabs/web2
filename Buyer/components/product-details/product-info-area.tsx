"use client"

// ==============================================================================
// ProductInfoArea
// ==============================================================================

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"
import { Product } from "@/types/products"
import { AvailabilityData } from "@/types/products"
import { ProductColor, ProductSize } from "@/types/favorites"
import { Loader2, ChevronDown, ChevronUp } from "lucide-react"

// ── helpers ──────────────────────────────────────────────────────────────────

const cleanHtml = (html: string | undefined) =>
  html ? html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

function currency(val: number | undefined) {
  if (val === undefined) return "$0.00";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);
}

// ── Accordion (replaces MUI SymAccordion) ────────────────────────────────────

function Accordion({ title, content }: { title: string; content?: string }) {
  const [open, setOpen] = useState(false);
  if (!content) return null;
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left text-sm font-semibold text-[#353535] hover:text-[#0366FE] transition-colors"
      >
        <span>{title}</span>
        {open ? <ChevronUp className="size-4 flex-shrink-0" /> : <ChevronDown className="size-4 flex-shrink-0" />}
      </button>
      {open && (
        <div className="pb-4 text-sm text-gray-600 leading-relaxed">
          {cleanHtml(content)}
        </div>
      )}
    </div>
  );
}

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ value = 4, count = 50 }: { value?: number; count?: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={cn("size-5", star <= value ? "text-yellow-400" : "text-gray-200")}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-500 leading-none">({count})</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface Props {
  product:             Product;
  selectedColor:       ProductColor | null;
  selectedSize:        ProductSize | null;
  availability:        AvailabilityData | null;
  loadingAvailability: boolean;
  sizeError:           boolean;
  setSizeError:        (v: boolean) => void;
  onColorSelect:       (color: ProductColor) => void;
  onSizeSelect:        (size: ProductSize) => void;
  onAddToCart:         () => void;
  onBuyNow:            () => void;
  onOpenSidenav:       () => void;
  onOpenSizeChart:     () => void;
  openModal:           boolean;
}

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
  const { colors, sizes, description, name, company, sizeFit, displayPrice } = product || {};

  // ── Price logic (mirrors MUI getDisplayPrice) ─────────────────────────────
  const priceInfo = useMemo(() => {
    if (availability && selectedColor && selectedSize) {
      return {
        current:   availability.hasSale ? availability.salePrice : availability.price,
        original:  availability.price,
        hasSale:   availability.hasSale,
        showRange: false,
      };
    }
    return {
      range:     displayPrice?.range ?? "$0",
      hasSale:   displayPrice?.hasSale ?? false,
      showRange: true,
    };
  }, [availability, selectedColor, selectedSize, displayPrice]);

  const isOutOfStock = availability?.stock === 0;
  const sizeChartUrl = selectedSize?.sizeChartUrl ?? null;

  return (
    // mirrors MUI FlexCol gap + sx={styles.productCard}
    <div className="flex flex-col gap-3 sm:gap-4 rounded-xl p-4 sm:p-6">

      {/* ── Brand ──────────────────────────────────────────────── */}
      <Link
        href={`/company/${company?.slug}`}
        className="text-[#0366FE] text-xs sm:text-sm uppercase font-medium hover:underline"
      >
        {company?.entityName}
      </Link>

      {/* ── Product Title ───────────────────────────────────────── */}
      <h1 className="text-[18px] sm:text-[20px] font-bold text-black mb-1 leading-snug">
        {name}
      </h1>

      {/* ── Rating ─────────────────────────────────────────────── */}
      <StarRating value={4} count={50} />

      {/* ── Price + Stock status ────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {loadingAvailability && selectedColor && selectedSize ? (
          <Loader2 className="size-5 animate-spin text-gray-400" />
        ) : priceInfo.showRange ? (
          <span className="text-xl font-semibold text-black">{priceInfo.range}</span>
        ) : (
          <>
            <span className="text-xl font-semibold text-black">
              {currency(priceInfo.current)}
            </span>
            {priceInfo.hasSale && (
              <span className="text-sm text-gray-400 line-through">
                {currency(priceInfo.original)}
              </span>
            )}
          </>
        )}

        {/* Status pill — only when variant is resolved */}
        {selectedColor && selectedSize && availability?.status && (
          <span
            className="ml-1 px-3 py-0.5 rounded-full text-sm font-semibold"
            style={{
              color: availability.statusColor,
              // Light tinted background matching the status color
              background: `${availability.statusColor}22`,
            }}
          >
            {availability.status}
          </span>
        )}
      </div>

      {/* ── Color selection ─────────────────────────────────────── */}
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-sm text-[#353535]">
          COLOR:{" "}
          <span className="font-bold">
            {selectedColor?.name ?? selectedColor?.code ?? "Not selected"}
          </span>
        </p>
        <div className="flex gap-2 flex-wrap">
          {colors?.map((color) => {
            const isSelected = selectedColor?.id === color.id;
            return (
              <button
                key={color.id}
                onClick={() => onColorSelect(color)}
                title={color.name ?? color.code}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-full border-2 transition-all bg-white text-sm font-medium",
                  isSelected
                    ? "border-[#0366FE]"
                    : "border-[#D1D5DB] hover:border-[#9CA3AF]"
                )}
              >
                {/* Circle swatch */}
                <span
                  className="w-[18px] h-[18px] rounded-full border border-black/10 flex-shrink-0"
                  style={{ backgroundColor: color.code }}
                />
                <span className="text-gray-800">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Size selection ──────────────────────────────────────── */}
      <div className="flex flex-col mb-2">
        {/* Header row with label and size chart link */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-[#353535]">
            SIZE:{" "}
            <span className="font-bold">{selectedSize?.size ?? ""}</span>
          </p>
          <button
            onClick={sizeChartUrl ? onOpenSizeChart : undefined}
            disabled={!sizeChartUrl}
            className={cn(
              "text-sm font-medium underline transition-colors",
              sizeChartUrl
                ? "text-black cursor-pointer hover:text-[#0366FE]"
                : "text-gray-300 cursor-not-allowed pointer-events-none"
            )}
          >
            View Size Chart
          </button>
        </div>

        {/* Pill select + Personalized Sizing button row — mirrors MUI FlexBox gap */}
        <div className="flex gap-4 sm:gap-6 py-2 items-stretch">
          {/* ── Pill-shaped <select> ── */}
          <div className="flex-1 relative">
            <select
              value={selectedSize?.id ?? ""}
              onChange={(e) => {
                const found = sizes?.find((s) => s.id === e.target.value);
                if (found) { onSizeSelect(found); setSizeError(false); }
              }}
              className={cn(
                "w-full h-full appearance-none bg-white border-2 rounded-full",
                "px-5 py-4 pr-10 text-sm text-gray-700 outline-none cursor-pointer transition-colors",
                sizeError ? "border-red-500" : "border-gray-300 hover:border-gray-500 focus:border-[#0366FE]"
              )}
            >
              <option value="" disabled>Select a size</option>
              {sizes?.map((size) => (
                <option key={size.id} value={size.id}>{size.size}</option>
              ))}
            </select>
            {/* Chevron indicator */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <ChevronDown className="size-4" />
            </span>
          </div>

          {/* Personalized Sizing button — mirrors MUI styles.personalised */}
          <button
            onClick={onOpenSidenav}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border-2 border-[#0366FE] text-[#0366FE] hover:bg-[#0366FE] hover:text-white transition-colors whitespace-nowrap"
          >
            Personalized Sizing
          </button>
        </div>
      </div>

      {/* ── CTA Buttons ─────────────────────────────────────────── */}
      <div className="flex items-center gap-4 sm:gap-6 py-1">
        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "flex-1 py-3 rounded-full text-sm font-semibold border-2 transition-all",
            isOutOfStock
              ? "bg-gray-400/55 text-white border-white cursor-not-allowed pointer-events-none"
              : "bg-[#0366FE] text-white border-[#0366FE] hover:bg-[#024fc4] hover:border-[#024fc4]"
          )}
        >
          Add to Cart
        </button>

        {/* Buy Now */}
        <button
          onClick={onBuyNow}
          disabled={isOutOfStock}
          className={cn(
            "flex-1 py-3 rounded-full text-sm font-semibold border-2 transition-all",
            isOutOfStock
              ? "bg-gray-400/55 text-white border-white cursor-not-allowed pointer-events-none"
              : "bg-transparent text-[#0366FE] border-[#0366FE] hover:bg-[#0366FE] hover:text-white"
          )}
        >
          Buy now
        </button>
      </div>

      {/* ── Accordions (mirrors MUI SymAccordion) ───────────────── */}
      <div className="mt-4">
        <Accordion title="Product Details" content={description} />
        <Accordion title="Brand"           content={company?.description} />
        <Accordion title="Size and fit"    content={sizeFit} />
      </div>
    </div>
  );
}