"use client"

import React, { Suspense, useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// import * as THREE from 'three';

// import CanvasLoader from "./Loader";

// const Computers = ({ isMobile }) => {
//   const computer = useGLTF("./desktop/scene.gltf");

//   return (
//     <mesh>
//       <hemisphereLight intensity={0.15} groundColor='black' />
//       <spotLight
//         position={[-20, 50, 10]}
//         angle={0.12}
//         penumbra={1}
//         intensity={1}
//         castShadow
//         shadow-mapSize={1024}
//       />
//       <pointLight intensity={1} />
//       <directionalLight
//         position={[0, 0, 10]}
//         intensity={1}
//       />
//       <primitive
//         object={computer.scene}
//         scale={isMobile ? 0.1 : 0.15}
//         position={isMobile ? [0, 0, 0] : [0, 0, 0]} // Adjust [x, y, z] position here
//         rotation={[0, 0, 0]}
//       />
//     </mesh>
//   );
// };

const TShirtCanvas = () => {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 500px)");
  //   setIsMobile(mediaQuery.matches);
  //   const handleMediaQueryChange = (event) => {
  //     setIsMobile(event.matches);
  //   };
  //   mediaQuery.addEventListener("change", handleMediaQueryChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", handleMediaQueryChange);
  //   };
  // }, []);

  // return (
  //   <Canvas
  //     frameloop='demand'
  //     shadows
  //     dpr={[1, 2]}
  //     camera={{ position: [26, 25, 5], fov: 25 }}
  //     gl={{ preserveDrawingBuffer: true }}
  //     style={{ width: '750px', height: '750px' }}
  //   >
  //     <Suspense fallback={<CanvasLoader />}>
  //       <OrbitControls
  //         enableZoom={false}
  //         maxPolarAngle={Math.PI / 2}
  //         minPolarAngle={Math.PI / 2}
  //       />
  //       <Computers isMobile={isMobile} />
  //       {/* <axesHelper args={[5]} /> */}
  //     </Suspense>
  //     <Preload all />
  //   </Canvas>
  // );
  return <></>;
};

export default TShirtCanvas;
