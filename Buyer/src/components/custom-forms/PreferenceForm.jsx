"use client"

// =================================================================================
// Preference Form Used in Profile
// =================================================================================

import { FlexBox } from '../flex-box';
import { useState, useEffect } from 'react';
import { TitleCard } from '../custom-dialog/components';
import { SymMultiSelectDropdown } from "@/components/custom-inputs";
import { FormControl, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";

// =================================================================================

const PreferenceForm = ({
    gender,
    setGender,
    styles,
    setStyles,
    fits,
    setFits,
    colors,
    setColors,
    brands,
    setBrands,
    tops,
    setTops,
    bottoms,
    setBottoms,
    outerwears,
    setOuterwears,
    accessories,
    setAccessories,
    isMobile=true,
    isEdit,
    sidebar=false,
}) => {

    const [genderData, setGenderData] = useState(gender || "male");

    useEffect(() => {
      if(gender){
        setGenderData(gender);
      } else {
        setGenderData("male");
      }
    }, [gender]);

    
    const handleStylesChange = (event) => {
        const { value } = event.target;
        setStyles((prev) =>
          typeof value === "string" ? value.split(",") : value
        );
    };

      const handleTopSizeChange = (event) => {
        const { value } = event.target;
        setTops((prev) =>
          typeof value === "string" ? value.split(",") : value
        );
      };
    
      const handleBottomSizeChange = (event) => {
        const { value } = event.target;
        setBottoms((prev) =>
          typeof value === "string" ? value.split(",") : value
        );
      };
    
      const handleOuterwearSizeChange = (event) => {
        const { value } = event.target;
        setOuterwears((prev) =>
          typeof value === "string" ? value.split(",") : value
        );
      };
    
      const handleFitChange = (event) => {
        const { value } = event.target;
        setFits((prev) =>
          typeof value === "string" ? value.split(",") : value
        );
      };
    
      const handleBrandsChange = (event) => {
        const { value } = event.target;
        setBrands(value);
      };
    
      const handleColorsChange = (event) => {
        const { value } = event.target;
        setColors(value);
      };

      const handleAccessoriesChange = (event) => {
        const { value } = event.target;
        setAccessories((prev) =>
          typeof value === "string" ? value.split(",") : value
        );
      };

  return (
    <Box sx={{ width: '100%' }}>
      <TitleCard
          title="Preferences"
          subTitle="Share your style and size preferences for tailored recommendations."
          isMobile={isMobile}
      />

      {/* GENDER */}
      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <RadioGroup
          row
          value={genderData}
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel
            value="male"
            control={
              <Radio
                sx={{
                  color: "#FFF",
                  '&.Mui-checked': {
                    color: "#3084FF",
                  },
                  pointerEvents: isEdit ? 'auto' : 'none'
                }}
              />
            }
            label="Male"
            disabled={!isEdit}

          />
          <FormControlLabel
            value="female"
            control={
              <Radio
                sx={{ 
                  color: "#FFF",
                  '&.Mui-checked': {
                    color: "#3084FF",
                  },
                  pointerEvents: isEdit ? 'auto' : 'none'
                }}
              />
            }
            label="Female"
            disabled={!isEdit}
          />
          <FormControlLabel
            value="both"
            control={
              <Radio
                sx={{
                  color: "#FFF",
                  '&.Mui-checked': {
                    color: "#3084FF", // Keep the color when checked
                  },
                  pointerEvents: isEdit ? 'auto' : 'none'
                }}
              />
            }
            label="Both"
            disabled={!isEdit}
          />
        </RadioGroup>
      </FormControl>

      {/* ROW 1 */}
      <FlexBox sx={style.card}>          
        <SymMultiSelectDropdown
          title="Style"
          selectedValue={styles}
          handleChange={handleStylesChange}
          options={styleOptions}
          isEdit={isEdit}
        />
        <SymMultiSelectDropdown
          title="Preferred Fit"
          selectedValue={fits}
          handleChange={handleFitChange}
          options={fitTypeOptions}
          isEdit={isEdit}
        />
        {!sidebar &&
          <SymMultiSelectDropdown
            title="Preferred Brands"
            selectedValue={brands}
            handleChange={handleBrandsChange}
            options={brandOptions}
            isEdit={isEdit}
            isColor={true}
          />
        }
        <SymMultiSelectDropdown
          title="Preferred Colors"
          selectedValue={colors}
          handleChange={handleColorsChange}
          options={colorOptions}
          isEdit={isEdit}
          isColor={true}
        />
      </FlexBox>

      {/* ROW 2 */}
      <FlexBox sx={style.card}>
        <SymMultiSelectDropdown
          title="Tops"
          selectedValue={tops}
          handleChange={handleTopSizeChange}
          options={["S", "M", "L"]}
          isEdit={isEdit}
        />
        <SymMultiSelectDropdown
          title="Bottoms"
          selectedValue={bottoms}
          handleChange={handleBottomSizeChange}
          options={["S", "M", "L"]}
          isEdit={isEdit}
        />
        <SymMultiSelectDropdown
          title="Outerwear"
          selectedValue={outerwears}
          handleChange={handleOuterwearSizeChange}
          options={["S", "M", "L"]}
          isEdit={isEdit}
        />
        {!sidebar &&
          <SymMultiSelectDropdown
            title="Accessories"
            selectedValue={accessories}
            handleChange={handleAccessoriesChange}
            options={["S", "M", "L"]}
            isEdit={isEdit}
          />
        }
      </FlexBox>
    </Box>
  )
}

export default PreferenceForm

const style = {
  card: {
    mt: 2,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "16px", // Space between inputs
    flexDirection: {xs: "column", sm:'row'},
    alignItems: {xs: "stretch"},
  }
}

const brandOptions = [
  {
    id: 'eace7653-2576-4dba-9d3a-071dcc278a67',
    label:"Waveworld",
    value:'eace7653-2576-4dba-9d3a-071dcc278a67'
  },
  {
    id: '123456-asdcd-2',
    label:"Xandevera",
    value:'123456-asdcd-2'
  }
];

const colorOptions = [
    { id: 'sdsdssd', label: "Black", value: "#000" },
    { id: 'eoldjfh', label: "White", value: "#FFF" },
    { id: 'elsjjdh', label: "Red", value: "#F00" },
    { id: 'dkfdhla', label: "Blue", value: "#00F" },
];
    
const fitTypeOptions = [
  "True to Size",
  "Runs Small",
  "Runs Big"
];
  
  
const styleOptions = [
    "Adaptive Clothing",
    "All Leather",
    "Athleisure",
    "Basic Essentials",
    "Bohemian",
    "Business Casual",
    "Casual Chic",
    "Casual Date Night",
    "Eco-Friendly",
    "Edgy Style",
    "Formalwear",
    "Gothic",
    "High Fashion",
    "Intimates",
    "Loungewear",
    "Maternity",
    "Minimalist",
    "Monochrome",
    "Plus Size",
    "Preppy",
    "Prosthetic-Friendly Designs",
    "Spring Fits",
    "Streetwear",
    "Summer Fits",
    "Vacation Fits",
    "Vintage",
    "Wedding",
    "Wheelchair-Friendly Fashion",
    "Winter Fits",
    "Y2K",
];