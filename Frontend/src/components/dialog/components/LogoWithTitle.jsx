import { FlexRowCenter } from "@/components/flex-box";
import { Typography } from "@mui/material";

const LogoWithTitle = ({ title, subTitle, isMobile }) => {
    return (
        <FlexRowCenter
            flexDirection="column"
            gap={1.5}
            mt={isMobile ? 0 : 4} // Remove margin-top on mobile
        >
            <Typography
                sx={{
                    lineHeight: 1.25,
                    fontFamily: 'Elemental End',
                    textTransform: 'lowercase',
                    color: '#fff',
                    fontSize: isMobile ? 12 : 18, // Reduce font size on mobile
                    textAlign: 'center',
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    fontFamily: 'Helvetica',
                    color: '#fff',
                    fontSize: isMobile ? 10 : 12, // Reduce font size on mobile
                    textAlign: 'center',
                }}
            >
                {subTitle}
            </Typography>
        </FlexRowCenter>
    );
}

export default LogoWithTitle;