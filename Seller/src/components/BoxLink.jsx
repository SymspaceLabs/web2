// ==============================================================
import Link from "next/link";
import { Box } from "@mui/material";

// ==============================================================
export default function BoxLink({
  href,
  title,
  textColor='#fff',
  // fw=600,
  children
}) {
  return (
    <Box sx={{color:textColor}} href={href} component={Link} borderColor="#fff" borderBottom="1px solid">
      {children}
    </Box>
  );
}