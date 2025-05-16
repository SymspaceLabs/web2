

import axios from "axios";
import Link from "next/link";
import { styles } from "./styles";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { H1, H6, Paragraph } from "../Typography";
import { useCallback, useState, useEffect } from "react";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { MeasurementForm, PreferenceForm } from "../custom-forms";
import { FlexBox, FlexCol, FlexColCenter } from "../flex-box";
import { useMediaQuery, Box, Button } from "@mui/material";

const DrawerRight = ({ toggleSidenav, headerTitle }) => {
  const { isAuthenticated, user } = useAuth();
  const { push } = useRouter();
  const { showSnackbar } = useSnackbar();
  
  const isMobile = useMediaQuery('(max-width:600px)');

  {/* Preferences */}
  const [gender, setGender] = useState();
  const [stylesData, setStylesData] = useState([]);
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
      push(path);
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
          "styles": stylesData,
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
        setStylesData(preference.styles);
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
      <FlexBox sx={styles.headerCard}>
        <FlexBox gap={1} alignItems="center" color="secondary.main">
          <H1 color="#FFF" fontSize="18px">
            {headerTitle}
          </H1>
        </FlexBox>
      </FlexBox>

      {/* CONDITIONAL CONTENT */}
      {isAuthenticated ? (
        // Post-Authenticated Content
        <Box height="calc(100vh - 75px)" sx={{ padding: "10px" }}>
          <Paragraph color="#FFF">
            Welcome back! Explore your personalized features here.
          </Paragraph>
          <FlexCol flexDirection="column" sx={{ padding: 1, gap: 3, background: 'transparent' }}>
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
              styles={stylesData}
              setStylesData={setStylesData}
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
          </FlexCol>
          <FlexColCenter alignItems="center" gap="10px" mt={2} width='100%'>
            <Button onClick={handleSaveChanges} sx={styles.blueBtn}>
              Save settings
            </Button>
            <H6 sx={{ fontFamily: 'Helvetica', fontSize: 12, color: '#fff', fontWeight: 400, ":hover": { textDecoration: 'underline' } }}>
              <Link href="/contact-us" passHref>
                Contact Us
              </Link>
            </H6>
          </FlexColCenter>
        </Box>
      ) : (
        // Pre-Authenticated Content
        <Box height="calc(100vh - 75px)" sx={{ padding: "10px" }}>
          <FlexBox flexDirection="column" gap={2}>
            <Paragraph color="#FFF">
              Complete the details below so we can offer better-tailored and
              personalized services
            </Paragraph>
            <H1 color="#FFF">
              To access personalized sizing features
            </H1>
            <Button sx={styles.darkBtn} onClick={() => handleNavigate("/sign-in")}>
              Sign In
            </Button>
            <Button sx={styles.blueBtn} onClick={() => handleNavigate("/signup")}>
              Sign Up
            </Button>
          </FlexBox>
        </Box>
      )}
    </Box>
  );
};

export default DrawerRight;
