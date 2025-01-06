import React from 'react'
import { FlexBox } from '../flex-box';
import { TitleCard } from '../dialog/components';
import { Small } from '../Typography';
import { Box, TextField, InputAdornment } from "@mui/material";


function MeasurementForm ({
    setIsMetric, 
    isMetric,
    height,
    setHeight,
    weight,
    setWeight,
    chest,
    setChest,
    waist,
    setWaist,
    isMobile,
    sidebar=false,
    isEdit=true
}) {
    const toggleUnit = (unit) => {
        setIsMetric(unit === "metric");
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
            kg: isMetric ? value : Math.round(value / 2.20462),
            lbs: isMetric ? Math.round(value * 2.20462) : value,
        });
    };

    const handleChange = (e, setter) => {
        const value = parseFloat(e.target.value || "0");
        setter(value);
    };
    
  return (
    <Box sx={{ width: '100%' }}>
        <FlexBox justifyContent="space-between" flexDirection={isMobile || sidebar ? 'column' : 'row'} >
            <TitleCard
                title="Measurements"
                subTitle="Add your measurements to get a perfect fit with recommended sizes."
                isMobile={isMobile}
            />

            {/** TOGGLE **/}
            <FlexBox justifyContent={isMobile || sidebar ? 'flex-start' : 'flex-end'} alignItems="center" mt={2}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "25px",
                    overflow: "hidden",
                    width: "125px",
                    height: "35px",
                    border: "1px solid #E4E4E7",
                    position: "relative",
                }}>
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: isMetric ? 0 : "50%",
                        width: "50%",
                        height: "100%",
                        backgroundColor: "#1A1A1A",
                        border: "1px solid white",
                        borderRadius: "50px",
                        transition: "left 0.3s ease",
                        zIndex: 1,
                    }} />
                    <Box sx={{
                        fontSize: '12px',
                        zIndex: 2,
                        width: "50%",
                        height: "100%",
                        textAlign: "center",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        padding: "10px 0"
                    }} onClick={() => toggleUnit("metric")}>
                        cm/kg
                    </Box>
                    <Box sx={{
                        fontSize: '12px',
                        zIndex: 2,
                        width: "50%",
                        height: "100%",
                        textAlign: "center",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        padding: "10px 0"
                    }} onClick={() => toggleUnit("imperial")}>
                        inch/lbs
                    </Box>
                </Box>
            </FlexBox>
        </FlexBox>
        <FlexBox justifyContent={isMobile ? 'center' : 'space-between'}
            flexDirection={isMobile ? 'column' : 'row'}
            gap={isMobile ? 2 : 3}
            mt={3}
        >
            {/* Height Section */}
            <FlexBox flexDirection="column" gap={1} flex="1">
                <Small color="white" textAlign="left">
                    Height
                </Small>
                {isMetric ? (
                    <TextField
                        value={height.cm}
                        onChange={(e) => handleHeightChange(e, 'cm')}
                        disabled={!isEdit}
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
                            disabled={!isEdit}
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
                            disabled={!isEdit}
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
            <FlexBox flexDirection="column" gap={1} flex="1">
                <Small color="white" textAlign="left">
                    Weight
                </Small>
                <TextField
                    value={isMetric ? weight.kg : weight.lbs}
                    onChange={handleWeightChange}
                    disabled={!isEdit}
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
                                {isMetric ? 'kg' : 'lbs'}
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

            {/* Chest Section */}
            {!sidebar &&
                <FlexBox flexDirection="column" gap={1} flex="1">
                    <Small color="white" textAlign="left">
                        Chest
                    </Small>
                    <TextField
                        value={chest}
                        onChange={(e) => handleChange(e, setChest)}
                        disabled={!isEdit}
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
                </FlexBox>
            }

            {/* Waist Section */}
            {!sidebar &&
                <FlexBox flexDirection="column" gap={1} flex="1">
                    <Small color="white" textAlign="left">
                        Waist
                    </Small>
                    <TextField
                        value={waist}
                        onChange={(e) => handleChange(e, setWaist)}
                        disabled={!isEdit}
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
                </FlexBox>
            }
        </FlexBox>
    </Box>
  )
}

export default MeasurementForm