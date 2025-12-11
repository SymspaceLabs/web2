// src/hooks/useCategoryLogic.js

import { useState, useEffect, useCallback, useRef } from "react";
import slugify from "@/services/slugify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useCategoryLogic = (
    initialValuesProp, 
    setFieldValue, 
    setIsCategoryLoading,
    setSubcategoryDetails,
    ageGroups, 
    genders, 
    values
) => {
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const defaultsProcessedRef = useRef(null); 
    const valuesRef = useRef(values);
    const subcategoryDetailsRef = useRef(null);
    const setFieldValueRef = useRef(setFieldValue);
    const ageGroupsRef = useRef(ageGroups);
    const gendersRef = useRef(genders);

    // ✅ NEW: Track if initial load has been done
    const initialLoadDoneRef = useRef(false);

    // Update all refs on every render
    useEffect(() => {
        valuesRef.current = values;
        setFieldValueRef.current = setFieldValue;
        ageGroupsRef.current = ageGroups;
        gendersRef.current = genders;
    });

    // --- 1. API Fetcher ---
    const fetchCategoryItems = useCallback(async (categorySlug) => {
        const url = `${BACKEND_URL}/subcategory-items/slug/${categorySlug}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch category items. HTTP status: ${response.status}`);
            }
            const data = await response.json();
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

    // --- 2. ✅ FIXED: Initial Load Logic - Run ONLY ONCE ---
    useEffect(() => {
        // ✅ Guard: Only run once on mount
        if (initialLoadDoneRef.current) {
            return;
        }

        const initialCategorySlugOrId = initialValuesProp.category_slug ||
                                        initialValuesProp.subcategoryItem?.slug;

        if (initialCategorySlugOrId) {
            initialLoadDoneRef.current = true; // ✅ Mark as done immediately
            
            setIsCategoryLoading(true);
            fetchCategoryItems(initialCategorySlugOrId)
                .then(apiData => {
                    setFieldValueRef.current('category', apiData?.id);
                    if (initialValuesProp.subcategoryItem?.path) {
                        setSelectedCategory(initialValuesProp.subcategoryItem.path);
                    }
                })
                .catch(error => console.error("Error fetching initial category details:", error))
                .finally(() => setIsCategoryLoading(false));
        }
    }, []); // ✅ Empty dependency array - run ONLY on mount

    // --- 3. Category Selection Handler ---
    const handleCategorySelect = useCallback(async (categoryObject) => {
        if (categoryObject && typeof categoryObject === 'object' && categoryObject.id) {
            const { name: categoryName, path: pathString } = categoryObject;
            const finalCategorySlug = slugify(categoryName);

            // Reset the ref flag when selecting a new category
            defaultsProcessedRef.current = null;

            // RESET TAG VALUES FOR THE NEW CATEGORY
            setFieldValue('age_group', ''); 
            setFieldValue('gender', []); 
            setFieldValue('ar_type', ''); 
            
            setSelectedCategory(pathString);
            setIsCategoryLoading(true);
            
            try {
                const apiData = await fetchCategoryItems(finalCategorySlug);
                setFieldValue('productType', apiData?.tag_defaults?.ar_type || 'static');
                setFieldValue('category', apiData?.id);
            } catch (error) {
                setFieldValue('productType', 'static');
                setFieldValue('category', ""); 
            } finally {
                setIsCategoryLoading(false);
            }
        } else {
            setSelectedCategory(null);
            setFieldValue('productType', 'static');
            setFieldValue('category', ""); 
        }
    }, [fetchCategoryItems, setFieldValue, setIsCategoryLoading]);

    // --- 4. Version tracking for defaults ---
    const [categoryVersion, setCategoryVersion] = useState(0);

    useEffect(() => {
        const currentId = subcategoryDetailsRef.current?.id;
        if (currentId) {
            setCategoryVersion(v => v + 1);
        }
    }, [subcategoryDetailsRef.current?.id]);

    // --- 5. Default Tag Setting Effect ---
    useEffect(() => {
        const subcategoryDetails = subcategoryDetailsRef.current;
        
        if (!subcategoryDetails || categoryVersion === 0) {
            return;
        }

        const currentId = subcategoryDetails.id;
        const currentValues = valuesRef.current; 

        // ✅ Check if this exact category was already processed
        if (defaultsProcessedRef.current === currentId) {
            return;
        }

        const defaults = subcategoryDetails.tag_defaults || {};
        const requiredTags = subcategoryDetails.tags_required || [];

        // --- Age Group Logic ---
        if (requiredTags.includes('age_group') && !currentValues.age_group) {
            const defaultTagValue = defaults.age_group || null;
            
            if (defaultTagValue) {
                const defaultObject = ageGroupsRef.current.find(g => g.value === defaultTagValue);
                if (defaultObject) {
                    setFieldValueRef.current('age_group', defaultObject.value); 
                }
            }
        }

        // --- Gender Logic ---
        if (requiredTags.includes('gender') && currentValues.gender?.length === 0) {
            const defaultTagValue = defaults.gender || null;

            if (defaultTagValue) {
                const defaultObject = gendersRef.current.find(g => g.value === defaultTagValue);
                if (defaultObject) {
                    setFieldValueRef.current('gender', [defaultObject.value]);
                }
            }
        }

        defaultsProcessedRef.current = currentId;

    }, [categoryVersion]);

    return {
        handleCategorySelect,
        selectedCategory,
        fetchCategoryItems,
    };
};