// src/hooks/useCategoryLogic.ts

import { useState, useCallback, useEffect } from 'react';
import { fetchSubcategoryDetailsById } from '@/api/category'; // ✅ Use the ID-specific function

export function useCategoryLogic(
  initialData: {
    category_slug?: string;
    subcategoryItem?: { slug: string; path: string };
  },
  setFieldValue: (name: string, value: any) => void,
  setIsCategoryLoading: (loading: boolean) => void,
  setSubcategoryDetails: (details: any) => void,
  ageGroups: Array<{ label: string; value: string }>,
  genders: Array<{ label: string; value: string }>,
  formData: Record<string, any>
) {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [subcategoryDetails, setLocalSubcategoryDetails] = useState<any>(null);
  const [hasLoadedInitialCategory, setHasLoadedInitialCategory] = useState(false);

  // ✅ CRITICAL FIX: Apply defaults ONLY if field is empty
  const applyDefaultsIfEmpty = useCallback((defaults: Record<string, any>) => {   
    Object.entries(defaults).forEach(([key, defaultValue]) => {
      const currentValue = formData[key];
      
      // ✅ Check if field is truly empty
      const isEmpty = 
        currentValue === undefined || 
        currentValue === '' || 
        currentValue === null ||
        (Array.isArray(currentValue) && currentValue.length === 0);
      
      if (isEmpty && defaultValue) {
        // ✅ Ensure single-value fields remain strings
        if (key === 'gender' || key === 'age_group') {
          const stringValue = Array.isArray(defaultValue) 
            ? String(defaultValue[0] || '') 
            : String(defaultValue);

          setFieldValue(key, stringValue);
        } else {
          setFieldValue(key, defaultValue);
        }
      }
    });
  }, [formData, setFieldValue]);

  // ✅ Handle category selection (user manually changes category)
  const handleCategorySelect = useCallback(async (category: any) => {
    setIsCategoryLoading(true);
    setSelectedCategory(category);
    
    try {
      const details = await fetchSubcategoryDetailsById(category.id); // ✅ Use ID function
      
      setLocalSubcategoryDetails(details);
      setSubcategoryDetails(details);
      
      // ✅ Apply defaults ONLY for empty fields
      if (details?.tag_defaults) {
        applyDefaultsIfEmpty(details.tag_defaults);
      }
    } catch (error) {
      console.error('❌ Failed to fetch category details:', error);
    } finally {
      setIsCategoryLoading(false);
    }
  }, [setIsCategoryLoading, setSubcategoryDetails, applyDefaultsIfEmpty]);

  // ✅ Load initial category on mount (EDIT mode)
  useEffect(() => {
    // Only run once on mount
    if (hasLoadedInitialCategory) return;
    
    const loadInitialCategory = async () => {
      // Check if we have a subcategory item ID from existing product
      const subcategoryItemId = initialData.subcategoryItem?.slug;
      
      if (!subcategoryItemId) {
        setHasLoadedInitialCategory(true);
        return;
      }
      
      setIsCategoryLoading(true);
      
      try {
        // Fetch the category details using the ID from the product
        const details = await fetchSubcategoryDetailsById(subcategoryItemId); // ✅ Use ID function
        
        setLocalSubcategoryDetails(details);
        setSubcategoryDetails(details);

      } catch (error) {
        console.error('❌ Failed to load initial category:', error);
      } finally {
        setIsCategoryLoading(false);
        setHasLoadedInitialCategory(true);
      }
    };
    
    loadInitialCategory();
  }, [
    initialData.subcategoryItem?.slug,
    hasLoadedInitialCategory,
    setIsCategoryLoading,
    setSubcategoryDetails
  ]);

  return {
    handleCategorySelect,
    selectedCategory,
    subcategoryDetails: subcategoryDetails,
  };
}