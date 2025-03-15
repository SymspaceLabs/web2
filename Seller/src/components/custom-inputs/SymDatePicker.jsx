import { Small } from "../Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

const SymDatePicker = ({
    title,
    value,
    onChange,
    isEdit=true
}) => {
  return (
    <>
        <Small color="white" textAlign="left">
            {title}
        </Small>
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
    </>
  )
}

export default SymDatePicker