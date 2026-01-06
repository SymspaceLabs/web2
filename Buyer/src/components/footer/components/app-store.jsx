import Box from "@mui/material/Box";
import FlexBox from "../../flex-box/flex-box";
import { PLAY_APP_STORE_DATA } from "../data";

export default function AppStore({onClick}) {
  return (
    <FlexBox flexWrap="wrap" gap={2} justifyContent="center">
      {PLAY_APP_STORE_DATA.map(({
        icon: Icon,
        subtitle,
        title,
        url
      }) => (
        <Box 
          onClick={onClick} 
          key={title} 
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2.5,
            py: 1.75,
            color: 'white',
            background: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '155px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            
            // Minimal hover effect
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            
            // Subtle active state
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          {/* Icon */}
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
            }}
          >
            <Icon style={{ width: '100%', height: '100%' }} />
          </Box>

          {/* Text content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            <Box 
              sx={{
                fontSize: '9px',
                fontWeight: 500,
                lineHeight: 1,
                opacity: 0.7,
              }}
            >
              {subtitle}
            </Box>

            <Box 
              sx={{
                fontSize: '15px',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {title}
            </Box>
          </Box>
        </Box>
      ))}
    </FlexBox>
  );
}