import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery, Box, Typography, Button } from "@mui/material";
import { FlexBox } from "../flex-box";
import { useAuth } from "@/contexts/AuthContext";
import { MeasurementForm, PreferenceForm } from "../forms";
import { H1, H6 } from "../Typography";
import Link from "next/link";
import axios from "axios";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { elementalEndFont } from "../styles";

const DrawerRight = ({ toggleSidenav, headerTitle }) => {
  const { isAuthenticated, user } = useAuth();
  const { push } = useRouter();
  const { showSnackbar } = useSnackbar();
  
  const isMobile = useMediaQuery('(max-width:600px)');

  {/* Preferences */}
  const [gender, setGender] = useState();
  const [styles, setStyles] = useState([]);
  const [fits, setFits] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [outerwears, setOuterwears] = useState([]);
  const [accessories, setAccessories] = useState([]);

  const [isMetric, setIsMetric] = useState(true);
  const [height, setHeight] = useState(
      {
          feet: 0,
          inches: 0,
          cm: 0,
      }
  );
  
  const [weight, setWeight] = useState(
      {
          lbs: 0,
          kg: Math.round((0) / 2.20462),
      }
  );

  const handleNavigate = useCallback(
    async (path) => {
      await push(path);
      toggleSidenav();
    },
    [push, toggleSidenav]
  );

  const handleSaveChanges = async () => {
    const requestBody = {
      "measurement" : {
          "weight":weight.kg,
          "height":height.cm,
          "isMetric":isMetric
      },
      "preference" : {
          "gender":gender,
          "tops": tops,
          "bottoms":bottoms,
          "outerwears": outerwears,
          "accessories": accessories,
          "styles": styles,
          "fits": fits,
          "brands": brands,
          "colors": colors
      } 
    };

    try {
      // Make the POST request
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/user/${user.id}`,
          requestBody
      );
      // Handle success and failure responses
      if (response.status === 201) {
        showSnackbar("Info updated successfully", "success");
        // onClose(); // Close the dialog
      } else {
        // alert("Failed to create onboarding. Please try again.");
      }
      
    }  catch (error) {
        console.error("Error creating onboarding:", error);
        // alert("An error occurred while creating onboarding.");
    }


  };

  useEffect(() => {
    // Fetch height and weight data
    const fetchMeasurements = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/user/${user.id}`);
        const { measurement, preference } = response.data;

        setHeight({
          cm: measurement.height,
          feet: Math.floor(measurement.height / 30.48),
          inches: Math.round((measurement.height % 30.48) / 2.54),
        });
        setWeight({
          kg: measurement.weight,
          lbs: Math.round(measurement.weight * 2.20462),
        });
        setIsMetric(measurement.metric);
        setGender(preference.gender);
        setStyles(preference.styles);
        setFits(preference.fits);
        setColors(preference.colors);
        setTops(preference.tops);
        setBottoms(preference.bottoms);
        setOuterwears(preference.outerwears);
      } catch (error) {
        console.error("Error fetching measurements:", error);
      }
    };

    if (isAuthenticated) fetchMeasurements();
  }, [isAuthenticated]);

  return (
    <Box sx={{ width: "100%", maxWidth: 380, minWidth: 380 }}>
      
      {/* HEADING SECTION */}
      <FlexBox sx={headerCard}>
        <FlexBox gap={1} alignItems="center" color="secondary.main">
          <Typography
            sx={{
              fontFamily: elementalEndFont,
              textTransform: "lowercase",
              color: "#FFF",
              fontSize: "18px",
            }}
          >
            {headerTitle}
          </Typography>
        </FlexBox>
      </FlexBox>

      {/* CONDITIONAL CONTENT */}
      {isAuthenticated ? (
        // Post-Authenticated Content
        <Box height="calc(100vh - 75px)" sx={{ padding: "10px" }}>
          <Typography sx={{ color: "#fff" }}>
            Welcome back! Explore your personalized features here.
          </Typography>
          <FlexBox flexDirection="column" sx={{ padding: 1, background: 'transparent' }}>
            <MeasurementForm
              setIsMetric={setIsMetric}
              isMetric={isMetric}
              height={height}
              setHeight={setHeight}
              weight={weight}
              setWeight={setWeight}
              isMobile={isMobile}
              sidebar={true}
            />
            <PreferenceForm
              gender={gender}
              setGender={setGender}
              styles={styles}
              setStyles={setStyles}
              setFits={setFits}
              fits={fits}
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
              sidebar={true}
              isMobile={isMobile}
              isEdit={true}
            />
          </FlexBox>
          <FlexBox justifyContent="center" flexDirection="column" alignItems="center" gap="10px" sx={{ mt:2, width:'100%' }}>
            <Button
              onClick={handleSaveChanges}
              variant="contained"
              color="primary"
              sx={{ 
                marginTop: "20px",
                p: "10px",
                width:'100%',
                borderRadius:'50px',
                background:'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)'
              }}
            >
              Save settings
            </Button>
            <H6 sx={{ fontFamily: 'Helvetica', fontSize: 12, color: '#fff', fontWeight: 400, ":hover": { textDecoration: 'underline' } }}>
              <Link href="#" passHref>
                Contact Us
              </Link>
            </H6>
          </FlexBox>

        </Box>
      ) : (
        // Pre-Authenticated Content
        <Box height="calc(100vh - 75px)" sx={{ padding: "10px" }}>
          <FlexBox flexDirection="column" gap={2}>
            <Typography sx={{ color: "#fff" }}>
              Complete the details below so we can offer better-tailored and
              personalized services
            </Typography>
            <H1 color="#FFF">
              To access personalized sizing features
            </H1>
            <Button
              sx={{
                padding: "8px 24px",
                background:
                  "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
                color: "#fff",
              }}
              onClick={() => handleNavigate("/sign-in")}
            >
              Sign In
            </Button>
            <Button
              sx={{
                padding: "8px 24px",
                background: "#000",
                color: "#fff",
              }}
              onClick={() => handleNavigate("/signup")}
            >
              Sign Up
            </Button>
          </FlexBox>
        </Box>
      )}
    </Box>
  );
};

export default DrawerRight;

const headerCard = {
  px: 2,
  justifyContent: "center",
  height: 74,
  borderRadius: "15px",
  background:
    "linear-gradient(117.54deg, rgba(255, 255, 255, 0.95) -19.85%, rgba(245, 245, 245, 0.6) 4.2%, rgba(240, 240, 240, 0.5) 13.88%, rgba(230, 230, 230, 0.4) 27.98%, rgba(225, 225, 225, 0.35) 37.8%, rgba(220, 220, 220, 0.3) 44.38%, rgba(215, 215, 215, 0.25) 50.54%, rgba(210, 210, 210, 0.2) 60.21%)",
};
