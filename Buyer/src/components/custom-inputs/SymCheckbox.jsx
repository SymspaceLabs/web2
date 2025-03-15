import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { FlexBox } from '../flex-box';

const SymCheckbox = ({ checked, onChange, content }) => {
    return (
        <FormControlLabel 
            className="agreement" 
            control={
                <Checkbox 
                    size="small" 
                    color="secondary" 
                    checked={checked} // FIXED
                    onChange={onChange} // FIXED
                    sx={{
                        color: 'white',
                        '& .MuiSvgIcon-root': {
                            backgroundColor: 'black',
                            borderRadius: '4px',
                            border: 'none',
                        },
                        '&.Mui-checked .MuiSvgIcon-root': {
                            color: 'white',
                            backgroundColor: 'black',
                        },
                        '&:not(.Mui-checked) .MuiSvgIcon-root': {
                            color: 'white',
                            borderColor: 'black',
                        }
                    }}
                />
            } 
            label={
                <FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={1}>
                    {content}         
                </FlexBox>
            }
        />
    );
};

export default SymCheckbox;
