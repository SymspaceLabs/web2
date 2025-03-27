// ============================================================
// Custom Text Input
// ============================================================

import { FlexBox } from "../flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { TextField, Tooltip} from "@mui/material";
import { H1 } from "@/components/Typography";

// ============================================================

const SymTextField = ({
    title,
    toolTipText,
    value,
    onChange,
    multiline = false,
    rows = 4,  // Default number of rows
    isEdit = true,
    placeholder="",
    charLimit= false,
    type = 'text',
}) => {

  return (
    <FlexBox flexDirection="column" flex={1}>
        <FlexBox gap={1}>
            <H1 color="white" mb={0.5} >
                {title}
            </H1>
            {toolTipText && (
                <Tooltip title={toolTipText} arrow>
                    <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                </Tooltip>
            )}
        </FlexBox>

        <TextField
            value={value}
            onChange={onChange}
            disabled={!isEdit}
            multiline={multiline}
            placeholder={placeholder}
            rows={multiline ? rows : 1}
            InputProps={{
                style: { color: '#fff' },
            }}
            inputProps={{
                // inputMode: type=='number' ? "numeric" : undefined,
                // pattern: type=='number' ? "[0-9]*" : undefined,
                maxLength: charLimit ? charLimit : undefined,
                style: { color: "#fff" },
            }}
            type={type}
            sx={{
                background: "#000",
                borderRadius: "5px",
                color: "#fff",
                // Hides the increment/decrement buttons in all browsers
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield", // Firefox
                },
            }}
        />
    </FlexBox>
  )
}

export default SymTextField;