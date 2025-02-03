import { FlexBox } from "../flex-box";
import { Small } from "../Typography";
import { Box, TextField } from "@mui/material";

const SymTextField = ({
    title,
    value,
    onChange,
    multiline = false,
    rows = 4,  // Default number of rows
    isEdit = true,
    placeholder=""
}) => {
  return (
    <FlexBox flexDirection="column" flex={1}>
        <Small color="white" mb={0.5}>
            {title}
        </Small>
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
            sx={{
                background: '#000',
                borderRadius: '5px',
                color: '#fff',
            }}
        />
    </FlexBox>
  )
}

export default SymTextField;