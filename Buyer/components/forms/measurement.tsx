"use client";

// import { TitleCard } from '../custom-dialog/components';
import {
  cmToFeetInches,
  feetInchesToCm,
  kgToLbs,
  lbsToKg
} from '@/utils/conversions';



// ==============================================================
// Type Definitions
// ==============================================================
interface Height {
  feet: number;
  inches: number;
  cm: number;
}

interface Weight {
  lbs: number;
  kg: number;
}

interface MeasurementFormProps {
  setIsMetric: (value: boolean) => void;
  isMetric: boolean;
  height: Height;
  setHeight: React.Dispatch<React.SetStateAction<Height>>;
  weight: Weight;
  setWeight: React.Dispatch<React.SetStateAction<Weight>>;
  chest: number | undefined; 
  setChest: (value: number) => void;
  waist: number | undefined;  // was: number
  setWaist: (value: number) => void;
  isMobile: boolean;
  sidebar?: boolean;
  isEdit?: boolean;
}

// ==============================================================
// MeasurementForm Component
// ==============================================================
function MeasurementForm({
  setIsMetric,
  isMetric,
  height,
  setHeight,
  weight,
  setWeight,
  chest,
  setChest,
  waist,
  setWaist,
  isMobile,
  sidebar = false,
  isEdit = true
}: MeasurementFormProps) {
  const toggleUnit = (unit: "metric" | "imperial") => {
    setIsMetric(unit === "metric");
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const value = parseInt(e.target.value || "0", 10);
    setHeight((prev) => {
      let newCm = prev.cm;
      let newFeet = prev.feet;
      let newInches = prev.inches;

      if (isMetric) {
        newCm = value;
        const { feet, inches } = cmToFeetInches(newCm);
        newFeet = feet;
        newInches = inches;
      } else {
        if (type === "feet") {
          newFeet = value;
        } else if (type === "inches") {
          newInches = value;
        }
        newCm = feetInchesToCm(newFeet, newInches);
      }

      return {
        feet: newFeet,
        inches: newInches,
        cm: newCm,
      };
    });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value || "0");
    setWeight({
      kg: isMetric ? value : lbsToKg(value),
      lbs: isMetric ? kgToLbs(value) : value,
    });
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <div className="w-full">
      <div className={`flex justify-between ${isMobile || sidebar ? 'flex-col' : 'flex-row'}`}>
        {/* <TitleCard
          title="Measurements"
          subTitle="Add your measurements to get a perfect fit with recommended sizes."
          isMobile={isMobile}
        /> */}

        {/* TOGGLE */}
        <div className={`flex ${isMobile || sidebar ? 'justify-start' : 'justify-end'} items-center mt-2`}>
          <div
            className="flex justify-center items-center rounded-[25px] overflow-hidden w-[125px] h-[35px] border border-[#E4E4E7] relative"
            style={{ opacity: isEdit ? 1 : 0.5 }}
          >
            <div
              className="absolute top-0 w-1/2 h-full bg-[#1A1A1A] border border-white rounded-[50px] transition-all duration-300 ease-in-out z-10"
              style={{ left: isMetric ? 0 : "50%" }}
            />
            <div
              className={`text-xs z-20 w-1/2 h-full text-center ${isEdit ? 'cursor-pointer' : 'cursor-not-allowed'} flex justify-center items-center text-white py-2.5`}
              onClick={isEdit ? () => toggleUnit("metric") : undefined}
            >
              cm/kg
            </div>
            <div
              className={`text-xs z-20 w-1/2 h-full text-center ${isEdit ? 'cursor-pointer' : 'cursor-not-allowed'} flex justify-center items-center text-white py-2.5`}
              onClick={isEdit ? () => toggleUnit("imperial") : undefined}
            >
              inch/lbs
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className={`flex ${isMobile ? 'justify-center flex-col gap-2' : 'justify-between flex-row gap-3'} mt-3`}>
        {/* Height Section */}
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-white text-left text-sm">Height</p>
          {isMetric ? (
            <div className="relative">
              <input
                type="number"
                value={height.cm}
                onChange={(e) => handleHeightChange(e, 'cm')}
                disabled={!isEdit}
                onFocus={handleFocus}
                className="w-full bg-black rounded-[5px] text-white px-3 py-2 pr-12 disabled:opacity-50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,200,200,0.8)] font-bold">
                cm
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={height.feet}
                  onChange={(e) => handleHeightChange(e, 'feet')}
                  disabled={!isEdit}
                  onFocus={handleFocus}
                  className="w-full bg-black rounded-[5px] text-white px-3 py-2 pr-10 disabled:opacity-50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,200,200,0.8)] font-bold">
                  ft
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  value={height.inches}
                  onChange={(e) => handleHeightChange(e, 'inches')}
                  disabled={!isEdit}
                  onFocus={handleFocus}
                  className="w-full bg-black rounded-[5px] text-white px-3 py-2 pr-10 disabled:opacity-50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,200,200,0.8)] font-bold">
                  in
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Weight Section */}
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-white text-left text-sm">Weight</p>
          <div className="relative">
            <input
              type="number"
              value={isMetric ? weight.kg : weight.lbs}
              onChange={handleWeightChange}
              disabled={!isEdit}
              onFocus={handleFocus}
              className="w-full bg-black rounded-[5px] text-white px-3 py-2 pr-16 disabled:opacity-50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,200,200,0.8)] font-bold">
              {isMetric ? 'kg' : 'lbs'}
            </span>
          </div>
        </div>

        {/* Chest Section */}
        {!sidebar && (
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-white text-left text-sm">Chest</p>
            <div className="relative">
              <input
                type="number"
                value={isMetric ? Math.round(chest ?? 0) : Math.round((chest ?? 0) / 2.54)}
                onChange={(e) => {
                  const val = parseInt(e.target.value || "0", 10);
                  setChest(isMetric ? val : Math.round(val * 2.54));
                }}
                disabled={!isEdit}
                onFocus={handleFocus}
                inputMode="numeric"
                className="w-full bg-black rounded-[5px] text-white px-3 py-2 pr-12 disabled:opacity-50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,200,200,0.8)] font-bold">
                {isMetric ? "cm" : "in"}
              </span>
            </div>
          </div>
        )}

        {/* Waist Section */}
        {!sidebar && (
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-white text-left text-sm">Waist</p>
            <div className="relative">
              <input
                type="number"
                value={isMetric ? Math.round(waist ?? 0) : Math.round((waist ?? 0) / 2.54)}
                onChange={(e) => {
                  const val = parseInt(e.target.value || "0", 10);
                  setWaist(isMetric ? val : Math.round(val * 2.54));
                }}
                disabled={!isEdit}
                onFocus={handleFocus}
                inputMode="numeric"
                className="w-full bg-black rounded-[5px] text-white px-3 py-2 pr-12 disabled:opacity-50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,200,200,0.8)] font-bold">
                {isMetric ? "cm" : "in"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeasurementForm;