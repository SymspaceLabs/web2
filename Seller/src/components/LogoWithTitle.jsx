// =========================================================
// Title for Forms
// =========================================================

import { FlexRowCenter } from "@/components/flex-box";
import { H1, Paragraph } from "./Typography";

// =========================================================

const LogoWithTitle = ({ children, subTitle }) => {
    
    return (
        <FlexRowCenter flexDirection="column" gap={1.5} sx={{ alignItems:"center", py:{xs:1, sm:4}, maxWidth:{xs:'450px', sm:'100%'}, width:'100%' }}>
            
            <H1 color='#FFF' fontSize={{xs:16, sm:24}} textAlign='center' wordSpacing="10px">
                {children}
            </H1>

            {subTitle &&
                <Paragraph color='#FFF' fontSize={{xs:10, sm:14}} textAlign='center'>
                    {subTitle}
                </Paragraph>
            }
            
        </FlexRowCenter>
    );
}

export default LogoWithTitle;