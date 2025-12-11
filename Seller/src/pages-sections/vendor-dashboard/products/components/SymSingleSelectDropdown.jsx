import React from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import { H1 } from '@/components/Typography';

/**
 * SymSingleSelectDropdown component
 * A standard, single-selection dropdown that shows the selected value as plain text in the input field.
 *
 * It expects and returns a single object { label: string, value: any } or null.
 *
 * @param {object[]} options - Array of available options, e.g., [{ label: 'Male', value: 'M' }, ...]
 * @param {object | null} selectedItem - The currently selected option object, or null.
 * @param {(item: object | null) => void} setSelectedItem - Callback function to update the selected item.
 * @param {string} [label="Select"] - The label text displayed next to the input field.
 * @param {string} [placeholder] - Placeholder text for the input field.
 */
const SymSingleSelectDropdown = ({ 
    options, 
    selectedItem, 
    setSelectedItem, 
    label = "Select", 
    placeholder,
    ...rest
}) => {

    // Helper function to find the full object from options based on the label/string input
    const getSelectedItemObject = (label) => {
        return options.find(option => option.label === label);
    };

    const handleSelectionChange = (event, newValue) => {
        // newValue is either a string (the label of the selected option) or null (if cleared)

        if (newValue === null) {
            // Case 1: Cleared selection
            setSelectedItem(null);
        } else {
            // Case 2: New item selected (newValue is the label string)
            const newObject = getSelectedItemObject(newValue);
            
            if (newObject) {
                setSelectedItem(newObject);
            }
        }
    };

    // The current value for the Autocomplete component is the label string, 
    // or null if no item is selected.
    const currentValue = selectedItem ? selectedItem.label : null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <H1 sx={{ color: '#FFF', mr: 0.5, minWidth: '100px', textAlign: 'right' }}>
                {label}
            </H1>
            <Autocomplete
                // Configuration for standard single selection:
                // - multiple: false (default)
                // - freeSolo: false (default)
                
                options={options.map((option) => option.label)}
                value={currentValue} // Value is a single string (the label) or null
                onChange={handleSelectionChange}
                
                // We use getOptionLabel to ensure the selected item displays correctly as text
                getOptionLabel={(option) => option}

                // Removed renderTags and custom renderOption (no checkboxes/chips)

                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder={placeholder || `Select ${label}`}
                        sx={{ width: '500px' }}
                        InputProps={{
                            ...params.InputProps,
                            // *** CRITICAL CHANGE: Removing the startAdornment Chip logic ***
                            style: {
                                backgroundColor: 'white',
                            },
                        }}
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                    />
                )}
                {...rest}
            />
        </Box>
    );
};

export default SymSingleSelectDropdown;