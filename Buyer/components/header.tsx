// =============================================
// Main Header Component - WITH GLASSMORPHIC DROPDOWNS + CURSOR POINTER
// =============================================

"use client";

import { useState, memo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown, X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
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
import { fetchVariantDetails } from '@/api/product';
import { CartDrawer, EnrichedCartItem } from './cart-drawer';
import { FavoritesDrawer } from './favorite-drawer';

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
      {
        title: "AR Application",
        url: "/ar-app-simulation"
      },
      {
        title: "AR Real Estate",
        url: "/ar-real-estate"
      },
      {
        title: "Services",
        url: "/sell-on-symspace"
      }
    ]
  },
  {
    id: 'partner',
    title: "Partner",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      {
        title: "Become a partner",
        url: `${process.env.NEXT_PUBLIC_SELLER_URL}/register`
      },
      {
        title: "Pricing & Packages",
        url: "/sell-on-symspace#pricing"
      },
    ]
  },
  {
    id: 'about-us',
    title: "About Us",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      {
        title: "Leadership Team",
        url: "/about-us#team"
      },
      {
        title: "Global Impact",
        url: "/global-impact"
      },
      {
        title: "Contact Us",
        url: "/contact-us"
      },
      {
        title: "Careers",
        url: "/careers"
      }
    ]
  }
] as const;

const USER_MENU_ITEMS = [
  { label: 'Profile', href: '/profile/view' },
  { label: 'Orders', href: '/account/orders' },
  { label: 'Wishlist', href: '/account/wishlist' },
  { type: 'separator' as const },
  { label: 'Settings', href: '/account/settings' },
  { label: 'Sign Out', href: '/logout', variant: 'destructive' as const }
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
  icon: "w-6 h-6",
  
  mobileMenuButton: "md:hidden text-white/90 hover:text-white hover:bg-white/10 cursor-pointer",
  mobileMenuItem: "flex items-center justify-between py-3 text-white/90 hover:text-white transition-colors cursor-pointer",
  mobileSubMenu: "pl-4 mt-2 space-y-2 border-l border-white/10"
} as const;

// ============================================================================
// PRODUCT IMAGE COMPONENT
// ============================================================================

