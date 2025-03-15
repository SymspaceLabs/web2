"use client";

import React, { Suspense, useEffect, useState } from "react";
// import { Canvas, extend } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// import CanvasLoader from "./Loader";
// import * as THREE from "three";

// Extend React Three Fiber's namespace for any custom GLTF components
// extend(THREE);

// const Computers = ({ gltfPath, isMobile }) => {
//   const { scene } = useGLTF(gltfPath); // useGLTF handles async loading internally

//   return (
//     <mesh>
//       <hemisphereLight intensity={0.15} groundColor="black" />
//       <spotLight
//         position={[-20, 50, 10]}
//         angle={0.12}
//         penumbra={1}
//         intensity={1}
//         castShadow
//         shadow-mapSize={1024}
//       />
//       <pointLight intensity={1} />
//       <directionalLight position={[0, 0, 10]} intensity={1} />
//       <primitive
//         object={scene}
//         scale={isMobile ? 1 : 1.5} // Reduce size on mobile
//         position={isMobile ? [0, -10, -8] : [0, -18, -8]} // Adjust position for mobile
//         rotation={[0, 0, 0]}
//       />
//     </mesh>
//   );
// };

const DynamicCanvas = ({ gltfPath }) => {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 768px)");
  //   setIsMobile(mediaQuery.matches);

  //   const handleMediaQueryChange = (event) => {
  //     setIsMobile(event.matches);
  //   };

  //   const debouncedHandleChange = (event) => {
  //     clearTimeout(handleMediaQueryChange.debounceTimeout);
  //     handleMediaQueryChange.debounceTimeout = setTimeout(
  //       () => handleMediaQueryChange(event),
  //       100
  //     );
  //   };

  //   mediaQuery.addEventListener("change", debouncedHandleChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", debouncedHandleChange);
  //     clearTimeout(handleMediaQueryChange.debounceTimeout);
  //   };
  // }, []);

  // return (
  //   <Canvas
  //     frameloop="demand"
  //     shadows
  //     dpr={[1, 2]}
  //     camera={{ position: [26, 25, 5], fov: isMobile ? 30 : 25 }}
  //     gl={{ preserveDrawingBuffer: true }}
  //     style={{ width: "100%", height: isMobile ? "400px" : "750px" }}
  //   >
  //     <Suspense fallback={<CanvasLoader />}>
  //       <OrbitControls
  //         enableZoom={false}
  //         maxPolarAngle={Math.PI / 2}
  //         minPolarAngle={Math.PI / 2}
  //       />
  //       <Computers gltfPath={gltfPath} isMobile={isMobile} />
  //     </Suspense>
  //     <Preload all />
  //   </Canvas>
  // );
  return <></>;
};

export default DynamicCanvas;
