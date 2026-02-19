// src/components/product-search/category-accordion.tsx
'use client';

import { ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

interface CategoryChild {
  id: string | number;
  name: string;
  slug: string;
  child?: CategoryChild[];
}

interface Category {
  title: string;
  slug: string;
  child: CategoryChild[];
}

interface CategoryAccordionProps {
  data: Category[];
  productCategoryIds: string[];
  checkedCategoryIds: string[];
  onCategoryToggle: (categoryId: string, isChecked: boolean) => void;
}

export function CategoryAccordion({
  data,
  productCategoryIds,
  checkedCategoryIds,
  onCategoryToggle,
}: CategoryAccordionProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const renderCategory = (category: CategoryChild, level: number = 0) => {
    const categoryId = String(category.id);
    const hasChildren = category.child && category.child.length > 0;
    const hasProducts = productCategoryIds.includes(categoryId);
    const isChecked = checkedCategoryIds.includes(categoryId);
    const isOpen = openCategories.has(categoryId);

    // Filter children that have products
    const childrenWithProducts = category.child?.filter((child) =>
      productCategoryIds.includes(String(child.id))
    );

    // Don't render if no products and no children with products
    if (!hasProducts && (!childrenWithProducts || childrenWithProducts.length === 0)) {
      return null;
    }

    if (!hasChildren) {
      return (
        <div
          key={categoryId}
          className="flex items-center space-x-2 py-1"
          style={{ paddingLeft: `${level * 16}px` }}
        >
          <Checkbox
            id={`category-${categoryId}`}
            checked={isChecked}
            onCheckedChange={(checked) =>
              onCategoryToggle(categoryId, checked as boolean)
            }
          />
          <Label
            htmlFor={`category-${categoryId}`}
            className="text-sm font-normal cursor-pointer flex-1"
          >
            {category.name}
          </Label>
        </div>
      );
    }

    return (
      <Collapsible
        key={categoryId}
        open={isOpen}
        onOpenChange={() => toggleCategory(categoryId)}
      >
        <div className="flex flex-col">
          <div
            className="flex items-center space-x-2 py-1"
            style={{ paddingLeft: `${level * 16}px` }}
          >
            <Checkbox
              id={`category-${categoryId}`}
              checked={isChecked}
              onCheckedChange={(checked) =>
                onCategoryToggle(categoryId, checked as boolean)
              }
            />
            <Label
              htmlFor={`category-${categoryId}`}
              className="text-sm font-normal cursor-pointer flex-1"
            >
              {category.name}
            </Label>
            <CollapsibleTrigger asChild>
              <button
                className="p-1 hover:bg-accent rounded-sm transition-colors"
                aria-label={`Toggle ${category.name}`}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="space-y-1">
            {childrenWithProducts?.map((child) => renderCategory(child, level + 1))}
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1">
      <h3 className="mb-3 text-sm font-semibold">Categories</h3>
      <div className="space-y-1 max-h-80 overflow-y-auto">
        {data.map((parentCategory) => (
          <div key={parentCategory.slug} className="mb-4">
            <div className="font-medium text-sm mb-2 text-gray-700">
              {parentCategory.title}
            </div>
            <div className="space-y-1">
              {parentCategory.child.map((category) => renderCategory(category, 0))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}