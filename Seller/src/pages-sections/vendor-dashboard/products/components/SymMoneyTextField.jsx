import React, { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { NumericFormat } from 'react-number-format';

function SymMoneyTextField({ value, onChange, placeholder="0.00", readOnly=false, allowNegative=false, isProfit=false }) {
    const handleFocus = (event) => {
        event.target.select(); // Select all text on focus
    };

    // Determine the color for profit fields: green for positive, red for negative, black otherwise
    const textColor = isProfit ? (value < 0 ? 'red' : value > 0 ? 'green' : 'black') : 'black';

    return (
      <TextField
        label=""
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name="money"
        onFocus={handleFocus}  // Select all text on focus
        sx={{
          '& .MuiInputBase-input': {
            color: textColor, // Set the input text color dynamically
            backgroundColor: 'white', // Set background color to white
            '&::placeholder': {
              color: 'gray', // Set the placeholder text color to gray or another visible color
            },
          },
          '& .MuiInputLabel-root': {
            color: 'black', // Set the label color to black if used
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white', // Background color for the input
            // '& fieldset': {
            //   borderColor: 'black', // Set the border color to black
            // },
            // '&:hover fieldset': {
            //   borderColor: 'black', // Border color on hover
            // },
            '&.Mui-focused fieldset': {
              borderColor: 'black', // Border color when focused
            },
          },
        }}
        InputProps={{
          readOnly: readOnly,
          inputComponent: MoneyInput,
          style: { paddingLeft: '8px' },
          inputProps: {
            allowNegative: allowNegative,
          },
          startAdornment: (
            <InputAdornment position="start">
              $
            </InputAdornment>
          ),
        }}
        variant="outlined"
        fullWidth
      />
    );
}

const MoneyInput = forwardRef(function MoneyInput(props, ref) {
    const { onChange, allowNegative, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value, // The raw numeric value
            },
          });
        }}
        thousandSeparator
        decimalScale={2}      // Restrict to 2 decimal places
        fixedDecimalScale     // Always show 2 decimal places
        allowNegative={allowNegative} // Allow or disallow negative values based on props
        isNumericString       // Ensure input is treated as numeric string
      />
    );
});

export default SymMoneyTextField;
