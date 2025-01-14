import React, { useState, useEffect } from 'react';
import { TitleCard } from '../dialog/components';
import SymMultiSelectDropdown from "@/components/custom-inputs/SymMultiSelectDropdown";
import cardStyle from "@/pages-sections/customer-dashboard/preferences/styles";
import { FormControl, RadioGroup, FormControlLabel, Radio, useMediaQuery, Box, Typography } from "@mui/material";

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
    isMobile,
    isEdit,
    sidebar=false,
}) => {

    const [genderData, setGenderData] = useState("");

    useEffect(() => {
      setGenderData(gender); // Populate gender on component mount
    }, [gender]);

    const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
    
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
              control={<Radio sx={{ color: "#fff" }} />}
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Female"
            />
            <FormControlLabel
              value="both"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Both"
            />
          </RadioGroup>
        </FormControl>
        
        {/* ROW 1 */}
        <Box sx={cardStyle(downMd)}>          
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
        </Box>

        {/* ROW 2 */}
        <Box sx={cardStyle(downMd)}>
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
        </Box>
    </Box>
  )
}

export default PreferenceForm

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