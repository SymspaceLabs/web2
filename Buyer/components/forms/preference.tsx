"use client";

// =================================================================================
// Preference Form Used in Profile
// =================================================================================

import { useState, useEffect } from "react";
// import { TitleCard } from "../custom-dialog/components";
import SymMultiSelectDropdown from "../inputs/sym-multi-select-dropdown";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// =================================================================================

interface ColorOption {
  id: string;
  label: string;
  value: string;
}

interface BrandOption {
  id: string;
  label: string;
  value: string;
}

interface PreferenceFormProps {
  gender?: string;
  setGender: (val: string) => void;
  styles: string[];
  setStyles: (val: string[]) => void;
  fits: string[];
  setFits: (val: string[]) => void;
  colors: string[];
  setColors: (val: string[]) => void;
  brands: string[];
  setBrands: (val: string[]) => void;
  tops: string[];
  setTops: (val: string[]) => void;
  bottoms: string[];
  setBottoms: (val: string[]) => void;
  outerwears: string[];
  setOuterwears: (val: string[]) => void;
  accessories: string[];
  setAccessories: (val: string[]) => void;
  isMobile?: boolean;
  isEdit?: boolean;
  sidebar?: boolean;
}

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
  isMobile = true,
  isEdit,
  sidebar = false,
}: PreferenceFormProps) => {
  const [genderData, setGenderData] = useState(gender || "male");

  useEffect(() => {
    setGenderData(gender ?? "male");
  }, [gender]);

  return (
    <div className="w-full">
      {/* <TitleCard
        title="Preferences"
        subTitle="Share your style and size preferences for tailored recommendations."
        isMobile={isMobile}
      /> */}

      {/* GENDER */}
      <RadioGroup
        value={genderData}
        onValueChange={(val) => {
          if (!isEdit) return;
          setGenderData(val);
          setGender(val);
        }}
        className="flex flex-row gap-6 mt-4"
      >
        {(["male", "female", "both"] as const).map((option) => (
          <div key={option} className="flex items-center gap-2">
            <RadioGroupItem
              value={option}
              id={`gender-${option}`}
              disabled={!isEdit}
              className={cn(
                "border-white text-white",
                "data-[state=checked]:border-[#3084FF] data-[state=checked]:text-[#3084FF]",
                !isEdit && "pointer-events-none opacity-60"
              )}
            />
            <Label
              htmlFor={`gender-${option}`}
              className={cn(
                "text-white capitalize cursor-pointer",
                !isEdit && "opacity-60 cursor-default"
              )}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* ROW 1 */}
      <div className={rowStyle}>
        <SymMultiSelectDropdown
          title="Style"
          selectedValue={styles}
          handleChange={(val: string[]) => setStyles(val)}
          options={styleOptions}
          isEdit={isEdit}
        />
        <SymMultiSelectDropdown
          title="Preferred Fit"
          selectedValue={fits}
          handleChange={(val: string[]) => setFits(val)}
          options={fitTypeOptions}
          isEdit={isEdit}
        />
        {!sidebar && (
          <SymMultiSelectDropdown
            title="Preferred Brands"
            selectedValue={brands}
            handleChange={(val: string[]) => setBrands(val)}
            options={brandOptions}
            isEdit={isEdit}
            isColor={true}
          />
        )}
        <SymMultiSelectDropdown
          title="Preferred Colors"
          selectedValue={colors}
          handleChange={(val: string[]) => setColors(val)}
          options={colorOptions}
          isEdit={isEdit}
          isColor={true}
        />
      </div>

      {/* ROW 2 */}
      <div className={rowStyle}>
        <SymMultiSelectDropdown
          title="Tops"
          selectedValue={tops}
          handleChange={(val: string[]) => setTops(val)}
          options={["S", "M", "L"]}
          isEdit={isEdit}
        />
        <SymMultiSelectDropdown
          title="Bottoms"
          selectedValue={bottoms}
          handleChange={(val: string[]) => setBottoms(val)}
          options={["S", "M", "L"]}
          isEdit={isEdit}
        />
        <SymMultiSelectDropdown
          title="Outerwear"
          selectedValue={outerwears}
          handleChange={(val: string[]) => setOuterwears(val)}
          options={["S", "M", "L"]}
          isEdit={isEdit}
        />
        {!sidebar && (
          <SymMultiSelectDropdown
            title="Accessories"
            selectedValue={accessories}
            handleChange={(val: string[]) => setAccessories(val)}
            options={["S", "M", "L"]}
            isEdit={isEdit}
          />
        )}
      </div>
    </div>
  );
};

export default PreferenceForm;

// =================================================================================
// Styles
// =================================================================================

const rowStyle =
  "mt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between w-full gap-4";

// =================================================================================
// Data
// =================================================================================

const brandOptions: BrandOption[] = [
  { id: "eace7653-2576-4dba-9d3a-071dcc278a67", label: "Waveworld", value: "eace7653-2576-4dba-9d3a-071dcc278a67" },
  { id: "123456-asdcd-2", label: "Xandevera", value: "123456-asdcd-2" },
];

const colorOptions: ColorOption[] = [
  { id: "sdsdssd", label: "Black", value: "#000" },
  { id: "eoldjfh", label: "White", value: "#FFF" },
  { id: "elsjjdh", label: "Red", value: "#F00" },
  { id: "dkfdhla", label: "Blue", value: "#00F" },
];

const fitTypeOptions: string[] = ["True to Size", "Runs Small", "Runs Big"];

const styleOptions: string[] = [
  "Adaptive Clothing", "All Leather", "Athleisure", "Basic Essentials",
  "Bohemian", "Business Casual", "Casual Chic", "Casual Date Night",
  "Eco-Friendly", "Edgy Style", "Formalwear", "Gothic", "High Fashion",
  "Intimates", "Loungewear", "Maternity", "Minimalist", "Monochrome",
  "Plus Size", "Preppy", "Prosthetic-Friendly Designs", "Spring Fits",
  "Streetwear", "Summer Fits", "Vacation Fits", "Vintage", "Wedding",
  "Wheelchair-Friendly Fashion", "Winter Fits", "Y2K",
];