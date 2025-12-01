"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { proxy, useSnapshot } from "valtio";
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei';
import { easing } from 'maath';
import Head from 'next/head';
import { Box } from "@mui/material";
import * as React from 'react'; // Ensure React is imported for component definition

const state = proxy({
  intro: false,
  colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  decals: ["react", "three2", "pmndrs"],
  color: "#EFBD4E",
  decal: "three2",
});

// --- Main Exported Component ---
export default function ProductReviews({ position = [0, 0, 2.5], fov = 25 }) {
  // CRITICAL FIX: Use state to track client-side mounting
  const [hasMounted, setHasMounted] = useState(false);
  const canvasRef = useRef();

  // Set hasMounted to true only after the component is mounted in the browser
  useEffect(() => {
    setHasMounted(true);
    // Access document here to attach event source, now guaranteed to be on the client
    if (canvasRef.current) {
      canvasRef.current.eventSource = document.getElementById('root');
    }
  }, []);
  
  // Display loading content or nothing during SSR/initial client load
  if (!hasMounted) {
    return (
      <div style={{ 
        height: '65vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '8px'
      }}>
          Loading 3D Product Customizer...
      </div>
    );
  }

  // Render the heavy, browser-dependent content only after mounting
  return (
    <Box sx={{border:'1px solid black', position:'relative'}}>
      <Head>
        <style>{`
          /* ... (Your original CSS styles) ... */
          html,
          body,
          #root,
          #main {
            overflow: hidden;
          }

          /* CUSTOMIZER */
          .customizer {
            
          }

          .customizer span {
            font-size: 0.8rem;
            font-weight: bold;
            cursor: pointer;
          }

          .customizer span svg {
            width: 24px;
            padding-right: 5px;
          }

          .picker {
            position: absolute !important;
            bottom: 4em;
            left: 50%;
            transform: translateX(-50%);
            width: 120px !important;
            height: 120px !important;
          }

          .color-options {
            
          }

          .circle {
            
          }

          .circle:hover {
            transform: scale(1.2);
            cursor: pointer;
          }

          .decals {
            position: absolute;
            left: 50px;
            bottom: 40px;
          }

          .decals p {
            font-family: 'Inter var';
            font-size: 0.7rem;
            padding-bottom: 15px;
          }

          .decals img {
            width: 24px;
            filter: saturate(0) invert(1) brightness(5.5);
            transition: all 0.2s ease-in-out;
          }

          .decals img:hover {
            filter: none;
            transform: scale(1.2);
            cursor: pointer;
          }

          .decals--position {
            position: absolute;
            left: 20px;
            top: 50%;
            color: #00000056;
            font-size: 0.6rem;
            border: 1px solid #00000000;
            padding: 10px 10px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: border 1s ease;
          }

          .decals--position:hover {
            color: black;
            border: 1px solid #00000056;
          }

          .decals--container {
            display: flex;
            gap: 20px;
          }
        `}</style>
      </Head>
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position, fov }}
        gl={{ preserveDrawingBuffer: true }}
        eventPrefix="client"
        style={{ width: '100%', height: '65vh' }}
      >
        <ambientLight intensity={0.5} />
        {/* Placeholder: Use a local path for Environment or remove if not necessary for initial compile */}
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" /> 
        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Customizer />
      </div>
    </Box>
  );
}
// --- Helper Components (Moved here to be self-contained) ---

function Customizer() {
  const snap = useSnapshot(state)
  return (
    
    <Box sx={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%', marginBottom: '25px' }}>
      <Box sx={{display: 'flex', gap:'10px', marginBottom: '20px' }}>
        {snap.colors.map((color) => (
          <Box 
            key={color}
            sx={{ background: color, width: '30px', height: '30px', borderRadius: '50%', border: '2px solid white', transition: 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)' }}
            onClick={() => (state.color = color)}>
          </Box>
        ))}
      </Box>
      <div className="decals">
        <div className="decals--container">
          {snap.decals.map((decal) => (
            <div key={decal} className={`decal`} onClick={() => (state.decal = decal)}>
              <img src={`/${decal}_thumb.png`} alt="brand" />
            </div>
          ))}
        </div>
      </div>
    </Box>
  )
}

function Backdrop() {
  const shadows = useRef()
  // NOTE: Assuming state.color is always a valid color string for dampC
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta)) 
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

function Shirt(props) {
  const snap = useSnapshot(state)
  // useTexture and useGLTF paths must be resolvable at runtime, assume assets are in /public
  const texture = useTexture(`/${snap.decal}.png`)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))

  return (
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
      {texture && (
        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={texture}
          // map-anisotropy={16}
        />
      )}
    </mesh>
  )
}

// Preload calls should be outside the component render logic if possible
// Though in Next.js/R3F, these patterns are common. Keeping them here.
useGLTF.preload('/shirt_baked_collapsed.glb');
['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
