// ==============================================================
// Navbar - Main Secondary Header Component (FIXED Z-INDEX)
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

export default function Header2({
  bg = "light",
  elevation = 2,
  hideCategories = false,
}: NavbarProps) {
  const pathname = usePathname();
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const handleCloseCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(false);
  };

  const handleToggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    handleCloseCategoriesDropdown();
  };

  // Check if current path matches category
  const isActiveCategory = (slug: string) => {
    if (!pathname) return false;
    return pathname.includes(slug.split('=')[1]);
  };

  return (
    <nav
      // FIXED: Changed z-40 to z-30 (lower than Header's z-50)
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
            {/* CATEGORY DROPDOWN BUTTON */}
            <Categories
              isOpen={isCategoriesDropdownOpen}
              onClose={handleCloseCategoriesDropdown}
              onToggle={handleToggleCategoriesDropdown}
            />

            {/* CATEGORY LINKS */}
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

      {/* CATEGORIES MULTI-LEVEL DROPDOWN - Now with proper z-index */}
      {isCategoriesDropdownOpen && (
        <CategoriesDropdown onClose={handleCloseCategoriesDropdown} />
      )}
    </nav>
  );
}

const categories = [
  {
    title: "Women",
    slug: "gender=women",
  },
  {
    title: "Men",
    slug: "gender=men",
  },
  {
    title: "Kids",
    slug: "ageGroup=kids",
  },
  {
    title: "Maternity",
    slug: "category=maternity-prenatal-care",
  },
  {
    title: "Elderly",
    slug: "ageGroup=elderly",
  },
  {
    title: "Assisted Aid",
    slug: "category=special-needs-accessibility",
  },
  {
    title: "Home & Furniture",
    slug: "category=home-furniture-appliances",
  },
  {
    title: "Sales & Deals",
    slug: "tag=sales-deals",
  },
];

