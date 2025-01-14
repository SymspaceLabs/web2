import React from 'react';
import { FlexBox } from '../flex-box';
import { Small } from '../Typography';
import { Box, Select, MenuItem, Checkbox, ListItemText, useMediaQuery } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SymMultiSelectDropdown = ({
    title,
    selectedValue,
    handleChange,
    options,
    isBrand = false,
    isColor = false,
    isEdit,
}) => {
    const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));

    return (
        <FlexBox
            flexDirection="column"
            sx={{
                flex: "1 1 calc(25% - 16px)",
                maxWidth: "calc(25% - 16px)",
                minWidth: "100px",
                padding: 0,
                margin: 0,
                ...(downMd && {
                    flex: "1 1 100%",
                    maxWidth: "100%",
                }),
            }}
        >
            <Small color="white" mb={0.5}>
                {title}
            </Small>
            <Select
                multiple
                value={Array.isArray(selectedValue) ? selectedValue : []} // Ensure value is an array
                onChange={handleChange}
                displayEmpty
                sx={{
                    background: "#000",
                    border: "1px solid #fff",
                    borderRadius: "5px",
                    color: "#fff",
                    width: "100%",
                    ".MuiSelect-select": {
                        paddingTop: '8px',
                        paddingRight: '32px', // Add space for the dropdown icon
                        paddingBottom: '8px',
                        paddingLeft: '10px',
                    },
                    "& .MuiPopover-root": {
                        zIndex: 1400, // Higher than the Drawer
                    },
                    "& .MuiPaper-root": {
                        zIndex: 1400, // Higher than the Drawer
                    },
                }}
                MenuProps={{
                    container: document.getElementById('root'), // Adjust this to your app's root container ID
                    disablePortal: false, // Ensures the dropdown is not restricted by parent stacking context
                    PaperProps: {
                        sx: {
                            zIndex: 1300, // Ensure it's above the Drawer
                        },
                    },
                }}
                IconComponent={ArrowDropDownIcon} // Add the dropdown icon
                disabled={!isEdit} // Disable the Select if isEdit is false
                renderValue={(selected) => {
                    if (!selected || selected.length === 0) {
                        return "Select options";
                    }
                    return selected
                        .map((id) => {
                            const item = options.find((option) => option.id === id);
                            return item ? item.label : id;
                        })
                        .join(", ");
                }}
            >
                {options.map((item) => {
                    const valueKey = isBrand || isColor ? item.id : item;
                    return (
                        <MenuItem key={valueKey} value={valueKey}>
                            <Checkbox checked={(selectedValue ?? []).includes(valueKey)} />
                            {isColor ? (
                                <Box display="flex" alignItems="center">
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 8,
                                            borderRadius: "50%",
                                            backgroundColor: item.value,
                                            marginRight: "8px",
                                        }}
                                    />
                                    <ListItemText primary={item.label} />
                                </Box>
                            ) : (
                                <ListItemText primary={isBrand ? item.label : item} />
                            )}
                        </MenuItem>
                    );
                })}
            </Select>
        </FlexBox>
    );
};

export default SymMultiSelectDropdown;
