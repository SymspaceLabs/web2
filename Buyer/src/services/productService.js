// lib/api.js or services/productService.js

export async function fetchProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    return { products: data.products, error: null };
  } catch (error) {
    return { products: [], error };
  }
}
