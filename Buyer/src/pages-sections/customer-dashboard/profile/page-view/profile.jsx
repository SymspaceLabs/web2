"use client";

// ===========================================================
// Profile Page View
// ===========================================================

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FlexCol } from "@/components/flex-box";
import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { Card, Box, CircularProgress, useMediaQuery } from "@mui/material";
import { ProfileForm, MeasurementForm, PreferenceForm } from "@/components/custom-forms";

import Person from "@mui/icons-material/Person";
import ProfilePicUpload from "../profile-pic-upload";
import UserAnalytics from "../user-analytics";
import { SymDashboardHeader } from "@/components/custom-components";
// ===========================================================

export default function ProfilePageView({
  isEdit
}) {

  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const { isAuthenticated, user } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false); // Spinner control
  const [userData, setUserData] = useState(null);

  // PROFILE
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');


  // MEASUREMENTS
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
    
  const [chest, setChest] = useState(0);
  const [waist, setWaist] = useState(0);

  // Preferences
  const [gender, setGender] = useState('');
  const [tops, setTops] = useState();
  const [bottoms, setBottoms] = useState();
  const [outerwears, setOuterwears] = useState();
  const [accessories, setAccessories] = useState();
  const [styles, setStyles] = useState();
  const [fits, setFits] = useState();
  const [brands, setBrands] = useState();
  const [colors, setColors] = useState();
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserData(data)
          } else {
            console.error("Failed to fetch user data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
 
    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setDob(userData.dob || '');
      setIsMetric(userData.measurement?.isMetric || true);
      setHeight(userData.measurement?.height || '');
      setWeight(userData.measurement?.weight || '');
      setChest(userData.measurement?.chest || '');
      setWaist(userData.measurement?.waist || '');
      setGender(userData.gender || '');
      setTops(userData?.preference?.tops);
      setBottoms(userData?.preference?.bottoms);
      setOuterwears(userData?.preference?.outerWears);
      setAccessories(userData?.preference?.accessories);
      setStyles(userData?.preference?.styles);
      setFits(userData?.preference?.fits);
      setBrands(userData?.preference?.brands);
      setColors(userData?.preference?.colors);
    }
  }, [userData]);
  
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/measurements/user/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization if needed:
            // 'Authorization': `Bearer ${yourToken}`,
          },
        });
  
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
  
        const data = await res.json();
  
        setHeight({
          cm: data.height,
          feet: Math.floor(data.height / 30.48),
          inches: Math.round((data.height % 30.48) / 2.54),
        });
        setWeight({
          kg: data.weight,
          lbs: Math.round(data.weight * 2.20462),
        });
        setIsMetric(data.isMetric);
        setChest(data.chest);
        setWaist(data.waist);
      } catch (error) {
        console.error("Error fetching measurements:", error);
      }
    };
  
    if (isAuthenticated) fetchMeasurements();
  }, [isAuthenticated]);
  

  if (isAuthenticated === undefined || user === undefined) {
    return (
      <CircularProgress />
    );
  }

  if (!userData) {
    return (
      <CircularProgress />
    );
  }

  const handleSave = async () => {

    setLoading(true);
    
    const requestBody = {
      "measurement" : {
          "weight": weight.kg,
          "height": height.cm,
          "isMetric": isMetric,
          "chest": chest,
          "waist": waist
      },
      "preference" : {
        "gender": gender,
        "tops": tops,
        "bottoms":bottoms,
        "outerwears": outerwears,
        "accessories": accessories,
        "styles": styles,
        "fits": fits,
        "brands": brands,
        "colors": colors
      },
      "user": {
        "dob": dob,
        "firstName": firstName,
        "lastName": lastName,
        
      }
    };

    try {
        // Make the POST request
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/user/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization if needed:
            // 'Authorization': `Bearer ${yourToken}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (res.status === 201) {
          showSnackbar("Changes saved!", "success");
          router.push("/profile");

        } else {
          // You can optionally handle other status codes here
          // alert("Failed to create onboarding. Please try again.");
        }
        
    }  catch (error) {
        console.error("Error creating onboarding:", error);
        // alert("An error occurred while creating onboarding.");
    } finally {
      setLoading(false);
    }
  }
    
  return (
    <FlexCol sx={style.box}>
      <Box>
        <SymDashboardHeader
          title={isEdit ? "Edit Profile" : "Profile"}
          Icon={Person}
          buttonText={isEdit? "Save Changes" : "Edit"}
          onClick={isEdit? handleSave : ()=>router.push('/profile/edit')}
          loading={loading}
        />
        <UserAnalytics user={userData} />
      </Box>

      <Card sx={[style.card, {flexDirection:'column', }]}>
        
        <ProfilePicUpload user={user} />

        <ProfileForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={userData.email}
          dob={dob}
          setDob={setDob}
          isEdit={isEdit}
        />
      </Card>
      <Card sx={[style.card, {flexDirection:'column'}]}>
        <MeasurementForm
          setIsMetric={setIsMetric} 
          isMetric={isMetric}
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
          chest={chest}
          setChest={setChest}
          waist={waist}
          setWaist={setWaist}
          isMobile={isMobile}
          isEdit={isEdit}
        />
      </Card>
      <Card sx={[style.card, {flexDirection:'column'}]}>
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
      </Card>
    </FlexCol>
  );
}

const style = {
  box : { 
    padding:'15px',
    borderRadius:'15px',
    background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(12px)',
    gap:'25px'
  },
  card : {
    borderRadius:'15px',
    width:'100%',
    color:'#fff',
    display: "flex",
    flexWrap: "wrap",
    p: "1.5rem",
    flexDirection: {xs:"column", sm:'row'}, 
    alignItems: {xs:'start', sm:"flex-start"},
    background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    justifyContent: {xs:'flex-start', sm:"space-between"},
  }
}
