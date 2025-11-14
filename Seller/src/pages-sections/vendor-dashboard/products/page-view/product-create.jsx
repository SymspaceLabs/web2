"use client";

// =============================================================================
//  Product Create Page View
// =============================================================================

import ProductForm1 from "../product-form-1";
import ProductForm2 from "../product-form-2";
import CustomStepper from "../components/CustomStepper";
import FooterButtons from "../components/FooterButtons";

import { Box } from "@mui/material";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { fetchProductById, createProduct as createProductApi, updateProduct } from "@/services/productService";

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
// A multi-step form component for creating a new product. It manages the state
// for the active step, form data across all steps, and handles the navigation
// and submission logic for the entire process.
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
  // FIX: Initialize loading state to true if we are in edit mode (productId exists)
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
    console.log('--- DEBUG: handleNext triggered in PARENT ---');
    
    if (formRef.current && formRef.current.submit) {
        console.log('--- DEBUG: PARENT calling child formRef.current.submit() ---');
        formRef.current.submit();
    } else {
        console.error("❌ ERROR: PARENT - formRef is missing or does not expose a 'submit' method.");
    }
  };

  // =============================================================================
  // @function onStepSubmitSuccess
  // Executes API calls based on the current step.
  // =============================================================================
  const onStepSubmitSuccess = (values) => {
    console.log(`--- DEBUG: PARENT onStepSubmitSuccess CALLBACK received from Step ${activeStep + 1} ---`);
    
    // NEW: Start loading indicator immediately upon successful client-side validation
    setLoading(true);

    // 1. Merge the current step's data into the total formData state.
    const newFormData = { ...formData, ...values };
    setFormData(newFormData);

    console.log('Step values:', values);
    console.log('Accumulated Data:', newFormData);

    // 2. Execute logic based on the current step.
    if (activeStep === 0) {
        if (currentProductId) {
            // Edit Mode Step 1: Update the data and move to the next step.
            console.log('--- DEBUG: PARENT updating existing product on Step 1 submit (Edit Mode) ---');
            // Pass true for skipRedirect to tell update function not to change URL
            handleUpdateProduct(newFormData, false, true); 
        } else {
            // Create Mode Step 1: Create the product and handle the URL redirect.
            handleCreateProduct(newFormData);
        }
    } else if (activeStep < totalSteps() - 1) {
      // For intermediate steps, update the existing product.
      handleUpdateProduct(newFormData);
    } else if (isLastStep()) {
      // On the final step, update the product with a 'submitted' status.
      handleUpdateProduct({ ...newFormData, status: 'submitted' }, true);
    }
  };

  // =============================================================================
  // @function handleCreateProduct (Wrapper for the external API function)
  // Creates the product on Step 1 and handles the URL update (moving from /create to /:id).
  // =============================================================================
  const handleCreateProduct = async (data) => {
    // 👇 UPDATED: Add selectedSizes and selectedColors to the requestBody
    const transformedSizes = selectedSizes.map(size => size.name);
    const transformedColors = selectedColors.map(color => ({
      name: color.name,
      code: color.hex, // Renaming 'hex' to 'colorCode'
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

    // setLoading(true) removed here, now handled in onStepSubmitSuccess
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
        console.log(`URL changed from /create to: ${newUrl}`);
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
  // @param {boolean} isFinalStep - True if this is the final submission.
  // @param {boolean} skipRedirect - True if we should update and immediately move to next step without URL change.
  // =============================================================================
  const handleUpdateProduct = async (data, isFinalStep = false, skipRedirect = false) => {
    console.log('1');

    // 👇 UPDATED: Add selectedSizes and selectedColors to the requestBody
    const requestBody = {
      name: data.name,
      company : user?.company?.id,
      subcategoryItem : data.category,
      colors : selectedColors, // ⬅️ UPDATED
      sizes : selectedSizes // ⬅️ UPDATED
    }
    // 👆 END UPDATED BLOCK

    return ;

    const idToUpdate = currentProductId || productId; 
    if (!idToUpdate) {
      console.error("Cannot update: Product ID is missing.");
      setLoading(false); // Make sure to clear loading state if we bail early
      return;
    }

    // setLoading(true) removed here, now handled in onStepSubmitSuccess
    try {
        const response = await updateProduct(idToUpdate, requestBody); 

        // If successful, update state
        setFormData(prev => ({ ...prev, ...response }));
      
        if (isFinalStep) {
          handleComplete();
          console.log("Final submission complete! Data:", response);
        } else {
          // If in edit mode on step 1, we just move to the next step in the UI
          moveToNextStep();
        }

    } catch (error) {
      console.error("Product update failed:", error.message);
      // Handle error display to the user if needed
    } finally {
      setLoading(false);
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
  // @function handleReset
  // Resets the entire form state, returning to the first step and clearing all data.
  // =============================================================================
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({});
    // setProductId(null);
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
    console.log("Saving Draft Data:", formData);
    // In a real application, you would trigger an API call here to save the draft.
    router.push('/vendor/products');
  };

  // =============================================================================
  //  Load Product Data for Editing
  // =============================================================================
  useEffect(() => {
    // Only fetch if a productId is provided (i.e., we are in edit mode)
    if (productId) { 
        const loadProductData = async () => {
            setLoading(true); 
            try {
                // Fetch the complete product object by ID
                const data = await fetchProductById(productId);
                
                // 1. Set the core form data. This populates the initialValues prop.
                setFormData(data);
                
                // 2. Set any non-Formik-controlled state based on the fetched data
                if (data.colors) setSelectedColors(data.colors);
                if (data.sizes) setSelectedSizes(data.sizes);
                
            } catch (error) {
                console.error('Error loading product for editing:', error);
                // In case of error, still stop loading
            } finally {
                setLoading(false); // <-- Loading ends, triggers re-render
            }
        };
        loadProductData();
    }
// Add the prop as a dependency
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
    // const currentInitialValues = useMemo(() => formData, [formData]); <-- REMOVED HOOK CALL

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
      // Add cases for step 2 and 3 with their respective components
      default:
        return <Box sx={{ p: 3, textAlign: 'center' }}>Step {step + 1} Content (Missing component)</Box>;
    }
  };

    // Determine if we are in a state where we are editing and still waiting for data
    const showLoadingPlaceholder = productId && loading;

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