import { useState } from "react";
import { Box, Typography } from "@mui/material";

function PlanToggle({ onChange }) {
  const [selected, setSelected] = useState("monthly");

  const handleToggle = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <Box
      sx={{
        width: "100%",
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
          color: "#2563EB",
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
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: selected === "monthly" ? 0 : "50%",
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
            color: selected === "monthly" ? "#fff" : "#000",
            fontWeight: selected === "monthly" ? "bold" : "normal",
            padding: "10px 0",
          }}
          onClick={() => handleToggle("monthly")}
        >
          Monthly
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
            color: selected === "yearly" ? "#fff" : "#000",
            fontWeight: selected === "yearly" ? "bold" : "normal",
            padding: "10px 0",
          }}
          onClick={() => handleToggle("yearly")}
        >
          Yearly
        </Box>
      </Box>
    </Box>
  );
}

export default PlanToggle;
