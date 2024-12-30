import { useState,  } from "react";
import { Grid, Card, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Select, MenuItem } from "@mui/material";
import TitleCard from "./TitleCard";

const Preferences = ({isMobile}) => {

    const [gender, setGender] = useState();
    const [style, setStyle] = useState("");
    const [fit, setFit] = useState("");
    const [color, setColor] = useState("");
    const [sizeTops, setSizeTops] = useState("");
    const [sizeBottoms, setSizeBottoms] = useState("");
    const [sizeOuterwear, setSizeOuterwear] = useState("");
  
    const inputStyle = {
      background: "#000",
      borderRadius: "5px",
      color: "#fff",
      "& .MuiInputBase-root": { color: "#fff" },
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
      "& .MuiSelect-icon": { color: "#fff" },
    };
  
    return (
      <Card
        sx={{
          borderRadius: "15px",
          textAlign: "left",
          width: "100%",
          color: "#fff",
          mt: 3,
          p: "1.5rem",
          background:
            "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
          boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)",
          backdropFilter: "blur(12px)",
        }}
      >
        <TitleCard
            title="Preferences"
            subTitle="Share your style and size preferences for tailored recommendations."
            isMobile={isMobile}
        />
  
        {/* GENDER */}
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <RadioGroup
            row
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value="male"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Female"
            />
            <FormControlLabel
              value="both"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Both"
            />
          </RadioGroup>
        </FormControl>
  

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* STYLE */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 1, color: "#fff" }}>Style</Typography>
                <Select value={style} displayEmpty sx={inputStyle}
                    onChange={(e) => setStyle(e.target.value)}
                    inputProps={{ "aria-label": "Style" }}
                >
                    <MenuItem value="" disabled>
                        Select style
                    </MenuItem>
                    {styleOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
          </Grid>

          {/* PREFERRED FIT */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 1, color: "#fff" }}>Preferred Fit</Typography>
                <Select value={fit} onChange={(e) => setFit(e.target.value)} displayEmpty inputProps={{ "aria-label": "Preferred Fit" }} sx={inputStyle}>
                    <MenuItem value="" disabled>Select Fit</MenuItem>
                    <MenuItem value="regular">Regular</MenuItem>
                    <MenuItem value="slim">Slim</MenuItem>
                    <MenuItem value="loose">Loose</MenuItem>
                </Select>
            </FormControl>
          </Grid>

          {/* PREFERRED COLORS */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 1, color: "#fff" }}>Preferred Colors</Typography>
                <Select value={color} onChange={(e) => setColor(e.target.value)} displayEmpty inputProps={{ "aria-label": "Preferred Colors" }} sx={inputStyle}>
                    <MenuItem value="" disabled>Select Color</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                </Select>
            </FormControl>
          </Grid>

          {/* PREFERRED SIZE - TOPS */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth  sx={{ mb: 1 }}>
                <Typography sx={{ mb: 1, color: "#fff" }}>Preferred Size - Tops</Typography>
                <Select value={sizeTops} onChange={(e) => setSizeTops(e.target.value)} displayEmpty sx={inputStyle} inputProps={{ "aria-label": "Preferred Size - Tops" }}>
                    <MenuItem value="" disabled>Select Size</MenuItem>
                    <MenuItem value="s">Small</MenuItem>
                    <MenuItem value="m">Medium</MenuItem>
                    <MenuItem value="l">Large</MenuItem>
                </Select>
            </FormControl>
          </Grid>

          {/* PREFERRED SIZE - Bottoms */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth  sx={{ mb: 1 }}>
                <Typography sx={{ mb: 1, color: "#fff" }}>Preferred Size - Bottoms</Typography>
              <Select value={sizeBottoms} displayEmpty sx={inputStyle}
                onChange={(e) => setSizeBottoms(e.target.value)} inputProps={{ "aria-label": "Preferred Size - Bottoms" }}
              >
                <MenuItem value="" disabled>Select Size</MenuItem>
                <MenuItem value="s">Small</MenuItem>
                <MenuItem value="m">Medium</MenuItem>
                <MenuItem value="l">Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* PREFERRED SIZE - Outerwear */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth  sx={{ mb: 1 }}>
              <Typography sx={{ mb: 1, color: "#fff" }}>Preferred Size - Outerwear</Typography>
              <Select value={sizeOuterwear} onChange={(e) => setSizeOuterwear(e.target.value)} displayEmpty sx={inputStyle} inputProps={{ "aria-label": "Preferred Size - Outerwear" }}>
                <MenuItem value="" disabled>Select Size</MenuItem>
                <MenuItem value="s">Small</MenuItem>
                <MenuItem value="m">Medium</MenuItem>
                <MenuItem value="l">Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    );
}

export default Preferences

const styleOptions = [
    "Adaptive Clothing",
    "All Leather",
    "Athleisure",
    "Basic Essentials",
    "Bohemian",
    "Business Casual",
    "Casual Chic",
    "Casual Date Night",
    "Eco-Friendly",
    "Edgy Style",
    "Formalwear",
    "Gothic",
    "High Fashion",
    "Intimates",
    "Loungewear",
    "Maternity",
    "Minimalist",
    "Monochrome",
    "Plus Size",
    "Preppy",
    "Prosthetic-Friendly Designs",
    "Spring Fits",
    "Streetwear",
    "Summer Fits",
    "Vacation Fits",
    "Vintage",
    "Wedding",
    "Wheelchair-Friendly Fashion",
    "Winter Fits",
    "Y2K",
];