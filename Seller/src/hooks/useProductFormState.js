// src/hooks/useProductFormState.js (Example location)

import { useState, useMemo } from 'react';

// Define base data outside the component/hook to prevent re-creation on every render
const BASE_COLORS = [
  { name: 'Red', hex: '#f44336' },
  { name: 'Blue', hex: '#2196f3' },
  { name: 'Green', hex: '#4caf50' },
];

const BASE_SIZES = [
  { name: 'S' },
  { name: 'M' },
  { name: 'L' },
  { name: 'XL' },
  { name: 'XXL' },
];

export const useProductFormState = (initialValuesProp) => {
  // --- Local State for UI/Variants ---
  const [chipData2, setChipData2] = useState([]); // Custom color data
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [openSizeDialog, setOpenSizeDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Full category path string
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [color, setColor] = useState('#fff');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  // --- Memos for Combined Data ---
  const allColors = useMemo(() => [...BASE_COLORS, ...chipData2], [chipData2]);
  const allSizes = BASE_SIZES; // Assuming baseSizes is constant

  // --- Handlers: Color ---
  const handleOpenColorDialog = () => setOpenColorDialog(true);
  const handleCloseColorDialog = () => {
    setOpenColorDialog(false);
    setNewColor('');
    setColor('#ffffff');
  };
  
  const handleAddCustomColor = () => {
    if (newColor && color) {
      const customColor = { name: newColor, hex: color };
      setChipData2((prev) => [...prev, customColor]);
      setSelectedColors((prev) => [...prev, customColor]);
      handleCloseColorDialog();
    }
  };

  const handleColorChange = (newColor) => setColor(newColor);
  
  const handleColorSelect = (newValue) => {
    const updatedColors = newValue.map((name) => {
      const colorObj = allColors.find((c) => c.name === name);
      return colorObj || { name, hex: '' }; // Handle freeSolo entry if no hex found
    });
    setSelectedColors(updatedColors);
  };

  // --- Handlers: Size ---
  const handleOpenSizeDialog = () => setOpenSizeDialog(true);
  const handleCloseSizeDialog = () => {
    setOpenSizeDialog(false);
    setNewSize('');
  };

  const handleAddCustomSize = () => {
    if (newSize) {
      const customSize = { name: newSize };
      setSelectedSizes((prevSelected) => [...prevSelected, customSize]);
      handleCloseSizeDialog();
    }
  };
  
  const handleSizeSelect = (newValue) => {
    const updatedSizes = newValue.map((name) => {
      const sizeObj = allSizes.find((s) => s.name === name);
      return sizeObj || { name };
    });
    setSelectedSizes(updatedSizes);
  };
  
  // --- Formik initial values (can be part of the hook or defined outside) ---
  const initialValues = useMemo(() => ({
    name: initialValuesProp.name || "",
    category: initialValuesProp.category || [],
    description: initialValuesProp.description || "",
    status: initialValuesProp.status || "draft",
    productType: initialValuesProp.productType || "static",
    dimensions: initialValuesProp.dimensions || "",
    productSizechart: initialValuesProp.productSizechart || "",
  }), [initialValuesProp]);

  // --- Consolidated Return Object ---
  return {
    initialValues,
    selectedCategory, setSelectedCategory,
    selectedAgeGroup, setSelectedAgeGroup,
    selectedGender, setSelectedGender,
    
    // Color State/Handlers
    colorState: {
      openDialog: openColorDialog,
      newColor, setNewColor, color, 
      allColors, selectedColors,
    },
    colorHandlers: {
      handleOpenDialog: handleOpenColorDialog,
      handleCloseDialog: handleCloseColorDialog,
      handleAddCustom: handleAddCustomColor,
      handleColorChange,
      handleColorSelect,
    },
    
    // Size State/Handlers
    sizeState: {
      openDialog: openSizeDialog,
      newSize, setNewSize,
      allSizes, selectedSizes,
    },
    sizeHandlers: {
      handleOpenDialog: handleOpenSizeDialog,
      handleCloseDialog: handleCloseSizeDialog,
      handleAddCustom: handleAddCustomSize,
      handleSizeSelect,
    },
    
    // Constants
    BASE_COLORS, BASE_SIZES
  };
};