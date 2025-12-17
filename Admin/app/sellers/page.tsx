"use client"

import { useState, useMemo, useEffect } from "react"
import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, Store } from "lucide-react"
import { API_ENDPOINTS, authFetch } from "@/lib/api"
import { toast } from "sonner"

interface APISeller {
  id: string
  entityName: string
  website: string | null
  location: string | null
  userId: string
  slug: string
  logo: string | null
  isOnboardingFormFilled: boolean
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    isVerified: boolean
    createdAt: string
  }
  products: Array<{ id: string }>
}

interface UISeller {
  id: string
  entityName: string
  logo: string
  ownerName: string
  email: string
  location: string
  website: string
  productsCount: number
  isVerified: boolean
  isOnboarded: boolean
  createdAt: string
}

function mapAPISellerToUI(apiSeller: APISeller): UISeller {
  const ownerName = `${apiSeller.user.firstName} ${apiSeller.user.lastName}`.trim() || "Unknown"
  const logo = apiSeller.logo || "/placeholder-product.png"
  const productsCount = apiSeller.products?.length || 0

  return {
    id: apiSeller.id,
    entityName: apiSeller.entityName || "Unknown",
    logo,
    ownerName,
    email: apiSeller.user.email || "N/A",
    location: apiSeller.location || "N/A",
    website: apiSeller.website || "N/A",
    productsCount,
    isVerified: apiSeller.user.isVerified || false,
    isOnboarded: apiSeller.isOnboardingFormFilled || false,
    createdAt: new Date(apiSeller.user.createdAt).toLocaleDateString(),
  }
}

const ITEMS_PER_PAGE = 10

export default function SellersPage() {
  const router = useRouter()
  const [sellers, setSellers] = useState<UISeller[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [verifiedFilter, setVerifiedFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sellerToDelete, setSellerToDelete] = useState<UISeller | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function fetchSellers() {
      try {
        setLoading(true)
        const response = await authFetch(API_ENDPOINTS.sellers)

        const sellersData = Array.isArray(response) ? response : response.sellers || []
        const mappedSellers = sellersData.map(mapAPISellerToUI)
        setSellers(mappedSellers)
      } catch (err) {
        console.error("Error fetching sellers:", err)
        setError("Failed to load sellers. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchSellers()
  }, [])

  const filteredSellers = useMemo(() => {
    return sellers.filter((seller) => {
      const matchesSearch = 
        seller.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesVerified = 
        verifiedFilter === "all" || 
        (verifiedFilter === "verified" && seller.isVerified) ||
        (verifiedFilter === "unverified" && !seller.isVerified)
      
      return matchesSearch && matchesVerified
    })
  }, [searchTerm, verifiedFilter, sellers])

  const totalPages = Math.ceil(filteredSellers.length / ITEMS_PER_PAGE)
  const paginatedSellers = filteredSellers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleDeleteClick = (seller: UISeller) => {
    setSellerToDelete(seller)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!sellerToDelete) return

    setIsDeleting(true)
    try {
      // Replace with your actual delete seller API call
      // await deleteSeller(sellerToDelete.id)
      
      // Remove from local state
      setSellers((prev) => prev.filter((s) => s.id !== sellerToDelete.id))
      
      toast.success("Seller deleted", {
        description: `${sellerToDelete.entityName} has been successfully deleted.`,
      })
      
      setDeleteDialogOpen(false)
      setSellerToDelete(null)
    } catch (error) {
      console.error("Failed to delete seller:", error)
      
      toast.error("Delete failed", {
        description: "Failed to delete the seller. Please try again.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setSellerToDelete(null)
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading sellers...</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Seller Management</h1>
            <p className="text-muted-foreground mt-2">Manage all sellers on your platform</p>
          </div>
          <Button onClick={() => router.push("/sellers/create")} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Seller
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, owner, or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 h-12"
            />
          </div>
          <div className="flex gap-4">
            <Button
              variant={verifiedFilter === "all" ? "default" : "outline"}
              onClick={() => {
                setVerifiedFilter("all")
                setCurrentPage(1)
              }}
              className="h-12"
            >
              All
            </Button>
            <Button
              variant={verifiedFilter === "verified" ? "default" : "outline"}
              onClick={() => {
                setVerifiedFilter("verified")
                setCurrentPage(1)
              }}
              className="h-12"
            >
              Verified
            </Button>
            <Button
              variant={verifiedFilter === "unverified" ? "default" : "outline"}
              onClick={() => {
                setVerifiedFilter("unverified")
                setCurrentPage(1)
              }}
              className="h-12"
            >
              Unverified
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sellers ({filteredSellers.length})</CardTitle>
            <CardDescription>
              Showing {paginatedSellers.length} of {filteredSellers.length} sellers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seller</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSellers.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img 
                              src={seller.logo} 
                              alt={seller.entityName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150?text=No+Logo"
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium">{seller.entityName}</div>
                            {seller.website !== "N/A" && (
                              <a 
                                href={seller.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:underline"
                              >
                                {seller.website}
                              </a>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{seller.ownerName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{seller.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{seller.location}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {seller.productsCount} {seller.productsCount === 1 ? 'product' : 'products'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant={seller.isVerified ? "default" : "destructive"}>
                            {seller.isVerified ? "Verified" : "Unverified"}
                          </Badge>
                          {seller.isOnboarded && (
                            <Badge variant="outline" className="text-xs">
                              Onboarded
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{seller.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => router.push(`/sellers/${seller.id}`)}
                              className="cursor-pointer"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => router.push(`/sellers/edit/${seller.id}`)}
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => router.push(`/sellers/${seller.id}/products`)}
                              className="cursor-pointer"
                            >
                              <Store className="h-4 w-4 mr-2" />
                              View Products
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(seller)}
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

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <span className="font-semibold">{sellerToDelete?.entityName}</span> and remove
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
                    Delete Seller
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