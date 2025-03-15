import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { FlexBox } from "../flex-box";

function PlanToggle({ onChange, value, title, theme }) {
  const [selected, setSelected] = useState(value);

  const handleToggle = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <FlexBox flexDirection={{xs: "column", sm: "row"}} justifyContent="space-between" alignItems="center" gap={2}>
      {/* LEFT  */}
      <Typography sx={{ color:'#FFF', fontFamily:'Elemental End', textTransform:'lowercase', fontSize: { xs:12, sm:24 }, textAlign:{ xs:'center', sm:'left' } }}>
        {title}
      </Typography>

      {/* RIGHT  */}
      <Box
        sx={{
          display: "flex",
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
          <strong>Save 15%</strong> on yearly plan!
        </Typography>

        {/* Toggle button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "25px",
            overflow: "hidden",
            width: "200px",
            height: "50px",
            border: "1px solid #E4E4E7",
            position: "relative",
            background:'#FFF'
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: selected === "yearly" ? 0 : "50%",
              width: "50%",
              height: "100%",
              backgroundColor: "#2563EB",
              border: "5px solid white",
              borderRadius: "50px",
              transition: "left 0.3s ease",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              zIndex: 2,
              width: "50%",
              height: "100%",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: selected === "yearly" ? "#fff" : "#A1A1AA",
              fontWeight: selected === "yearly" ? "bold" : "normal",
              padding: "10px 0",
            }}
            onClick={() => handleToggle("yearly")}
          >
            Yearly
          </Box>
          <Box
            sx={{
              zIndex: 2,
              width: "50%",
              height: "100%",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: selected === "monthly" ? "#fff" : "#A1A1AA",
              fontWeight: 'bold',
              padding: "10px 0",
            }}
            onClick={() => handleToggle("monthly")}
          >
            Monthly
          </Box>
        </Box>
      </Box>
    </FlexBox>

  );
}

export default PlanToggle;
