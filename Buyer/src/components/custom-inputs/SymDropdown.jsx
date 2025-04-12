import React from 'react';
import { FlexBox } from '../flex-box';
import { Small, H2 } from '../Typography';
import { Select, MenuItem, ListItemText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SymDropdown = ({
    title,
    value,
    onChange,
    options,
    isEdit = true,
    light = false,
    placeholder = "",
}) => {
    return (
        <FlexBox flexDirection="column" sx={{ flex: 1, minWidth: "100px" }}>
            <H2 color="white" mb={0.5}>
                {title}
            </H2>
            <Select
                value={value}
                onChange={onChange}
                displayEmpty
                renderValue={
                    value !== "" ? undefined : () => <em style={{ color: 'rgba(255,255,255,0.4)' }}>{placeholder}</em>
                }
                sx={{
                    background: light ? 'transparent' : '#000',
                    borderRadius: '5px',
                    color: value === "" ? 'rgba(255,255,255,0.4)' : '#fff',
                    width: '100%',
                    height: '37px',
                    paddingTop: '0px',
                    "& .MuiPopover-root": {
                        zIndex: 1400,
                    },
                    "& .MuiPaper-root": {
                        zIndex: 1400,
                    },
                    "& .MuiSvgIcon-root": {
                        color: "#fff",
                    }
                }}
                IconComponent={ArrowDropDownIcon}
                disabled={!isEdit}
            >
                <MenuItem value="" disabled>
                    <em>{placeholder}</em>
                </MenuItem>

                {options.map((item) => (
                    <MenuItem key={item} value={item}>
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}
            </Select>
        </FlexBox>
    );
};

export default SymDropdown;
