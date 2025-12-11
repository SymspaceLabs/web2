"use client";

// =============================================================================
//  Product Create Page View || Seller
// =============================================================================

import ProductForm1 from "../product-form-1";
import ProductForm2 from "../product-form-2";
import CustomStepper from "../components/CustomStepper";
import FooterButtons from "../components/FooterButtons";

import { Box, CircularProgress } from "@mui/material";
import { useRouter } from 'next/navigation';
import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { fetchProductById, createProduct as createProductApi, updateProduct, updateProductVariantsApi } from "@/services/productService";

// =============================================================================
// @constant {string[]} steps
// Defines the title for each step in the product creation wizard.
// =============================================================================
const steps = [
  'Product Info',
  'Details',
  'Safety & Compliance',
  'Review & Submit'
];

// =============================================================================
// @component ProductCreatePageView
// A multi-step form component for creating a new product.
// =============================================================================
const ProductCreatePageView = ({ productId='' }) => {
  // A ref to hold a reference to the individual form components' imperative handles.
  const formRef = useRef(null);

  // Initialize Next.js router
  const router = useRouter();

  // Fetch User
  const { user } = useAuth();

  // --- STATE MANAGEMENT ---
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({});
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  // NEW STATE to store the initial values for comparison
  const [initialColors, setInitialColors] = useState([]);
  const [initialSizes, setInitialSizes] = useState([]);
  const [loading, setLoading] = useState(!!productId); 
  const [currentProductId, setCurrentProductId] = useState(productId || null);
  const [step1Variants, setStep1Variants] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false); 


  // --- STEPPER HELPER FUNCTIONS ---
  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1; // FIX: changed activeSteps() to activeStep
  const allStepsCompleted = () => completedSteps() === totalSteps();

  // =============================================================================
  // @function handleNext
  // Triggers the submission of the currently active child form component via its ref.
  // =============================================================================
  const handleNext = () => {

    if (formRef.current && formRef.current.submit) {
        formRef.current.submit();
    } else {
        // If there is no child form (like in Step 2/3 placeholders), 
        // manually call the success handler with current data.
        onStepSubmitSuccess(formData);
    }
  };

  // =============================================================================
  // @function onStepSubmitSuccess (FIXED)
  // =============================================================================
  const onStepSubmitSuccess = (values) => { 
      setLoading(true);

      let newFormData = { ...formData, ...values };

      // Update the state with the merged data
      setFormData(newFormData);

      // 2. Execute logic based on the current step.
      if (activeStep === 0) {
          if (currentProductId) {
              // Edit Mode Step 0: Update core product data
              handleUpdateProduct(newFormData, false, true, activeStep);
          } else {
              // Create Mode Step 0: Create the product
              handleCreateProduct(newFormData);
          }
      } else if (activeStep < totalSteps() - 1) {
          // Step 1, Step 2, and Step 3 (Non-final steps)
          // Step 1 is handled in handleUpdateProduct's conditional logic
          // Step 2 and 3 can be standard updates for their fields, 
          // but the key is moving to the next step.
          handleUpdateProduct(newFormData, false, false, activeStep); 
      } else if (isLastStep()) {
          // On the final step (Step 3)
          handleUpdateProduct({ ...newFormData }, true, false, activeStep);
      }

  };

  // =============================================================================
  // @function handleCreateProduct (Wrapper for the external API function)
  // Creates the product on Step 1 and handles the URL update (moving from /create to /:id).
  // =============================================================================
  const handleCreateProduct = async (data) => {

    // ⭐ ADD AGE GROUP AND GENDER TO DTO
    const { name, productUrl, description, category, cost, age_group, gender } = data;
    
    // ⭐ UPDATED: Map selectedSizes into the DTO object structure
    const transformedSizes = (selectedSizes || []).map((size, index) => ({
        size: size.name, // Assuming the size value is stored in 'name'
        sortOrder: index,
        sizeChartUrl: size.sizeChartUrl || null, // Include the new field
    }));

    const transformedColors = selectedColors.map(color => ({
      name: color.name,
      code: color.hex,
    }));

    const requestBody = {
      name,
      productUrl,
      company : user?.company?.id,
      subcategoryItem : category,
      colors : transformedColors,
      sizes : transformedSizes,
      salePrice: 0.00,
      cost,
      age_group, 
      gender,
      description
    }

    console.log(requestBody)

    try {
        const response = await createProductApi(requestBody);
        const newProductId = response.id; 
      
        // 1. Update state
        setCurrentProductId(newProductId);
        setFormData(prev => ({ ...prev, ...response }));
      
        // 2. Move to the next visual step (Step 1)
        // moveToNextStep(); // This happens via URL change causing remount/re-render

        // 3. CHANGE THE URL (Necessary for creation flow)
        const newUrl = `/vendor/products/${response.id}`;

        router.replace(newUrl); // ⬅️ IMPORTANT URL UPDATE

    } catch (error) {
      console.error("Product creation failed:", error.message);
      // Handle error display to the user if needed
    } finally {
      setLoading(false);
    }
  };

  // =============================================================================
  // @function handleUpdateProduct (Wrapper for the external API function)
  // @param {object} data - The accumulated form data, including media arrays.
  // @param {boolean} isFinalStep - True if this is the final submission.
  // @param {boolean} skipRedirect - True if we should update and immediately move to next step without URL change. (Not used in the final logic, but kept in signature)
  // @param {number} currentStep - The step index from which the call originated.
  // =============================================================================
  // =============================================================================
  // @function handleUpdateProduct (Updated to conditionally include images/models on Step 1)
  // =============================================================================
  const handleUpdateProduct = async (data, isFinalStep = false, skipRedirect = false, currentStep) => {
    // --- Data Transformation ---
    
    // Media data transformation happens regardless, but is only included in the requestBody below
    const transformedImages = (data.productImages || []).map(img => ({
        url: img.url,
        colorCode: img.colorCode, 
    }));
    
    const transformedModels = (data.threeDModels || []).map(model => ({
        url: model.url,
        colorCode: model.colorCode,
    }));

    // ⭐ UPDATED: Map selectedSizes into the DTO object structure
    const transformedSizes = selectedSizes.map((size, index) => ({
        size: size.name,
        sortOrder: index,
        sizeChartUrl: size.sizeChartUrl || null, // Include the new field
    }));

    const transformedColors = selectedColors.map(color => ({
        name: color.name,
        code: color.hex, 
    }));

    // --- Build Request Body (STRICTLY CONDTIONALIZED) ---
    let requestBody = {};

    // ⭐ FIX 1: Add a custom sorting function for objects based on a key (e.g., 'name' or 'size')
    const deepSortAndStringify = (arr, key = 'name') => {
        if (!arr || !Array.isArray(arr)) return '[]';
        // Use a consistent sort key (size or name) for stable comparison
        const sortedArr = arr.slice().sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        return JSON.stringify(sortedArr);
    };

    // ⭐ FIX 2: Refined arraysEqual using the deepSortAndStringify helper
    const arraysEqual = (a, b, key) => {
        if (a.length !== b.length) return false;
        return deepSortAndStringify(a, key) === deepSortAndStringify(b, key);
    };

    // --- Prepare Arrays for Comparison ---
    
    // Colors must be compared by name and code
    const currentColorsForComparison = transformedColors.map(c => ({ name: c.name, code: c.code }));
    const initialColorsForComparison = initialColors.map(c => ({ name: c.name, code: c.hex }));

    // Sizes must be compared by size (name) and sizeChartUrl
    const currentSizesForComparison = transformedSizes.map(s => ({ 
        size: s.size, 
        sizeChartUrl: s.sizeChartUrl 
    }));

    // Note: initialSizes objects use 'name' for the size string, transformed uses 'size'
    const initialSizesForComparison = initialSizes.map(s => ({ 
        size: s.name, // Use 'name' from the state to match 'size' from transformed
        sizeChartUrl: s.sizeChartUrl 
    }));

    // --- Check if colors/sizes have changed (using the fixed logic) ---
    const colorsChanged = !arraysEqual(currentColorsForComparison, initialColorsForComparison, 'name');
    const sizesChanged = !arraysEqual(currentSizesForComparison, initialSizesForComparison, 'size');
    
    // Only include images/models if the current step is 1 ⭐
    if (currentStep === 0) {
        requestBody = {
          name: data.name,
          subcategoryItem : data.category,
          productUrl : data.productUrl,
          age_group: data.age_group,
          gender: data.gender,
          description: data.description,
            // Only include colors and sizes if they have changed
            ...(colorsChanged && { colors : transformedColors }), 
            // ✅ FIX: Now conditionally included based on deep comparison
            ...(sizesChanged && { sizes : transformedSizes }),
        };
    } else if (currentStep === 1) {
        // Fields from ProductForm2 (Details/Media/Variants)
        requestBody = {
          images: transformedImages, 
          threeDModels: transformedModels
        };
    } else if (currentStep === 2) {
        // ⭐ FIX: Fields from Step 2 (Safety & Compliance) - Assume these are placeholders for now
        requestBody = {
          // Add safety and compliance fields here
          safety_data: data.safety_data || 'placeholder', 
        };
    } else if (currentStep === 3) {
        // ⭐ FIX: Fields for Final Step (Review & Submit)
        requestBody = {};
    }

    const idToUpdate = currentProductId || productId; 
    if (!idToUpdate) {
        console.error("Cannot update: Product ID is missing.");
        setLoading(false);
        return;
    }

    // Check if the request body is empty for Step 0
    if (currentStep === 0 && Object.keys(requestBody).length === 0) {
      moveToNextStep();
      setLoading(false);
      return;
    }

    // For Step 2 & 3, if the request body is empty, we still proceed to next step to allow flow
    if ((currentStep === 2 || currentStep === 3) && Object.keys(requestBody).length === 0) {
      if (isFinalStep) {
          handleComplete();
      } else {
          moveToNextStep();
      }
      setLoading(false);
      return;
    }



    try {
        // 1. CORE PRODUCT UPDATE API CALL
        const response = await updateProduct(idToUpdate, requestBody); 

        // 2. State Update
        setFormData(prev => ({ 
            ...prev, 
            ...response,
            images: data.images || prev.images, 
            productImages: data.productImages || [],
            threeDModels: data.threeDModels || [],
            variants: data.variants || prev.variants,
        }));
    
        // 3. CONDITIONAL STEP-SPECIFIC UPDATE
        if (currentStep === 1) {
          await handleUpdateVariants(data); 
          return;
        }

        // 4. MOVE TO NEXT STEP (Standard Flow for all other steps)
        if (isFinalStep) {
            handleComplete();
        } else {
            moveToNextStep();
        }

        setLoading(false);

    } catch (error) {
        setLoading(false); // Ensure loading is stopped on failure
    }
  };
  
  // =============================================================================
  // @function moveToNextStep
  // Calculates and sets the next active step. If the current step is the last one
  // and not all steps are completed, it finds the next uncompleted step. Otherwise,
  // it simply increments the step index.
  // =============================================================================
  const moveToNextStep = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // =============================================================================
  // @function handleBack
  // Navigates to the previous step.
  // =============================================================================
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // =============================================================================
  // @function handleComplete
  // Marks the current step as completed and advances to the next step.
  // =============================================================================
  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    router.push('/vendor/products');
  };

  // =============================================================================
  // @function handleFormSubmit
  // Alias for `onStepSubmitSuccess`. This is passed as a prop to child forms
  // to be called upon successful form submission.
  // =============================================================================
  const handleFormSubmit = onStepSubmitSuccess;

  // =============================================================================
  // @function handleSaveAndExit
  // Saves the current accumulated form data as a draft and navigates the user away.
  // =============================================================================
  const handleSaveAndExit = () => {
    router.push('/vendor/products');
  };

  // =============================================================================
  // Load Product Data for Editing (UPDATED useEffect)
  // =============================================================================
  useEffect(() => {
    if (productId) {
        const loadProductData = async () => {
            setLoading(true);
            try {
                const data = await fetchProductById(productId);
                
                setFormData(data); // Set core form data

                // 1. Handle Colors Transformation
                if (data.colors && Array.isArray(data.colors)) {                     
                    const initialColors = data.colors.map(c => ({
                        name: c.name,
                        hex: c.code
                    }));
                    
                    setSelectedColors(initialColors);
                    setInitialColors(initialColors);
                } else {
                    // This will now only log if the product truly has NO color data
                    console.warn("⚠️ PARENT WARNING: Product has no initial 'colors' data.");
                    setSelectedColors([]);
                    setInitialColors([]);
                }
                
                // 2. Handle Sizes Transformation
                if (data.sizes && Array.isArray(data.sizes)) {
                    
                    // Transform API sizes array into the required state format: { name: '...', sizeChartUrl: '...' }
                    const initialSizes = data.sizes.map(s => ({
                        name: s.size, // Mapped 'size' (e.g., 'S', 'M') to 'name' state property
                        sizeChartUrl: s.sizeChartUrl || null, // ⭐ NEW: Extract sizeChartUrl
                    }));
                    
                    setSelectedSizes(initialSizes);
                    setInitialSizes(initialSizes);

                  } else {
                    // This will now only log if the product truly has NO size data
                    console.warn("⚠️ PARENT WARNING: Product has no initial 'sizes' data.");
                    setSelectedSizes([]);
                    setInitialSizes([]);
                }

                // 3. **Initial Variant Load:** Use the variants received from the API fetch 
                //    to set the state used by Step 1.
                if (data.variants && Array.isArray(data.variants)) {
                  // Merge the initial variants array directly into the main formData
                  setFormData(prev => ({ ...prev, ...data, variants: data.variants }));
                } else {
                  // If no variants, still set the core data but ensure variants is an empty array
                  setFormData(prev => ({ ...prev, ...data, variants: [] }));
                }

            } catch (error) {
                console.error('Error loading product for editing:', error);
            } finally {
                setLoading(false); 
            }
        };
        // ⭐ NEW CONDITION: Fetch data if we have an ID AND we just moved to Step 1 
        // OR if the component just mounted (initial load).
        if (activeStep === 1 || !currentProductId) {
            // currentProductId is null only on the initial mount for a new product
            // If activeStep === 1, it means the user reached Form 2, fetch fresh data.
            loadProductData();
        } else if (activeStep === 0 && currentProductId) {
            // If we are back on step 0, ensure the data is loaded once, 
            // but subsequent changes don't re-fetch needlessly.
            loadProductData(); 
        }
    }
  }, [productId, activeStep]);

  // =============================================================================
  // @function useEffect (Scroll to Top on Step Change)
  // Scrolls the window to the top (0, 0) whenever the activeStep state changes.
  // =============================================================================
  useEffect(() => {
    // Check if the window object is available (necessary for Next.js/SSR environments)
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: for a smooth scrolling effect
      });
    }
  }, [activeStep]); // Dependency array: Re-run this effect whenever activeStep changes


  // FIX: Move useMemo call to the top level of the component to obey the Rules of Hooks.
  // The initialValues for the form are memoized to ensure stability.
  const currentInitialValues = useMemo(() => formData, [formData]);

  // 🚨 Define a new callback specifically for updating the variants in formData
  const setMasterVariants = useCallback((newVariants) => {
    setFormData(prev => ({ 
        ...prev, 
        variants: newVariants 
    }));
  }, []);

  // =============================================================================
  // @function renderStepContent
  // @param {number} step - The index of the step to render.
  // @returns {JSX.Element} The form component corresponding to the current step.
  // It passes down initial values from the accumulated `formData` and the submission handler.
  // =============================================================================
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ProductForm1
            key={0} 
            initialValues={currentInitialValues}
            handleFormSubmit={handleFormSubmit}
            ref={formRef}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            setIsCategoryLoading={setIsCategoryLoading} 
          />
        );
      case 1:
        return (
          <ProductForm2
            key={1}
            initialValues={currentInitialValues}
            handleFormSubmit={handleFormSubmit}
            ref={formRef}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
            setParentVariants={setMasterVariants}
          />
        );
      case 2:
        return (
          <Box sx={{ p: 4 }}>
            <H1 sx={{ color: '#fff' }}>Step 3: Safety & Compliance</H1>
            <p style={{ color: '#ccc' }}>Placeholder content for safety data forms.</p>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ p: 4 }}>
            <H1 sx={{ color: '#fff' }}>Step 4: Review & Submit</H1>
            <p style={{ color: '#ccc' }}>Review accumulated data before final submission.</p>
          </Box>
        );
      default:
        return <Box sx={{ p: 3, textAlign: 'center' }}>Step {step + 1} Content (Missing component)</Box>;
    }
  };

  // Determine if we are in a state where we are editing and still waiting for data
  const showLoadingPlaceholder = productId && loading;
 
  // =============================================================================
  // @function handleUpdateVariants (REFRESHED as a Helper)
  // Updates the product variants using the dedicated endpoint and request structure.
  // Does NOT manage loading or step transition.
  // =============================================================================
  const handleUpdateVariants = async (data) => {
    const idToUpdate = currentProductId || productId; 
    
    // We rely on the core update to have checked for ID and set loading, 
    // but check data.variants presence for a cleaner error:
    const variantsToUpdate = (data.variants || []).map(variant => ({
      id: variant.id,
      stock: variant.stock,
      price: variant.price,
      salePrice: variant.salePrice,
      cost: variant.cost,
      material: variant.material,
    }));

    if (variantsToUpdate.length === 0) {
        console.warn("No variants to update for Step 1.");
        
        // ⭐ Move to next step if no variants were present
        moveToNextStep(); 
        setLoading(false);
        return;
    }
    
    try {
        const response = await updateProductVariantsApi(idToUpdate, variantsToUpdate); 

        // Update the overall product state with the new variant info 
        setFormData(prev => ({ ...prev, variants: response }));

        // ⭐ Move to the next step and stop loading upon successful variant update
        moveToNextStep();
        setLoading(false);
      
    } catch (error) {
      console.error("Product variant update failed:", error.message);
      setLoading(false); // Ensure loading is stopped on error
      // If you want to stop the main flow on error, re-throw is correct:
      throw error;
    }
    // REMOVE the redundant setLoading(false) and moveToNextStep()
  };

  return (
    <Box sx={{ background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow: 'hidden' }}>
      <Box sx={{ p: 4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
        <H1 sx={{ mb: 2, color: '#fff' }}>
          Add New Product
        </H1>
        <Box sx={{ py: 4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px' }}>
          {/* Stepper Component */}
          <CustomStepper
            activeStep={activeStep}
            steps={steps}
          />

            {/* FIX: Conditionally render the form content only when loading is complete in Edit Mode */}
            {showLoadingPlaceholder ? (
                <Box sx={{ p: 10, textAlign: 'center', color: '#fff' }}>
                    <p>Loading product data for editing...</p>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* Renders the form for the current active step */}
                    {renderStepContent(activeStep)}

                    {/* Navigation Buttons */}
                    <FooterButtons
                        handleBack={handleBack}
                        activeStep={activeStep}
                        handleSaveAndExit={handleSaveAndExit}
                        loading={loading || isCategoryLoading} 
                        handleNext={handleNext}
                        allStepsCompleted={allStepsCompleted}
                        isLastStep={isLastStep}
                    />
                </>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCreatePageView;