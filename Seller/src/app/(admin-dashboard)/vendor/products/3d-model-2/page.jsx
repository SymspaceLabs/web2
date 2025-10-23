"use client"

import * as THREE from 'three'
import { useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { 
  useGLTF, 
  MeshRefractionMaterial, 
  AccumulativeShadows, 
  RandomizedLight, 
  Environment, 
  Center, 
  PresentationControls,
  Html 
} from '@react-three/drei';
// import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { RGBELoader } from 'three-stdlib'
import { HexColorPicker } from 'react-colorful';
import dynamic from 'next/dynamic';


// =========================================================================
// 1. DEFINE RING COMPONENT *BEFORE* IT IS USED (or move it to another file)
// =========================================================================

function Ring({ map, ...props }) {
  const [color, setColor] = useState('white')
  // NOTE: Ensure '/ring-transformed.glb' exists in your /public directory
  const { nodes, materials } = useGLTF('/ring-transformed.glb') 

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.diamonds.geometry}>
        <MeshRefractionMaterial envMap={map} aberrationStrength={0.02} toneMapped={false} />
      </mesh>
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.ring.geometry} 
        material={materials.ring} 
        material-color={color} 
        material-envMapIntensity={4} 
      />
      
      {/* Color picker HTML content */}
      <Html position={[0.25, 0.1, 2.75]} scale={0.15} rotation={[Math.PI / 2, 0, 0]} transform>
        <HexColorPicker 
          className="picker" 
          color={color} 
          onChange={setColor} 
          style={{
            position: 'absolute', 
            top: '74px', 
            left: '70px', 
            width: '90px', 
            height: '90px' 
          }} 
        />
      </Html>
    </group>
  )
}

/// =========================================================================
// CORE SCENE COMPONENT
// =========================================================================
function ProductReviewsContent() {
  // useLoader is the primary source of the ProgressEvent ReferenceError
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr')
  texture.mapping = THREE.EquirectangularReflectionMapping

  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 35, near: 1, far: 30 }}>
        <color attach="background" args={['#f0f0f0']} />
        <ambientLight />
        <Environment map={texture} />
        <PresentationControls
          global
          config={{ mass: 1, tension: 250, friction: 25 }}
          snap={{ mass: 2, tension: 250, friction: 50 }}
          zoom={1.25}
          rotation={[0.5, 0.5, 0]}
          polar={[-Math.PI / 5, Math.PI / 4]}
          azimuth={[-Math.PI / 1.75, Math.PI / 4]}>
          <group position={[0, -3, 0]}>
            <Center top>
              <Ring map={texture} rotation={[-Math.PI / 2.05, 0, 0]} scale={3} />
            </Center>
            <AccumulativeShadows temporal frames={100} alphaTest={0.95} opacity={1} scale={20}>
              <RandomizedLight amount={8} radius={10} ambient={0.5} position={[0, 10, -2.5]} bias={0.001} size={3} />
            </AccumulativeShadows>
          </group>
        </PresentationControls>
        {/* Postprocessing effects were removed to resolve compilation error */}
      </Canvas>
    </>
  );
}

// =========================================================================
// DEFAULT EXPORT WRAPPER (Retaining the SSR fix)
// =========================================================================

// This dynamically imports the component and forces it to only load on the client side (ssr: false).
const DynamicProductReviews = dynamic(
  () => Promise.resolve(ProductReviewsContent),
  { 
    ssr: false, 
    // Show a fallback while the component is loading on the client
    loading: () => (
      <div 
        style={{ 
          height: '500px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f0f0f0'
        }}>
          <p>Loading 3D Viewer...</p>
      </div>
    )
  }
);

// The actual page export now returns the dynamically imported component.
export default function ProductReviews() {
  return <DynamicProductReviews />;
}

// Preload the GLTF file to ensure the browser has it ready quicker
useGLTF.preload('/ring-transformed.glb');