// =============================================
// Main Header Component
// =============================================

"use client";

import { useState, memo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Header2 from './header-2';
import { HeartIcon, CartIcon, UserIcon } from './custom-icons';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { fetchVariantDetails } from '@/api/product';
import { CartDrawer, EnrichedCartItem } from './cart-drawer';
import { FavoritesDrawer } from './favorite-drawer';
import { LoginModal } from './modals/login';

// ============================================================================
// CONSTANTS
// ============================================================================

const NAVIGATION_MENU = [
  {
    id: 'marketplace',
    title: "Marketplace",
    url: '/marketplace',
    child: false,
    megaMenu: false,
    megaMenuWithSub: false,
  },
  {
    id: 'ar-business',
    title: "AR for Business",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      { title: "AR Application", url: "/ar-app-simulation" },
      { title: "AR Real Estate", url: "/ar-real-estate" },
      { title: "Services", url: "/sell-on-symspace" }
    ]
  },
  {
    id: 'partner',
    title: "Partner",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      { title: "Become a partner", url: `${process.env.NEXT_PUBLIC_SELLER_URL}/register` },
      { title: "Pricing & Packages", url: "/sell-on-symspace#pricing" },
    ]
  },
  {
    id: 'about-us',
    title: "About Us",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      { title: "Leadership Team", url: "/about-us#team" },
      { title: "Global Impact", url: "/global-impact" },
      { title: "Contact Us", url: "/contact-us" },
      { title: "Careers", url: "/careers" }
    ]
  }
] as const;

const USER_MENU_ITEMS = [
  { label: 'Profile', href: '/profile/view' },
  { label: 'Orders', href: '/account/orders' },
  { label: 'Wishlist', href: '/account/wishlist' },
  { type: 'separator' as const },
  { label: 'Settings', href: '/account/settings' },
] as const;

const LOGO = {
  src: '/images/logos/Logo.svg',
  alt: 'Symspace Logo',
  width: 120,
  height: 40
} as const;

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  header: "sticky top-0 z-50 w-full border-b border-white/10 bg-black backdrop-blur-md",
  container: "container mx-auto px-4",
  nav: "flex items-center justify-between h-16 md:h-20",
  logoWrapper: "flex items-center flex-shrink-0",
  logo: "h-8 md:h-10 w-auto",
  desktopMenu: "hidden md:flex items-center space-x-8 flex-1 justify-center",
  menuItem: "text-white/50 hover:text-white text-sm font-bold transition-all duration-300 font-helvetica",
  dropdownTrigger: "flex items-center gap-1 text-white/50 hover:text-white text-sm transition-all duration-300 cursor-pointer font-helvetica font-bold",
  rightActions: "flex items-center gap-2 md:gap-4",
  iconButton: "relative text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer",
  badge: "absolute -top-1 -right-1 bg-[#3084ff] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold",
  mobileMenuButton: "md:hidden text-white/90 hover:text-white hover:bg-white/10 cursor-pointer",
  mobileMenuItem: "flex items-center justify-between py-3 text-white/90 hover:text-white transition-colors cursor-pointer",
  mobileSubMenu: "pl-4 mt-2 space-y-2 border-l border-white/10"
} as const;

const dropdownPanelStyle: React.CSSProperties = {
  background: "rgba(30, 30, 35, 0.7)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
};

const navDropdownItemClass =
  "block px-5 py-3 text-sm font-elemental lowercase tracking-wide text-white transition-all duration-150 " +
  "hover:bg-gradient-to-r hover:from-[#3084FF] hover:via-[#2567CC] hover:to-[#1D4F99] " +
  "w-full text-left cursor-pointer whitespace-nowrap";

// ============================================================================
// SHARED HOOK
// ============================================================================

function useHoverMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return { isOpen, setIsOpen, openMenu, scheduleClose };
}

// ============================================================================
// DESKTOP NAV ITEM
// ============================================================================

