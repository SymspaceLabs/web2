import ProductDetail from "@/pages-section/product-details";
import { fetchProductBySlug } from "@/api/product";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  return {
    title: product?.name ?? "Product",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}