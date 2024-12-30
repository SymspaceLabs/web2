import Link from "next/link";
import Box from "@mui/material/Box"; // ==============================================================

// ==============================================================
export default function BoxLink({
  href,
  title
}) {
  return <Box sx={{color:'#fff'}} href={href} component={Link} fontWeight={600} borderColor="#fff" borderBottom="1px solid">
      {title}
    </Box>;
}