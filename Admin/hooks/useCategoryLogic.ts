// src/hooks/useCategoryLogic.ts
import { useState, useEffect, useCallback, useRef } from "react";
import slugify from "@/services/slugify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface SubcategoryDetails {
  id: string;
  name: string;
  slug: string;
  tags_required?: string[];
  tag_defaults?: Record<string, string>;
  [key: string]: any;
}

export interface CategoryObject {
  id: string;
  name: string;
  path: string;
  fullPath?: string;
  slug?: string; // ✅ Add slug to the interface
}

export const useCategoryLogic = (
    initialValuesProp: any, 
    setFieldValue: (name: string, value: any) => void, 
    setIsCategoryLoading: (loading: boolean) => void,
    setSubcategoryDetails: (details: SubcategoryDetails | null) => void,
    ageGroups: Array<{ label: string; value: string }>, 
    genders: Array<{ label: string; value: string }>, 
    values: any
) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
    const defaultsProcessedRef = useRef<string | null>(null); 
    const valuesRef = useRef(values);
    const subcategoryDetailsRef = useRef<SubcategoryDetails | null>(null);
    const setFieldValueRef = useRef(setFieldValue);
    const ageGroupsRef = useRef(ageGroups);
    const gendersRef = useRef(genders);
    const initialLoadDoneRef = useRef(false);

    // Update all refs on every render
    useEffect(() => {
        valuesRef.current = values;
        setFieldValueRef.current = setFieldValue;
        ageGroupsRef.current = ageGroups;
        gendersRef.current = genders;
    });

    // --- 1. ✅ UPDATED: API Fetcher - Always uses slug ---
    const fetchCategoryItems = useCallback(async (categorySlug: string): Promise<SubcategoryDetails> => {
        // ✅ Ensure we're using the slug endpoint
        const url = `${BACKEND_URL}/subcategory-items/slug/${categorySlug}`;
        
        console.log('🔍 Fetching category with slug:', categorySlug);
        console.log('📡 API URL:', url);
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch category items. HTTP status: ${response.status}`);
            }
            const data = await response.json();
            
            console.log('✅ Category data received:', {
                id: data.id,
                name: data.name,
                slug: data.slug,
                tags_required: data.tags_required
            });
            
            setSubcategoryDetails(data);
            subcategoryDetailsRef.current = data;
            return data;
        } catch (error) {
            console.error('❌ Error fetching subcategory items:', error);
            setSubcategoryDetails(null);
            subcategoryDetailsRef.current = null;
            throw error;
        }
    }, [setSubcategoryDetails]);

    // --- 2. ✅ UPDATED: Initial Load Logic - Uses slug ---
    useEffect(() => {
        if (initialLoadDoneRef.current) {
            return;
        }

        // ✅ Prioritize slug over ID
        const initialCategorySlug = initialValuesProp.category_slug ||
                                    initialValuesProp.subcategoryItem?.slug;

        if (initialCategorySlug) {
            console.log('🚀 Initial load with slug:', initialCategorySlug);
            initialLoadDoneRef.current = true;
            
            setIsCategoryLoading(true);
            fetchCategoryItems(initialCategorySlug)
                .then(apiData => {
                    // ✅ Store the ID after fetching by slug
                    setFieldValueRef.current('category', apiData?.id);
                    setFieldValueRef.current('categorySlug', apiData?.slug); // ✅ Also store slug
                    
                    if (initialValuesProp.subcategoryItem?.path) {
                        setSelectedCategory(initialValuesProp.subcategoryItem.path);
                    }
                })
                .catch(error => console.error("❌ Error fetching initial category details:", error))
                .finally(() => setIsCategoryLoading(false));
        }
    }, []);

    // --- 3. ✅ UPDATED: Category Selection Handler with Slug ---
    const handleCategorySelect = useCallback(async (categoryObject: CategoryObject) => {
        if (categoryObject && typeof categoryObject === 'object' && categoryObject.id) {
            const { name: categoryName, path: pathString } = categoryObject;
            
            // ✅ IMPORTANT: Generate slug from category name
            const finalCategorySlug = slugify(categoryName);
            
            console.log('📝 Category selected:', {
                name: categoryName,
                generatedSlug: finalCategorySlug,
                categoryId: categoryObject.id
            });

            // Reset the defaults processing flag
            defaultsProcessedRef.current = null;

            // ✅ CRITICAL: Reset ALL possible tag values when category changes
            setFieldValue('age_group', ''); 
            setFieldValue('gender', []); 
            setFieldValue('ar_type', ''); 
            setFieldValue('season', []);
            setFieldValue('material', []);
            setFieldValue('occasion', []);
            setFieldValue('style', []);
            
            setSelectedCategory(pathString);
            setIsCategoryLoading(true);
            
            try {
                // ✅ Fetch using the SLUG, not the ID
                const apiData = await fetchCategoryItems(finalCategorySlug);
                
                // Set product type default
                setFieldValue('productType', apiData?.tag_defaults?.ar_type || 'static');
                
                // ✅ Store both ID and slug
                setFieldValue('category', apiData?.id);
                setFieldValue('categorySlug', apiData?.slug);
                
                console.log('✅ Category set:', {
                    categoryId: apiData?.id,
                    categorySlug: apiData?.slug
                });
                
            } catch (error) {
                console.error('❌ Error in handleCategorySelect:', error);
                setFieldValue('productType', 'static');
                setFieldValue('category', "");
                setFieldValue('categorySlug', "");
            } finally {
                setIsCategoryLoading(false);
            }
        } else {
            // Clear everything when no category selected
            console.log('🗑️ Clearing category selection');
            setSelectedCategory(null);
            setFieldValue('productType', 'static');
            setFieldValue('category', "");
            setFieldValue('categorySlug', "");
            setSubcategoryDetails(null);
            subcategoryDetailsRef.current = null;
        }
    }, [fetchCategoryItems, setFieldValue, setIsCategoryLoading, setSubcategoryDetails]);

    // --- 4. Version tracking for defaults ---
    const [categoryVersion, setCategoryVersion] = useState(0);

    useEffect(() => {
        const currentId = subcategoryDetailsRef.current?.id;
        if (currentId) {
            setCategoryVersion(v => v + 1);
        }
    }, [subcategoryDetailsRef.current?.id]);

    // --- 5. ✅ ENHANCED: Default Tag Setting Effect ---
    useEffect(() => {
        const subcategoryDetails = subcategoryDetailsRef.current;
        
        if (!subcategoryDetails || categoryVersion === 0) {
            return;
        }

        const currentId = subcategoryDetails.id;
        const currentValues = valuesRef.current; 

        // Check if this exact category was already processed
        if (defaultsProcessedRef.current === currentId) {
            return;
        }

        const defaults = subcategoryDetails.tag_defaults || {};
        const requiredTags = subcategoryDetails.tags_required || [];

        console.log('🏷️ Applying tag defaults:', {
            categoryId: currentId,
            requiredTags,
            defaults
        });

        // ✅ Age Group Logic
        if (requiredTags.includes('age_group') && !currentValues.age_group) {
            const defaultTagValue = defaults.age_group || null;
            
            if (defaultTagValue) {
                const defaultObject = ageGroupsRef.current.find(g => g.value === defaultTagValue);
                if (defaultObject) {
                    console.log('✅ Setting age_group default:', defaultObject.value);
                    setFieldValueRef.current('age_group', defaultObject.value); 
                }
            }
        }

        // ✅ Gender Logic
        if (requiredTags.includes('gender') && (!currentValues.gender || currentValues.gender?.length === 0)) {
            const defaultTagValue = defaults.gender || null;

            if (defaultTagValue) {
                const defaultObject = gendersRef.current.find(g => g.value === defaultTagValue);
                if (defaultObject) {
                    console.log('✅ Setting gender default:', [defaultObject.value]);
                    setFieldValueRef.current('gender', [defaultObject.value]);
                }
            }
        }

        // ✅ Mark this category as processed
        defaultsProcessedRef.current = currentId;
        console.log('✅ Tag defaults applied for category:', currentId);

    }, [categoryVersion]);

    // ✅ Helper function to get current subcategory details
    const getSubcategoryDetails = useCallback(() => {
        return subcategoryDetailsRef.current;
    }, []);

    // ✅ Helper to check if a specific tag is required
    const isTagRequired = useCallback((tagName: string): boolean => {
        return subcategoryDetailsRef.current?.tags_required?.includes(tagName) || false;
    }, []);

    // ✅ Helper to get all required tags
    const getRequiredTags = useCallback((): string[] => {
        return subcategoryDetailsRef.current?.tags_required || [];
    }, []);

    // ✅ NEW: Helper to get category slug
    const getCategorySlug = useCallback((): string | null => {
        return subcategoryDetailsRef.current?.slug || null;
    }, []);

    return {
        handleCategorySelect,
        selectedCategory,
        fetchCategoryItems,
        getSubcategoryDetails,
        isTagRequired,
        getRequiredTags,
        getCategorySlug, // ✅ New helper
        subcategoryDetails: subcategoryDetailsRef.current,
    };
};