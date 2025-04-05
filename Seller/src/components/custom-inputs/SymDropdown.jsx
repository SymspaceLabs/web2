import React from 'react';
import { FlexBox } from '../flex-box';
import { Select, MenuItem, ListItemText, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { H1 } from '../Typography';

const SymDropdown = ({
    title,
    value,
    onChange,
    options,
    isEdit = true,
}) => {

    return (
        <FlexBox flexDirection="column" sx={{ flex:1, minWidth: "100px" }}>
            <H1 color="white" mb={0.5}>
                {title}  
            </H1>
            <Select
                value={value}
                onChange={onChange}
                displayEmpty
                sx={{
                    background: "#000",
                    borderRadius: "5px",
                    color: value=""? "rgba(255, 255, 255, 0.1)": "#fff",
                    width: "100%",
                    height:'37px',
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
                {/* Placeholder option */}
                <MenuItem value="" disabled >
                    <em>Select an option</em>
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
