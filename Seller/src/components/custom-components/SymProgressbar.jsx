import { LinearProgress, Box, Typography } from '@mui/material';

const SymProgressbar = ({
    milestoneLabels,
    step
}) => {
    const totalSteps = milestoneLabels.length - 1;
    const difference = [0,0,-1,2.5,3.6,0] 
    const progress = (((step-1) / totalSteps) * 100) - difference[step];

  return (
    <Box sx={{ position: "relative", width: "100%", pt: 5 }}>
        <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.3)", // Light white background
                '& .MuiLinearProgress-bar': {
                    backgroundColor: "#fff", // White progress bar
                }
            }} 
        />

        {/* Milestones */}
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            position: 'absolute', 
            top: '60%', 
            width: '100%', 
            transform: 'translateY(-50%)' 
        }}>
            {milestoneLabels.map((label, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                    {/* Milestone Text */}
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            fontFamily:'Elemental End',
                            color: "#FFF", 
                            fontSize: 12, 
                            mt: 1, 
                            display: "block",
                            textAlign: "center"
                        }}
                    >
                        {label}
                    </Typography>

                    {/* Milestone Dot */}
                    <Box sx={{
                        width: 25,
                        height: 25,
                        borderRadius: "50%",
                        backgroundColor: step >= index + 1 ? "#FFF" : "rgba(255, 255, 255, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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