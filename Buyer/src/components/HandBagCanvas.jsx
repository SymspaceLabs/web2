"use client"

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";

const Model = ({ isMobile }) => {
  const { scene } = useGLTF("/models/handBag/scene.gltf");

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
          enableRotate={false}
          enablePan={false}
        />

        {/* <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        /> */}
        <Model isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default HandBagCanvas;