const DesktopMenuItem = memo(({ item }: { item: typeof NAVIGATION_MENU[number] }) => {
  const { isOpen, setIsOpen, openMenu, scheduleClose } = useHoverMenu();

  if (!item.child) {
    return (
      <Link href={item.url} className={styles.menuItem}>
        {item.title}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <button className={styles.dropdownTrigger}>
        {item.title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[200px] rounded-lg border border-white shadow-2xl overflow-hidden z-50"
          style={dropdownPanelStyle}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          {item.child.map((subItem, index) => (
            <div key={subItem.url}>
              <Link href={subItem.url} onClick={() => setIsOpen(false)} className={navDropdownItemClass}>
                {subItem.title}
              </Link>
              {index < item.child.length - 1 && <div className="h-px bg-white/15 mx-3" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

DesktopMenuItem.displayName = 'DesktopMenuItem';

// ============================================================================
// MOBILE MENU ITEM
// ============================================================================

const MobileMenuItem = memo(({ item }: { item: typeof NAVIGATION_MENU[number] }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.child) {
    return (
      <Link href={item.url} className={styles.mobileMenuItem}>
        {item.title}
      </Link>
    );
  }

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.mobileMenuItem}>
        <span>{item.title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className={styles.mobileSubMenu}>
          {item.child.map((subItem) => (
            <Link key={subItem.url} href={subItem.url} className="block py-2 text-sm text-white/70 hover:text-white transition-colors">
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
});

MobileMenuItem.displayName = 'MobileMenuItem';

// ============================================================================
// USER MENU
// ============================================================================

const UserMenu = memo(({
  isAuthenticated = false,
  onSignInClick,
  onSignOutClick,
}: {
  isAuthenticated?: boolean;
  onSignInClick: () => void;
  onSignOutClick: () => void;
}) => {
  const { isOpen, setIsOpen, openMenu, scheduleClose } = useHoverMenu();
  const { user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
        <Button variant="ghost" size="icon" className={styles.iconButton}>
          <UserIcon className="size-6 text-white" />
        </Button>
        {isOpen && (
          <div
            className="absolute right-0 top-full mt-1 min-w-[160px] rounded-lg border border-white shadow-2xl overflow-hidden z-50"
            style={dropdownPanelStyle}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button onClick={() => { setIsOpen(false); onSignInClick(); }} className={navDropdownItemClass}>
              Sign In
            </button>
            <div className="h-px bg-white/15 mx-3" />
            <Link href="/register" onClick={() => setIsOpen(false)} className={navDropdownItemClass}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <Button variant="ghost" size="icon" className={styles.iconButton}>
        <UserIcon className="size-6 text-white" />
      </Button>
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 min-w-[200px] rounded-lg border border-white shadow-2xl overflow-hidden z-50"
          style={dropdownPanelStyle}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <div className="font-elemental lowercase px-4 py-3 text-xs text-white/40 font-medium border-b border-white/15">
            {user?.email || 'Account'}
          </div>
          {USER_MENU_ITEMS.map((item, index) => {
            if ('type' in item && item.type === 'separator') {
              return <div key={index} className="h-px bg-white/15 mx-3" />;
            }
            if (!('href' in item)) return null;
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={navDropdownItemClass}>
                {item.label}
              </Link>
            );
          })}
          <div className="h-px bg-white/15 mx-3" />
          <button
            onClick={() => { setIsOpen(false); onSignOutClick(); }}
            className="font-elemental lowercase block px-4 py-2.5 text-sm font-medium text-red-400 hover:text-white hover:bg-red-600 transition-all duration-150 w-full text-left whitespace-nowrap"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
});

UserMenu.displayName = 'UserMenu';

// ============================================================================
// MOBILE MENU SHEET
// ============================================================================

const MobileMenu = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={styles.mobileMenuButton}>
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-black/95 border-white/10">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Image src={LOGO.src} alt={LOGO.alt} width={100} height={33} className="h-8 w-auto" priority />
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 space-y-1">
          {NAVIGATION_MENU.map((item) => (
            <MobileMenuItem key={item.id} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
});

MobileMenu.displayName = 'MobileMenu';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Header({
  isAuthenticated = false
}: {
  isAuthenticated?: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [enrichedCartItems, setEnrichedCartItems] = useState<EnrichedCartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState(false);

  const { state: cartState, getCartItemCount, dispatch: cartDispatch } = useCart();
  const { getFavoriteProducts } = useFavorites();
  const { logout } = useAuth();
  const favoriteProducts = getFavoriteProducts();
  const cartItemCount = getCartItemCount();

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const enrichCartItems = async () => {
      if (cartState.cart.length === 0) { setEnrichedCartItems([]); return; }
      setLoadingCart(true);
      try {
        const enrichedItems = await Promise.all(
          cartState.cart.map(async (item) => {
            try {
              const variantDetails = await fetchVariantDetails(item.variantId);

              // API returns flat shape:
              // { variantId, productId, productName, productSlug, imageUrl,
              //   color: { id, name, code }, size: { id, size }, price, salePrice, stock }

              const d = variantDetails;
              const rawColor = d?.color   || null;
              const rawSize  = d?.size    || null;

              return {
                variantId: item.variantId,
                quantity:  item.quantity,

                product: {
                  name: d?.productName || d?.name || 'Unknown Product',
                  slug: d?.productSlug || d?.slug || '',
                },

                variant: {
                  imageUrl:  d?.imageUrl  || d?.thumbnail || d?.image || '',
                  price:     d?.price     || 0,
                  salePrice: d?.salePrice || undefined,
                  stock:     d?.stock     ?? 999,
                  // color: { id, name, code } — API already gives us this shape
                  color: rawColor ? {
                    id:   rawColor.id   || '',
                    name: rawColor.name || '',
                    code: rawColor.code || rawColor.hex || rawColor.colorCode || '',
                  } : undefined,
                  // size: API returns { id, size: "M" } — map to { id, label }
                  size: rawSize ? {
                    id:    rawSize.id    || '',
                    label: rawSize.size  || rawSize.label || rawSize.name || '',
                  } : undefined,
                },

                currentPrice: d?.salePrice || d?.price || 0,

                // Flat fallbacks
                name:  d?.productName || d?.name  || 'Unknown Product',
                price: d?.price       || 0,
                image: d?.imageUrl    || d?.thumbnail || '',
                slug:  d?.productSlug || d?.slug  || '',
              };
            } catch (error) {
              console.error(`Failed to fetch details for variant ${item.variantId}:`, error);
              return { variantId: item.variantId, quantity: item.quantity, name: `Product (${item.variantId.slice(0, 8)}...)`, price: 0, image: '', colors: [], sizes: [] };
            }
          })
        );
        setEnrichedCartItems(enrichedItems);
      } catch (error) {
        console.error('Error enriching cart items:', error);
      } finally {
        setLoadingCart(false);
      }
    };
    enrichCartItems();
  }, [cartState.cart]);

  if (!isMounted) {
    return (
      <>
        <header className={styles.header}>
          <div className={styles.container}>
            <nav className={styles.nav}>
              <div className={styles.logoWrapper}>
                <Link href="/" className="ml-2 md:ml-0">
                  <Image src={LOGO.src} alt={LOGO.alt} width={LOGO.width} height={LOGO.height} className={styles.logo} priority />
                </Link>
              </div>
              <div className={styles.desktopMenu} />
              <div className={styles.rightActions} />
            </nav>
          </div>
        </header>
        <Header2 />
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <div className={styles.logoWrapper}>
              <MobileMenu />
              <Link href="/" className="ml-2 md:ml-0">
                <Image src={LOGO.src} alt={LOGO.alt} width={LOGO.width} height={LOGO.height} className={styles.logo} priority />
              </Link>
            </div>

            <div className={styles.desktopMenu}>
              {NAVIGATION_MENU.map((item) => (
                <DesktopMenuItem key={item.id} item={item} />
              ))}
            </div>

            <div className={styles.rightActions}>
              <Button variant="ghost" size="icon" className={styles.iconButton} onClick={() => setIsFavoritesOpen(true)}>
                <HeartIcon className="size-6 text-white" />
                {favoriteProducts.length > 0 && (
                  <span className={styles.badge}>{favoriteProducts.length > 9 ? '9+' : favoriteProducts.length}</span>
                )}
              </Button>

              <Button variant="ghost" size="icon" className={styles.iconButton} onClick={() => setIsCartOpen(true)}>
                <CartIcon className="size-6 text-white" />
                {cartItemCount > 0 && (
                  <span className={styles.badge}>{cartItemCount > 9 ? '9+' : cartItemCount}</span>
                )}
              </Button>

              <UserMenu
                isAuthenticated={isAuthenticated}
                onSignInClick={() => setIsLoginModalOpen(true)}
                onSignOutClick={logout}
              />
            </div>
          </nav>
        </div>
      </header>
      <Header2 />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={enrichedCartItems}
        loading={loadingCart}
        onUpdateQuantity={(variantId, quantity) =>
          cartDispatch({ type: "UPDATE_QUANTITY", payload: { variantId, quantity } })
        }
        onRemoveItem={(variantId) =>
          cartDispatch({ type: "REMOVE_FROM_CART", payload: { variantId } })
        }
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favoriteProducts.map(fav => ({
          id: fav.id,
          name: fav.name,
          price: fav.displayPrice?.price || 0,
          salePrice: fav.displayPrice?.salePrice || undefined,
          image: fav.thumbnail || '',
          imgUrl: fav.thumbnail || '',
          slug: fav.slug || '',
          _favoriteKey: fav._favoriteKey,

          // Normalize images: keep as-is (colorCode + url shape)
          images: fav.images || [],

          // Normalize colors: product API returns { id, name, code }
          // FavoritesDrawer ColorDropdown expects  { id, value, label }
          // value = hex code (used for backgroundColor + colorCode matching)
          colors: (fav.colors || [])
            .filter(Boolean)
            .map((c: any) => ({
              id:    c.id    || c._id   || '',
              value: c.code  || c.value || c.hex || '',
              label: c.name  || c.label || c.code || '',
            })),

          // Normalize sizes: product API returns { id, size, sortOrder }
          // FavoritesDrawer SizeDropdown expects  { value, label }
          // value = size id (used for availability lookup)
          sizes: (fav.sizes || [])
            .filter(Boolean)
            .map((s: any) => ({
              value: s.id    || s.value || '',
              label: s.size  || s.label || s.name || '',
            })),
        }))}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}