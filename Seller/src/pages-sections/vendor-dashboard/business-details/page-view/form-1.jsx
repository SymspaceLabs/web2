"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT
import Link from "next/link";

import { H3 } from "../../../../components/Typography"; // Local CUSTOM COMPONENT
import ChevronLeft from "../../../../icons/ChevronLeft";

import ProductForm from "../product-form-1";
import { useRouter } from 'next/navigation';

const ProductCreatePageView = () => {
    const router = useRouter();

  const INITIAL_VALUES = {
    name: "",
    tags: "",
    stock: "",
    price: "",
    category: [],
    sale_price: "",
    description: ""
  };

  const handleFormSubmit = values => {
    console.log(values);
  };

  return <Box py={4}>

      <Link href={`/vendor/dashboard`}>
        <Box onClick={()=>router.back()} sx={{py:3, display:'flex', alignItems:'center', gap:1, alignContent:'center'}}>
          <ChevronLeft color="primary" /> 
          <H3>Essential Business Information</H3>
        </Box>
      </Link>     

      

      <ProductForm initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} />
    </Box>;
};

export default ProductCreatePageView;