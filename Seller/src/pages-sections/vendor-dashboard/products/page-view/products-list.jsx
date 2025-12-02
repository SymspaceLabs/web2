"use client";

// ==============================================================
// Product List Page
// ==============================================================

import { useState, useEffect, useCallback } from "react";
import { H1, H4, Paragraph } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { TableHeader, TablePagination } from "@/components/data-table";
import { Box, Card, Stack, Table, TableBody, TableContainer, Button } from "@mui/material";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import useMuiTable from "@/hooks/useMuiTable";
import Scrollbar from "@/components/scrollbar";

import { fetchProductsByCompanyId } from "@/services/productService";
// ==============================================================

// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "name",
  label: "Name",
  align: "left"
}, {
  id: "category",
  label: "Category",
  align: "left"
}, {
  id: "price",
  label: "Price",
  align: "left"
}, {
  id: "published",
  label: "Published",
  align: "left"
}, {
  id: "action",
  label: "Action",
  align: "center"
}];

// =============================================================================
// NEW COMPONENT: EmptyProductListState
// Displays when no products are found, providing a CTA.
// =============================================================================
const EmptyProductListState = ({ onCreateClick }) => (
    <Stack 
        alignItems="center" 
        justifyContent="center" 
        spacing={2} // Reduced spacing for a more compact look
        py={10} 
        textAlign="center"
        sx={{ 
            borderRadius: '8px', 
            background: '#FFFFFF',
            border: '1px dashed rgba(0, 0, 0, 0.2)', // Optional: You might remove the border for maximum simplicity
            mt: 3 
        }}
    >
        {/* Placeholder for the illustration (e.g., Cat in a Box SVG) */}
        {/* We will leave this as a comment or a clean Box if you plan to add a simple graphic component later */}
        <Box sx={{ maxWidth: 150, mb: 3 }}>
            {/* A simple component/SVG would go here if you use an illustration */}
             
        </Box>
        {/* Illustration: Referencing the SVG from the public folder */}
        <Box sx={{ maxWidth: 150, mb: 3 }}>
            <img 
                src="/assets/images/products/box-open.svg"
                alt="Empty products box"
                style={{ width: '100px', height: '100px', display: 'block' }} 
            />
        </Box>
        
        {/* Simplified Heading */}
        <H4 color="text.primary" sx={{ fontWeight: 600, mb: 0.5 }}>
            You don't have any products yet!
        </H4>
        
        {/* Simplified Description */}
        <Paragraph color="text.secondary" sx={{ maxWidth: 400, mb: 2 }}>
            Start by creating your first product
        </Paragraph>

        <Button
          onClick={onCreateClick} 
          color="info"
          variant="contained"
          sx={{
            minHeight: 44
          }}
        >
          Create new product
        </Button>
    </Stack>
);
// =============================================================================


// =============================================================================
const ProductsListPageView = () => {
    // Fetch User
    const { user } = useAuth();
    const router = useRouter(); // Initialize router for navigation

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Extracted product loading logic into a reusable function
    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Only load products if we have a company ID to filter by
            if (!user?.company?.id) {
                setLoading(false);
                setProductList([]);
                return;
            }

            // Destructure the 'products' array and 'error' object from the service result
            const { products, error } = await fetchProductsByCompanyId(user.company.id);
            
            if (error) {
                throw new Error(error.message || "Failed to fetch products.");
            }

            // CRITICAL FIX: Ensure 'products' is an array before setting state
            if (Array.isArray(products)) {
                setProductList(products);
            } else {
                console.error("API returned products data that is not an array:", products);
                throw new Error("Invalid data format received from the server.");
            }
        } catch (e) {
            // FIX: Ensure error state is correctly set. This is critical for preventing the .map() crash.
            setError(e.message || "An unknown error occurred during product fetch."); 
            console.error("Error loading products:", e);
            setProductList([]); // Ensure list is empty on error
        } finally {
            setLoading(false);
        }
    }, [user]); // Dependency on user

    // 2. Initial load of products
    useEffect(() => {
        loadProducts();
    }, [loadProducts]); // Dependency on loadProducts (which is wrapped in useCallback)
    
    
    // 3. New handler to refetch the list after a successful product deletion
    const handleProductDeleteSuccess = useCallback(() => {
        loadProducts();
    }, [loadProducts]);
    
    // 4. Handler for the empty state CTA
    const handleCreateProductClick = () => {
        // Navigate to the product creation page
        router.push("/vendor/products/create"); 
    };


    // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
    const filteredProducts = productList.map(item => ({
        id: item.id,
        slug: item.slug,
        name: item.name,
        price: item.price,
        image: item?.images[0]?.url,
        published: item.published,
        category: item.categories?.[0] || 'N/A'
    }));

    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort
    } = useMuiTable({
        listData: filteredProducts
    });

    // Handle Loading and Error States
    if (loading) {
        return (
            <Box sx={{ p: 4 }}>
                <H1 color='#FFF'>Loading Products...</H1>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <H1 color='error.main'>Error: Failed to fetch products. {error}</H1>
            </Box>
        );
    }

    // -------------------------------------------------------------------------
    // CONDITIONAL RENDERING: Display Empty State if no products are found
    // -------------------------------------------------------------------------
    const isListEmpty = filteredProducts.length === 0;

    return (
        <Box sx={{background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden'}}>
            <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
                
                <H1 mb={2} color='#FFF'>
                    Product List
                </H1>
                {/* SearchArea CTA Button is still available here even if the list is empty */}
                <SearchArea handleSearch={() => {}} buttonText="Add Product" url="/vendor/products/create" searchPlaceholder="Search Product..." />

                {isListEmpty ? (
                    // RENDER EMPTY STATE 
                    <EmptyProductListState onCreateClick={handleCreateProductClick} />
                ) : (
                    // RENDER TABLE
                    <Card>
                        <Scrollbar autoHide={false}>
                            <TableContainer sx={{ minWidth: 900 }}>
                                <Table>
                                    <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={filteredProducts.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

                                    <TableBody>
                                        {filteredList.map((product, index) => 
                                            <ProductRow
                                                key={product.id}
                                                product={product}
                                                onDeleteSuccess={handleProductDeleteSuccess}
                                            />
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>

                        <Stack alignItems="center" my={4}>
                            <TablePagination onChange={handleChangePage} count={Math.ceil(filteredProducts.length / rowsPerPage)} />
                        </Stack>
                    </Card>
                )}
            </Box>
        </Box>
    );
};

export default ProductsListPageView;