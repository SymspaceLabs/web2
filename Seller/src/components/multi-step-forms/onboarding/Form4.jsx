// ======================================================================================
// Form 4
// ======================================================================================

import { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { H1, Paragraph } from '@/components/Typography';
import { GlassBanner } from '@/components/custom-banner';
import { FlexBox, FlexCol, FlexColCenter } from '@/components/flex-box';

import LazyImage from '@/components/LazyImage';
import UploadFileForm from '@/components/custom-forms/onboarding/UploadFileForm';

// ======================================================================================

function Form4 ({
    setFormData,
    user,
    step,
    uploadedFile,
    setUploadedFile,
    handleContinue
}) {

    useEffect(() => {
        setUploadedFile(user?.files || []);
    }, [user]); // Depend on `user` so it updates after submission

    
    // Update formData whenever state changes
    useEffect(() => {
        setFormData({
            "files": uploadedFile
        });
    }, [uploadedFile]);
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            {/* Banner Card 1 */}
            <GlassBanner>
                <FlexBox flexDirection={{ xs:'column', sm:'row' }} justifyContent='space-between' gap={2}>
                    <FlexCol>
                        <H1 fontSize={{xs:14, sm:16}} color="#FFF" pb={1} >
                            at this time, completing the billing step is not required to register your business account on our symspace marketplace. 
                        </H1>
                    </FlexCol>
                    <FlexColCenter sx={{ maxWidth:{xs:'100%', sm:'350px'} }}>
                        <Button sx={styles.btn} onClick={handleContinue}>
                            skip
                        </Button>
                    </FlexColCenter>
                </FlexBox>
            </GlassBanner>
            
            {/* Banner Card 2 */}
            <GlassBanner sx={{background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)'}}>
                <FlexCol justifyContent='space-between' gap={2}>
                    <FlexCol>
                        <H1 fontSize={15} color="#FFF" pb={1} >
                            provide documentation requested below to verify information provided
                        </H1>
                        {requirements.map((text, index) => (
                            <FlexBox key={index} gap={1}>
                                <Box sx={{ width: 25 }}>
                                    <LazyImage
                                        src="/assets/images/onboarding/white-checkbox.png"
                                        alt="white-checkbox"
                                        width={500}
                                        height={500}
                                    />
                                </Box>
                                <Paragraph color="#FFF">
                                    {text}
                                </Paragraph>
                            </FlexBox>
                        ))}
                    </FlexCol>
                </FlexCol>
            </GlassBanner>
            
            <UploadFileForm
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
            />
        </FlexBox>
    );
}

export default Form4;

const requirements = [
    "copy of a valid government issued ID such as: Drivers License, passport, or State ID",
    "copy of first page of bank statement or bill confirming business address",
    "copy of EIN letter to confirm business registration",
    "copy of voided check",
];

const styles = {
    bannerButton : { 
        background:'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
        borderRadius: '50px',
        px:5,
        py:1.5,
        color: '#fff',
        fontSize:{ xs:12, sm:14 },
        border:'1px solid #FFF',
        minWidth:{sm:'200px'}
    },
    btn: {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(50px)',
        borderRadius: '30px',
        color: '#FFF',
        fontFamily: 'Elemental End',
        textTransform: 'lowercase',
        px: 2,
        fontSize: { xs: 12, sm: 16 },
        fontWeight: 500,
        '&:hover': {
            background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    }
}
