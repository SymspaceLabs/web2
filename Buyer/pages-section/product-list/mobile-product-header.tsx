// src/components/product-search/mobile-product-header.tsx
import { Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MobileProductHeaderProps {
  onFilterClick: () => void;
  sortOption: string;
  onSortChange: (value: string) => void;
  displayedProductCount: number;
  displayFilterText: string;
}

export default function MobileProductHeader({
  onFilterClick,
  sortOption,
  onSortChange,
  displayedProductCount,
  displayFilterText,
}: MobileProductHeaderProps) {
  return (
    <>
      {/* Filter and Sort Controls */}
      <div className="mb-4 flex w-full gap-2">
        {/* Filter Button */}
        <Button
          variant="outline"
          onClick={onFilterClick}
          className="flex-1 justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>

        {/* Sort Select */}
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="flex-1">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Total {displayedProductCount.toLocaleString()} results {displayFilterText}
        </p>
      </div>
    </>
  );
}