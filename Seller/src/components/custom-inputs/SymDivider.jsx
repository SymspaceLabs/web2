// ============================================================
// Custom Divider
// ============================================================

import { styles } from "./styles";
import { FlexBox } from "../flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { Divider, Typography , Tooltip} from "@mui/material";

// ============================================================

const SymDivider = ({
    title,
    toolTipText,
}) => {
  return (
    <FlexBox flexDirection="column" flex={1}>
        <FlexBox gap={1}>
            <Typography color="white" mb={0.5} textAlign="left" sx={styles.elementalEndFont}>
                {title}
            </Typography>
            {toolTipText && (
                <Tooltip title={toolTipText} arrow>
                    <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
                </Tooltip>
            )}
        </FlexBox>
        <Divider />
    </FlexBox>
  )
}

export default SymDivider;