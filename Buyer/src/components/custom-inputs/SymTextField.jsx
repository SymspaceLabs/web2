// ============================================================
// Custom Text Input
// ============================================================

import { FlexBox } from "../flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { TextField, Tooltip } from "@mui/material";
import { H1, Small } from "@/components/Typography";

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
    showCharlimit = false,
    type = 'text',
    color="white"
}) => {

  const currentLength = value?.length || 0;

  return (
    <FlexBox flexDirection="column" flex={1}>
        <FlexBox gap={1}>
            <H1 color={color} mb={0.5} >
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
                maxLength: charLimit ? charLimit : undefined,
                style: { color: "#fff" },
            }}
            type={type}
            sx={{
                background: "#000",
                borderRadius: "5px",
                color: "#fff",
                "& input::placeholder": {
                  color: "#aaa", // or any contrasting color like "#ccc" or "#fff"
                  opacity: 1,
                },
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
        {charLimit && showCharlimit &&  (
          <Small color="white" mt={0.5} textAlign="right">
            {currentLength}/{charLimit}
          </Small>
        )}
    </FlexBox>
  )
}

export default SymTextField;