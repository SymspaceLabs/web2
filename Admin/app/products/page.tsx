// app/products/page.tsx

"use client"

import { useState, useMemo, useEffect } from "react"
import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination } from "@/components/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Search, Plus, Eye, Edit, Trash2, MoreVertical } from "lucide-react"
import { API_ENDPOINTS, authFetch } from "@/lib/api"
import { bulkDeleteProducts, deleteProduct } from "@/api/product"
import { toast } from "sonner"
import { Product } from "@/types/product.type"

interface UIProduct {
  displayPrice: any
  id: string
  name: string
  thumbnail: string
  category: string
  price: string
  stock: number
  company: string
  status: "active" | "draft" | "disabled"
  createdAt: string
}

function mapAPIProductToUI(apiProduct: Product): UIProduct {
  const thumbnail = apiProduct.thumbnail ||apiProduct.images?.[0]?.url || "https://via.placeholder.com/150?text=No+Image"
  const category =  apiProduct.category?.name || "Uncategorized"
  const company = apiProduct.company?.entityName || "Unknown"
  const price = apiProduct.displayPrice?.range || ""
  const status = (apiProduct.status?.toLowerCase() || "draft") as "active" | "draft" | "disabled"

  return {
    id: apiProduct.id || '',
    name: apiProduct.name,
    thumbnail,
    category,
    price,
    stock: apiProduct.stock || 0,
    company,
    status,
    createdAt: new Date(apiProduct.createdAt).toLocaleDateString(),
    displayPrice: apiProduct.displayPrice
  }
}

const ITEMS_PER_PAGE = 10

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<UIProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState<string[]>([])
  
  // Multi-select state
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<UIProduct | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Bulk delete dialog state
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await authFetch(API_ENDPOINTS.products)

        const productsData = Array.isArray(response) ? response : response.data || response.products || []
        const mappedProducts = productsData.map(mapAPIProductToUI)
        setProducts(mappedProducts)

        const uniqueCategories = [...new Set(mappedProducts.map((p: any) => p.category))]
        setCategories(uniqueCategories as string[])
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, categoryFilter, statusFilter, products])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Multi-select handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedProducts.map(p => p.id))
      setSelectedProducts(allIds)
    } else {
      setSelectedProducts(new Set())
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    const newSelected = new Set(selectedProducts)
    if (checked) {
      newSelected.add(productId)
    } else {
      newSelected.delete(productId)
    }
    setSelectedProducts(newSelected)
  }

  const isAllSelected = paginatedProducts.length > 0 && 
    paginatedProducts.every(p => selectedProducts.has(p.id))
  
  const isSomeSelected = paginatedProducts.some(p => selectedProducts.has(p.id)) && !isAllSelected

  // Single delete handlers
  const handleDeleteClick = (product: UIProduct) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!productToDelete) return

    setIsDeleting(true)
    try {
      await deleteProduct(productToDelete.id)
      
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id))
      
      toast.success("Product deleted", {
        description: `${productToDelete.name} has been successfully deleted.`,
      })
      
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    } catch (error) {
      console.error("Failed to delete product:", error)
      
      toast.error("Delete failed", {
        description: "Failed to delete the product. Please try again.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  // Bulk delete handlers
  const handleBulkDeleteClick = () => {
    if (selectedProducts.size === 0) return
      setBulkDeleteDialogOpen(true)
    }

      const handleConfirmBulkDelete = async () => {
      setIsDeleting(true)
      const idsToDelete = Array.from(selectedProducts)
      
      try {
        // Use the new bulk delete endpoint
        const result = await bulkDeleteProducts(idsToDelete)
        
        // Remove from local state
        setProducts((prev) => prev.filter((p) => !selectedProducts.has(p.id)))
        
        toast.success("Products deleted", {
          description: result.message || `${result.deletedCount} product(s) have been successfully deleted.`,
        })
        
        setSelectedProducts(new Set())
        setBulkDeleteDialogOpen(false)
      } catch (error) {
        console.error("Failed to delete products:", error)
        
        toast.error("Delete failed", {
          description: error instanceof Error ? error.message : "Failed to delete the products. Please try again.",
        })
      } finally {
        setIsDeleting(false)
      }
    }

  const handleCancelBulkDelete = () => {
    setBulkDeleteDialogOpen(false)
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </ProtectedLayout>
    )
  }

  if (error) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-destructive">{error}</p>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
            <p className="text-muted-foreground mt-2">Manage all products in your catalog</p>
          </div>
          <Button onClick={() => router.push("/products/create")} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Product
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 h-12"
            />
          </div>
          <Select
            value={categoryFilter}
            onValueChange={(v) => {
              setCategoryFilter(v)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-full md:w-40 !h-12">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-full md:w-40 !h-12">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedProducts.size > 0 && (
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {selectedProducts.size} product(s) selected
              </span>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleBulkDeleteClick}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
            <CardDescription>
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                        className={isSomeSelected ? "data-[state=checked]:bg-primary" : ""}
                      />
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.has(product.id)}
                          onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                          aria-label={`Select ${product.name}`}
                        />
                      </TableCell>
                      <TableCell className="max-w-[200px] md:max-w-[300px]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img 
                              src={product.thumbnail} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image"
                              }}
                            />
                          </div>
                          <span className="font-medium truncate" title={product.name}>
                            {product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{product.category}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{product.company}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.stock > 50 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                        >
                          {product.stock} units
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === "active" ? "default" : "secondary"} className="capitalize">{product.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{product.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => router.push(`/products/${product.id}`)}
                              className="cursor-pointer"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => router.push(`/products/edit/${product.id}`)}
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(product)}
                              className="text-destructive focus:text-destructive cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </CardContent>
        </Card>

        {/* Single Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <span className="font-semibold">{productToDelete?.name}</span> and remove
                all associated data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDelete} disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                style={{ color: 'white' }}
                className="bg-destructive hover:bg-destructive/90 gap-2"
              >
                {isDeleting ? (
                  <>Deleting...</>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Product
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Bulk Delete Dialog */}
        <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Multiple Products?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <span className="font-semibold">{selectedProducts.size} product(s)</span> and remove
                all associated data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelBulkDelete} disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmBulkDelete}
                disabled={isDeleting}
                style={{ color: 'white' }}
                className="bg-destructive hover:bg-destructive/90 gap-2"
              >
                {isDeleting ? (
                  <>Deleting...</>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete {selectedProducts.size} Products
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedLayout>
  )
}