import React, { Suspense, useState } from "react";
import { Box, Button, Divider, Drawer, Grid, Typography, TextField } from "@mui/material";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FlexBox } from "../../../../components/flex-box";
import * as THREE from "three"; // Ensure Three.js is imported

// 1. Extend the Three.js namespace to include all loaded GLTF components
extend(THREE);

const ModelViewer = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={0.5} />;
};

const DropZone3D = ({ onModelUpload }) => {
  const [modelFiles, setModelFiles] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModelDrawerOpen, setIsModelDrawerOpen] = useState(false); // State for the second drawer
  const [selectedModel, setSelectedModel] = useState(null); // State for selected model

  const models = [
    { id: 1, name: "Model 1", url: "/path/to/model1.glb" },
    { id: 2, name: "Model 2", url: "/path/to/model2.glb" },
    { id: 3, name: "Model 3", url: "/path/to/model3.glb" },
    // Add more 3D models here
  ];

  const handleModelDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setModelFiles((prevModels) => [...prevModels, ...newFiles]);
    onModelUpload(newFiles);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const toggleModelDrawer = () => {
    setIsModelDrawerOpen((prev) => !prev); // Toggle the second drawer
  };

  const handleModelSelect = (modelUrl) => {
    setSelectedModel(modelUrl);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <FlexBox
        py={4}
        px={{ md: 10, xs: 4 }}
        minHeight="200px"
        alignItems="center"
        borderRadius="10px"
        border="1.5px dashed"
        flexDirection="column"
        borderColor="grey.300"
        justifyContent="center"
        textAlign="center"
        bgcolor="grey.200"
        sx={{ transition: "all 250ms ease-in-out", outline: "none" }}
      >
        <FlexBox gap={2}>
          <Button
            type="button"
            variant="outlined"
            color="info"
            sx={{ px: 4, my: 4 }}
            onClick={toggleModelDrawer} // Open the second drawer on click
          >
            Generate 3D model
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="info"
            sx={{ px: 4, my: 4 }}
            onClick={toggleDrawer} // Toggle the drawer on click
          >
            Select Existing
          </Button>
        </FlexBox>

        <Typography color="grey.600">Upload .glb file only</Typography>

        {/* 3D Model Viewer */}
        {/* {selectedModel && (
          <Canvas style={{ width: "100%", height: "400px" }}>
            <Suspense fallback={<span>Loading 3D model...</span>}>
              <OrbitControls />
              <ambientLight intensity={0.5} />
              <ModelViewer modelUrl={selectedModel} />
            </Suspense>
          </Canvas>
        )} */}
      </FlexBox>

      {/* MUI Drawer component - opens from the bottom */}
      <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box p={2} width="auto" sx={{ height: "40vh", overflowY: "auto" }} role="presentation">
          <Typography variant="h5">Select a 3D Model</Typography>
          <Divider sx={{ my: 2 }} />

          {/* Display list of 3D models horizontally */}
          <Grid container spacing={2} sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {models.map((model) => (
              <Grid item key={model.id}>
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    border: "1px solid grey",
                    borderRadius: "8px",
                    textAlign: "center",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleModelSelect(model.url)} // Select the model
                >
                  {/* Render the 3D model directly in the drawer */}
                  {/* <Canvas style={{ width: "100%", height: "100px" }}>
                    <Suspense fallback={<span>Loading...</span>}>
                      <OrbitControls enableZoom={false} />
                      <ambientLight intensity={0.5} />
                      <ModelViewer modelUrl={model.url} />
                    </Suspense>
                  </Canvas> */}
                  <Typography variant="body2">{model.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Drawer>

      {/* Second MUI Drawer component - opens from the bottom when Generate 3D Model is clicked */}
      <Drawer anchor="bottom" open={isModelDrawerOpen} onClose={toggleModelDrawer}>
        <Box p={2} width="auto" sx={{ height: "30vh" }} role="presentation">
          <Typography variant="h5">Generate 3D Model</Typography>
          <Divider sx={{ my: 2 }} />

          {/* Input field inside the second drawer */}
          <TextField
            label="Enter Model Name"
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
          />
          <input type="file" />
        </Box>
      </Drawer>
    </>
  );
};

export default DropZone3D;
