// =================================================================
// Custom Dropdown
// =================================================================

import { H1 } from '../Typography';
import { FlexBox } from '../flex-box';
import { Select, MenuItem, ListItemText, TextField } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// =================================================================

const SymDropdown = ({
  title,
  value,
  onChange,
  options,
  isEdit = true,
  hasOthersOption = false, // default to false
}) => {
  const isOtherSelected = value?.startsWith('Other:');

  return (
    <FlexBox flexDirection="column" sx={{ flex: 1, minWidth: '100px' }}>
      <H1 color="white" mb={0.5}>
        {title}
      </H1>

      <Select
        value={isOtherSelected ? 'Other (please specify)' : value}
        onChange={(e) => {
          const selected = e.target.value;
          if (selected === 'Other (please specify)') {
            onChange({ target: { value: 'Other:' } });
          } else {
            onChange({ target: { value: selected } });
          }
        }}
        displayEmpty
        renderValue={(selected) => {
          if (selected === '') {
            return <em style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Select an option</em>;
          }
          if (isOtherSelected) {
            return value.replace('Other:', '') || 'Other (please specify)';
          }
          return selected;
        }}
        sx={{
          background: '#000',
          borderRadius: '5px',
          color: value === '' ? 'rgba(255, 255, 255, 0.5)' : '#fff',
          width: '100%',
          height: '37px',
          paddingTop: '0px',
          '& .MuiSvgIcon-root': {
            color: '#fff',
          },
        }}
        IconComponent={ArrowDropDownIcon}
        disabled={!isEdit}
      >
        <MenuItem value="" disabled>
          <em>Select an option</em>
        </MenuItem>

        {options.map((item) => (
          <MenuItem key={item} value={item}>
            <ListItemText primary={item} />
          </MenuItem>
        ))}

        {hasOthersOption && (
          <MenuItem value="Other (please specify)">
            <ListItemText primary="Other (please specify)" />
          </MenuItem>
        )}
      </Select>

      {hasOthersOption && isOtherSelected && (
        <TextField
          placeholder="Please specify..."
          value={value.replace('Other:', '')}
          onChange={(e) =>
            onChange({ target: { value: `Other:${e.target.value}` } })
          }
          sx={{
            mt: 1,
            background: '#000',
            borderRadius: '5px',
            input: {
              color: '#fff',
            },
          }}
          fullWidth
        />
      )}
    </FlexBox>
  );
};

export default SymDropdown;