// ==============================================================
// CategoriesDropdown Component - FIXED STYLING TO MATCH MUI
// ==============================================================
function CategoriesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown Menu - FIXED: Matches MUI SymCard styling */}
      <div className="absolute left-4 top-full mt-2.5 z-50">
        <Card 
          className="py-2 w-[280px] shadow-lg border border-white rounded-lg overflow-visible"
          style={{
            background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.6) 0%, rgba(32, 32, 32, 0.9) 100%)',
            color: '#fff'
          }}
        >
          <div className="py-1">
            {CATEGORIES_DATA.map((category) => (
              <CategoryMenuItem
                key={category.id}
                category={category}
                onClose={onClose}
              />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

// ==============================================================
// CategoryMenuItem Component - FIXED STYLING
// ==============================================================
function CategoryMenuItem({ category, onClose }: { category: any; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'right' | 'left'>('right');

  const checkPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right;
      setPosition(spaceOnRight < 300 ? 'left' : 'right');
    }
  };

  return (
    <div
      className="relative group/category"
      onMouseEnter={() => {
        setIsOpen(true);
        checkPosition();
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={`/products/${category.slug}`}
        onClick={onClose}
        className="flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-white font-elemental lowercase text-[14px]">{category.name}</span>
        {category.subcategories && category.subcategories.length > 0 && (
          <ChevronRight className="w-4 h-4 text-white/70" />
        )}
      </Link>

      {/* Subcategories Dropdown - FIXED STYLING */}
      {isOpen && category.subcategories && category.subcategories.length > 0 && (
        <div
          ref={elementRef}
          className={`absolute top-0 z-10 ${
            position === 'right' ? 'left-full pl-2' : 'right-full pr-2'
          }`}
        >
          <Card 
            className="py-2 w-[280px] shadow-lg border border-white rounded-lg max-h-[600px] overflow-y-auto"
            style={{
              background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.6) 0%, rgba(32, 32, 32, 0.9) 100%)',
              color: '#fff'
            }}
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
// SubcategoryMenuItem Component - FIXED STYLING
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
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'right' | 'left'>('right');

  const checkPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right;
      setPosition(spaceOnRight < 300 ? 'left' : 'right');
    }
  };

  return (
    <div
      className="relative group/subcategory"
      onMouseEnter={() => {
        setIsOpen(true);
        checkPosition();
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={`/products/${categorySlug}/${subcategory.slug}`}
        onClick={onClose}
        className="flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-white font-elemental lowercase">{subcategory.name}</span>
        {subcategory.subcategoryItems && subcategory.subcategoryItems.length > 0 && (
          <ChevronRight className="w-4 h-4 text-white/70" />
        )}
      </Link>

      {/* Subcategory Items Dropdown - FIXED STYLING */}
      {isOpen && subcategory.subcategoryItems && subcategory.subcategoryItems.length > 0 && (
        <div
          ref={elementRef}
          className={`absolute top-0 z-10 ${
            position === 'right' ? 'left-full pl-2' : 'right-full pr-2'
          }`}
        >
          <Card 
            className="py-2 w-[280px] shadow-lg border border-white rounded-lg max-h-[600px] overflow-y-auto"
            style={{
              background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.6) 0%, rgba(32, 32, 32, 0.9) 100%)',
              color: '#fff'
            }}
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
// SubcategoryItemMenuItem Component - FIXED STYLING
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
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'right' | 'left'>('right');

  const checkPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right;
      setPosition(spaceOnRight < 300 ? 'left' : 'right');
    }
  };

  return (
    <div
      className="relative group/item"
      onMouseEnter={() => {
        setIsOpen(true);
        checkPosition();
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={`/products/${categorySlug}/${subcategorySlug}/${item.slug}`}
        onClick={onClose}
        className="flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-white font-elemental lowercase text-[14px]">{item.name}</span>
        {item.subcategoryItemChildren && item.subcategoryItemChildren.length > 0 && (
          <ChevronRight className="w-4 h-4 text-white/70" />
        )}
      </Link>

      {/* Subcategory Item Children Dropdown - FIXED STYLING */}
      {isOpen && item.subcategoryItemChildren && item.subcategoryItemChildren.length > 0 && (
        <div
          ref={elementRef}
          className={`absolute top-0 z-10 ${
            position === 'right' ? 'left-full pl-2' : 'right-full pr-2'
          }`}
        >
          <Card 
            className="py-2 w-[280px] shadow-lg border border-white rounded-lg max-h-[600px] overflow-y-auto"
            style={{
              background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.6) 0%, rgba(32, 32, 32, 0.9) 100%)',
              color: '#fff'
            }}
          >
            {item.subcategoryItemChildren.map((child: any) => (
              <Link
                key={child.id}
                href={`/products/${categorySlug}/${subcategorySlug}/${item.slug}/${child.slug}`}
                onClick={onClose}
                className="block px-4 py-2 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="text-white font-helvetica text-sm">{child.name}</span>
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
        // First level navigation
        if (nav.url) {
          return (
            <Link
              href={nav.url}
              key={nav.title}
              className={`font-bold font-helvetica cursor-pointer transition-colors duration-150 ${
                nav.url === pathname
                  ? "text-white"
                  : "text-[#6A6B6B] hover:text-white"
              }`}
            >
              {nav.title}
            </Link>
          );
        }

        if (nav.child) {
          return (
            <div
              key={nav.title}
              className="relative flex flex-col items-center group"
            >
              <div className="flex items-end gap-1 text-[#6A6B6B] font-bold font-helvetica cursor-pointer transition-colors duration-150 group-hover:text-white">
                {nav.title}
                <ChevronDown className="text-gray-500 w-[1.1rem] h-[1.1rem]" />
              </div>

              {/* Dropdown */}
              <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-2.5 z-50">
                <Card className="py-1 min-w-[100px] rounded-lg border border-white bg-gradient-to-b from-[rgba(62,61,69,0.6)] to-[rgba(32,32,32,0.9)] text-white shadow-lg">
                  {renderNestedNav(nav.child)}
                </Card>
              </div>
            </div>
          );
        }
      } else {
        // Second level dropdown items
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

        // Nested items with children
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
  const [isLeftOverflowing, setIsLeftOverflowing] = useState(false);
  const [isRightOverflowing, setIsRightOverflowing] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const isActive = nav.child.flat().find((item) => item.url === pathname);

  const checkOverflow = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setIsLeftOverflowing(rect.left < 0);
      setIsRightOverflowing(rect.right > window.innerWidth);
    }
  };

  return (
    <div
      className={`relative min-w-[200px] group/parent ${isActive ? "text-white" : ""}`}
      onMouseEnter={checkOverflow}
    >
      {/* Parent Menu Item */}
      <div className="px-4 py-2 text-gray-700 cursor-pointer hover:text-white flex items-center justify-between">
        <span className="flex-1">{nav.name || nav.title}</span>
        <ChevronRight className="w-4 h-4" />
      </div>

      {/* Nested Dropdown */}
      <div
        ref={elementRef}
        className={`hidden group-hover/parent:block absolute top-0 z-10 pl-2 ${
          isRightOverflowing ? "right-full pr-2 pl-0" : "left-full"
        }`}
      >
        <Card className="py-2 min-w-[180px] bg-gradient-to-b from-[rgba(62,61,69,0.6)] to-[rgba(32,32,32,0.9)] text-white border border-white shadow-lg">
          {children}
        </Card>
      </div>
    </div>
  );
}

// ==============================================================
// Categories Component & CategoriesDropdown - FIXED STYLING
// ==============================================================

function Categories({ isOpen, onClose, onToggle }: CategoriesProps) {
  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Main Categories Button */}
      <Button
        onClick={onToggle}
        className="flex items-center justify-start gap-2 min-w-[200px] h-[44px] px-4 rounded-full bg-[#717171] text-white font-medium text-[15px] hover:bg-black hover:text-[#717171] transition-colors shadow-sm"
      >
        <Menu className="w-5 h-5" />
        <span className="lowercase tracking-wide font-elemental">Categories</span>
      </Button>
    </div>
  );
}