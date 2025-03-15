import React from 'react'
import { IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Correct import

const SymTooltip = ({ title="" }) => {
  return (
    <>
        <Tooltip title={title}>
            <IconButton size="small" aria-label="info">
                <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
            </IconButton>
        </Tooltip>
    </>
  )
}

export default SymTooltip