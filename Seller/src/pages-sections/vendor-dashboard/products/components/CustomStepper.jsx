import { Container, Stepper, Step, StepLabel, StepConnector, styled  } from '@mui/material';

// ======================================================================================
// CustomStepConnector is a styled component that customizes the line connecting the steps.
// It uses Material UI's `styled` utility to change the connector line's border color
// based on the step's state (default, active, or completed).
// * @param {object} theme - The MUI theme object used for accessing color palette.
// ======================================================================================

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  // Default style for the connector line
  [`& .MuiStepConnector-line`]: {
    borderColor: theme.palette.grey[400], 
  },
  // Style for the line leading to the active step
  [`&.Mui-active .MuiStepConnector-line`]: {
    borderColor: 'blue', 
  },
  // Style for the line connected to a completed step
  [`&.Mui-completed .MuiStepConnector-line`]: {
    borderColor: 'blue', 
  },
}));

// ======================================================================================
// CustomStepper component renders a responsive Material UI Stepper for multi-step flows.
// It uses `alternativeLabel` for horizontal display and the custom `CustomStepConnector`.
// * @param {object} props - The component props.
// @param {number} props.activeStep - The index of the currently active step (0-indexed).
// @param {string[]} props.steps - An array of strings where each string is the label for a step.
// @returns {JSX.Element} The rendered Stepper component.
// ======================================================================================

const CustomStepper = ({
    activeStep,
    steps
}) => {
  return (
    <Container>
        <Stepper 
            activeStep={activeStep} 
            alternativeLabel 
            connector={<CustomStepConnector />}
        >
        {steps.map((label) => (
            <Step key={label}>
            <StepLabel
                // Custom styling overrides using the sx prop
                sx={{
                // Custom font, lowercase transformation, and white color for the label text
                '& .MuiStepLabel-label': { fontFamily:'Elemental End', textTransform:'lowercase', color: 'white' },
                // Reverse the root element direction to place the label below the icon
                '& .MuiStepLabel-root': { flexDirection: 'column-reverse', color: 'white' },
                // Ensure label color remains white regardless of active/completed/disabled state
                '& .Mui-active .MuiStepLabel-label': { color: 'white' },
                '& .Mui-completed .MuiStepLabel-label': { color: 'white' },
                '& .Mui-disabled .MuiStepLabel-label': { color: 'white' },
                }}
            >
                {label}
            </StepLabel>
            </Step>
        ))}
        </Stepper>
    </Container>
  )
}

export default CustomStepper