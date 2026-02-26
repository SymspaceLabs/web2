"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

import { Company } from "@/types/company"
import { Product } from "@/types/products"
import { ProductCard3 } from "@/components/custom-cards/product-cards"

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

interface Section2Props {
  products: Product[]
  company?: Company
  itemsPerPage?: number
}

const layoutConstant = { grocerySidenavWidth: 280 }

// --- Build dynamic category nav from products ---
function buildCategoryNav(products: Product[]): NavCategory[] {
  const categoryIconMap: Record<string, string> = {
    "clothing-shoes-accessories": "👗",
    "electronics": "📱",
    "home-furniture-appliances": "🏠",
    "beauty-health-pets": "💄",
    "kids-toys": "🧸",
    "sports-fitness-outdoors": "⚽",
    "automotive": "🚗",
    "special-needs-accessibility": "♿",
    "maternity-prenatal-care": "🤱",
    "senior-care": "🧓",
    "recipes": "🍳",
  }

  const categoryMap = new Map<string, { name: string; slug: string; children: Map<string, string> }>()

  for (const product of products) {
    const cat = product.category
    if (!cat) continue

    let root = cat
    while (root.parent) root = root.parent

    if (!categoryMap.has(root.slug)) {
      categoryMap.set(root.slug, {
        name: root.name,
        slug: root.slug,
        children: new Map(),
      })
    }

    const group = categoryMap.get(root.slug)!
    if (!group.children.has(cat.slug)) {
      group.children.set(cat.slug, cat.name)
    }
  }

  const shopByCategory: NavItem[] = Array.from(categoryMap.values()).map((group) => {
    const children = Array.from(group.children.entries()).map(([slug, name]) => ({
      title: name,
      href: `/products/search?category=${slug}`,
    }))

    return {
      title: group.name,
      href: `/products/search?category=${group.slug}`,
      icon: categoryIconMap[group.slug] ?? "📦",
      ...(children.length > 1 ? { child: children } : {}),
    }
  })

  return [
    {
      category: "Top Categories",
      categoryItem: [
        { icon: "📦", title: "All Products", href: "#all" },
      ],
    },
    {
      category: "Shop by Category",
      categoryItem: shopByCategory,
    },
  ]
}

// --- SideNavbar Subcomponents ---
function ListItem({ title, icon }: { title: string; icon?: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm text-left">{title}</span>
    </div>
  )
}

function NavAccordion({ item, handleSelect }: { item: NavItem; handleSelect: (href: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      {/* 
        KEY FIX: CollapsibleTrigger renders a <button> which defaults to text-align:center.
        We override with text-left and w-full so content stays left-aligned.
      */}
      <CollapsibleTrigger asChild>
        <button
          className="w-full text-left"
          onClick={() => handleSelect(item.href)}
        >
          <div className="flex items-center justify-between py-2 px-5 cursor-pointer transition-colors hover:text-primary text-muted-foreground group">
            <div className="flex items-center gap-3">
              {item.icon && (
                <span className="text-lg group-hover:text-primary leading-none">
                  {item.icon}
                </span>
              )}
              <span className="text-sm font-medium text-left">{item.title}</span>
            </div>
            {item.child && (
              isOpen
                ? <ChevronDown className="size-4 shrink-0" />
                : <ChevronRight className="size-4 shrink-0" />
            )}
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {item.child?.map((childItem, idx) => (
          <div
            key={idx}
            className="flex items-center py-1 px-5 cursor-pointer transition-colors text-muted-foreground hover:text-primary group"
            onClick={() => handleSelect(childItem.href)}
          >
            <span className="w-1 h-1 rounded-sm bg-muted-foreground ml-8 mr-2 group-hover:bg-primary transition-colors shrink-0" />
            <span className="text-sm text-left">{childItem.title}</span>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

function BorderBox({ lineStyle }: { lineStyle: "solid" | "dash" }) {
  if (lineStyle === "dash") {
    return <div className="mt-1.5 mb-4 border-b-2 border-dashed border-primary" />
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
  handleSelect = () => {},
}: {
  navList: NavCategory[]
  lineStyle?: "solid" | "dash"
  sidebarHeight?: string
  sidebarStyle?: "transparent" | "colored"
  handleSelect?: (href: string) => void
}) {
  return (
    <ScrollArea className={cn("h-full", sidebarHeight !== "auto" && `max-h-[${sidebarHeight}]`)}>
      <Card className={cn("h-full rounded-lg border relative", sidebarStyle === "colored" && "bg-primary/5 pb-2.5")}>
        {navList.map((nav, ind) => (
          <div key={ind}>
            <div className="px-5 pt-4 pb-1.5">
              <h5 className="text-base font-semibold text-foreground text-left">{nav.category}</h5>
              <BorderBox lineStyle={lineStyle} />
            </div>
            {nav.categoryItem.map((item, idx) => {
              if (item.child) {
                return <NavAccordion item={item} handleSelect={handleSelect} key={idx} />
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

// --- Main Section2 Component ---
export default function Section2({ products, company, itemsPerPage = 12 }: Section2Props) {
  const [sidebarHeight] = useState<string>("85vh")
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const sidenavWidth = layoutConstant.grocerySidenavWidth || 280

  const categoryNavigation = useMemo(() => buildCategoryNav(products), [products])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNavSelect = (href: string) => {
    setCurrentPage(1)

    const slug = new URLSearchParams(href.split("?")[1] ?? "").get("category")

    if (!slug || href === "#all") {
      setFilteredProducts(products)
      return
    }

    const filtered = products.filter((p) => {
      let cat = p.category
      while (cat) {
        if (cat.slug === slug) return true
        cat = cat.parent ?? null
      }
      return false
    })

    setFilteredProducts(filtered)
  }

  const getPaginationRange = () => {
    const range: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) range.push(i)
      return range
    }

    range.push(1)
    if (currentPage > 3) range.push("ellipsis-start")

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) range.push(i)

    if (currentPage < totalPages - 2) range.push("ellipsis-end")
    if (totalPages > 1) range.push(totalPages)

    return range
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-8 pb-10">
      <div className="flex gap-7">

        {/* Sidebar */}
        <aside
          className="hidden md:block sticky top-0 transition-all duration-350 ease-in-out shrink-0"
          style={{ width: `${sidenavWidth}px`, minWidth: `${sidenavWidth}px` }}
        >
          <SideNavbar
            lineStyle="dash"
            navList={categoryNavigation}
            sidebarStyle="colored"
            sidebarHeight={sidebarHeight}
            handleSelect={handleNavSelect}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">All Products</h1>
            <p className="text-gray-600">Showing {filteredProducts.length} products</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try selecting a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProducts.map((item) => (
                <ProductCard3 key={item.id} product={item} company={item.company} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {getPaginationRange().map((page, index) => {
                    if (page === "ellipsis-start" || page === "ellipsis-end") {
                      return <PaginationItem key={`ellipsis-${index}`}><PaginationEllipsis /></PaginationItem>
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing {startIndex + 1}–{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </div>
        </main>
      </div>
    </div>
  )
}