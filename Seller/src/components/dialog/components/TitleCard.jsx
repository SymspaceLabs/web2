import { Box , Typography} from "@mui/material"

const TitleCard = ({title, subTitle, isMobile}) => {
    return (
        <Box sx={{ py:1 }}>
            <Typography sx={{ color:'#fff', fontFamily: "Elemental End", textTransform: "lowercase", width: "100%", fontSize: isMobile? '14px' :"24px"}}>
                {title}
            </Typography>
            <Typography sx={{ color:'#fff', width: "100%", fontSize: isMobile? '10px' : "12px" }}>
                {subTitle}
            </Typography>
        </Box>
    )
}

export default TitleCard;