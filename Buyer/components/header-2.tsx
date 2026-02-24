// ==============================================================
// Navbar - Main Secondary Header Component
// ==============================================================
//
// CATEGORY DROPDOWN LEVEL MAP:
//
// [CATEGORIES button click]
//   └── CategoriesDropdown
//         └── CategoryMenuItem          ← LEVEL 1  (e.g. "Clothing, Shoes & Accessories")
//               └── SubcategoryMenuItem ← LEVEL 2  (e.g. "Dresses", "Tops", "Bottoms")
//                     └── SubcategoryItemMenuItem ← LEVEL 3  (e.g. "Casual Dresses")
//                           └── subcategoryItemChildren links  ← LEVEL 4 (leaf, no further flyout)
//
// ==============================================================

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import navigation from "@/data/navbarNavigation";
import { CATEGORIES_DATA } from "@/data/categories.data";
import { ChevronRight, ChevronDown, Menu } from "lucide-react";

interface NavItemChildProps {
  nav: {
    name?: string;
    title?: string;
    child: any[];
  };
  children: React.ReactNode;
}

interface CategoriesProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

interface NavbarProps {
  bg?: "light" | "dark";
  elevation?: number;
  hideCategories?: boolean;
}

// Shared card style for all dropdown levels
const cardStyle = {
  background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.6) 0%, rgba(32, 32, 32, 0.9) 100%)',
  color: '#fff',
} as const;

