"use client";
// ===============================================
// Dashboard Layout
// ===============================================

import BodyWrapper from "./dashboard-body-wrapper";
import SimulationOverlay from "@/components/SimulationOverlay";
import DashboardNavbar from "./dashboard-navbar/dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar/dashboard-sidebar";

import { Box, CircularProgress, Stack } from "@mui/material"; 
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { styled, keyframes } from '@mui/material/styles';
import { LayoutProvider } from "./dashboard-layout-context";
import { OnboardingDialog } from "@/components/custom-dialogs";
import { SellerProfileDialog } from "@/components/custom-dialogs";
import { useRouter } from 'next/navigation';
// Assuming this function is now available in your service file
import { fetchUserById } from "@/services/userService"; 

// ===============================================

export default function VendorDashboardLayout({
children
}) {

    const router = useRouter(); // Initialize router
    const { user, logout } = useAuth(); // Destructure logout function

    // 1. State for the freshly fetched user data
    const [freshUserData, setFreshUserData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [errorFetching, setErrorFetching] = useState(null); 
 
    // 2. States for dialogs
    const [onboardingDialogOpen, setOnboardingDialogOpen] = useState(false);
    const [storeDialogOpen, setStoreDialogOpen] = useState(false);

    // 3. Effect to fetch the up-to-date user data
    useEffect(() => {
        // Only proceed if the user is logged in (ID is available)
        if (user?.id) {
          const getFreshUser = async () => {
            setIsLoading(true); // Start loading
            setErrorFetching(null); // Clear previous errors

            try {
              const data = await fetchUserById(user.id); 
              
              // Check for empty data response
              if (!data || Object.keys(data).length === 0) {
                console.warn("API returned successful status but no user data. Forcing logout.");
                await logout(); 
                router.push('/');
                router.push("/sign-in"); 
                return;
              }

              setFreshUserData(data); // Store the fresh data
                // Only set loading to false on success
                setIsLoading(false); 

            } catch (error) {
              console.error("Failed to fetch fresh user data (API/network error):", error);
              
              // 🔑 Action on Error: Logout and Redirect
              console.warn("API request failed. Assuming invalid session. Logging out.");
              await logout();
              router.push('/'); 
              
                // IMPORTANT: Since we are redirecting, we don't need to set 
                // setIsLoading(false) or setErrorFetching(error) here, 
                // as the component is about to be unmounted.
                return;

            } 
            // REMOVED FINALLY BLOCK: We handle success/fail loading status in try/catch directly.
          };
          
          getFreshUser();
        } else if (user === null) { 
            setIsLoading(false);
            router.push('/');
        } else {
            setIsLoading(false);
        }
      }, [user?.id, logout, router]); // Dependency array updated

    // 4. Effect to check and open the onboarding dialog (UNMODIFIED)
    useEffect(() => {
        // Check condition using the freshUserData, and only after loading is complete and no error
        const isRequired = freshUserData 
             && freshUserData.company 
             && freshUserData.company.isOnboardingFormFilled === false;
    
        // Check: user data is loaded, loading is complete, and onboarding is required
        if (user && !isLoading && !errorFetching && isRequired) {
            setOnboardingDialogOpen(true);
        }
    }, [user, isLoading, errorFetching, freshUserData]); 

    // --- CRITICAL LOADING/ERROR HANDLERS ---

    // Handle Loading State (Using Spinner) (UNMODIFIED)
    if (isLoading) {
        return (
            <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100vw', height: '100vh' }}
            >
                <CircularProgress size={60} />
            </Stack>
        );
    }

    // Handle Error State (UNMODIFIED)
    if (errorFetching) {
    // The critical DNE (Does Not Exist) check is handled in useEffect with logout().
    // This block remains for network/server errors that prevent the request from succeeding.
        return (
            <Stack 
            alignItems="center" 
            justifyContent="center" 
            sx={{ width: '100vw', height: '100vh', color: 'error.main' }}
            >
                <Box>🚨 Error loading profile data. Please check your connection and refresh.</Box>
            </Stack>
        );
    }

// --- RENDER DASHBOARD ---
return (
 <LayoutProvider>
  <Box>
   <style>
    {`.css-28k8rt, .css-1fbkvt5  { background: transparent; margin-left:0; }`}
   </style>

   {/* Gradient Blobs */}
   <BlobBox sx={{ top: '40rem', right: '30rem', backgroundColor: '#0366FE', }} />
   <BlobBox sx={{ top: '40rem', right: '40rem', backgroundColor: '#0366FE', animationDelay: '2s', }} />
   <BlobBox sx={{ top: '50rem', right: '35rem', backgroundColor: '#0366FE', animationDelay: '4s', }} />
  
   {/* Dashboard Sidebar */}
   <DashboardSidebar />

   {/* Welcome dialog */}
   <OnboardingDialog
    open={onboardingDialogOpen}
    setOpen={setOnboardingDialogOpen}
    setStoreDialogOpen={setStoreDialogOpen}
   />
   
   {/* Seller Profile Dialog */}
   <SellerProfileDialog
    open={storeDialogOpen}
    setOpen={setStoreDialogOpen}
   />

   {/* Simulation overlay - only shows when both dialogs are closed */}
   {/* <SimulationOverlay
   open={!onboardingDialogOpen && !storeDialogOpen}
   setStoreDialogOpen={setStoreDialogOpen}
   /> */}
     
    {/* Main Body */}
    <BodyWrapper>
        <DashboardNavbar />
        {children}
    </BodyWrapper>
  </Box>

 </LayoutProvider>
);
}

const blob = keyframes`
    0% {
    transform: translate(0px, 0px) scale(1);
    }
    33% {
    transform: translate(30px, -50px) scale(1.1);
    }
    66% {
    transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
    transform: translate(0px, 0px) scale(1);
    }
`;


const BlobBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '40rem',
    height: '40rem',
    borderRadius: '50%',
    filter: 'blur(100px)',
    opacity: 0.7,
    animation: `${blob} 7s infinite`,
}));