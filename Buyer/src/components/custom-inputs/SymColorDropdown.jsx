import { Box, MenuItem, Select } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function ColorDropdown({ value, onChange, options }) {
  const selected = options.find((opt) => opt.value === value);

  return (
    <Select
      value={value}
      onChange={onChange}
      IconComponent={ArrowDropDownIcon}
      displayEmpty
      renderValue={() => (
        <Box display="flex" alignItems="center" gap={3}>
          <ColorPreview color={selected?.value || '#ccc'} />
        </Box>
      )}
      MenuProps={{
        disablePortal: false, // ✅ this forces the dropdown list to render outside the DOM hierarchy
        PaperProps: {
          sx: {
            p: 0,
            m: 0,
            zIndex: 2000, // ✅ ensures it appears above the drawer
          },
        },
      }}

      sx={{
        borderRadius: '999px',
        backgroundColor: '#fff',
        pl: '3px',
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
            <ColorPreview color={opt.value} />
            {opt.label}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}

function ColorPreview({ color }) {
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: color,
        border:'0.5px solid #000'
      }}
    />
  );
}
