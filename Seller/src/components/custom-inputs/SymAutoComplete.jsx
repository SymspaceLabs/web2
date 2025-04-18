// ===========================================================
// Custom Autocomplete Input
// ===========================================================

import { H1 } from "../Typography";
import { FlexBox } from "../flex-box";
import { Autocomplete, TextField } from "@mui/material";

const SymAutoComplete = ({
  title,
  value,
  onChange,
  isEdit = true,
  placeholder = "",
  options,
}) => {
  return (
    <FlexBox flexDirection="column" flex={1}>
      <H1 color="white" mb={0.5} textAlign="left">
        {title}
      </H1>

      <Autocomplete
        fullWidth
        options={options}
        value={value ?? null}
        onChange={(e, newValue) => onChange(newValue)}
        getOptionLabel={(option) => option?.label || ""} // safely get label
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        disabled={!isEdit}
        renderInput={(params) => (
            <TextField
            {...params}
            placeholder={placeholder}
            sx={{
                background: "#000",
                borderRadius: "5px",
                input: {
                color: "#fff",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#444",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
                },
                "& .MuiSvgIcon-root": {
                color: "#fff", // make dropdown arrow white
                },
            }}
            />
        )}
      />

    </FlexBox>
  );
};

export default SymAutoComplete;
