"use client";

/**
 * MarketplacePageView is the main component for rendering the marketplace view.
 * It checks user authentication and onboarding status to display an onboarding dialog when necessary.
 * The page consists of multiple sections for various features such as sliders, catalogs, and 3D animations.
 */

import { useState, useEffect } from "react";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
import { useAuth } from "@/contexts/AuthContext";
import OnboardingDialog from "@/components/dialog/OnboardingDialog";

export default async function MarketplacePageView() {
  // State to manage the visibility of the onboarding dialog
  const [showPopup, setShowPopup] = useState(false);

  // Extract authentication and user information from the AuthContext
  const { isAuthenticated, user } = useAuth();

  // useEffect runs on component mount and when user onboarding status changes
  useEffect(() => {
    // Retrieve the dialog's closed state from localStorage
    const isDialogClosed = localStorage.getItem("onboardingDialogClosed");

    // Debugging logs for user onboarding status and dialog state
    console.log(user?.isOnboardingFormFilled);
    console.log(isDialogClosed);

    // Show the onboarding dialog if the user is authenticated, has not filled the onboarding form,
    // and the dialog is not marked as closed in localStorage
    if (
      isAuthenticated &&
      !user?.isOnboardingFormFilled &&
      isDialogClosed !== "true"
    ) {
      setShowPopup(true);
    }
  }, [user?.isOnboardingFormFilled]);

  // Handler to close the onboarding dialog and persist its state in localStorage
  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("onboardingDialogClosed", "true");
  };

  return (
    <div className="bg-white">
      {/* Render the onboarding dialog if showPopup is true */}
      {showPopup && (
        <OnboardingDialog
          open={showPopup}
          onClose={handleClose}
          user={user}
        />
      )}

      {/* Render various sections of the marketplace */}
      <Section1 /> {/* GRID CARD SECTION */}
      <Section2 /> {/* SLIDER */}
      <Section3 /> {/* SHOP WOMEN */}
      <Section4 /> {/* SHOP MEN */}
      <Section5 /> {/* BEST SELLER PRODUCTS */}
      <Section6 /> {/* BANNER */}
      <Section7 /> {/* CATALOGUE */}
      <Section8 /> {/* BENTO */}
      <Section9 /> {/* 3D Animation */}
      {/* <Section10 /> */} {/* 3D Animation */}
    </div>
  );
}
