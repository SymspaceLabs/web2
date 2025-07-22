import { useState } from "react";
import { H1 } from "../Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

const SymDatePicker = ({
  title,
  value,
  onChange,
  isEdit = true
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <H1 color="white" textAlign="left">
        {title}
      </H1>
      <DatePicker
        open={open}
        onOpen={() => isEdit && setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        onChange={onChange}
        disabled={!isEdit}
        slots={{ textField: TextField }}
        slotProps={{
          textField: {
            onClick: () => isEdit && setOpen(true), // 👈 Open calendar on full input click
            sx: {
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "5px",
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiInputLabel-root": { color: "rgba(200, 200, 200, 0.8)" },
              "& .MuiFormHelperText-root": { color: "#ff0000" }, // Keep helper text red if desired
              "& .MuiSvgIcon-root": { color: "white" },
              "& .MuiPaper-root": { backgroundColor: "#000" },

              // FIX: Override the red outline when in error state
              "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: "white !important", // Set to white or transparent to hide red
              },
              "& .MuiInputBase-root.Mui-error": {
                color: "#fff", // Keep input text white even on error
              },
              "& .MuiInputLabel-root.Mui-error": {
                color: "rgba(200, 200, 200, 0.8) !important", // Keep label color consistent
              },
            },
            size: "small",
            fullWidth: true
          }
        }}
      />
    </>
  );
};

export default SymDatePicker;
