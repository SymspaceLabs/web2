"use client";

// =====================================================
// Preferences 
// used in profile page 
// =====================================================

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FlexCol } from "@/components/flex-box";
import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { PreferenceForm } from "@/components/custom-forms";
import { SymDashboardHeader } from "@/components/custom-components";

import CreditCard from "@mui/icons-material/CreditCard";

// =====================================================

export default function PreferencesPageView({
  isEdit
}) {

  const router = useRouter();
  
  const { showSnackbar } = useSnackbar();
  const { isAuthenticated, user } = useAuth();

  const [loading, setLoading] = useState(false); // Spinner control
  const [gender, setGender] = useState();
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [outerwears, setOuterwears] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [styles, setStyles] = useState([]);
  const [fits, setFits] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/preferences/user/${user.id}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch preferences");

        const data = await res.json();
        setGender(data.gender);
        setStyles(data.styles);
        setFits(data.fits);
        setColors(data.colors);
        setBrands(data.brands);
        setTops(data.tops);
        setBottoms(data.bottoms);
        setOuterwears(data.outerwears);
        setAccessories(data.accessories);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    if (isAuthenticated) fetchPreferences();
  }, [isAuthenticated]);

  const handleSave = async () => {
    
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/preferences/user/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          gender,
          styles,
          fits,
          colors,
          brands,
          tops,
          bottoms,
          outerwears,
          accessories,
        }),
      });

      if (!res.ok) throw new Error("Failed to save preferences");

      showSnackbar("Preferences saved successfully!", "success");
      router.push("/preferences");
    } catch (error) {
      console.error("Error saving preferences:", error);
      showSnackbar("Failed to save preferences.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={style.box}>
      <SymDashboardHeader
        title="Preferences"
        Icon={CreditCard}
        buttonText={isEdit? "Save Changes" : "Edit"}
        onClick={isEdit? handleSave : ()=>router.push('/preferences/edit')}
        loading={loading}
      />
      <Box p="15px">
        <FlexCol sx={style.card}>
          <PreferenceForm
            gender={gender}
            setGender={setGender}
            styles={styles}
            setStyles={setStyles}
            fits={fits}
            setFits={setFits}
            colors={colors}
            setColors={setColors}
            brands={brands}
            setBrands={setBrands}
            tops={tops}
            setTops={setTops}
            bottoms={bottoms}
            setBottoms={setBottoms}
            outerwears={outerwears}
            setOuterwears={setOuterwears}
            accessories={accessories}
            setAccessories={setAccessories}
            isEdit={isEdit}
          />
        </FlexCol>
      </Box>
    </Box>
  );
}

const style = {
  box: { 
    paddingBottom:'15px',
    borderRadius:'15px',
    background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(12px)',
  },
  card : {
    width:'100%',
    color:'#fff',
    display: "flex",
    flexWrap: "wrap",
    p: "1.5rem",
    alignItems: {xs:'start', sm:'center'},
    justifyContent: {xs:"flex-start", sm:"space-between"},
    background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    borderRadius:'15px',
    mt: 3,
  }
}