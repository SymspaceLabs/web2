// =================================================================
// Custom Dropdown
// =================================================================

import { H1 } from '../Typography';
import { FlexBox } from '../flex-box';
import { Select, MenuItem, ListItemText, TextField, FormHelperText } from '@mui/material'; // Import FormHelperText

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// =================================================================

const SymDropdown = ({
    title,
    value,
    onChange,
    options,
    isEdit = true,
    hasOthersOption = false, // default to false
    placeholder = "Select an option", // Default fallback
    error = false, // NEW: optional error prop (boolean)
    helperText = "", // NEW: optional helperText prop (string for error message)
}) => {
    const isOtherSelected = value?.startsWith('Other:');

    return (
        <FlexBox flexDirection="column" sx={{ flex: 1, minWidth: '100px' }}>
            <H1 color="white" mb={0.5}>
                {title}
            </H1>

            <Select
                value={isOtherSelected ? 'Other (please specify)' : value}
                onChange={(e) => {
                    const selected = e.target.value;
                    if (selected === 'Other (please specify)') {
                        onChange({ target: { value: 'Other:' } });
                    } else {
                        onChange({ target: { value: selected } });
                    }
                }}
                displayEmpty
                renderValue={(selected) => {
                    if (selected === '' ) {
                        return <em style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{placeholder}</em>;
                    }
                    if (isOtherSelected) {
                        // If "Other" is selected, display the specified text or a fallback
                        return value.replace('Other:', '') || 'Other (please specify)';
                    }
                    return selected;
                }}
                sx={{
                    background: '#000',
                    borderRadius: '5px',
                    color: value === '' ? 'rgba(255, 255, 255, 0.5)' : '#fff',
                    width: '100%',
                    height: '37px',
                    paddingTop: '0px',
                    '& .MuiSvgIcon-root': {
                        color: '#fff',
                    },
                    // NEW: Apply error styles from MUI's Select component
                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'error.main', // or a specific red color like '#FF0000'
                    },
                }}
                IconComponent={ArrowDropDownIcon}
                disabled={!isEdit}
                error={error} // NEW: Pass the error prop to MUI's Select
            >
                <MenuItem value="" disabled>
                    <em>Select an option</em>
                </MenuItem>

                {options.map((item) => (
                    <MenuItem key={item} value={item}>
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}

                {hasOthersOption && (
                    <MenuItem value="Other (please specify)">
                        <ListItemText primary="Other (please specify)" />
                    </MenuItem>
                )}
            </Select>

            {/* NEW: Display helper text (error message) below the dropdown */}
            {error && helperText && (
                <FormHelperText error sx={{ mt: 0.5, ml: 1 }}> {/* Added margin for spacing */}
                    {helperText}
                </FormHelperText>
            )}

            {hasOthersOption && isOtherSelected && (
                <TextField
                    placeholder="Please specify..."
                    value={value.replace('Other:', '')}
                    onChange={(e) =>
                        onChange({ target: { value: `Other:${e.target.value}` } })
                    }
                    sx={{
                        mt: 1,
                        background: '#000',
                        borderRadius: '5px',
                        input: {
                            color: '#fff',
                        },
                    }}
                    fullWidth
                    // You might also want to pass error/helperText to this TextField
                    // if its specific content needs validation when "Other" is selected.
                    // Example: error={isOtherSelected && value === 'Other:' && formSubmitted}
                    // helperText={isOtherSelected && value === 'Other:' && formSubmitted ? "Please specify 'Other' details." : ""}
                />
            )}
        </FlexBox>
    );
};

export default SymDropdown;