"use client";

// ==============================================================
// Product List Page
// ==============================================================

import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { TableHeader, TablePagination } from "@/components/data-table";
import { Box, Card, Stack, Table, TableBody, TableContainer } from "@mui/material";

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
const ProductsPageView = () => {

  // Fetch User
  const { user } = useAuth();

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
    // Instead of filtering the list locally, we call the reusable loadProducts function
    // to refetch the data from the server, ensuring the list is fully synchronized.
    loadProducts();
  }, [loadProducts]);


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

  return (
    <Box sx={{background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden'}}>
      <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
        <H1 mb={2} color='#FFF'>
          Product List
        </H1>
        <SearchArea handleSearch={() => {}} buttonText="Add Product" url="/vendor/products/create" searchPlaceholder="Search Product..." />

        <Card>
          <Scrollbar autoHide={false}>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={filteredProducts.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

                <TableBody>
                  {filteredList.map((product, index) => 
                    <ProductRow
                      key={product.id} // Changed key to product.id for better stability
                      product={product}
                      onDeleteSuccess={handleProductDeleteSuccess} // <-- Passed the new handler here
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
      </Box>
    </Box>
  );
};

export default ProductsPageView;
