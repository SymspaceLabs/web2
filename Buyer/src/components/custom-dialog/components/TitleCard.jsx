// =======================================================
// Title card
// - Measurement Form
// =======================================================

import { Box } from "@mui/material"
import { H1, Paragraph } from "@/components/Typography";

// =======================================================

const TitleCard = ({
    title,
    subTitle,
    isMobile
}) => {
    return (
        <Box sx={{ py:1 }}>
            <H1 color='#fff' width="100%" fontSize={{xs:'14px', sm:"24px"}}>
                {title}
            </H1>
            <Paragraph sx={{ color:'#fff', width: "100%", fontSize: isMobile? '10px' : "12px" }}>
                {subTitle}
            </Paragraph>
        </Box>
    )
}

export default TitleCard;