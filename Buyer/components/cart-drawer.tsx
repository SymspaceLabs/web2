// components/header/cart-drawer.tsx
"use client"

import { memo, useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CartIcon } from './custom-icons';
import { fetchProductAvailability } from '@/api/product';

// ============================================================================
// TYPES
// ============================================================================

export interface EnrichedCartItem {
  variantId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  productId?: string;
  // Add variant info
  colors?: Array<{ id: string; name: string; code: string }>;
  sizes?: Array<{ id: string; size: string }>;
  selectedColor?: { id: string; name: string; code: string };
  selectedSize?: { id: string; size: string };
  slug?: string;
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
// CART ITEM COMPONENT
// ============================================================================

const CartItem = memo(({ 
  item, 
  onRemove,
  onUpdateVariant 
}: { 
  item: EnrichedCartItem;
  onRemove: () => void;
  onUpdateVariant: (variantId: string, newQuantity: number) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState(item.selectedColor || item.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(item.selectedSize || item.sizes?.[0] || null);
  const [availability, setAvailability] = useState<any>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [stockWarning, setStockWarning] = useState('');

  // Fetch availability when color/size changes
  useEffect(() => {
    const checkAvailability = async () => {
      if (!item.productId || !selectedColor?.id || !selectedSize?.id) {
        setStockWarning(!selectedSize?.id ? 'Select size' : 'Select color');
        return;
      }

      setLoadingAvailability(true);
      setStockWarning('');

      try {
        const data = await fetchProductAvailability(
          item.productId,
          selectedColor.id,
          selectedSize.id
        );
        setAvailability(data);

        if (data?.stock === 0) {
          setStockWarning('Out of Stock');
        } else if (item.quantity > data?.stock) {
          setStockWarning(`Only ${data.stock} available`);
        }
      } catch (err) {
        console.error('Error fetching availability:', err);
        setStockWarning('Error loading stock');
      } finally {
        setLoadingAvailability(false);
      }
    };

    checkAvailability();
  }, [item.productId, selectedColor?.id, selectedSize?.id, item.quantity]);

  const displayPrice = availability?.price || item.price;
  const hasSale = availability?.hasSale || false;
  const salePrice = availability?.salePrice;

  return (
    <div className="relative flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-all">
      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 flex items-center justify-center transition-all hover:rotate-90"
      >
        <X className="w-4 h-4 text-white/70 hover:text-red-400" />
      </button>

      {/* Product Image */}
      <Link href={`/products/${item.slug || item.productId}`}>
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-white/10 border border-white/10 hover:scale-105 transition-transform">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <CartIcon className="size-8 text-white/50" />
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <Link href={`/products/${item.slug || item.productId}`}>
          <h4 className="text-white font-semibold text-sm leading-tight line-clamp-2 hover:text-[#18C8FF] transition-colors">
            {item.name}
          </h4>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          {loadingAvailability ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white/70 rounded-full animate-spin" />
          ) : (
            <>
              <span className="text-[#18C8FF] font-bold text-lg">
                ${hasSale ? salePrice?.toFixed(2) : displayPrice.toFixed(2)}
              </span>
              {hasSale && (
                <span className="text-white/40 text-sm line-through">
                  ${displayPrice.toFixed(2)}
                </span>
              )}
            </>
          )}
        </div>

        {/* Color & Size Selectors */}
        <div className="flex items-center gap-2">
          {/* Color Selector */}
          {item.colors && item.colors.length > 0 && (
            <select
              value={selectedColor?.id || ''}
              onChange={(e) => {
                const color = item.colors?.find(c => c.id === e.target.value);
                setSelectedColor(color || null);
              }}
              className="h-8 px-2 pr-8 rounded-lg bg-white/10 border border-white/20 text-white text-xs appearance-none cursor-pointer hover:bg-white/15 transition-colors"
              style={{ 
                backgroundImage: selectedColor ? `linear-gradient(90deg, ${selectedColor.code} 0%, ${selectedColor.code} 20px, transparent 20px)` : 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '4px center',
                paddingLeft: selectedColor ? '28px' : '8px'
              }}
            >
              {item.colors.map(color => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          )}

          {/* Size Selector */}
          {item.sizes && item.sizes.length > 0 && (
            <select
              value={selectedSize?.id || ''}
              onChange={(e) => {
                const size = item.sizes?.find(s => s.id === e.target.value);
                setSelectedSize(size || null);
              }}
              className="h-8 px-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs hover:bg-white/15 transition-colors"
            >
              {item.sizes.map(size => (
                <option key={size.id} value={size.id}>
                  {size.size}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Quantity & Stock Warning */}
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs">
            Qty: {item.quantity}
          </span>
          {stockWarning && (
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">
              {stockWarning}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

// ============================================================================
// MAIN DRAWER COMPONENT
// ============================================================================

export const CartDrawer = memo(({ 
  isOpen, 
  onClose, 
  items, 
  loading = false,
  onUpdateQuantity,
  onRemoveItem 
}: CartDrawerProps) => {
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[420px] p-0 border-white/10"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(50px)',
        }}
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-xl font-bold">
              Shopping Cart ({items.length})
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        {/* Content */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/70" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 py-20">
            <CartIcon className="w-20 h-20 text-white/30 mb-4"/>
            <p className="text-white/60 text-center mb-6">Your cart is empty</p>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-[#18C8FF] to-[#933FFE] hover:opacity-90"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 max-h-[calc(100vh-280px)]">
              {items.map((item) => (
                <CartItem
                  key={item.variantId}
                  item={item}
                  onRemove={() => onRemoveItem(item.variantId)}
                  onUpdateVariant={onUpdateQuantity}
                />
              ))}
            </div>

            {/* Footer - Price Summary */}
            <div className="border-t border-white/10 p-6 space-y-4 bg-black/20">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                asChild
                className="w-full bg-gradient-to-r from-[#18C8FF] to-[#933FFE] hover:opacity-90 font-bold h-12"
                size="lg"
              >
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
});

CartDrawer.displayName = 'CartDrawer';