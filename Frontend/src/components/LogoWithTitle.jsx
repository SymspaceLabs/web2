import { FlexRowCenter } from "@/components/flex-box";
import { Typography } from "@mui/material";

const LogoWithTitle = ({ title, subTitle }) => {
    
    return (
        <FlexRowCenter flexDirection="column" gap={1.5} sx={{ alignItems:"center", py:{xs:1, sm:4}, maxWidth:{xs:'450px', sm:'100%'}, width:'100%' }}>
            <Typography
                sx={{
                    lineHeight: 1.25,
                    fontFamily: 'Elemental End',
                    textTransform: 'lowercase',
                    color: '#fff',
                    fontSize: {xs:16, sm:24},
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                    wordSpacing: '0.1em',
                }}
            >
                {title}
            </Typography>
            {subTitle &&
                <Typography
                    sx={{ 
                        fontFamily: 'Helvetica',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: {xs:10, sm:14}
                    }}
                >
                    {subTitle}
                </Typography>
            }
            
        </FlexRowCenter>
    );
}

export default LogoWithTitle;