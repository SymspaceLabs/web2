"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, CSSProperties, AnchorHTMLAttributes, Fragment, useEffect, useState } from "react";

// LUCIDE ICON COMPONENTS
import { 
  MapPin, 
  User, 
  Users, 
  Ruler, 
  Store, 
  SlidersHorizontal, 
  CreditCard, 
  Heart, 
  ShoppingBag,
  Headphones,
  LucideIcon
} from "lucide-react";

// ==============================================================
// Type Definitions
// ==============================================================
interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

interface MainContainerProps {
  children: ReactNode;
}

interface StyledNavLinkProps extends Omit<NavLinkProps, 'children'> {
  isCurrentPath: boolean;
  children: ReactNode;
}

interface NavigationProps {
  mode?: 'light' | 'dark';
}

interface MenuItem {
  href: string;
  title: string;
  Icon: LucideIcon;
  count: number;
}

interface MenuSection {
  title: string;
  list: MenuItem[];
}

interface SideNavProps {
  position?: 'left' | 'right';
  open?: boolean;
  width?: number;
  children: ReactNode;
  handler: (close: () => void) => ReactNode;
  toggle?: () => void;
  mode?: 'light' | 'dark';
}

interface CustomerDashboardLayoutProps {
  children: ReactNode;
}

// ==============================================================
// NavLink Component
// ==============================================================
function NavLink({
  href,
  children,
  style,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();

  // CHECK CURRENT ROUTE
  const checkRouteMatch = () => {
    if (href === "/") return pathname === href;
    return pathname.includes(href);
  };

  const isActive = checkRouteMatch();

  return (
    <Link
      href={href}
      style={style}
      className={clsx(
        "relative transition-colors duration-150 ease-in-out hover:text-white",
        isActive ? "text-primary" : "text-white",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

// ==============================================================
// MainContainer Component
// ==============================================================
function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="px-6 pb-6 rounded-2xl shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-xl bg-gradient-to-b from-[#B7B7B9] to-[#777777] md:shadow-none md:overflow-y-auto md:h-[calc(100vh-64px)]">
      {children}
    </div>
  );
}

// ==============================================================
// StyledNavLink Component
// ==============================================================
function StyledNavLink({ isCurrentPath, children, className, ...props }: StyledNavLinkProps) {
  return (
    <NavLink
      className={clsx(
        "flex items-center justify-between mb-px p-[18px] rounded-[50px] transition-colors",
        isCurrentPath 
          ? "bg-[#3084FF]" 
          : "bg-transparent hover:bg-[#3084FF]",
        className
      )}
      {...props}
    >
      <span className="text-white nav-icon">{children}</span>
    </NavLink>
  );
}

// ==============================================================
// Helper Functions
// ==============================================================
function isActiveLink(pathname: string, href: string): boolean {
  // Special handling for the profile paths to highlight the parent '/profile' link
  // This ensures that '/profile/view' and '/profile/edit' both highlight 'Profile Info'
  if (href === "/profile/view") {
    return pathname === "/profile/view" || pathname === "/profile/edit";
  }
  // For all other links, the link is active if the pathname starts with the href.
  // This makes it generic for /orders, /measurements, /preferences, etc., and their sub-paths.
  return pathname.startsWith(href);
}

// ==============================================================
// Menu Data
// ==============================================================
const MENUS: MenuSection[] = [{
  title: "DASHBOARD",
  list: [{
    href: "/orders",
    title: "Orders",
    Icon: ShoppingBag,
    count: 5
  },
  // {
  //   href: "/wish-list",
  //   title: "Favorites",
  //   Icon: Heart,
  //   count: 19
  // },
  {
    href: "/support-tickets",
    title: "Support Tickets",
    Icon: Headphones,
    count: 1
  }]
}, {
  title: "ACCOUNT",
  list: [{
    href: "/profile/view",
    title: "Profile Info",
    Icon: User,
    count: 3
  }, {
    href: "/measurements",
    title: "Measurements",
    Icon: Ruler,
    count: 3
  }, {
    href: "/preferences",
    title: "Preferences",
    Icon: SlidersHorizontal,
    count: 3
  }, {
    href: "/addresses",
    title: "Addresses",
    Icon: MapPin,
    count: 16
  }, {
    href: "/payment-methods",
    title: "Payment Methods",
    Icon: CreditCard,
    count: 4
  }]
}, {
  title: "",
  list: [{
    href: "/refer-a-friend",
    title: "Refer A Friend",
    Icon: Users,
    count: 3
  }, {
    href: `${process.env.NEXT_PUBLIC_SELLER_URL}`,
    title: "Business Portal",
    Icon: Store,
    count: 3
  }]
}];

// ==============================================================
// Scrollbar Component (Simple wrapper for overflow)
// ==============================================================
function Scrollbar({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-y-auto h-full">
      {children}
    </div>
  );
}

// ==============================================================
// SideNav Component
// ==============================================================
function SideNav({
  position = "left",
  open = false,
  width = 280,
  children,
  handler,
  toggle,
  mode = "light"
}: SideNavProps) {
  const [sideNavOpen, setSideNavOpen] = useState(open);

  const handleToggleSideNav = () => setSideNavOpen(!sideNavOpen);

  useEffect(() => setSideNavOpen(open), [open]);
  
  const handleClose = toggle || handleToggleSideNav;

  return (
    <div>
      {/* Backdrop */}
      {sideNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[15000]"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div
        className={clsx(
          "fixed top-0 h-full z-[15001] transition-transform duration-300 ease-in-out",
          position === "left" ? "left-0" : "right-0",
          sideNavOpen 
            ? "translate-x-0" 
            : position === "left" 
              ? "-translate-x-full" 
              : "translate-x-full",
          mode === "dark"
            ? "bg-gradient-to-b from-[#B7B7B9] to-[#777777] text-white"
            : "bg-white text-black",
          "px-6 pb-6"
        )}
        style={{ width: `${width}px` }}
      >
        <Scrollbar>{children}</Scrollbar>
      </div>

      {handler(handleClose)}
    </div>
  );
}

// ==============================================================
// Navigation Component
// ==============================================================
function Navigation({ mode = 'light' }: NavigationProps) {
  const pathname = usePathname();

  // Determine text color based on the 'mode' prop
  const textColor = mode === 'dark' ? '#000' : '#FFF';

  return (
    <>
      {MENUS.map((item) => (
        <Fragment key={item.title}>
          {item.title && (
            <h1 
              className="font-elemental lowercase p-[26px_26px_0px_0px] text-base"
              style={{ color: textColor }}
            >
              {item.title}
            </h1>
          )}
          <div className="border-b border-gray-300 mb-[5px]" />
          {item.list.map(({ Icon, count, href, title }) => (
            <StyledNavLink
              href={href}
              key={title}
              isCurrentPath={isActiveLink(pathname, href)}
              // Conditionally add target="_blank" and rel="noopener noreferrer" for Business Portal
              {...(title === "Business Portal" && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              <div className="flex items-center gap-1">
                <Icon 
                  size={18}
                  className="nav-icon" 
                />
                <h1 
                  className="font-elemental lowercase text-xs"
                  style={{ color: textColor }}
                >
                  {title}
                </h1>
              </div>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </>
  );
}

// ==============================================================
// CustomerDashboardLayout Component
// ==============================================================
export default function CustomerDashboardLayout({ children }: CustomerDashboardLayoutProps) {
  return (
    <div className="container mx-auto mt-2 mb-2 pt-[100px] md:pt-[150px]">
      <div className="grid grid-cols-12 gap-3">
        {/* Navigation - Hidden on mobile and tablet, visible on desktop */}
        <div className="hidden md:block md:col-span-3">
          <MainContainer>
            <Navigation />
          </MainContainer>
        </div>

        {/* Main content */}
        <div className="col-span-12 md:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
}

// Export other components if needed elsewhere
export { NavLink, MainContainer, StyledNavLink, Navigation, SideNav, Scrollbar };