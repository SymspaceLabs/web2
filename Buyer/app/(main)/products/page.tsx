// app/products/page.tsx
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ProductSearchPageView from '@/components/product-search/product-search-page-view';

export const metadata = {
  title: 'Products | Your Store Name',
  description: 'Browse our collection of products',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductSearchPageView />
    </Suspense>
  );
}

function ProductPageSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Filter Sidebar Skeleton */}
        <div className="hidden md:block md:col-span-3">
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="md:col-span-9">
          <Skeleton className="h-12 w-full mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}