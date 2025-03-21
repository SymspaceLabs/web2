// ============================================================
// Custom Text Input
// ============================================================

import { FlexBox } from "../flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { TextField, Typography , Tooltip} from "@mui/material";

// ============================================================

const SymTextField = ({
    title,
    toolTipText,
    value,
    onChange,
    multiline = false,
    rows = 4,  // Default number of rows
    isEdit = true,
    placeholder=""
}) => {
  return (
    <FlexBox flexDirection="column" flex={1}>
        <FlexBox gap={1}>
            <Typography color="white" mb={0.5} textAlign="left" fontFamily="'Elemental End', sans-serif" textTransform="lowercase">
                {title}
            </Typography>
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
            sx={{
                background: '#000',
                borderRadius: '5px',
                color: '#fff'
            }}
        />
    </FlexBox>
  )
}

export default SymTextField;