// src/utils/conversions.js

/**
 * Converts centimeters to feet and inches.
 * @param {number} cm - Height in centimeters.
 * @returns {{feet: number, inches: number}} - Object with feet and inches.
 */
export const cmToFeetInches = (cm) => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
};

/**
 * Converts feet and inches to centimeters.
 * @param {number} feet - Height in feet.
 * @param {number} inches - Height in inches.
 * @returns {number} - Height in centimeters.
 */
export const feetInchesToCm = (feet, inches) => {
  const totalInches = (feet * 12) + inches;
  return Math.round(totalInches * 2.54);
};

/**
 * Converts kilograms to pounds.
 * @param {number} kg - Weight in kilograms.
 * @returns {number} - Weight in pounds.
 */
export const kgToLbs = (kg) => {
  return Math.round(kg * 2.20462);
};

/**
 * Converts pounds to kilograms.
 * @param {number} lbs - Weight in pounds.
 * @returns {number} - Weight in kilograms.
 */
export const lbsToKg = (lbs) => {
  return Math.round(lbs / 2.20462);
};
