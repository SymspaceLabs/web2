// ============================================================
// Custom Date Picker Input
// ============================================================

import { FlexBox } from "../flex-box";
import { TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { H1 } from "../Typography";

// ============================================================

const SymDatePicker = ({
    title,
    value,
    onChange,
    isEdit=true
}) => {
  return (
    <FlexBox flexDirection="column" flex={1}>
        <H1 color="white" mb={0.5} >
           {title}   
        </H1>
        <DatePicker
            value={value}
            onChange={onChange}
            disabled={!isEdit}
            slots={{ textField: TextField }}
            slotProps={{
                textField: {
                sx: {
                    backgroundColor: "#000", // Input background
                    color: "#fff", // Input text color
                    borderRadius: "5px", // Rounded corners
                    "& .MuiInputBase-input": { color: "#fff" }, // Input text
                    "& .MuiInputLabel-root": { color: "rgba(200, 200, 200, 0.8)" }, // Label
                    "& .MuiFormHelperText-root": { color: "#ff0000" },
                    "& .MuiSvgIcon-root": { color: "white" },
                    "& .MuiPaper-root": { backgroundColor: "#000" }, 
                },
                size: "small",
                fullWidth: true,
                },
            }}
        />
    </FlexBox>
  )
}

export default SymDatePicker