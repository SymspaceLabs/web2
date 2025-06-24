"use client"

import * as THREE from 'three';
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";

const Model = ({ isMobile }) => {
  const { scene } = useGLTF("/models/xander-vera-cherub-blue-angel-mini-bag/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <directionalLight
        position={[0, 0, 10]}
        intensity={1}
      />
      <primitive
        object={scene}
        scale={isMobile ? 1 : 1.5} // Reduce size on mobile
        position={isMobile ? [0, -10, -8] : [0, -18, -8]} // Adjust position for mobile
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const HandBagCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [26, 25, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ width: '100%', height: isMobile ? '400px' : '750px' }} // Responsive height
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Model isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
  return <></>;
};

export default HandBagCanvas;


// 'use client'

// import * as THREE from "three";
// import React, { Suspense, useEffect, useState, useRef } from "react";
// import { Canvas, useThree } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

// import CanvasLoader from "./Loader";

// const Model = ({ isMobile, setCameraSettings }) => {
//   const { scene } = useGLTF("/models/xander-vera-cherub-blue-angel-mini-bag/scene.gltf");
//   const modelRef = useRef();

//   useEffect(() => {
//     if (modelRef.current) {
//       const box = new THREE.Box3().setFromObject(modelRef.current);
//       const center = new THREE.Vector3();
//       box.getCenter(center);
//       const size = box.getSize(new THREE.Vector3());

//       // Fix: Get the highest and lowest points of the model
//       const minY = box.min.y;
//       const maxY = box.max.y;
//       const adjustedCenter = new THREE.Vector3(center.x, (minY + maxY) / 2, center.z);

//       const maxSize = Math.max(size.x, size.y, size.z);
//       const distance = maxSize * 4; // Zoom further out for full visibility

//       // Fix: Move the camera higher and further back
//       setCameraSettings({
//         position: [adjustedCenter.x, adjustedCenter.y + maxSize * 2, adjustedCenter.z + distance], // Move up and back
//         target: adjustedCenter.toArray(),
//       });

//       // Fix: Normalize model scale
//       modelRef.current.scale.setScalar(1 / maxSize);
//     }
//   }, [scene, setCameraSettings]);

//   return (
//     <mesh ref={modelRef}>
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
//       <primitive object={scene} position={[0, 0, 0]} rotation={[0, 0, 0]} />
//     </mesh>
//   );
// };

// const HandBagCanvas = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [cameraSettings, setCameraSettings] = useState({
//     position: [26, 50, 50], // Move the camera higher initially
//     target: [0, 0, 0],
//   });

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 768px)");
//     setIsMobile(mediaQuery.matches);

//     const handleMediaQueryChange = (event) => setIsMobile(event.matches);
//     mediaQuery.addEventListener("change", handleMediaQueryChange);
//     return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
//   }, []);

//   return (
//     <Canvas
//       frameloop="demand"
//       shadows
//       dpr={[1, 2]}
//       camera={{ position: cameraSettings.position, fov: 40 }} // Increase FOV for a wider view
//       gl={{ preserveDrawingBuffer: true }}
//       style={{ width: "100%", height: isMobile ? "400px" : "750px" }}
//     >
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls
//           enableZoom={true}
//           maxPolarAngle={Math.PI / 2}
//           minPolarAngle={Math.PI / 6} // Allow a slightly lower view
//           target={new THREE.Vector3(...cameraSettings.target)}
//         />
//         <Model isMobile={isMobile} setCameraSettings={setCameraSettings} />
//       </Suspense>
//       <Preload all />
//     </Canvas>
//   );
// };

// export default HandBagCanvas;

