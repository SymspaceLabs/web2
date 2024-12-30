import { Box , Typography} from "@mui/material"

const TitleCard = ({title, subTitle, isMobile}) => {
    return (
        <Box sx={{ pb:1 }}>
            <Typography sx={{ fontFamily: "Elemental End", textTransform: "lowercase", width: "100%", fontSize: isMobile? '14px' :"24px"}}>
                {title}
            </Typography>
            <Typography sx={{ width: "100%", fontSize: isMobile? '10px' : "12px" }}>
                {subTitle}
            </Typography>
        </Box>
    )
}

export default TitleCard;