"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import { FlexRowCenter } from "../../components/flex-box";

export default function NotFound() {
  const router = useRouter();
  return <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
      <Box maxWidth={320} width="100%" mb={3}>
        <Image alt="Not Found!" src={require("../../../public/assets/images/illustrations/404.svg")} style={{
        width: "100%",
        height: "auto"
      }} />
      </Box>

      <FlexRowCenter flexWrap="wrap" gap={2}>
        <Button variant="outlined" color="primary" onClick={() => router.back()}>
          Go Back
        </Button>

        <Button variant="contained" color="primary" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </FlexRowCenter>
    </FlexRowCenter>;
}