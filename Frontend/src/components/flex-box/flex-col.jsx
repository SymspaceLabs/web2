import { Box } from "@mui/material";
export default function FlexCol({
  children,
  ...props
}) {
  return <Box display="flex" flexDirection="column" {...props}>
      {children}
    </Box>;
}