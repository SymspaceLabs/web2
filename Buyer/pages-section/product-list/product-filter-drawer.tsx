// src/components/product-search/product-filter-drawer.tsx
import { RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import ProductFilterCard, { ProductFilterCardProps } from './product-filter-card';

interface ProductFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onResetFilters: () => void;
  filterControlProps: ProductFilterCardProps;
}

export default function ProductFilterDrawer({
  open,
  onClose,
  onResetFilters,
  filterControlProps,
}: ProductFilterDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent side="left" className="w-[330px] p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="border-b px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle>Filter</SheetTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onResetFilters}
                aria-label="Reset Filters"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ProductFilterCard {...filterControlProps} />
        </div>
      </SheetContent>
    </Sheet>
  );
}