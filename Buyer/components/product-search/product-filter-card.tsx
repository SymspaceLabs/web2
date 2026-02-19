// src/components/product-search/product-filter-card.tsx
'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { CategoryAccordion } from './category-accordion';
import { Category } from '@/types/category';

interface Brand {
  id: string | number;
  entityName: string;
}

interface Color {
  code: string;
  name: string;
}

export interface ProductFilterCardProps {
  allBrands: any[];
  selectedBrands: any[];
  setSelectedBrands: (brands: Brand[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  priceLimits: [number, number];
  category: any[];
  checkedCategoryIds: string[];
  onCategoryFilterChange: (categoryId: string, isChecked: boolean) => void;
  allGenders: string[];
  selectedGenders: string[];
  onGenderFilterChange: (gender: string, isChecked: boolean) => void;
  allAvailabilities: string[];
  selectedAvailabilities: string[];
  onAvailabilityFilterChange: (availability: string, isChecked: boolean) => void;
  allColors: any[];
  selectedColors: Color[];
  onColorFilterChange: (color: Color, isChecked: boolean) => void;
  onClearAllFilters: () => void;
  products?: any[];
}

export default function ProductFilterCard({
  allBrands,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  priceLimits,
  category,
  checkedCategoryIds,
  onCategoryFilterChange,
  allGenders,
  selectedGenders,
  onGenderFilterChange,
  allAvailabilities,
  selectedAvailabilities,
  onAvailabilityFilterChange,
  allColors,
  selectedColors,
  onColorFilterChange,
  onClearAllFilters,
  products = [],
}: ProductFilterCardProps) {
  const productCategoryIds = useMemo(() => {
    const ids = new Set<string>();
    products.forEach((product) => {
      if (product.subcategoryItemChildId) {
        ids.add(String(product.subcategoryItemChildId));
      } else if (product.subcategoryItemId) {
        ids.add(String(product.subcategoryItemId));
      }
    });
    return Array.from(ids);
  }, [products]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleBrandToggle = (brand: Brand) => {
    const isSelected = selectedBrands.some((b) => b.id === brand.id);
    if (isSelected) {
      setSelectedBrands(selectedBrands.filter((b) => b.id !== brand.id));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const selectedColorCodes = useMemo(
    () => selectedColors.map((c) => c.code),
    [selectedColors]
  );

  return (
    <div className="space-y-6">
      {/* Gender Filter */}
      {allGenders.length > 0 && (
        <>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Gender</h3>
            <div className="space-y-2">
              {allGenders.map((gender) => {
                const isChecked = selectedGenders.includes(gender);
                return (
                  <div key={gender} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gender-${gender}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        onGenderFilterChange(gender, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`gender-${gender}`}
                      className="text-sm font-normal cursor-pointer capitalize"
                    >
                      {gender}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Category Filter */}
      {category.length > 0 && (
        <>
          <CategoryAccordion
            data={category}
            productCategoryIds={productCategoryIds}
            checkedCategoryIds={checkedCategoryIds}
            onCategoryToggle={onCategoryFilterChange}
          />
          <Separator />
        </>
      )}

      {/* Brand Filter */}
      {allBrands.length > 0 && (
        <>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Brands</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {allBrands.map((brand) => {
                const isChecked = selectedBrands.some((b) => b.id === brand.id);
                return (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={isChecked}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <Label
                      htmlFor={`brand-${brand.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {brand.entityName}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Price Range Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Price Range</h3>
        <div className="px-2">
          <Slider
            min={priceLimits[0]}
            max={priceLimits[1]}
            step={1}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mb-4"
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder={String(priceLimits[0])}
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value) || priceLimits[0], priceRange[1]])
            }
            min={priceLimits[0]}
            max={priceLimits[1]}
            className="h-9"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder={String(priceLimits[1])}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value) || priceLimits[1]])
            }
            min={priceLimits[0]}
            max={priceLimits[1]}
            className="h-9"
          />
        </div>
      </div>
      <Separator />

      {/* Availability Filter */}
      {allAvailabilities.length > 0 && (
        <>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Availability</h3>
            <div className="space-y-2">
              {allAvailabilities.map((avail) => {
                const isChecked = selectedAvailabilities.includes(avail);
                return (
                  <div key={avail} className="flex items-center space-x-2">
                    <Checkbox
                      id={`avail-${avail}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        onAvailabilityFilterChange(avail, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`avail-${avail}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {avail}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Color Filter */}
      {allColors.length > 0 && (
        <>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Colors</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {allColors.map((color) => {
                const isChecked = selectedColorCodes.includes(color.code);
                return (
                  <div key={color.code} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.code}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        onColorFilterChange(color, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`color-${color.code}`}
                      className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.code }}
                      />
                      {color.name}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Clear Filters Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={onClearAllFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}