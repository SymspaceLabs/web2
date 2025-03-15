import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField"; // CUSTOM COMPONENT

import { H6 } from "./Typography"; // ==============================================================

// ==============================================================
export default function BazaarTextField({
  label,
  InputProps,
  ...props
}) {
  const boxProps = {};
  const textFieldProps = {};

  for (const key in props) {
    if (SPACE_PROPS_LIST.includes(key)) boxProps[key] = props[key];else textFieldProps[key] = props[key];
  }

  return <Box sx={{flex: 'auto'}} {...boxProps}>

      {/* {label ? <H6 mb={1} fontSize={13} color="grey.700">
          {label}
        </H6> : null} 
      */}

      <TextField InputProps={{ ...InputProps,
      style: { ...InputProps?.style,
        height: 44,
        color:'#fff',
        background:'#000',
        
      }
    }} {...textFieldProps} />
    </Box>;
}
const SPACE_PROPS_LIST = ["m", "mt", "mr", "mb", "ml", "mx", "my", "p", "pt", "pr", "pb", "pl", "px", "py", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY"];