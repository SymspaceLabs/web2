// ===================================================================
// Seller Profile Dialog
// ===================================================================

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { H1, Paragraph } from '@/components/Typography';
import { FlexBox, FlexCol } from '@/components/flex-box';
import { GlassBanner } from '@/components/custom-banner';

import { CircularProgress, IconButton, Button, Dialog, DialogContent, DialogTitle, useMediaQuery, DialogActions, Divider } from '@mui/material';
import { useSnackbar } from "@/contexts/SnackbarContext";
import { SellerSettingsForm } from '@/components/custom-forms/seller-profile';
import CloseIcon from '@mui/icons-material/Close';
import LazyImage from '@/components/LazyImage';

// ===================================================================

const SellerProfileDialog = ({
    open,
    setOpen
}) => {
    
    const { user } = useAuth();
    const { showSnackbar } = useSnackbar();

    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

    const [emailSupport, setEmailSupport] = useState();
    const [phoneSupport, setPhoneSupport] = useState();
    const [entityName, setEntityName] = useState();
    const [description, setDescription] = useState();
    const [tagLine, setTagLine] = useState();
    const [uploadedLogo, setUploadedLogo] = useState([]);
    const [uploadedBanner, setUploadedBanner] = useState([]);

    const [web, setWeb] = useState();
    const [instagram, setInstagram] = useState();
    const [twitter, setTwitter] = useState();
    const [youtube, setYoutube] = useState();
    const [facebook, setFacebook] = useState();

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`);
            const data = await response.json();
            setUserData(data);
          } catch (error) {
            console.error("Error fetching blogs:", error);
          }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        setEmailSupport(user?.company?.emailSupport || "");
        setPhoneSupport(user?.company?.phoneSupport || "");
        setEntityName(user?.company?.entityName || "");
        setDescription(user?.company?.description || "");
        setTagLine(user?.company?.tagLine || "");
        setUploadedLogo([user?.company?.logo]);
        setUploadedBanner([user?.company?.banner]);
        
        setWeb(user?.company?.web || "");
        setInstagram(user?.company?.instagram || "");
        setTwitter(user?.company?.twitter || "");
        setYoutube(user?.company?.youtube || "");
        setFacebook(user?.company?.facebook || "");

    }, [user]);

    
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        setLoading(true);
    
        try {
            let logoUrl = "";
            let bannerUrl = "";
    
            // Upload logo if present
            if (uploadedLogo?.[0] instanceof File) {
                const fileData = new FormData();
                fileData.append("file", uploadedLogo[0]);
    
                const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/image`, {
                    method: "POST",
                    body: fileData,
                });
    
                const uploadResult = await uploadResponse.json();
                if (!uploadResponse.ok) throw new Error(uploadResult.message || "Logo upload failed");
                logoUrl = uploadResult.url;
            } else if (typeof uploadedLogo?.[0] === "string") {
                logoUrl = uploadedLogo[0]; // Already a URL
            }
    
            // Upload banner if present
            if (uploadedBanner?.[0] instanceof File) {
                const fileData = new FormData();
                fileData.append("file", uploadedBanner[0]);
    
                const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/image`, {
                    method: "POST",
                    body: fileData,
                });
    
                const uploadResult = await uploadResponse.json();
                if (!uploadResponse.ok) throw new Error(uploadResult.message || "Banner upload failed");
                bannerUrl = uploadResult.url;
            } else if (typeof uploadedBanner?.[0] === "string") {
                bannerUrl = uploadedBanner[0]; // Already a URL
            }
    
            // Prepare the update body
            const body = {
                emailSupport,
                phoneSupport,
                entityName,
                description,
                tagLine,
                logo: logoUrl,
                banner: bannerUrl,
                web,
                instagram,
                twitter,
                youtube,
                facebook,
            };
    
            // Send update request
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${user.company.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                showSnackbar(data.message, "error");
            } else {
                showSnackbar(data.message, "success");
                setOpen(false);
            }
    
        } catch (error) {
            console.error(error);
            showSnackbar(error.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Dialog
            open={open}
            maxWidth="lg"
            fullWidth
            disableEscapeKeyDown
            disableBackdropClick
            PaperProps={{
                style: {
                    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
                    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: useMediaQuery('(max-width:600px)') ? "20px" : "50px",
                    paddingBottom: 5,
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                },
            }}
        >
            <DialogTitle sx={{ position: "relative" }}>
                
                {/* Header */}
                <FlexCol gap={2} py={3}>
                    <H1 color="#FFF" fontSize={20}>
                        Seller's Store Setting
                    </H1>
                    <Divider sx={{ borderBottomWidth: 3 }} />
                </FlexCol>


                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 15,
                        right: 25,
                        color: "#FFF",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 0, sm: '25px' } }}>
            <FlexCol gap={3}>
                    <GlassBanner sx={{background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)'}}>
                        <FlexCol justifyContent='space-between' gap={2}>
                            <H1 fontSize={16} color="#FFF" pb={1} >
                                Complete your brand’s page to unlock tools that elevate your presence and give consumers the confidence to buy—from anywhere.
                            </H1>
                            <FlexCol>
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
                        
                    <SellerSettingsForm
                        user={userData}
                        entityName={entityName}
                        setEntityName={setEntityName}
                        emailSupport={emailSupport}
                        setEmailSupport={setEmailSupport}
                        phoneSupport={phoneSupport}
                        setPhoneSupport={setPhoneSupport}
                        description={description}
                        setDescription={setDescription}
                        tagLine={tagLine}
                        setTagLine={setTagLine}
                        uploadedLogo={uploadedLogo}
                        setUploadedLogo={setUploadedLogo}
                        uploadedBanner={uploadedBanner}
                        setUploadedBanner={setUploadedBanner}
                        web={web}
                        setWeb={setWeb}
                        instagram={instagram}
                        setInstagram={setInstagram}
                        twitter={twitter}
                        setTwitter={setTwitter}
                        youtube={youtube}
                        setYoutube={setYoutube}
                        facebook={facebook}
                        setFacebook={setFacebook}
                    /> {/*  */}
                </FlexCol>
            </DialogContent>

            <DialogActions>
                <FlexBox p={3} width="100%" justifyContent="flex-end" >
                    <Button sx={styles.btn} onClick={handleSubmit}>
                        {
                            loading ? <CircularProgress size={24} color="inherit" />
                            : "Submit"
                        }
                        </Button>
                </FlexBox>
            </DialogActions>
        </Dialog>
    );
};

export default SellerProfileDialog;

const styles = {
    btn: {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(50px)',
        borderRadius: '30px',
        color: '#FFF',
        px: 2,
        fontSize: { xs: 12, sm: 16 },
        fontWeight: 500,
        '&:hover': {
            background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    }
};

const requirements = [
    "Reduce Returns by improving Consumers’ Confidence when Shopping",
    "Gauge Demand before manufacturing through interactive 3D engagement",
    "Personalized shopping experiences for all by cross referencing product size charts  "
];
