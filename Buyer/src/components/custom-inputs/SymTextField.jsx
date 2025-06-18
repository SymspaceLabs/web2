// ============================================================
// Custom Text Input
// ============================================================

import { FlexBox } from "../flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { TextField, Tooltip, FormHelperText } from "@mui/material";
import { H1, Small, H5 } from "@/components/Typography";

// ============================================================

const SymTextField = ({
  title,
  toolTipText,
  value,
  onChange,
  multiline = false,
  rows = 4,
  isEdit = true,
  placeholder = "",
  charLimit = false,
  showCharlimit = false,
  type = "text",
  color = "white",
  theme = "dark", // New prop with default value
  mandatory = false,
  error = false,
  helperText = "",
  sx
}) => {
  const currentLength = value?.length || 0;
  const isLight = theme === "light";

  return (
    <FlexBox flexDirection="column" flex={1} sx={{...sx}}>
      <FlexBox gap={1}>
        <H1 color={isLight ? "" : color} mb={0.5}>
          {title}
        </H1>
        {mandatory && <H5 color="error.main">*</H5>}
        {toolTipText && (
          <Tooltip title={toolTipText} arrow>
            <InfoOutlined sx={{ color: isLight ? "#000" : "#fff", fontSize: 16 }} />
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
          style: { color: isLight ? "#000" : "#fff" }
        }}
        inputProps={{
          maxLength: charLimit ? charLimit : undefined,
          style: { color: isLight ? "#000" : "#fff" }
        }}
        type={type}
        sx={{
          background: isLight ? "transparent" : "#000",
          borderRadius: "5px",
          color: isLight ? "#000" : "#fff",
          "& input::placeholder": {
            color: isLight ? "#666" : "#aaa",
            opacity: 1
          },
          "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0
          },
          "& input[type=number]": {
            MozAppearance: "textfield"
          }
        }}
      />

      {error && (
        <FormHelperText error>
          {helperText}
        </FormHelperText>
      )}

      {charLimit && showCharlimit && (
        <Small color={isLight ? "black" : "white"} mt={0.5} textAlign="right">
          {currentLength}/{charLimit}
        </Small>
      )}
    </FlexBox>
  );
};

export default SymTextField;
