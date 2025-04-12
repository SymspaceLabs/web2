import { FlexBox } from "../flex-box";
import { Autocomplete, TextField, Typography } from "@mui/material";

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
      <Typography color="white" mb={0.5} textAlign="left">
        {title}
      </Typography>

        <Autocomplete
            fullWidth
            options={options}
            value={value ?? null} // make sure value is an object like { label: "Albania", value: "AL" }
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