const ProductImage = memo(({ src, alt, id }: { src: string; alt: string; id: string | number }) => {
  const numericId = typeof id === 'string' ? parseInt(id) || 0 : id;
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-cyan-500 to-blue-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600'
  ];
  const gradient = gradients[numericId % gradients.length];

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <CartIcon className="size-6" />
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

// ============================================================================
// NAVIGATION COMPONENTS - WITH GLASSMORPHIC STYLING
// ============================================================================

const DesktopMenuItem = memo(({ item }: { item: typeof NAVIGATION_MENU[number] }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.child) {
    return (
      <Link href={item.url} className={styles.menuItem}>
        {item.title}
      </Link>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger 
        className={styles.dropdownTrigger}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {item.title}
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        className="w-56 border border-white rounded-lg text-white backdrop-blur-sm"
        style={{
          background: "linear-gradient(180deg, rgba(62, 61, 69, 0.6) 0%, rgba(32, 32, 32, 0.9) 100%)",
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {item.child.map((subItem) => (
          <DropdownMenuItem 
            key={subItem.url} 
            asChild
            className="text-white/90 hover:text-white cursor-pointer transition-all duration-200 focus:bg-gradient-to-r focus:from-[#3084FF] focus:via-[#2567CC] focus:to-[#1D4F99] focus:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#3084FF] data-[highlighted]:via-[#2567CC] data-[highlighted]:to-[#1D4F99] data-[highlighted]:text-white"
          >
            <Link href={subItem.url}>
              {subItem.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

DesktopMenuItem.displayName = 'DesktopMenuItem';

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.mobileMenuItem}
      >
        <span>{item.title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={styles.mobileSubMenu}>
          {item.child.map((subItem) => (
            <Link
              key={subItem.url}
              href={subItem.url}
              className="block py-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
});

MobileMenuItem.displayName = 'MobileMenuItem';

const UserMenu = memo(({ isAuthenticated = false }: { isAuthenticated?: boolean }) => {
  if (!isAuthenticated) {
    return (
      <Link href="/sign-in">
        <Button variant="ghost" size="icon" className={styles.iconButton}>
          <UserIcon className="size-6 text-white" />
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={styles.iconButton}>
          <UserIcon className="size-6 text-white"  />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 border border-white rounded-lg backdrop-blur-sm"
        style={{
          background: "linear-gradient(180deg, rgba(62, 61, 69, 0.6) 0%, rgba(32, 32, 32, 0.9) 100%)",
        }}
      >
        <DropdownMenuLabel className="text-white/90">User Email here</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />
        {USER_MENU_ITEMS.map((item, index) => {
          // Type guard to check if item is a separator
          if ('type' in item && item.type === 'separator') {
            return <DropdownMenuSeparator key={index} className="bg-white/20" />;
          }
          
          // Now we need to explicitly check for href to satisfy TypeScript
          if (!('href' in item)) {
            return null;
          }
          
          // Now TypeScript knows item has label, href, and possibly variant
          return (
            <DropdownMenuItem 
              key={item.href} 
              asChild
              className={`font-elemental lowercase cursor-pointer transition-all duration-200 ${
                'variant' in item && item.variant === 'destructive' 
                  ? 'text-red-400 hover:text-red-300 focus:bg-red-500/20 data-[highlighted]:bg-red-500/20' 
                  : 'text-white/90 hover:text-white focus:bg-gradient-to-r focus:from-[#3084FF] focus:via-[#2567CC] focus:to-[#1D4F99] focus:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#3084FF] data-[highlighted]:via-[#2567CC] data-[highlighted]:to-[#1D4F99] data-[highlighted]:text-white'
              }`}
            >
              <Link href={item.href}>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserMenu.displayName = 'UserMenu';

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
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={100}
              height={33}
              className="h-8 w-auto"
              priority
            />
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
  const [enrichedCartItems, setEnrichedCartItems] = useState<EnrichedCartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState(false);

  const { state: cartState, getCartItemCount, dispatch: cartDispatch } = useCart();
  const { getFavoriteProducts } = useFavorites();
  const favoriteProducts = getFavoriteProducts();

  const cartItemCount = getCartItemCount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enrich cart items with product details
  useEffect(() => {
    const enrichCartItems = async () => {
      if (cartState.cart.length === 0) {
        setEnrichedCartItems([]);
        return;
      }

      setLoadingCart(true);
      
      try {
        const enrichedItems = await Promise.all(
          cartState.cart.map(async (item) => {
            try {
              const variantDetails = await fetchVariantDetails(item.variantId);
              const product = variantDetails.product || {};
              
              const selectedColor = product.colors?.find(
                (c: any) => c.id === variantDetails.colorId
              ) || product.colors?.[0];
              
              const selectedSize = product.sizes?.find(
                (s: any) => s.id === variantDetails.sizeId
              ) || product.sizes?.[0];
              
              return {
                variantId: item.variantId,
                quantity: item.quantity,
                name: product.name || 'Unknown Product',
                price: variantDetails.price || 0,
                image: product.thumbnail || '',
                productId: product.id,
                slug: product.slug,
                colors: product.colors || [],
                sizes: product.sizes || [],
                selectedColor: selectedColor,
                selectedSize: selectedSize,
              };
            } catch (error) {
              console.error(`Failed to fetch details for variant ${item.variantId}:`, error);
              
              return {
                variantId: item.variantId,
                quantity: item.quantity,
                name: `Product (${item.variantId.slice(0, 8)}...)`,
                price: 0,
                image: '',
                colors: [],
                sizes: [],
              };
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
                  <Image
                    src={LOGO.src}
                    alt={LOGO.alt}
                    width={LOGO.width}
                    height={LOGO.height}
                    className={styles.logo}
                    priority
                  />
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
                <Image
                  src={LOGO.src}
                  alt={LOGO.alt}
                  width={LOGO.width}
                  height={LOGO.height}
                  className={styles.logo}
                  priority
                />
              </Link>
            </div>

            <div className={styles.desktopMenu}>
              {NAVIGATION_MENU.map((item) => (
                <DesktopMenuItem key={item.id} item={item} />
              ))}
            </div>

            <div className={styles.rightActions}>
              <Button 
                variant="ghost" 
                size="icon" 
                className={styles.iconButton}
                onClick={() => setIsFavoritesOpen(true)}
              >
                <HeartIcon className="size-6 text-white" />
                {favoriteProducts.length > 0 && (
                  <span className={styles.badge}>
                    {favoriteProducts.length > 9 ? '9+' : favoriteProducts.length}
                  </span>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={styles.iconButton}
                onClick={() => setIsCartOpen(true)}
              >
                <CartIcon className="size-6 text-white" />
                {cartItemCount > 0 && (
                  <span className={styles.badge}>
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Button>
              
              <UserMenu isAuthenticated={isAuthenticated} />
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
        onUpdateQuantity={(variantId, quantity) => {
          cartDispatch({
            type: "UPDATE_QUANTITY",
            payload: { variantId, quantity }
          });
        }}
        onRemoveItem={(variantId) => {
          cartDispatch({
            type: "REMOVE_FROM_CART",
            payload: { variantId }
          });
        }}
      />

      <FavoritesDrawer 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)}
        items={favoriteProducts.map(fav => ({
          id: fav.id,
          name: fav.name,
          price: fav.displayPrice?.salePrice || fav.displayPrice?.price || 0,
          image: fav.thumbnail || '',
          _favoriteKey: fav._favoriteKey
        }))}
      />
    </>
  );
}