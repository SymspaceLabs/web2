import React from 'react';
import { Box, Typography, Autocomplete, Checkbox, Chip, TextField } from '@mui/material';

const SymMultiSelectChip = ({ options, selectedItems, setSelectedItems, label = "Select", allLabel }) => {

  const handleSelectionChange = (event, newValue) => {
    const isAllSelected = newValue.includes(allLabel);
    const lastSelected = newValue[newValue.length - 1]; // The last selected item
    const otherSelections = newValue.filter((name) => name !== allLabel);

    if (lastSelected === allLabel) {
      // Case: "all" was selected last, deselect everything else
      setSelectedItems([{ label: allLabel, value: allLabel }]);
    } else if (isAllSelected) {
      // Case: "all" was selected earlier, deselect "all" and keep other selections
      const updatedSelections = otherSelections.map((label) => {
        const selectedItemObj =
          options.find((item) => item.label === label) ||
          selectedItems.find((item) => item.label === label);
        return selectedItemObj || { label, value: label.toLowerCase() };
      });
      setSelectedItems(updatedSelections);
    } else {
      // Case: no "all", keep current selections
      const updatedSelections = newValue.map((label) => {
        const selectedItemObj =
          options.find((item) => item.label === label) ||
          selectedItems.find((item) => item.label === label);
        return selectedItemObj || { label, value: label.toLowerCase() };
      });
      setSelectedItems(updatedSelections);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography
        sx={{
          fontFamily: 'Elemental End',
          textTransform: 'lowercase',
          color: '#fff',
          mr: 0.5,
          minWidth: '100px',
          textAlign: 'right',
        }}
      >
        {label}
      </Typography>
      <Autocomplete
        disableCloseOnSelect
        multiple
        freeSolo
        options={options.map((option) => option.label)}
        value={selectedItems.map((item) => item.label)}
        onChange={handleSelectionChange}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox checked={selected} style={{ marginRight: 8 }} />
            {option}
          </li>
        )}
        renderTags={(value, getTagProps) =>
          selectedItems.map((option, index) => (
            <Chip
              label={option.label}
              {...getTagProps({ index })}
              onDelete={getTagProps({ index }).onDelete}
              color="info"
              variant="outlined"
              sx={{ color: 'grey' }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={`Select ${label}`}
            sx={{ width: '500px' }}
            InputProps={{
              ...params.InputProps,
              style: {
                backgroundColor: 'white',
              },
            }}
            InputLabelProps={{
              style: { color: 'black' },
            }}
          />
        )}
      />
    </Box>
  );
};

export default SymMultiSelectChip;
