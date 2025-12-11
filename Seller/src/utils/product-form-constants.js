// src/constants/product-form-constants.js

// --- Base Constants ---

export const baseColors = [
  { name: 'Red', hex: '#f44336' },
  { name: 'Blue', hex: '#2196f3' },
  { name: 'Green', hex: '#4caf50' },
];

export const baseSizes = [
  { name: 'S' },
  { name: 'M' },
  { name: 'L' },
  { name: 'XL' },
  { name: 'XXL' },
];

export const ageGroups = [
  { label: "Baby", value:"baby" },
  { label: "Toddler", value: "toddler" },
  { label: "Kids", value: "kids" },
  { label: "Teen", value: "teen" },
  { label: 'Adults', value:'adults' },
  { label: 'Senior', value:'senior' },
];

// "men", "women", "unisex"
export const genders = [
  { label: 'Male', value: 'male'   },
  { label: 'Female', value: 'women' }, // Assuming you applied the fix here
  { label: 'Unisex', value: 'unisex' },
];

// --- Tag Configuration (for dynamic rendering) ---

export const TAG_CONFIG = {
  age_group: { options: ageGroups, label: "Age group", allLabel: "All ages" },
  gender: { options: genders, label: "Gender", allLabel: "Unisex" },
  // Add other tags here as needed (e.g., season, occasion, material)
  // season: { options: seasons, label: "Season", allLabel: "All seasons" },
  // occasion: { options: occasions, label: "Occasion", allLabel: "All occasions" },
  // material: { options: materials, label: "Material", allLabel: "All materials" },
};

// Export a list of all multi-select tag keys for convenience in the component
export const MULTI_SELECT_TAG_KEYS = Object.keys(TAG_CONFIG);
