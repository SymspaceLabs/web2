// src/hooks/useProductFormState.js

import { useState, useImperativeHandle, useCallback } from "react";
import { getInitialCategoryPath } from "@/utils/category-helpers";

const validateRequiredTags = (currentValues) => {
    let newErrors = {};
    let isValid = true;
    const subcategoryDetails = currentValues.subcategoryDetails;

    if (!currentValues.name || currentValues.name.trim() === '') {
      newErrors.name = "Product Name is required!";
      isValid = false;
    }

    if (!currentValues.category || currentValues.category === '') {
      newErrors.category = "Product Category is required!";
      isValid = false;
    }
    
    if (subcategoryDetails?.tags_required) {
      subcategoryDetails.tags_required.forEach(tag => {
        if (['age_group', 'gender'].includes(tag)) {
          if (!currentValues[tag] || (Array.isArray(currentValues[tag]) && currentValues[tag].length === 0)) {
            newErrors[tag] = `The '${tag.replace('_', ' ')}' tag is required for this category.`;
            isValid = false;
          }
        }
      });
    }

    return { newErrors, isValid };
};

export const useProductFormState = (initialValuesProp, handleFormSubmit, ref, subcategoryDetails) => {

  const initialCategoryValue = getInitialCategoryPath(initialValuesProp);

  const [values, setValues] = useState(() => ({
    name: initialValuesProp.name || "",
    productUrl: initialValuesProp.productUrl || "",
    category: initialValuesProp.subcategoryItem?.id || initialValuesProp.category || "",
    description: initialValuesProp.description || "",
    status: initialValuesProp.status || "draft",
    productType: initialValuesProp.productType || "static",
    productSizechart: initialValuesProp.productSizechart || "",
    ar_type: initialValuesProp.ar_type || '',
    age_group: initialValuesProp.age_group || '',
    gender: Array.isArray(initialValuesProp.gender)
            ? initialValuesProp.gender
            : (initialValuesProp.gender ? [initialValuesProp.gender] : []),
    color: Array.isArray(initialValuesProp.color)
           ? initialValuesProp.color
           : (initialValuesProp.color ? [initialValuesProp.color] : []),
  }));
  
  const [errors, setErrors] = useState({});

  // 1. Generic Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
 
  // 2. Manual Set Value Handler
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }, [errors]);

  // ✅ 3. Define validateForm BEFORE handleBlur (which depends on it)
  const validateForm = useCallback((currentValues) => {
    const { newErrors, isValid } = validateRequiredTags(currentValues);
    setErrors(newErrors);
    return isValid;
  }, []); // ✅ No dependencies needed - setErrors is stable

  // ✅ 4. Now handleBlur can safely depend on validateForm
  const handleBlur = useCallback(() => {
    validateForm({ ...values, subcategoryDetails }); 
  }, [values, subcategoryDetails, validateForm]); // ✅ validateForm is now defined

  // 5. EXPOSE METHODS TO PARENT VIA REF
  useImperativeHandle(ref, () => ({
    getFormValues: () => values,

    submit: () => {
      const isValid = validateForm({ ...values, subcategoryDetails }); 
     
      if (isValid) {
        handleFormSubmit(values);
      }
    },
    validateForm: () => validateForm({ ...values, subcategoryDetails }),
  }), [values, validateForm, subcategoryDetails, handleFormSubmit]);

  return { 
    values, 
    errors, 
    handleChange, 
    setFieldValue, 
    validateForm, 
    handleBlur,
    initialCategoryValue
  };
};