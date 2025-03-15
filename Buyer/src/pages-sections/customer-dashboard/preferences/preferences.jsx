import { useState, useEffect } from "react";
import FlexBox from "../../../components/flex-box/flex-box";
import { Button, Card, useMediaQuery } from "@mui/material";
import { PreferenceForm } from "@/components/forms";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/contexts/SnackbarContext";


// ============================================================== 
export default function Preferences({ isEdit = true }) {
  const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery('(max-width:600px)');
  const { isAuthenticated, user } = useAuth();
  const router = useRouter(); // Initialize router
  const { showSnackbar } = useSnackbar();
  
  const [gender, setGender] = useState();
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [outerwears, setOuterwears] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [styles, setStyles] = useState([]);
  const [fits, setFits] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  const cardStyle = {
    borderRadius:'15px',
    width:'100%',
    color:'#fff',
    mt: 3,
    display: "flex",
    flexWrap: "wrap",
    p: "1.5rem",
    alignItems: "center",
    background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    justifyContent: "space-between",
    ...(downMd && { 
      alignItems: "start", 
      flexDirection: "column", 
      justifyContent: "flex-start"
    })
  }

  const handleSaveChanges = async () => {
    const requestBody =  {
      "tops":tops,
      "bottoms":bottoms,
      "outerwears":outerwears,
      "accessories":accessories,
      "styles":styles,
      "fits":fits,
      "brands":brands,
      "colors":colors,
      "gender":gender
    };
    console.log(requestBody);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/preferences/user/${user.id}`,
        requestBody);
  
        showSnackbar(response.data.message, "success");
    } catch (error) {
      console.error("Error saving changes:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    // Fetch height and weight data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/preferences/user/${user.id}`);
        const { data } = response;
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
        console.error("Error fetching measurements:", error);
      }
    };

    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  return (
    <Card sx={[cardStyle, { flexDirection: 'column' }]}>
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
        isMobile={isMobile}
        isEdit={isEdit}
      />

      {isEdit && (
        <FlexBox justifyContent="flex-end" gap={3} sx={{width:'100%'}}>
          <Button
              onClick={() => router.push("/measurements")}
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px", p: "10px" }}
          >
              Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px", p: "10px" }}
          >
            Save changes
          </Button>
        </FlexBox>
      )}
    </Card>
  );
}