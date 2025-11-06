"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; // GLOBAL CUSTOM COMPONENTS

import { H1 } from "@/components/Typography";
import Scrollbar from "@/components/scrollbar";
import { TableHeader, TablePagination } from "@/components/data-table"; // GLOBAL CUSTOM HOOK

import useMuiTable from "@/hooks/useMuiTable"; // Local CUSTOM COMPONENT

import ProductRow from "../product-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL

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
  id: "brand",
  label: "Brand",
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
}]; // =============================================================================

// =============================================================================
const ProductsPageView = ({
  products
}) => {
  const [productList, setProductList] = useState([...products]); // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID

  const filteredProducts = productList.map(item => ({
    id: item.id,
    slug: item.slug,
    name: item.title,
    brand: item.brand,
    price: item.price,
    image: item.thumbnail,
    published: item.published,
    category: item.categories[0]
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
  return (
    <Box sx={{background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden'}}>
      <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
        <H1 mb={2} sx={{ color:'#fff' }}>
          Product List
        </H1>
        <SearchArea handleSearch={() => {}} buttonText="Add Product" url="/vendor/products/create" searchPlaceholder="Search Product..." />
        <Card>
          <Scrollbar autoHide={false}>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={products.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

                <TableBody>
                  {filteredList.map((product, index) => <ProductRow key={index} product={product} />)}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Stack alignItems="center" my={4}>
            <TablePagination onChange={handleChangePage} count={Math.ceil(products.length / rowsPerPage)} />
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductsPageView;