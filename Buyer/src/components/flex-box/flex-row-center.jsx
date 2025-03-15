import Box from "@mui/material/Box";

export default function FlexRowCenter({
  children,
  url,
  ...props
}) {
  return <Box display="flex" justifyContent="center" alignItems="center" {...props}>
     {children}
    </Box>;
}