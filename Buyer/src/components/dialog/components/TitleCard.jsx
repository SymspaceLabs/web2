import { H1 } from "@/components/Typography";
import { Box, Typography } from "@mui/material"

const TitleCard = ({title, subTitle, isMobile}) => {
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