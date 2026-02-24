"use client"

import Link from 'next/link';
import { memo } from 'react';
import { CartIcon } from './custom-icons';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

// ============================================================================
// TYPES
// ============================================================================

export interface EnrichedCartItem {
  variantId: string;
  quantity: number;
  product?: {
    name: string;
    slug?: string;
  };
  variant?: {
    imageUrl?: string;
    price: number;
    salePrice?: number;
    stock: number;
    color?: { id: string; name: string; code: string };
    size?: { id: string; label: string };
  };
  currentPrice?: number;
  name?: string;
  price?: number;
  image?: string;
  slug?: string;
  selectedColor?: { id: string; name: string; code: string };
  selectedSize?: { id: string; size?: string; label?: string };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: EnrichedCartItem[];
  loading?: boolean;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveItem: (variantId: string) => void;
}

// ============================================================================
// CART ITEM
// ============================================================================

const CartItem = memo(({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: EnrichedCartItem;
  onRemove: () => void;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
}) => {
  const productName  = item.product?.name  || item.name  || 'Unknown Product';
  const productSlug  = item.product?.slug  || item.slug  || '';
  const imageUrl     = item.variant?.imageUrl || item.image || '';
  const currentPrice = item.currentPrice ?? item.variant?.price ?? item.price ?? 0;
  const origPrice    = item.variant?.price ?? item.price ?? 0;
  const salePrice    = item.variant?.salePrice;
  const hasSale      = !!(salePrice && origPrice !== salePrice);
  const stock        = item.variant?.stock ?? 999;
  const color        = item.variant?.color || item.selectedColor || null;
  const sizeLabel    = item.variant?.size?.label
    || (item.selectedSize as any)?.label
    || (item.selectedSize as any)?.size
    || null;

  const { quantity, variantId } = item;
  const isDecrementDisabled = quantity <= 1;
  const isIncrementDisabled = quantity >= stock;

  return (
    <div
      className="relative mx-4 my-3 p-4 rounded-[20px] border border-white/15 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {/* X close button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 hover:rotate-90"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <X className="w-[18px] h-[18px]" />
      </button>

      <div className="flex gap-5 items-center">

        {/* Product image */}
        <div className="flex-shrink-0 flex items-center justify-center" style={{ minWidth: 100 }}>
          <Link href={productSlug ? `/products/${productSlug}` : '#'}>
            <div
              className="w-[90px] h-[90px] rounded-2xl overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt={productName} className="w-full h-full object-contain rounded-xl" />
              ) : (
                <CartIcon className="w-8 h-8 text-white/20" />
              )}
            </div>
          </Link>
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0 flex flex-col gap-1 pr-6">

          <Link href={productSlug ? `/products/${productSlug}` : '#'}>
            <p className="text-white font-semibold text-[15px] leading-[1.3] line-clamp-2 tracking-[-0.01em] hover:text-white/80 transition-colors">
              {productName}
            </p>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-white font-bold text-base tracking-[-0.02em]">
              ${hasSale ? salePrice!.toFixed(2) : currentPrice.toFixed(2)}
            </span>
            {hasSale && (
              <span className="text-white/40 text-[15px] line-through font-medium">
                ${origPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color + size pills */}
          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            {color?.code && (
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{
                    background: color.code,
                    border: '2px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  }}
                />
                <span className="text-white text-[11px] font-semibold uppercase tracking-[0.05em]">
                  {color.name || 'Color'}
                </span>
              </div>
            )}
            {sizeLabel && (
              <div
                className="px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <span className="text-white text-[11px] font-semibold uppercase tracking-[0.05em]">
                  {sizeLabel}
                </span>
              </div>
            )}

          </div>

          {/* Quantity controls */}
          <div className="mt-3">
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl"
              style={{ background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)' }}
            >
              <button
                type="button"
                disabled={isDecrementDisabled}
                onClick={() => onUpdateQuantity(variantId, quantity - 1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Minus className="w-4 h-4 text-white" />
              </button>

              <span className="text-white font-bold text-base min-w-[32px] text-center">
                {quantity}
              </span>

              <button
                type="button"
                disabled={isIncrementDisabled}
                onClick={() => onUpdateQuantity(variantId, quantity + 1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                style={{
                  background: isIncrementDisabled
                    ? 'rgba(255,255,255,0.1)'
                    : 'linear-gradient(135deg, #0366FE 0%, #0052CC 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: isIncrementDisabled ? 'none' : '0 4px 12px rgba(3,102,254,0.3)',
                }}
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

// ============================================================================
// CART DRAWER
// ============================================================================

export const CartDrawer = memo(({
  isOpen,
  onClose,
  items,
  loading = false,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) => {

  const subtotal = items.reduce((sum, item) => {
    const price = item.currentPrice ?? item.variant?.price ?? item.price ?? 0;
    return sum + price * item.quantity;
  }, 0);
  const tax   = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 border-white/10 flex flex-col h-screen"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          position: 'fixed',
          top: 0,
          zIndex: 13000,
        }}
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
              <CartIcon className="size-5 text-white" />
              Shopping Cart
              <span className="bg-[#3084FF] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {items.length > 9 ? '9+' : items.length}
              </span>
            </SheetTitle>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </SheetHeader>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <CartIcon className="w-20 h-20 text-white/20 mb-4" />
            <p className="text-white/60 text-base mb-6">Your cart is empty</p>
            <Button onClick={onClose} className="bg-gradient-to-r from-[#18C8FF] to-[#933FFE] hover:opacity-90 text-white rounded-xl px-6">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-2" style={{ height: 'calc(100vh - 74px - 180px)' }}>
              {items.map((item) => (
                <CartItem
                  key={item.variantId}
                  item={item}
                  onRemove={() => onRemoveItem(item.variantId)}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>

            {/* Sticky footer */}
            <div
              className="flex-shrink-0 border-t border-white/10 p-5 space-y-3"
              style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}
            >
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <a
                href="/checkout"
                className="flex items-center justify-center w-full h-[50px] rounded-[50px] text-white font-elemental lowercase text-sm border-2 border-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(94.44deg, #666666 29%, #000000 100%)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)')}
              >
                Proceed to Checkout (${total.toFixed(2)})
              </a>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
});

CartDrawer.displayName = 'CartDrawer';