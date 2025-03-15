"use client"

import { useState } from "react";
import Shoe3D from '../components/Shoe3D';
import Shirt3D from '../components/Shirt3D';
import { Box, Typography } from "@mui/material";
import { FlexBox } from "../../../../../components/flex-box";

const models = [
  { name: "Shoe Model" },
  { name: "Ring Model" },
  { name: "Shirt Model"  }
];

function ProductReviews() {
  const [selectedModel, setSelectedModel] = useState(1);

  return (
    <div>
      
      {/* Dropdown or buttons to switch between models */}
      <FlexBox style={{ marginBottom: "20px" }}>
        {models.map((model, index) => (
          <Box key={index} sx={{ width: 150, height: 150, border: "1px solid grey", borderRadius: "8px", textAlign: "center", padding: "10px", cursor: "pointer", }}
            onClick={() => setSelectedModel(index+1)}  >
            <Typography variant="body2">{model.name}</Typography>
          </Box>
        ))}
        
      </FlexBox>

      {/* Render the selected 3D model */}
      {selectedModel==1?
        <Shoe3D />:
        selectedModel==3?
        <Shirt3D />:""
      }
      
      
      
    </div>
  );
}

export default ProductReviews;
