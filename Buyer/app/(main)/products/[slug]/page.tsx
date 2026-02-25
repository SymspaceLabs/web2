import ProductDetail from "@/pages-section/product-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  // In Server Components, we await params
  const { slug } = await params;

  return <ProductDetail slug={slug} />;
}