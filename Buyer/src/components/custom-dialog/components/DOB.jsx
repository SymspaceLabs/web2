import { useState } from "react";
import { Card, TextField } from "@mui/material";
import TitleCard from "./TitleCard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DOB = ({ 
  dob,
  setDob,
  isMobile
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: "15px",
        textAlign: "left",
        width: "100%",
        color: "#fff",
        mt: 3,
        p: "1.5rem",
        background:
          "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
        boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)",
        backdropFilter: "blur(12px)",
      }}
    >
      <TitleCard
        title="Date of Birth"
        subTitle="Please enter your date of birth."
        isMobile={isMobile}
      />
      <DatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={dob}
        onChange={(newValue) => setDob(newValue)}
        slots={{ textField: TextField }}
        slotProps={{
          textField: {
            onClick: () => setOpen(true), // 👈 Triggers calendar popup on input click
            sx: {
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "5px",
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiInputLabel-root": { color: "rgba(200, 200, 200, 0.8)" },
              "& .MuiFormHelperText-root": { color: "#ff0000" },
              "& .MuiSvgIcon-root": { color: "white" },
              "& .MuiPaper-root": { backgroundColor: "#000" },
            },
            size: "small",
            fullWidth: true,
          },
        }}
      />
    </Card>
  );
};

export default DOB;
