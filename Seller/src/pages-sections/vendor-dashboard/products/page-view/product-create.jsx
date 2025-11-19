"use client";

// =============================================================================
//  Product Create Page View
// =============================================================================

import ProductForm1 from "../product-form-1";
import ProductForm2 from "../product-form-2";
import CustomStepper from "../components/CustomStepper";
import FooterButtons from "../components/FooterButtons";

import { Box } from "@mui/material";
import { useRouter } from 'next/navigation';
import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect, useMemo } from "react";
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
  const [loading, setLoading] = useState(!!productId); 
  const [currentProductId, setCurrentProductId] = useState(productId || null);

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
    }
  };

  // =============================================================================
  // @function onStepSubmitSuccess (FIXED)
  // =============================================================================
  const onStepSubmitSuccess = (values) => {  
      setLoading(true);

      let newFormData = { ...formData, ...values };

      // ⭐ FIX: Prevent media data from being overwritten by Step 0 (ProductForm1) submission ⭐
      if (activeStep === 0) {
          // ProductForm1 submission doesn't contain media data, so keep the existing arrays from formData.
          newFormData = {
              ...newFormData,
              // Keep the previous productImages and productModels arrays if they exist
              // productImages: formData.productImages || [],
              // productModels: formData.productModels || [],
          };
      }
      
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
          // Step 1 (Details/Media) and Step 2 (Safety/Compliance)
          handleUpdateProduct(newFormData, false, false, activeStep); 
      } else if (isLastStep()) {
          // On the final step, update the product with a 'submitted' status.
          handleUpdateProduct({ ...newFormData, status: 'submitted' }, true, false, activeStep);
      }
  };

  // =============================================================================
  // @function handleCreateProduct (Wrapper for the external API function)
  // Creates the product on Step 1 and handles the URL update (moving from /create to /:id).
  // =============================================================================
  const handleCreateProduct = async (data) => {
    const transformedSizes = selectedSizes.map(size => size.name);
    const transformedColors = selectedColors.map(color => ({
      name: color.name,
      code: color.hex,
    }));

    const requestBody = {
      name: data.name,
      company : user?.company?.id,
      subcategoryItem : data.category,
      colors : transformedColors,
      sizes : transformedSizes,
      salePrice: 0.00,
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
    
    const transformedModels = (data.productModels || []).map(model => ({
        url: model.url,
        colorName: model.colorName, 
    }));

    const transformedSizes = selectedSizes.map(size => size.name);
    const transformedColors = selectedColors.map(color => ({
        name: color.name,
        code: color.hex, 
    }));

    // --- Build Request Body ---
    const requestBody = {
        name: data.name,
        company : user?.company?.id,
        subcategoryItem : data.category,
        
        // Fields from ProductForm1
        colors : transformedColors, 
        sizes : transformedSizes, 
        
        // Fields from ProductForm2 (sent from Step 1 onwards)
        bulletPoints: data.bulletPoints,
        composition: data.composition,
    };
    
    // ⭐ CONDITIONAL FIX: Only include images/models if the current step is 1 ⭐
    if (currentStep === 1) {
        requestBody.images = transformedImages;
        requestBody.models = transformedModels;
    }
    // For Step 0, images/models will be omitted from the requestBody, preventing overwrite.
    // For Step 2/3, they will also be omitted, as they don't contain media inputs.


    const idToUpdate = currentProductId || productId; 
    if (!idToUpdate) {
        console.error("Cannot update: Product ID is missing.");
        setLoading(false);
        return;
    }

    try {
        // 1. CORE PRODUCT UPDATE API CALL
        const response = await updateProduct(idToUpdate, requestBody); 

        // 2. State Update (Crucial for persistence across steps)
        // We use the data accumulated locally in 'data' to update the state, 
        // ensuring media (productImages/productModels) is carried over to the next step.
        setFormData(prev => ({ 
            ...prev, 
            ...response,
            images: data.images || prev.images, 
            threeDModels: data.threeDModels || prev.threeDModels,
            // Explicitly persist the media and variant arrays for subsequent steps
            productImages: data.productImages || [],
            productModels: data.productModels || [], 
            variants: data.variants || [],
        }));
    
        // 3. CONDITIONAL STEP-SPECIFIC UPDATE (If submitted from Step 1, update Variants)
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

    } catch (error) {
        console.error("Product update failed:", error.message);
        // Handle error display to the user if needed
    } finally {
        if (currentStep !== 1) {
            setLoading(false);
        }
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
    moveToNextStep();
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
  // HELPER FUNCTIONS FOR DATA TRANSFORMATION
  // =============================================================================
  const transformColorsForForm = (apiColors) => {
      return apiColors?.map(c => ({
          name: c.name,
          hex: c.code,
      })) || [];
  };

  // Transforms API size objects (e.g., { size: 'S' }) 
  // into the format expected by the Autocomplete/Chip component ({ name: 'S' }).
  const transformSizesForForm = (apiSizes) => {
      return apiSizes?.map(s => ({
          // Map the API's 'size' field to the form's internal 'name' field
          name: s.size,
      })) || [];
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
                  } else {
                      // This will now only log if the product truly has NO color data
                      console.warn("⚠️ PARENT WARNING: Product has no initial 'colors' data.");
                      setSelectedColors([]);
                  }
                  
                  // 2. Handle Sizes Transformation
                  if (data.sizes && Array.isArray(data.sizes)) {
                      
                      // Transform API sizes array into the required state format: { name: '...' }
                      const initialSizes = data.sizes.map(s => ({
                          name: s.size, // Mapped 'size' (e.g., 'S', 'M') to 'name' state property
                      }));
                      
                      setSelectedSizes(initialSizes);

                    } else {
                      // This will now only log if the product truly has NO size data
                      console.warn("⚠️ PARENT WARNING: Product has no initial 'sizes' data.");
                      setSelectedSizes([]);
                  }

              } catch (error) {
                  console.error('Error loading product for editing:', error);
              } finally {
                  setLoading(false); 
              }
          };
          loadProductData();
      }
  }, [productId]);


  // FIX: Move useMemo call to the top level of the component to obey the Rules of Hooks.
  // The initialValues for the form are memoized to ensure stability.
  const currentInitialValues = useMemo(() => formData, [formData]);

  // =============================================================================
  // @function renderStepContent
  // @param {number} step - The index of the step to render.
  // @returns {JSX.Element} The form component corresponding to the current step.
  // It passes down initial values from the accumulated `formData` and the submission handler.
  // =============================================================================
  const renderStepContent = (step) => {
    // Use the memoized value defined in the component scope.

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
          />
        );
      case 2:
        return (
          <H1>Hello</H1>
        );
      // Add cases for step 2 and 3 with their respective components
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
        isActive: variant.isActive, 
        sku: variant.sku,
    }));
    
    if (variantsToUpdate.length === 0) {
        // If no variants to update, just log a warning and return success.
        console.warn("No variants to update for Step 1.");
        return; 
    }
    
    try {
        const response = await updateProductVariantsApi(idToUpdate, variantsToUpdate); 

        // Update the overall product state with the new variant info 
        setFormData(prev => ({ ...prev, variants: response }));
      
    } catch (error) {
      console.error("Product variant update failed:", error.message);
      // Re-throw the error so handleUpdateProduct catches it and handles loading state.
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
                    {/* Placeholder for a Material UI CircularProgress spinner */}
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
                        loading={loading}
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