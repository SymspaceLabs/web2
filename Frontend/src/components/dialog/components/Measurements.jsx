import { Card, TextField, InputAdornment, Box } from "@mui/material";
import { FlexBox } from "@/components/flex-box";
import TitleCard from "./TitleCard";
import { Small } from "@/components/Typography";


const Measurements = ({
    setUseMetric, 
    useMetric,
    height,
    setHeight,
    weight,
    setWeight,
    isMobile
}) => {

    const toggleUnit = () => {
        setUseMetric(!useMetric);
    };

    const handleHeightChange = (e, type) => {
        const value = parseInt(e.target.value || "0", 10);
        setHeight((prev) => ({
          ...prev,
          [type]: value,
          ...(type === "feet" || type === "inches"
            ? {
                cm: Math.round((prev.feet * 12 + prev.inches + (type === "feet" ? value * 12 : value)) * 2.54),
              }
            : {
                feet: Math.floor(value / 30.48),
                inches: Math.round((value / 2.54) % 12),
              }),
        }));
    };

    const handleWeightChange = (e) => {
        const value = parseFloat(e.target.value || "0");
        setWeight({
            kg: useMetric ? value : Math.round(value / 2.20462),
            lbs: useMetric ? Math.round(value * 2.20462) : value,
        });
    };

    return (
        <Card sx={{ borderRadius: "15px", textAlign: "left", width: "100%", color: "#fff", mt: isMobile? 0 : 3, p: "1.5rem", background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)", boxShadow:" 0px 1px 24px -1px rgba(0, 0, 0, 0.18)", backdropFilter: "blur(12px)", }}>
            {/*TITLE SECTION */}
            <FlexBox justifyContent="space-between" flexDirection={isMobile ? 'column' : 'row'} >
                <TitleCard
                    title="Measurements"
                    subTitle="Add your measurements to get a perfect fit with recommended sizes."
                    isMobile={isMobile}
                />
                <FlexBox justifyContent={isMobile ? 'flex-start' : 'flex-end'} alignItems="center" mt={2}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "25px", overflow: "hidden", width: "125px", height: "35px", border: "1px solid #E4E4E7", position: "relative", }}>
                        <Box sx={{ position: "absolute", top: 0, left: useMetric ? 0 : "50%", width: "50%", height: "100%", backgroundColor: "#1A1A1A", border: "1px solid white", borderRadius: "50px", transition: "left 0.3s ease", zIndex: 1, }} />
                        <Box sx={{ fontSize:'12px', zIndex: 2, width: "50%", height: "100%", textAlign: "center", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", padding: "10px 0" }} onClick={() => toggleUnit(true)} >
                            cm/kg
                        </Box>
                        <Box sx={{ fontSize:'12px', zIndex: 2, width: "50%", height: "100%", textAlign: "center", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", padding: "10px 0" }} onClick={() => toggleUnit(false)} >
                            inch/lbs
                        </Box>
                    </Box>
                </FlexBox>
            </FlexBox>

            <FlexBox justifyContent={isMobile ? 'center' : 'space-between'}
                flexDirection={isMobile ? 'column' : 'row'} // Switch to column layout on mobile
                gap={isMobile ? 2 : 3} // Adjust gap for mobile
                mt={3}
            >
                {/* Height Section */}
                <FlexBox flexDirection="column" gap={2} flex="1">
                    <Small color="white" textAlign="left">
                        Height
                    </Small>
                    {useMetric ? (
                        <TextField
                            value={height.cm}
                            onChange={(e) => handleHeightChange(e, 'cm')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        sx={{
                                            '& .MuiTypography-root': {
                                                color: 'rgba(200, 200, 200, 0.8)',
                                                fontWeight: 'bold',
                                            },
                                        }}
                                    >
                                        cm
                                    </InputAdornment>
                                ),
                                style: { color: '#fff' },
                            }}
                            sx={{
                                background: '#000',
                                borderRadius: '5px',
                                color: '#fff',
                            }}
                        />
                    ) : (
                        <FlexBox gap={2}>
                            <TextField
                                value={height.feet}
                                onChange={(e) => handleHeightChange(e, 'feet')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    color: 'rgba(200, 200, 200, 0.8)',
                                                    fontWeight: 'bold',
                                                },
                                            }}
                                        >
                                            ft
                                        </InputAdornment>
                                    ),
                                    style: { color: '#fff' },
                                }}
                                sx={{ background: '#000', borderRadius: '5px', color: '#fff' }}
                            />
                            <TextField
                                value={height.inches}
                                onChange={(e) => handleHeightChange(e, 'inches')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    color: 'rgba(200, 200, 200, 0.8)',
                                                    fontWeight: 'bold',
                                                },
                                            }}
                                        >
                                            in
                                        </InputAdornment>
                                    ),
                                    style: { color: '#fff' },
                                }}
                                sx={{ background: '#000', borderRadius: '5px', color: '#fff' }}
                            />
                        </FlexBox>
                    )}
                </FlexBox>

                {/* Weight Section */}
                <FlexBox flexDirection="column" gap={2} flex="1">
                    <Small color="white" textAlign="left">
                        Weight
                    </Small>
                    <TextField
                        value={useMetric ? weight.kg : weight.lbs}
                        onChange={handleWeightChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            color: 'rgba(200, 200, 200, 0.8)',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    {useMetric ? 'kg' : 'lbs'}
                                </InputAdornment>
                            ),
                            style: { color: '#fff' },
                        }}
                        sx={{
                            background: '#000',
                            borderRadius: '5px',
                            color: '#fff',
                        }}
                    />
                </FlexBox>
            </FlexBox>

        </Card>
    )
}

export default Measurements;