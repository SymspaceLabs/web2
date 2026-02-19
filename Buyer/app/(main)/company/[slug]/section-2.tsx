"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Heart, ShoppingCart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

import { Company } from "@/types/company"

// --- Type Definitions ---
interface NavItem {
  title: string
  icon?: string
  href: string
  child?: Array<{ title: string; href: string }>
}

interface NavCategory {
  category: string
  categoryItem: NavItem[]
}

interface Product {
  id: string
  name: string
  slug: string
  thumbnail: string
  displayPrice: {
    price: number
    salePrice?: number
    hasSale: boolean
  }
  stock: number
}

interface Section2Props {
  products: Product[]
  company?: Company
}

// --- Constants ---
const layoutConstant = {
  grocerySidenavWidth: 280
}

// --- SideNavbar Subcomponents ---
function ListItem({ 
  title, 
  icon 
}: { 
  title: string
  icon?: string
}) {
  return (
    <div className="flex items-center gap-3">
      {icon && <span className="text-muted-foreground text-lg">{icon}</span>}
      <span className="text-sm">{title}</span>
    </div>
  )
}

function NavAccordion({ 
  item, 
  handleSelect 
}: { 
  item: NavItem
  handleSelect: (href: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between py-2 px-5 cursor-pointer transition-colors hover:text-primary text-muted-foreground group">
          <div className="flex items-center gap-3">
            {item.icon && <span className="text-lg group-hover:text-primary">{item.icon}</span>}
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="size-4 transition-transform" />
          ) : (
            <ChevronRight className="size-4 transition-transform" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {item.child?.map((childItem, idx) => (
          <div
            key={idx}
            className="flex items-center py-1 px-5 cursor-pointer transition-colors text-muted-foreground hover:text-primary group"
            onClick={() => handleSelect(childItem.href)}
          >
            <span className="w-1 h-1 rounded-sm bg-muted-foreground ml-8 mr-2 group-hover:bg-primary transition-colors" />
            <span className="text-sm">{childItem.title}</span>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

function BorderBox({ lineStyle }: { lineStyle: "solid" | "dash" }) {
  if (lineStyle === "dash") {
    return (
      <div className="mt-1.5 mb-4 border-b-2 border-dashed border-primary" />
    )
  }

  return (
    <div className="flex items-center gap-0 mt-1.5 mb-4">
      <span className="h-0.5 w-full bg-primary/30 rounded-l-sm" />
      <span className="h-0.5 w-full bg-muted-foreground/40 rounded-r-sm" />
    </div>
  )
}

function SideNavbar({
  navList,
  lineStyle = "solid",
  sidebarHeight = "auto",
  sidebarStyle = "transparent",
  handleSelect = () => {}
}: {
  navList: NavCategory[]
  lineStyle?: "solid" | "dash"
  sidebarHeight?: string
  sidebarStyle?: "transparent" | "colored"
  handleSelect?: (href: string) => void
}) {
  return (
    <ScrollArea 
      className={cn(
        "h-full",
        sidebarHeight !== "auto" && `max-h-[${sidebarHeight}]`
      )}
    >
      <Card 
        className={cn(
          "h-full rounded-lg border relative",
          sidebarStyle === "colored" && "bg-primary/5 pb-2.5"
        )}
      >
        {navList.map((nav, ind) => (
          <div key={ind}>
            {/* GROUP TITLE */}
            <div className="px-5 pt-4 pb-1.5">
              <h5 className="text-base font-semibold text-foreground">
                {nav.category}
              </h5>
              <BorderBox lineStyle={lineStyle} />
            </div>

            {/* CATEGORY/NAV LIST */}
            {nav.categoryItem.map((item, idx) => {
              if (item.child) {
                return (
                  <NavAccordion 
                    item={item} 
                    handleSelect={handleSelect} 
                    key={idx} 
                  />
                )
              }

              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 py-2 px-5 cursor-pointer transition-colors text-muted-foreground hover:text-primary"
                  onClick={() => handleSelect(item.href)}
                >
                  <ListItem title={item.title} icon={item.icon} />
                </div>
              )
            })}
          </div>
        ))}
      </Card>
    </ScrollArea>
  )
}

// --- ProductCard3 Component ---
function ProductCard3({ 
  product, 
  company 
}: { 
  product: Product
  company?: Company 
}) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const currentPrice = product.displayPrice?.salePrice || product.displayPrice?.price || 0
  const originalPrice = product.displayPrice?.hasSale ? product.displayPrice?.price : null

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square bg-secondary">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.displayPrice?.hasSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            SALE
          </div>
        )}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={cn(
              "size-4",
              isWishlisted && "fill-red-500 text-red-500"
            )}
          />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {company?.entityName && (
          <p className="text-xs text-muted-foreground">{company.entityName}</p>
        )}
        
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-foreground">
            ${currentPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex-1"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="size-4 mr-2" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  )
}

// --- Main Section2 Component ---
export default function Section2({ products, company }: Section2Props) {
  const [sidebarHeight] = useState<string>("85vh")
  const sidenavWidth = layoutConstant.grocerySidenavWidth || 280

  const handleNavSelect = (href: string) => {
    console.log("Navigate to:", href)
    // Add navigation logic here
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-8 pb-10">
      <div className="flex gap-7">
        
        {/* Sidebar - Hidden on mobile, visible on md+ */}
        <aside
          className="hidden md:block sticky top-0 transition-all duration-350 ease-in-out shrink-0"
          style={{ 
            width: `${sidenavWidth}px`,
            minWidth: `${sidenavWidth}px` 
          }}
        >
          <SideNavbar
            lineStyle="dash"
            navList={categoryNavigation}
            sidebarStyle="colored"
            sidebarHeight={sidebarHeight || "85vh"}
            handleSelect={handleNavSelect}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">All Products</h1>
            <p className="text-gray-600">
              Tall blind but were, been folks not the expand
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard3 product={product} company={company} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 flex justify-center">
            <Button size="lg" className="px-8">
              Load More...
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}

// --- Navigation Data ---
const categoryNavigation: NavCategory[] = [
  {
    category: "Top Categories",
    categoryItem: [
      {
        icon: "🏠",
        title: "Home",
        href: "/products/search/Dariry & Eggs"
      },
      {
        icon: "⭐",
        title: "Popular Products",
        href: "/products/search/Breakfast"
      },
      {
        icon: "📈",
        title: "Trending Products",
        href: "/products/search/Frozen"
      },
      {
        icon: "📦",
        title: "All Products",
        href: "/products/search/vegetables"
      }
    ]
  },
  {
    category: "Shop by Category",
    categoryItem: [
      {
        icon: "🪑",
        title: "Chair",
        href: "/products/search/vegetables",
        child: [
          {
            title: "Pears, apples, quinces",
            href: "/products/search/Pears, apples, quinces"
          },
          {
            title: "Peaches, plums, apricots",
            href: "/products/search/Peaches, plums, apricots"
          },
          {
            title: "Grapes",
            href: "/products/search/Grapes"
          }
        ]
      },
      {
        icon: "🎨",
        title: "Decors",
        href: "/products/search/Fruits & Vegetables",
        child: [
          {
            title: "Onion",
            href: "/products/search/Onion"
          },
          {
            title: "Potato",
            href: "/products/search/Potato"
          },
          {
            title: "Vegetable Pack",
            href: "/products/search/Vegetable Pack"
          }
        ]
      },
      {
        icon: "🏡",
        title: "Interior",
        href: "/products/search/Dariry & Eggs",
        child: [
          {
            title: "Pears, apples, quinces",
            href: "/products/search/Pears, apples, quinces"
          },
          {
            title: "Peaches, plums, apricots",
            href: "/products/search/Peaches, plums, apricots"
          },
          {
            title: "Grapes",
            href: "/products/search/Grapes"
          }
        ]
      },
      {
        icon: "🛋️",
        title: "Furniture",
        href: "/products/search/Dariry & Eggs",
        child: [
          {
            title: "Pears, apples, quinces",
            href: "/products/search/Pears, apples, quinces"
          },
          {
            title: "Peaches, plums, apricots",
            href: "/products/search/Peaches, plums, apricots"
          },
          {
            title: "Grapes",
            href: "/products/search/Grapes"
          }
        ]
      },
      {
        icon: "🛋️",
        title: "Sofa",
        href: "/products/search/Breakfast",
        child: [
          {
            title: "Pears, apples, quinces",
            href: "/products/search/Pears, apples, quinces"
          },
          {
            title: "Peaches, plums, apricots",
            href: "/products/search/Peaches, plums, apricots"
          },
          {
            title: "Grapes",
            href: "/products/search/Grapes"
          }
        ]
      },
      {
        icon: "🪑",
        title: "Stool",
        href: "/products/search/Frozen",
        child: [
          {
            title: "Pears, apples, quinces",
            href: "/products/search/Pears, apples, quinces"
          },
          {
            title: "Peaches, plums, apricots",
            href: "/products/search/Peaches, plums, apricots"
          },
          {
            title: "Grapes",
            href: "/products/search/Grapes"
          }
        ]
      },
      {
        icon: "🚪",
        title: "Wardrobe",
        href: "/products/search/Organic",
        child: [
          {
            title: "Pears, apples, quinces",
            href: "/products/search/Pears, apples, quinces"
          },
          {
            title: "Peaches, plums, apricots",
            href: "/products/search/Peaches, plums, apricots"
          },
          {
            title: "Grapes",
            href: "/products/search/Grapes"
          }
        ]
      },
      {
        icon: "🍽️",
        title: "Dining",
        href: "/products/search/Canned Food",
        child: [
          {
            title: "Pears, apples, quinces",
            href: "/products/search/Pears, apples, quinces"
          },
          {
            title: "Peaches, plums, apricots",
            href: "/products/search/Peaches, plums, apricots"
          },
          {
            title: "Grapes",
            href: "/products/search/Grapes"
          }
        ]
      },
      {
        icon: "🛋️",
        title: "Living",
        href: "/products/search/Coffee & Snacks"
      },
      {
        icon: "☕",
        title: "Coffee Tea Table",
        href: "/products/search/Coffee & Snacks"
      },
      {
        icon: "🏠",
        title: "Living Room Sets",
        href: "/products/search/Coffee & Snacks"
      }
    ]
  }
]