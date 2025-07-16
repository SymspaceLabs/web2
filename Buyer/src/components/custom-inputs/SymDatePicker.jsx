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
              "& .MuiFormHelperText-root": { color: "#ff0000" },
              "& .MuiSvgIcon-root": { color: "white" },
              "& .MuiPaper-root": { backgroundColor: "#000" }
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
