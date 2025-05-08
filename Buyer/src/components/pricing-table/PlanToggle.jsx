// ==========================================
// Plan Toggle
// ==========================================

import { useState } from "react";
import { styles } from "./styles";
import { H1 } from "../Typography";
import { FlexBox } from "../flex-box";
import { Box, Typography } from "@mui/material";

// ==========================================

function PlanToggle({ 
  onChange,
  value,
  title,
  subtitle,
  theme
}) {
  const [selected, setSelected] = useState(value);

  const handleToggle = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <FlexBox flexDirection={{xs: "column", sm: "row"}} justifyContent="space-between" alignItems="center" gap={2}>
      {/* LEFT  */}
      <H1
        color='#FFF'
        fontSize={{ xs:12, sm:18 }}
        textAlign={{xs:'center', sm:'left'}}
        wordSpacing='5em'
      >
        {title}
      </H1>

      {/* RIGHT  */}
      <FlexBox
        sx={{
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: { xs: "center", sm: "flex-end" },
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Typography moved to the bottom on mobile */}
        <Typography
          sx={{
            color: theme=='dark'?'#FFF':'#2563EB',
            textAlign: "center",
            marginTop: { xs: "10px", sm: "0" }, // Add margin on mobile to separate from toggle
          }}
        >
          {subtitle}
        </Typography>

        {/* Toggle button */}
        <Box sx={styles.planToggleBg}>
          
          {/* Plan Highlight */}
          <Box
            sx={{
              ...styles.planToggleHighlight,
              left: selected === "yearly" ? 0 : "50%"
            }}
          />

          {/* Yearly Plan */}
          <Box 
            sx={{
              ...styles.planCard,
              color: selected === "yearly" ? "#fff" : "#A1A1AA",
            }}
            onClick={() => handleToggle("yearly")}
          >
            Yearly
          </Box>

          {/* Monthly Plan */}
          <Box
            sx={{
              ...styles.planCard,
              color: selected === "monthly" ? "#fff" : "#A1A1AA",
            }}
            onClick={() => handleToggle("monthly")}
          >
            Monthly
          </Box>
        </Box>
      </FlexBox>
    </FlexBox>

  );
}

export default PlanToggle;
