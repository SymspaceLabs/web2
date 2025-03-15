import Box from "@mui/material/Box";

export default function FlexColCenter({
  children,
  url,
  ...props
}) {
  return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" {...props}>
     {children}
    </Box>;
}