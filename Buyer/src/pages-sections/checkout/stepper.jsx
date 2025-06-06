// ========================================================
import { Box, Chip } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { FlexRowCenter } from "@/components/flex-box";
import { elementalEndFont } from "@/components/styles";
// ========================================================

export default function Stepper({
  selectedStep = 1,
  stepperList,
  onChange
}) {
  const [selected, setSelected] = useState(selectedStep - 1);

  const handleStepClick = (step, ind) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(ind);
    }
  };

  useEffect(() => {
    setSelected(selectedStep - 1);
  }, [selectedStep]);

  return (
    <FlexRowCenter flexWrap="wrap" my="-4px">
      {stepperList.map((step, ind) => <Fragment key={step.title}>
          <Chip disabled={step.disabled} label={step.title} onClick={handleStepClick(step, ind)}
            sx={{
              ...elementalEndFont,
              border: '2px solid white',
              background: ind <= selected ? "linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)" : "transparent",
              color: "#FFF",
              p: "0.5rem 1rem",
              fontSize: "14px",
              my: "4px",
              "&:hover:not(:disabled)": {
                backgroundColor: "primary.main",
                color: "primary.contrastText"
              }
            }}
          />

          {ind < stepperList.length - 1 && <Box width="50px" height="4px" bgcolor="#FFF" />}
        </Fragment>)}
    </FlexRowCenter>
  );
}