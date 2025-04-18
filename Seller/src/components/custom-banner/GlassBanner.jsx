// ===================================================================
// Glassmorphic Banner
// ===================================================================

import { styles } from './styles';
import { Box } from '@mui/material';

export default function GlassBanner({
    children,
    sx
}) {
  return (
    <Box sx={{ width:'100%' }}>
        <Box sx={{...styles.banner, ...sx}}>
            {children}
        </Box>
    </Box>
  );
};