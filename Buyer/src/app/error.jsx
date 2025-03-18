"use client"

// ==============================================================
// Error Page
// ==============================================================

import { Card, Button, Typography } from "@mui/material";
import { FlexRowCenter } from "../components/flex-box";

// ==============================================================

export default function Error({ error, reset }) {
  return (
    <FlexRowCenter height="100vh">
      <Card sx={{ p: 4, textAlign: "center" }}>
        <Typography mb={2}>
          Something went wrong!
        </Typography>

        <Button color="error" variant="contained" onClick={() => reset()}>
          Try again
        </Button>
      </Card>
    </FlexRowCenter>
  );
}