import { useState, useCallback } from "react";

/**
 * Custom hook to manage the state and logic for the Color and Size Add Dialogs.
 * It manages the dialog visibility, the temporary inputs (new color/size name),
 * and the handlers for adding custom items to the main product lists.
 * * @param {Function} setSelectedColors The setter for the main selectedColors state array (from parent)
 * @param {Function} setSelectedSizes The setter for the main selectedSizes state array (from parent)
 * @param {Array} selectedColors The current array of selected colors (for potential duplicate check)
 * @returns {Object} State variables and handler functions
 */
export const useSizeColorDialogs = (setSelectedColors, setSelectedSizes, selectedColors) => {
    // --- DIALOG VISIBILITY STATE ---
    const [openColorDialog, setOpenColorDialog] = useState(false);
    const [openSizeDialog, setOpenSizeDialog] = useState(false);

    // --- INPUT STATE ---
    const [newColor, setNewColor] = useState('');
    const [color, setColor] = useState('#ffffff'); // Hex value for color picker
    const [newSize, setNewSize] = useState('');
    const [sizeChartUrl, setSizeChartUrl] = useState(''); // Temporary URL for the size chart image

    // --- COLOR HANDLERS ---
    const handleOpenColorDialog = useCallback(() => setOpenColorDialog(true), []);

    const handleCloseColorDialog = useCallback(() => {
        setOpenColorDialog(false);
        setNewColor('');
        setColor('#ffffff');
    }, []);
    
    const handleColorChange = useCallback((newHex) => setColor(newHex), []);

    const handleAddCustomColor = useCallback(() => {
        if (!newColor || !color) return;

        // Simple check to avoid duplicates based on name
        const isDuplicate = selectedColors.some(c => c.name.toLowerCase() === newColor.trim().toLowerCase());
        
        if (isDuplicate) {
            alert(`Color "${newColor}" already exists.`);
            return;
        }

        const customColor = { 
            name: newColor.trim(), 
            hex: color 
        };

        // Update the main selected list in the parent component
        setSelectedColors((prevSelected) => [
            ...prevSelected,
            customColor
        ]);

        handleCloseColorDialog();

    }, [newColor, color, selectedColors, setSelectedColors, handleCloseColorDialog]);


    // --- SIZE HANDLERS ---
    const handleOpenSizeDialog = useCallback(() => setOpenSizeDialog(true), []);

    const handleCloseSizeDialog = useCallback(() => {
        setOpenSizeDialog(false);
        setNewSize('');
        setSizeChartUrl(''); // Reset the URL when closing
    }, []);

    const handleAddCustomSize = useCallback((finalUrl) => {
        if (!newSize) return;

        // NOTE: Duplicate check for size based on name can be added here if needed

        const customSize = { 
            name: newSize.trim(), 
            sizeChartUrl: finalUrl || null,
        };
        
        // Update the main selected list in the parent component
        setSelectedSizes((prevSelected) => [...prevSelected, customSize]);
        
        handleCloseSizeDialog(); // Calls the clean-up logic inside handleCloseSizeDialog

    }, [newSize, setSelectedSizes, handleCloseSizeDialog]);

    // --- EXPOSED VALUES ---
    return {
        openColorDialog,
        openSizeDialog,
        handleOpenColorDialog,
        handleCloseColorDialog,
        handleAddCustomColor,
        handleColorChange,
        handleOpenSizeDialog,
        handleCloseSizeDialog,
        handleAddCustomSize,
        
        // State needed for dialog inputs
        newColor,
        setNewColor,
        color,
        setColor,
        newSize,
        setNewSize,
        sizeChartUrl,
        setSizeChartUrl,
    };
};