export default function Header2({
  bg = "light",
  elevation = 2,
  hideCategories = false,
}: NavbarProps) {
  const pathname = usePathname();
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const handleCloseCategoriesDropdown = () => setIsCategoriesDropdownOpen(false);
  const handleToggleCategoriesDropdown = () => setIsCategoriesDropdownOpen((prev) => !prev);
  const handleNavLinkClick = () => handleCloseCategoriesDropdown();

  const isActiveCategory = (slug: string) => {
    if (!pathname) return false;
    return pathname.includes(slug.split('=')[1]);
  };

  return (
    <nav
      className="hidden lg:block h-[60px] rounded-none fixed top-[64px] md:top-[80px] left-0 right-0 z-30 bg-gradient-to-r from-white to-[#BEBEBE] overflow-visible"
      style={{ boxShadow: elevation > 0 ? `0 ${elevation}px ${elevation * 2}px rgba(0,0,0,0.1)` : "none" }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        {hideCategories ? (
          <div className="flex items-center justify-center w-full">
            <NavigationList />
          </div>
        ) : (
          <div className="flex items-center gap-12 w-full">
            {/* ── Categories button + dropdown anchored together ── */}
            <div className="relative">
              <Categories
                isOpen={isCategoriesDropdownOpen}
                onClose={handleCloseCategoriesDropdown}
                onToggle={handleToggleCategoriesDropdown}
              />
              {isCategoriesDropdownOpen && (
                <CategoriesDropdown onClose={handleCloseCategoriesDropdown} />
              )}
            </div>

            <div className="flex items-center justify-between flex-1">
              {categories.map((item, index) => {
                const isActive = isActiveCategory(item.slug);
                return (
                  <Link
                    href={`/products?${item.slug}`}
                    key={index}
                    onClick={handleNavLinkClick}
                    className={`font-helvetica font-medium text-[15px] transition-colors duration-150 whitespace-nowrap ${
                      isActive
                        ? "text-[#0366FE]"
                        : bg === "dark"
                        ? "text-white hover:text-[#0366FE]"
                        : "text-[#6A6B6B] hover:text-[#0366FE]"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const categories = [
  { title: "Women",            slug: "gender=women" },
  { title: "Men",              slug: "gender=men" },
  { title: "Kids",             slug: "ageGroup=kids" },
  { title: "Maternity",        slug: "category=maternity-prenatal-care" },
  { title: "Elderly",          slug: "ageGroup=elderly" },
  { title: "Assisted Aid",     slug: "category=special-needs-accessibility" },
  { title: "Home & Furniture", slug: "category=home-furniture-appliances" },
  { title: "Sales & Deals",    slug: "tag=sales-deals" },
];

// ==============================================================
// ROOT PANEL — opened by clicking the Categories button.
// Positioned absolutely relative to the wrapping `relative` div
// in Header2, so it always drops directly below the button.
// overflow-visible is critical so LEVEL 2+ flyouts are not clipped.
// ==============================================================
function CategoriesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop to close on outside click */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Dropdown panel — left-0 aligns with the left edge of the relative wrapper */}
      <div className="absolute left-0 top-full mt-2.5 z-50">
        <Card
          className="py-1 w-max min-w-[220px] shadow-lg border border-white rounded-lg overflow-visible"
          style={cardStyle}
        >
          <div>
            {CATEGORIES_DATA.map((category) => (
              // Each item here is a LEVEL 1 row
              <CategoryMenuItem key={category.id} category={category} onClose={onClose} />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

// ==============================================================
// LEVEL 1 — e.g. "Clothing, Shoes & Accessories", "Electronics"
// ==============================================================
function CategoryMenuItem({ category, onClose }: { category: any; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [flyoutSide, setFlyoutSide] = useState<'right' | 'left'>('right');

  const handleMouseEnter = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setFlyoutSide(window.innerWidth - rect.right < 300 ? 'left' : 'right');
    }
    setIsOpen(true);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* ── LEVEL 1 row ── */}
      <Link
        href={`/products?category=${category.slug}`}
        onClick={onClose}
        className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-white font-elemental lowercase text-[13px] whitespace-nowrap">{category.name}</span>
        {category.subcategories?.length > 0 && (
          <ChevronRight className="w-4 h-4 text-white/70 flex-shrink-0" />
        )}
      </Link>

      {/* ── LEVEL 2 flyout panel ── */}
      {isOpen && category.subcategories?.length > 0 && (
        <div
          className={`absolute top-0 z-[60] ${
            flyoutSide === 'right' ? 'left-full pl-2' : 'right-full pr-2'
          }`}
        >
          <Card
            className="py-0 w-max min-w-[220px] shadow-lg border-2 rounded-lg overflow-visible"
            style={cardStyle}
          >
            {category.subcategories.map((subcategory: any) => (
              <SubcategoryMenuItem
                key={subcategory.id}
                subcategory={subcategory}
                categorySlug={category.slug}
                onClose={onClose}
              />
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}

// ==============================================================
// LEVEL 2 — e.g. "Dresses", "Tops", "Bottoms"
// ==============================================================
function SubcategoryMenuItem({
  subcategory,
  categorySlug,
  onClose,
}: {
  subcategory: any;
  categorySlug: string;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [flyoutSide, setFlyoutSide] = useState<'right' | 'left'>('right');

  const handleMouseEnter = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setFlyoutSide(window.innerWidth - rect.right < 300 ? 'left' : 'right');
    }
    setIsOpen(true);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* ── LEVEL 2 row ── */}
      <Link
        href={`/products?subcategory=${subcategory.slug}`}
        onClick={onClose}
        className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-white font-elemental lowercase text-[13px] whitespace-nowrap">{subcategory.name}</span>
        {subcategory.subcategoryItems?.length > 0 && (
          <ChevronRight className="w-4 h-4 text-white/70 flex-shrink-0" />
        )}
      </Link>

      {/* ── LEVEL 3 flyout panel ── */}
      {isOpen && subcategory.subcategoryItems?.length > 0 && (
        <div
          className={`absolute top-0 z-[70] ${
            flyoutSide === 'right' ? 'left-full pl-2' : 'right-full pr-2'
          }`}
        >
          <Card
            className="py-0 w-max min-w-[220px] shadow-lg border border-white rounded-lg overflow-visible max-h-[600px]"
            style={cardStyle}
          >
            {subcategory.subcategoryItems.map((item: any) => (
              <SubcategoryItemMenuItem
                key={item.id}
                item={item}
                categorySlug={categorySlug}
                subcategorySlug={subcategory.slug}
                onClose={onClose}
              />
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}

// ==============================================================
// LEVEL 3 — e.g. "Casual Dresses", "Formal Dresses"
// ==============================================================
function SubcategoryItemMenuItem({
  item,
  categorySlug,
  subcategorySlug,
  onClose,
}: {
  item: any;
  categorySlug: string;
  subcategorySlug: string;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [flyoutSide, setFlyoutSide] = useState<'right' | 'left'>('right');

  const handleMouseEnter = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setFlyoutSide(window.innerWidth - rect.right < 300 ? 'left' : 'right');
    }
    setIsOpen(true);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* ── LEVEL 3 row ── */}
      <Link
        href={`/products?subcategoryItem=${item.slug}`}
        onClick={onClose}
        className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-white font-elemental lowercase text-[13px] whitespace-nowrap">{item.name}</span>
        {item.subcategoryItemChildren?.length > 0 && (
          <ChevronRight className="w-4 h-4 text-white/70 flex-shrink-0" />
        )}
      </Link>

      {/* ── LEVEL 4 flyout panel — leaf level ── */}
      {isOpen && item.subcategoryItemChildren?.length > 0 && (
        <div
          className={`absolute top-0 z-[80] ${
            flyoutSide === 'right' ? 'left-full pl-2' : 'right-full pr-2'
          }`}
        >
          <Card
            className="py-0 w-max min-w-[220px] shadow-lg border border-white rounded-lg max-h-[600px] overflow-y-auto"
            style={cardStyle}
          >
            {item.subcategoryItemChildren.map((child: any) => (
              // ── LEVEL 4 row (leaf) ──
              <Link
                key={child.id}
                href={`/products?subcategoryItem=${child.slug}`}
                onClick={onClose}
                className="block px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="text-white font-elemental lowercase text-[13px] whitespace-nowrap">{child.name}</span>
              </Link>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}

// ==============================================================
// NavigationList Component
// ==============================================================
function NavigationList() {
  const pathname = usePathname();

  const renderNestedNav = (list: any[] = [], isRoot = false) => {
    return list.map((nav) => {
      if (isRoot) {
        if (nav.url) {
          return (
            <Link
              href={nav.url}
              key={nav.title}
              className={`font-bold font-helvetica cursor-pointer transition-colors duration-150 ${
                nav.url === pathname ? "text-white" : "text-[#6A6B6B] hover:text-white"
              }`}
            >
              {nav.title}
            </Link>
          );
        }
        if (nav.child) {
          return (
            <div key={nav.title} className="relative flex flex-col items-center group">
              <div className="flex items-end gap-1 text-[#6A6B6B] font-bold font-helvetica cursor-pointer transition-colors duration-150 group-hover:text-white">
                {nav.title}
                <ChevronDown className="text-gray-500 w-[1.1rem] h-[1.1rem]" />
              </div>
              <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-2.5 z-50">
                <Card className="py-1 min-w-[100px] rounded-lg border border-white bg-gradient-to-b from-[rgba(62,61,69,0.6)] to-[rgba(32,32,32,0.9)] text-white shadow-lg overflow-visible">
                  {renderNestedNav(nav.child)}
                </Card>
              </div>
            </div>
          );
        }
      } else {
        if (nav.url) {
          return (
            <Link href={nav.url} key={nav.title}>
              <div
                className={`px-4 py-2 text-white cursor-pointer transition-colors ${
                  nav.url === pathname
                    ? "bg-gradient-to-r from-[#3084FF] to-[#1D4F99]"
                    : "hover:bg-gradient-to-r hover:from-[#3084FF] hover:to-[#1D4F99]"
                }`}
              >
                {nav.title}
              </div>
            </Link>
          );
        }
        if (nav.child) {
          return (
            <NavItemChild nav={nav} key={nav.title}>
              {renderNestedNav(nav.child)}
            </NavItemChild>
          );
        }
      }
    });
  };

  return (
    <div className="flex gap-10 justify-between">
      {renderNestedNav(navigation, true)}
    </div>
  );
}

// ==============================================================
// NavItemChild Component (for nested dropdowns)
// ==============================================================
function NavItemChild({ nav, children }: NavItemChildProps) {
  const pathname = usePathname();
  const [isRightOverflowing, setIsRightOverflowing] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const isActive = nav.child.flat().find((item) => item.url === pathname);

  const checkOverflow = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setIsRightOverflowing(rect.right > window.innerWidth);
    }
  };

  return (
    <div
      className={`relative min-w-[200px] group/parent ${isActive ? "text-white" : ""}`}
      onMouseEnter={checkOverflow}
    >
      <div className="px-4 py-2 text-gray-700 cursor-pointer hover:text-white flex items-center justify-between">
        <span className="flex-1">{nav.name || nav.title}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
      <div
        ref={elementRef}
        className={`hidden group-hover/parent:block absolute top-0 z-10 pl-2 ${
          isRightOverflowing ? "right-full pr-2 pl-0" : "left-full"
        }`}
      >
        <Card className="py-2 min-w-[180px] bg-gradient-to-b from-[rgba(62,61,69,0.6)] to-[rgba(32,32,32,0.9)] text-white border border-white shadow-lg overflow-visible">
          {children}
        </Card>
      </div>
    </div>
  );
}

// ==============================================================
// Categories Button
// ==============================================================
function Categories({ isOpen, onClose, onToggle }: CategoriesProps) {
  return (
    <Button
      onClick={onToggle}
      className="flex items-center justify-start gap-2 min-w-[200px] h-[44px] px-4 rounded-full bg-[#717171] text-white font-medium text-[15px] hover:bg-black hover:text-[#717171] transition-colors shadow-sm"
    >
      <Menu className="w-5 h-5" />
      <span className="lowercase tracking-wide font-elemental">Categories</span>
    </Button>
  );
}