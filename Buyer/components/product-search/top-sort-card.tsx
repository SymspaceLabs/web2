// src/components/product-search/top-sort-card.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TopSortCardProps {
  totalProducts: number;
  categoryDisplayName: string;
  genderDisplayName: string;
  sortOption: string;
  onSortChange: (value: string) => void;
}

export default function TopSortCard({
  totalProducts,
  categoryDisplayName,
  genderDisplayName,
  sortOption,
  onSortChange,
}: TopSortCardProps) {
  const displayText = () => {
    const parts = [];
    if (genderDisplayName) parts.push(genderDisplayName);
    if (categoryDisplayName) parts.push(categoryDisplayName);
    return parts.length > 0 ? `${parts.join(' ')} ` : '';
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-card border rounded-lg">
      <div>
        <h1 className="text-lg font-semibold">
          {displayText()}
          {displayText() && (
            <span className="text-muted-foreground font-normal">
              ({totalProducts.toLocaleString()})
            </span>
          )}
        </h1>
        <p className="text-sm text-muted-foreground">
          Showing {totalProducts.toLocaleString()} results
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}