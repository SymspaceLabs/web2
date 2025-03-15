import React from 'react';
import { FormControl, Box, FormLabel, Tooltip, IconButton, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const SymRadioButton = ({ label, name, id, value, options, onChange }) => {
    return (
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 5 }} >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff' }}>
                    {label}
                </Typography>
                <Tooltip title="Enter the product's name">
                <IconButton>
                    <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                </IconButton>
                </Tooltip>
            </Box>
            <RadioGroup row aria-labelledby={id} name={name} value={value}  onChange={onChange}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <Radio sx={{ color: '#fff',  '&.Mui-checked': { color: '#1E78E9' } }} />
                        }
                        label={option.label}
                        sx={{ 
                            '& .MuiFormControlLabel-label': {
                                color: '#fff',
                                fontFamily: 'Elemental End',
                                textTransform: 'lowercase',
                            },
                        }}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default SymRadioButton;
