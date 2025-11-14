// =========================================================
// Custom Text Field
// =========================================================

import { Box, Tooltip, IconButton, TextField } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { H1 } from '@/components/Typography';

// =========================================================

const SymTextField = ({ 
    label, 
    name, 
    placeholder, 
    value, 
    onBlur, 
    onChange, 
    error, 
    helperText, 
    multiline = false, 
    // 1. ADD NEW PROP: control tooltip visibility. Defaults to true.
    showTooltip = true,
    // 2. ADD NEW PROP: allow overriding the default tooltip title
    tooltipTitle = "Enter the product's name" 
}) => {
  return (
    <div>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <H1 color='#FFF'>
                {label}
            </H1>
            {/* 3. CONDITIONALLY RENDER THE TOOLTIP */}
            {showTooltip && (
                <Tooltip title={tooltipTitle}>
                    <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
        <TextField
            InputProps={{
                style: {
                    backgroundColor: 'white',
                    color: '#000',
                    boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                    borderRadius: '8px'
                }
            }}
            fullWidth
            name={name}
            color="info"
            size="medium"
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={error}
            helperText={helperText}
            multiline={multiline}
            rows={4}
        />
    </div>
  )
}

export default SymTextField;