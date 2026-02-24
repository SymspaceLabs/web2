"use client";

// =========================================================
// Favorites Drawer
// =========================================================

import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { X, ShoppingCart, Heart, ChevronDown, Loader2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { fetchProductAvailability } from "@/api/product";

// =========================================================
// TYPES
// =========================================================

interface ColorOption {
  id?: string;
  value: string;
  label: string;
}

interface SizeOption {
  value: string;
  label: string;
}

interface ProductImage {
  colorCode: string;
  url: string;
}

interface Availability {
  variantId: string;
  stock: number;
  price: number;
  salePrice?: number;
  hasSale?: boolean;
}

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  imgUrl?: string;
  image?: string;
  images?: ProductImage[];
  slug?: string;
  colors?: ColorOption[];
  sizes?: SizeOption[];
  _favoriteKey?: string;
  selectedVariant?: {
    color?: ColorOption;
    size?: { value: string };
  };
}

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: FavoriteItem[];
}

// =========================================================
// COLOR DROPDOWN
// =========================================================

function ColorDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: ColorOption | null) => void;
  options: ColorOption[];
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" style={{ flex: 1 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center h-10 w-full rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        style={{ paddingLeft: 6, paddingRight: 8, gap: 6 }}
      >
        <span
          style={{
            width: 24, height: 24, borderRadius: '50%',
            backgroundColor: selected?.value || '#ccc',
            border: '0.5px solid #000', flexShrink: 0, display: 'inline-block',
          }}
        />
        <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[1999]" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-2xl py-1" style={{ zIndex: 2000, minWidth: 150 }}>
            {options.map((opt) => (
              <button key={opt.value} type="button" onClick={() => { onChange(opt); setOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: opt.value, border: '0.5px solid #000', flexShrink: 0, display: 'inline-block' }} />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// =========================================================
// SIZE DROPDOWN
// =========================================================

function SizeDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: SizeOption[];
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" style={{ flex: 1 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center h-10 w-full rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium"
        style={{ paddingLeft: 14, paddingRight: 8, gap: 4 }}
      >
        <span className="flex-1 text-left truncate">{selected?.label || 'Size'}</span>
        <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[1999]" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-2xl py-1" style={{ zIndex: 2000, minWidth: 110 }}>
            {options.map((opt) => (
              <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// =========================================================
// EMPTY STATE
// =========================================================

function EmptyView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
        <Heart className="w-9 h-9 text-white/20" />
      </div>
      <p className="text-white/70 font-medium text-base mb-1">No favorites yet</p>
      <p className="text-white/40 text-sm mb-6">Start adding items you love!</p>
      <Button onClick={onClose} className="bg-gradient-to-r from-[#3084FF] to-[#1D4F99] hover:opacity-90 text-white rounded-xl px-6">
        Explore Products
      </Button>
    </div>
  );
}

// =========================================================
// MINI CART ITEM
// =========================================================

function MiniCartItem({ item, onRemove }: { item: FavoriteItem; onRemove: (key: string) => void }) {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { dispatch: favoritesDispatch } = useFavorites();

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(
    item.selectedVariant?.color || item.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    item.selectedVariant?.size?.value || item.sizes?.[0]?.value || ''
  );
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [stockWarningMessage, setStockWarningMessage] = useState('');
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [displayImage, setDisplayImage] = useState(item.imgUrl || item.image || '');

  useEffect(() => {
    const checkAvailability = async () => {
      setStockWarningMessage('');
      if (!item.id || !selectedColor?.value || !selectedSize) {
        setAvailability(null);
        if (!selectedSize) setStockWarningMessage("Select size");
        else if (!selectedColor?.value) setStockWarningMessage("Select color");
        return;
      }
      setLoadingAvailability(true);
      try {
        const data = await fetchProductAvailability(item.id, selectedColor.id ?? '', selectedSize);
        setAvailability(data);
        setStockWarningMessage(data?.stock === 0 ? "Out of Stock" : "");
      } catch (err) {
        console.error("Error fetching availability:", err);
        setAvailability(null);
      } finally {
        setLoadingAvailability(false);
      }
    };
    checkAvailability();
  }, [item.id, selectedColor, selectedSize]);

  useEffect(() => {
    if (selectedColor && item.images?.length) {
      const match = item.images.find(img => img.colorCode === selectedColor.value);
      setDisplayImage(match?.url || item.imgUrl || item.image || '');
    } else {
      setDisplayImage(item.imgUrl || item.image || '');
    }
  }, [selectedColor, item.images, item.imgUrl, item.image]);

  const priceInfo = (() => {
    if (availability && selectedColor && selectedSize) {
      return {
        current: availability.hasSale ? availability.salePrice! : availability.price,
        original: availability.price,
        showOriginal: !!availability.hasSale,
      };
    }
    return {
      current: item.salePrice || item.price,
      original: item.price,
      showOriginal: !!(item.salePrice && item.salePrice < item.price),
    };
  })();

  const isAddToCartDisabled =
    availability?.stock === 0 || loadingAvailability || !selectedSize || !selectedColor?.value;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor?.value) { toast.warning("Please select options"); return; }
    if (!availability?.variantId) { toast.error("Product information not loaded"); return; }
    if (availability.stock === 0) { toast.error("Product is out of stock"); return; }
    const cartItem = (cartState.cart as any[]).find((c) => c.variantId === availability.variantId);
    if ((cartItem?.quantity || 0) >= availability.stock) { toast.warning(`Maximum stock (${availability.stock}) already in cart`); return; }
    cartDispatch({ type: "ADD_TO_CART", payload: { variantId: availability.variantId, quantity: 1 } });
    toast.success(`${item.name} added to cart!`);
    favoritesDispatch({ type: "REMOVE_FAVORITE", payload: item._favoriteKey || item.id });
  };

  const hasColors = !!(item.colors && item.colors.length > 0);
  const hasSizes = !!(item.sizes && item.sizes.length > 0);
  const hasDropdowns = hasColors || hasSizes;

  return (
    <div className="mx-3 my-3 p-4 rounded-2xl border border-white/20 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.12)' }}>
      <div className="flex gap-3 mb-3">
        {/* Image */}
        <Link href={item.slug ? `/products/${item.slug}` : '#'} className="flex-shrink-0 self-center">
          <div className="rounded-xl overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-200 bg-white/10 border border-white/15" style={{ width: 90, height: 90 }}>
            {displayImage
              ? <img src={displayImage} alt={item.name} className="w-full h-full object-contain" />
              : <Heart className="w-7 h-7 text-white/20" />
            }
          </div>
        </Link>

        {/* Right side */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-start gap-1">
            <Link href={item.slug ? `/products/${item.slug}` : '#'} className="flex-1 min-w-0">
              <p className="text-white font-semibold text-[15px] leading-[1.3] line-clamp-2 tracking-[-0.01em] hover:text-white/80 transition-colors">
                {item.name}
              </p>
            </Link>
            <button type="button" onClick={() => onRemove(item._favoriteKey || item.id)}
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 hover:rotate-90 transition-all duration-200 -mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {loadingAvailability
              ? <Loader2 className="w-3.5 h-3.5 text-white/50 animate-spin" />
              : <>
                  <span className="text-white font-bold text-[15px]">${priceInfo.current?.toFixed(2)}</span>
                  {priceInfo.showOriginal && (
                    <span className="text-white/40 text-[14px] line-through">${priceInfo.original?.toFixed(2)}</span>
                  )}
                </>
            }
          </div>

          {/* Dropdowns */}
          {hasDropdowns && (
            <div className="flex gap-2 mt-1">
              {hasColors && (
                <ColorDropdown
                  value={selectedColor?.value || ''}
                  onChange={(opt) => setSelectedColor(opt)}
                  options={item.colors!}
                />
              )}
              {hasSizes && (
                <SizeDropdown
                  value={selectedSize}
                  onChange={setSelectedSize}
                  options={item.sizes!}
                />
              )}
            </div>
          )}

        </div>
      </div>

      {/* ADD TO CART */}
      <button
        type="button"
        disabled={isAddToCartDisabled}
        onClick={handleAddToCart}
        className="flex items-center justify-center gap-2 mx-auto px-8 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: isAddToCartDisabled ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #0366FE 0%, #0052CC 100%)',
          boxShadow: isAddToCartDisabled ? 'none' : '0 4px 12px rgba(3,102,254,0.35)',
        }}
      >
        {loadingAvailability
          ? <Loader2 className="w-4 h-4 animate-spin" />
          : <><ShoppingCart className="w-4 h-4" />ADD TO CART</>
        }
      </button>

      {stockWarningMessage && (
        <p className="text-center text-[11px] font-bold text-[#FF4E4E] uppercase tracking-[0.05em] mt-2">
          {stockWarningMessage}
        </p>
      )}
    </div>
  );
}

// =========================================================
// TOP HEADER
// =========================================================

function TopHeader({ total, onClose }: { total: number; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
      <div className="flex items-center gap-2.5">
        <Heart className="w-5 h-5 text-white/70" />
        <h2 className="text-white font-bold text-lg font-elemental lowercase">favorites</h2>
        <span className="bg-[#3084FF] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {total > 9 ? '9+' : total}
        </span>
      </div>
      <button type="button" onClick={onClose}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// =========================================================
// MAIN EXPORT
// =========================================================

export const FavoritesDrawer = memo(({ isOpen, onClose, items }: FavoritesDrawerProps) => {
  const { dispatch } = useFavorites();

  const removeFromFavorites = (favoriteKey: string) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: favoriteKey });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] p-0 border-white/10 flex flex-col h-screen"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(50px)",
          position: 'fixed',
          top: 0,
          zIndex: 13000,
        }}
      >
        <TopHeader total={items.length} onClose={onClose} />

        {items.length === 0 ? (
          <EmptyView onClose={onClose} />
        ) : (
          <div className="flex-1 overflow-y-auto py-1" style={{ height: 'calc(100vh - 74px)' }}>
            {items.map((item) => (
              <MiniCartItem
                key={item._favoriteKey || item.id}
                item={item}
                onRemove={removeFromFavorites}
              />
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
});

FavoritesDrawer.displayName = "FavoritesDrawer";