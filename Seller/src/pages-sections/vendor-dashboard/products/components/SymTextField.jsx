import React from 'react'
import { Box, Typography, Tooltip, IconButton, TextField } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';


const SymTextField = ({ label, name, placeholder, value, onBlur, onChange, error, helperText, multiline=false }) => {
  return (
    <div>
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

export default SymTextField