import { Box, MenuItem, Select } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function SymRoundedDropdown({ value, onChange, options }) {
  const selected = options.find((opt) => opt.value === value);

  return (
    <Select
      value={value}
      onChange={onChange}
      IconComponent={ArrowDropDownIcon}
      displayEmpty
      MenuProps={{
        PaperProps: {
          sx: {
            p: 0,
            m: 0,
          },
        },
      }}
      sx={{
        borderRadius: '999px',
        backgroundColor: '#fff',
        pl: '10px',
        pr: '3px',
        py: 0.5,
        height: 40,
        width: '100%',
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          paddingRight: '24px !important',
          pl: 0.5, // optional: remove internal left padding
        },
        '& svg': {
          color: 'gray',
          right: 8,
        }
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value} sx={{ px: 1.5 }}>
          <Box display="flex" alignItems="center" gap={1}>
            {opt.label}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
