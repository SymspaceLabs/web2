"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, ChevronDown, Search } from "lucide-react"
import {
  categories,
  type Category,
  type Subcategory,
  type SubcategoryItem,
  type SubcategoryItemChild,
} from "@/lib/categories"

export type SelectedCategory = {
  id: string  // ⭐ This is the most granular category ID (subcategoryItemChild or subcategoryItem)
  name: string
  path: string[]
  fullPath: string
}

type CategorySelectorProps = {
  value?: string
  onSelect: (category: SelectedCategory) => void
  // New props for pre-population
  subcategoryItemId?: string
  subcategoryItemChildId?: string | null
}

type NavigationLevel =
  | { level: "root" }
  | { level: "subcategory"; category: Category }
  | { level: "item"; category: Category; subcategory: Subcategory }
  | { level: "child"; category: Category; subcategory: Subcategory; item: SubcategoryItem }

export function CategorySelector({ 
  value, 
  onSelect, 
  subcategoryItemId, 
  subcategoryItemChildId 
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [navigationStack, setNavigationStack] = useState<NavigationLevel[]>([{ level: "root" }])
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Pre-populate the category selector based on API data
  useEffect(() => {
    if (!subcategoryItemId) return

    // Search through the categories structure to find the matching item
    for (const category of categories) {
      for (const subcategory of category.subcategories) {
        for (const item of subcategory.subcategoryItems) {
          // Check if this is the matching subcategoryItem
          if (item.id === subcategoryItemId) {
            // Type guard to check if item has children
            const hasChildren = 'subcategoryItemChildren' in item && 
                               Array.isArray(item.subcategoryItemChildren) && 
                               item.subcategoryItemChildren.length > 0
            
            // Check if we need to find a child
            if (subcategoryItemChildId && hasChildren) {
              const child = (item as SubcategoryItem).subcategoryItemChildren?.find(
                c => c.id === subcategoryItemChildId
              )
              if (child) {
                // Found the child - set it as selected
                const selected: SelectedCategory = {
                  id: child.id,
                  name: child.name,
                  path: [category.name, subcategory.name, item.name, child.name],
                  fullPath: [category.name, subcategory.name, item.name, child.name].join(" > "),
                }
                setSelectedCategory(selected)
                onSelect(selected)
                return
              }
            } else {
              // No child ID provided, or item has no children - select the item itself
              const selected: SelectedCategory = {
                id: item.id,
                name: item.name,
                path: [category.name, subcategory.name, item.name],
                fullPath: [category.name, subcategory.name, item.name].join(" > "),
              }
              setSelectedCategory(selected)
              onSelect(selected)
              return
            }
          }
        }
      }
    }
  }, [subcategoryItemId, subcategoryItemChildId]) // Only run when these IDs change

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const currentLevel = navigationStack[navigationStack.length - 1]

  const searchCategories = (query: string): Array<{ id: string; name: string; path: string[]; score: number }> => {
    const results: Array<{ id: string; name: string; path: string[]; score: number }> = []
    const lowerQuery = query.toLowerCase().trim()

    // Return empty if query is too short (less than 2 characters)
    if (lowerQuery.length < 2) return []

    categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.subcategoryItems.forEach((item) => {
          const hasChildren = 'subcategoryItemChildren' in item && 
                            Array.isArray((item as SubcategoryItem).subcategoryItemChildren) && 
                            (item as SubcategoryItem).subcategoryItemChildren!.length > 0
          
          if (hasChildren) {
            (item as SubcategoryItem).subcategoryItemChildren?.forEach((child) => {
              const childNameLower = child.name.toLowerCase()
              
              // Only match if query matches word boundaries
              const words = childNameLower.split(/\s+/) // Split by whitespace
              const matchesWord = words.some(word => word.includes(lowerQuery))
              
              if (matchesWord || childNameLower.includes(lowerQuery)) {
                let score = 0
                if (childNameLower === lowerQuery) {
                  score = 100 // Exact match
                } else if (childNameLower.startsWith(lowerQuery)) {
                  score = 50 // Starts with query
                } else if (words.some(word => word === lowerQuery)) {
                  score = 40 // Exact word match
                } else if (words.some(word => word.startsWith(lowerQuery))) {
                  score = 30 // Word starts with query
                } else {
                  score = 10 // Contains query
                }
                
                // Filter out very low relevance matches for longer queries
                if (lowerQuery.length >= 4 && score < 20) {
                  return // Skip low-relevance matches
                }
                
                results.push({
                  id: child.id,
                  name: child.name,
                  path: [category.name, subcategory.name, item.name, child.name],
                  score
                })
              }
            })
          } else {
            const itemNameLower = item.name.toLowerCase()
            
            // Only match if query matches word boundaries
            const words = itemNameLower.split(/\s+/)
            const matchesWord = words.some(word => word.includes(lowerQuery))
            
            if (matchesWord || itemNameLower.includes(lowerQuery)) {
              let score = 0
              if (itemNameLower === lowerQuery) {
                score = 100 // Exact match
              } else if (itemNameLower.startsWith(lowerQuery)) {
                score = 50 // Starts with query
              } else if (words.some(word => word === lowerQuery)) {
                score = 40 // Exact word match
              } else if (words.some(word => word.startsWith(lowerQuery))) {
                score = 30 // Word starts with query
              } else {
                score = 10 // Contains query
              }
              
              // Filter out very low relevance matches for longer queries
              if (lowerQuery.length >= 4 && score < 20) {
                return // Skip low-relevance matches
              }
              
              results.push({
                id: item.id,
                name: item.name,
                path: [category.name, subcategory.name, item.name],
                score
              })
            }
          }
        })
      })
    })

    // Sort by score (highest first), then alphabetically
    return results.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return a.name.localeCompare(b.name)
    })
  }

  // const filteredResults = useMemo(() => {
  //   if (!searchQuery.trim()) return []
  //   return searchCategories(searchQuery)
  // }, [searchQuery])
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    return searchCategories(searchQuery).map(({ id, name, path }) => ({ id, name, path }))
  }, [searchQuery])

  const handleCategoryClick = (category: Category) => {
    setNavigationStack([...navigationStack, { level: "subcategory", category }])
    setSearchQuery("")
  }

  const handleSubcategoryClick = (category: Category, subcategory: Subcategory) => {
    setNavigationStack([...navigationStack, { level: "item", category, subcategory }])
    setSearchQuery("")
  }

  const handleItemClick = (category: Category, subcategory: Subcategory, item: SubcategoryItem) => {
    // Type guard to check if item has children
    const hasChildren = 'subcategoryItemChildren' in item && 
                       Array.isArray(item.subcategoryItemChildren) && 
                       item.subcategoryItemChildren.length > 0
    
    if (hasChildren) {
      // Has children, navigate deeper
      setNavigationStack([...navigationStack, { level: "child", category, subcategory, item }])
      setSearchQuery("")
    } else {
      // Leaf node, select it
      const selected: SelectedCategory = {
        id: item.id,
        name: item.name,
        path: [category.name, subcategory.name, item.name],
        fullPath: [category.name, subcategory.name, item.name].join(" > "),
      }
      setSelectedCategory(selected)
      onSelect(selected)
      setIsOpen(false)
      setSearchQuery("")
      setNavigationStack([{ level: "root" }])
    }
  }

  const handleChildClick = (
    category: Category,
    subcategory: Subcategory,
    item: SubcategoryItem,
    child: SubcategoryItemChild,
  ) => {
    // Child is always a leaf node
    const selected: SelectedCategory = {
      id: child.id,
      name: child.name,
      path: [category.name, subcategory.name, item.name, child.name],
      fullPath: [category.name, subcategory.name, item.name, child.name].join(" > "),
    }
    setSelectedCategory(selected)
    onSelect(selected)
    setIsOpen(false)
    setSearchQuery("")
    setNavigationStack([{ level: "root" }])
  }

  const handleSearchResultClick = (result: { id: string; name: string; path: string[] }) => {
    const selected: SelectedCategory = {
      id: result.id,
      name: result.name,
      path: result.path,
      fullPath: result.path.join(" > "),
    }
    setSelectedCategory(selected)
    onSelect(selected)
    setSearchQuery("")
    setIsOpen(false)
    setNavigationStack([{ level: "root" }])
  }

  const handleBack = () => {
    setNavigationStack(navigationStack.slice(0, -1))
  }

  const breadcrumb: string[] = []
  navigationStack.forEach((level) => {
    if (level.level === "subcategory") {
      breadcrumb.push(level.category.name)
    } else if (level.level === "item") {
      breadcrumb.push(level.category.name, level.subcategory.name)
    } else if (level.level === "child") {
      breadcrumb.push(level.category.name, level.subcategory.name, level.item.name)
    }
  })

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <Label htmlFor="category-input">
        Category <span className="text-destructive">*</span>
      </Label>

      <div className="relative">
        <Input
          id="category-input"
          value={selectedCategory?.fullPath || ""}
          onClick={() => {
            setIsOpen(!isOpen)
            setNavigationStack([{ level: "root" }])
          }}
          readOnly
          placeholder="Select category..."
          className="cursor-pointer pr-10"
        />
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="border rounded-lg bg-background shadow-lg overflow-hidden">
          <div className="p-3 border-b bg-background sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="pl-9"
                autoFocus
              />
            </div>
          </div>

          {breadcrumb.length > 0 && !searchQuery && (
            <div className="px-4 py-2 bg-muted/30 border-b text-sm text-muted-foreground flex items-center gap-2">
              {breadcrumb.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight className="h-3 w-3" />}
                  <span>{crumb}</span>
                </span>
              ))}
            </div>
          )}

          {navigationStack.length > 1 && !searchQuery && (
            <div className="px-2 py-2 border-b">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="w-full justify-start text-primary hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          )}

          <div className="max-h-[400px] overflow-y-auto">
            {searchQuery ? (
              filteredResults.length > 0 ? (
                <div className="divide-y">
                  {filteredResults.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => handleSearchResultClick(result)}
                      className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{result.path.join(" > ")}</p>
                      </div>
                      <span className="text-xs text-green-600 flex-shrink-0">Select</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No categories found matching "{searchQuery}"
                </div>
              )
            ) : (
              <div className="divide-y">
                {currentLevel.level === "root" && (
                  <>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryClick(category)}
                        className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between gap-2"
                      >
                        <span className="font-medium">{category.name}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </>
                )}

                {currentLevel.level === "subcategory" && (
                  <>
                    {currentLevel.category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        type="button"
                        onClick={() => handleSubcategoryClick(currentLevel.category, subcategory)}
                        className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between gap-2"
                      >
                        <span className="font-medium">{subcategory.name}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </>
                )}

                {currentLevel.level === "item" && (
                  <>
                    {currentLevel.subcategory.subcategoryItems.map((item) => {
                      // Type guard to check if item has children
                      const hasChildren = 'subcategoryItemChildren' in item && 
                                         Array.isArray((item as SubcategoryItem).subcategoryItemChildren) && 
                                         (item as SubcategoryItem).subcategoryItemChildren!.length > 0
                      
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleItemClick(currentLevel.category, currentLevel.subcategory, item as SubcategoryItem)}
                          className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between gap-2"
                        >
                          <span className="font-medium">{item.name}</span>
                          {hasChildren ? (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <span className="text-xs text-green-600">Select</span>
                          )}
                        </button>
                      )
                    })}
                  </>
                )}

                {currentLevel.level === "child" && (
                  <>
                    {currentLevel.item.subcategoryItemChildren?.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() =>
                          handleChildClick(currentLevel.category, currentLevel.subcategory, currentLevel.item, child)
                        }
                        className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between gap-2"
                      >
                        <span className="font-medium">{child.name}</span>
                        <span className="text-xs text-green-600">Select</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground">
              Browse through categories or search to find the best match for your product
            </p>
          </div>
        </div>
      )}
    </div>
  )
}