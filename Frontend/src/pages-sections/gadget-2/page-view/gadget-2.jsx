"use client"

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
import Section10 from "../section-10";
import { useAuth } from "@/contexts/AuthContext";
import OnboardingDialog from "@/components/dialog/OnboardingDialog";

export default async function GadgetTwoPageView() {

  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Check localStorage to persist closed state
    const isDialogClosed = localStorage.getItem("onboardingDialogClosed");
    console.log(user?.isOnboardingFormFilled);
    console.log(isDialogClosed);


    if (isAuthenticated && !user?.isOnboardingFormFilled && isDialogClosed !== "true" ) {
      setShowPopup(true);
    }
  }, [user?.isOnboardingFormFilled]);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("onboardingDialogClosed", "true"); // Persist dialog state
  };
  
  return <div className="bg-white">

      {showPopup && (
        <OnboardingDialog
          open={showPopup}
          onClose={handleClose}
          user={user}
        />
      )}

      <Section1 /> {/* GRID CARD SECTION */}
      <Section2 /> {/* SLIDER */}
      <Section3 /> {/* SHOP WOMEN */}
      <Section4 /> {/* SHOP MEN */}
      <Section5 /> {/* BEST SELLER PRODUCTS */}
      <Section6 /> {/* BANNER */}
      <Section7 /> {/*CATALOGUE */}
      <Section8 /> {/* BENTO */}
      <Section9 /> {/* 3D Animation */}
      {/* <Section10 />  */} {/* 3D Animation */}
      
    </div>;
}

