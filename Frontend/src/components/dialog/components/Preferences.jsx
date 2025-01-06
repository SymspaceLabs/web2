import { useState } from "react";
import { Card } from "@mui/material";
import PreferenceForm from "@/components/forms/PreferenceForm";

const Preferences = ({isMobile}) => {
    const [gender, setGender] = useState();

    const [style, setStyle] = useState("");
    const [fit, setFit] = useState("");
    const [color, setColor] = useState("");
    const [sizeTops, setSizeTops] = useState("");
    const [sizeBottoms, setSizeBottoms] = useState("");
    const [sizeOuterwear, setSizeOuterwear] = useState("");

    const [selectedStyles, setSelectedStyles] = useState([]);
    const [selectedFitType, setSelectedFitType] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);


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

        <PreferenceForm
          gender={gender}
          style={style}
          fit={fit}
          color={color}
          sizeTops={sizeTops}
          sizeBottoms={sizeBottoms}
          sizeOuterwear={sizeOuterwear}
          selectedStyles={selectedStyles}
          selectedFitType={selectedFitType}
          selectedBrands={selectedBrands}
          selectedColors={selectedColors}
          setGender={setGender}
          setStyle={setStyle}
          setFit={setFit}
          setColor={setColor}
          setSizeTops={setSizeTops}
          setSizeBottoms={setSizeBottoms}
          setSizeOuterwear={setSizeOuterwear}
          setSelectedStyles={setSelectedStyles}
          setSelectedFitType={setSelectedFitType}
          setSelectedBrands={setSelectedBrands}
          setSelectedColors={setSelectedColors}
          isMobile={isMobile}
        />
      </Card>
    );
}

export default Preferences