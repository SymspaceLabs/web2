// SymMoneyTextField.jsx (Updated)

import React, { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { NumericFormat } from 'react-number-format';

// --- MoneyInput Component (Forwarded Ref) ---

const MoneyInput = forwardRef(function MoneyInput(props, ref) {
    const { onChange, allowNegative, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          // CRITICAL: Ensure the onChange event returns the raw numeric string (values.value)
          onChange({
            target: {
              name: props.name,
              // We return the raw numeric value as a string.
              value: values.value, 
            },
          });
        }}
        thousandSeparator
        decimalScale={2}        
        fixedDecimalScale       
        allowNegative={allowNegative} 
        isNumericString         
      />
    );
});

// --- SymMoneyTextField Component ---

function SymMoneyTextField({ value, onChange, placeholder="0.00", readOnly=false, allowNegative=false, isProfit=false }) {
    
    // Convert the value to a number for comparison. Floats safely handle empty/non-numeric strings as 0 or NaN.
    const numericValue = parseFloat(value) || 0; 

    // Determine the color for profit fields
    const textColor = isProfit 
        ? (numericValue < 0 ? 'red' : numericValue > 0 ? 'green' : 'black') 
        : 'black';

    const handleFocus = (event) => {
        event.target.select(); 
    };

    return (
      <TextField
        label=""
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name="money"
        onFocus={handleFocus}
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          '& .MuiInputBase-input': {
            color: textColor,
            backgroundColor: 'white',
            paddingRight: '8px',
            textAlign: 'right', // Align number right
            '&::placeholder': { color: 'gray' },
          },
          '& .MuiOutlinedInput-root': {
            height: '40px',
            backgroundColor: 'white',
            '&.Mui-focused fieldset': { borderColor: 'black' },
          },
        }}
        InputProps={{
          readOnly: readOnly,
          inputComponent: MoneyInput,
          inputProps: {
            allowNegative: allowNegative,
            style: { paddingLeft: '0px' },
          },
          startAdornment: (
            <InputAdornment position="start" sx={{ 
                color: isProfit ? textColor : 'black', 
                marginRight: '0px', 
                paddingRight: '4px' 
            }}>
              $
            </InputAdornment>
          ),
        }}
      />
    );
}

export default SymMoneyTextField;