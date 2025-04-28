import { LinearProgress, Box, Typography } from '@mui/material';
import { H1 } from '@/components/Typography';

const SymProgressbar = ({
    milestoneLabels,
    step
}) => {
    const totalSteps = milestoneLabels.length - 1;
    const difference = [0,0,3,9,14,0] 
    const progress = (((step-1) / totalSteps) * 100) - difference[step];

  return (
    <Box sx={{ position: "relative", width: "100%", pt: 7, pb: 3 }}>
        <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: "#FFF", // Light white background
                '& .MuiLinearProgress-bar': {
                    backgroundColor: "#004EC5", // White progress bar
                }
            }} 
        />

        {/* Milestones */}
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            position: 'absolute', 
            top: { xs:'57%', sm:'50%', md:'45%' }, 
            width: '100%', 
            transform: 'translateY(-50%)',
            // px: { xs: 1, sm: 3 } // add padding on mobile so labels are not too close to edges
        }}>
            {milestoneLabels.map((label, index) => (
                <Box
                    key={index}
                    sx={{ 
                        textAlign: 'center',
                        flex: 1, // ⚡ make each milestone flex equally
                        minWidth: { xs: 50, sm: 80 }, // ⚡ so dots/labels don’t get too squeezed
                    }}
                >
                    {/* Milestone Text */}
                    <H1 
                        sx={{ 
                            color: "#FFF", 
                            fontSize: { xs: 8, sm: 14, md: 20 }, 
                            pb:1,
                            display: "block",
                            whiteSpace: "nowrap", // prevent label breaking into two lines
                            textAlign: 'left'
                        }}
                    >
                        {label}
                    </H1>

                    {/* Milestone Dot */}
                    <Box sx={{
                        width: { xs: 16, sm: 20, md: 25 }, // ⚡ smaller dot on mobile
                        height: { xs: 16, sm: 20, md: 25 },
                        borderRadius: "50%",
                        backgroundColor: step >= index + 1 ? "#004EC5" : "#FFF",
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "center",
                        // mx: "auto", // center the dot
                        marginLeft: index === milestoneLabels.length - 1 ? 'auto' : '0',
                        opacity: index === milestoneLabels.length - 1 ? 0 : 1, // Make last dot invisible
                    }} />
                </Box>
            ))}
        </Box>
    </Box>
  )
}

export default SymProgressbar