// ============================================================
// Custom CheckBox
// ============================================================

import { FlexBox } from '../flex-box';
import { InfoOutlined } from "@mui/icons-material";
import { FormControlLabel, Checkbox, Tooltip } from '@mui/material';

// ============================================================


const SymCheckbox = ({ checked, onChange, content, toolTipText }) => {
    return (
        <FlexBox>
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
                    <FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={0}>
                        {content}         
                    </FlexBox>
                }
            />
            {toolTipText && (
                <Tooltip title={toolTipText} arrow>
                    <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                </Tooltip>
            )}
        </FlexBox>
    );
};

export default SymCheckbox;
