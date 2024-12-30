"use client";

import Content from "./content"; // API FUNCTIONS
import { useState, useEffect } from "react";

export default async function Section5() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {};

  useEffect(() => {
    getAllProducts();
  }, []);
  

  return <Content products={products} />;
}
