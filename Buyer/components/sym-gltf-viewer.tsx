'use client';

import JSZip from 'jszip';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, useFBX, Html } from '@react-three/drei';
import { Suspense, useState, useEffect, JSX } from 'react';
import { Group, Mesh, Material } from 'three';

import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

interface ModelProps {
  url: string;
}

interface SymGLTFViewerProps {
  modelUrl: string;
}

function Model({ url }: ModelProps): JSX.Element | null {
  // Determine file type based on the URL extension
  const isZip = url.toLowerCase().endsWith('.zip');
  const isFBX = url.toLowerCase().endsWith('.fbx');
  const isGLTF = url.toLowerCase().endsWith('.gltf') || url.toLowerCase().endsWith('.glb');

  // State to hold the loaded GLTF model from a ZIP file
  const [gltfFromZip, setGltfFromZip] = useState<GLTF | null>(null);

  // Effect to handle loading ZIP files
  useEffect(() => {
    // Only run this effect if the URL is a ZIP file
    if (!isZip) return;

    const loadZipAndModel = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const arrayBuffer = await response.arrayBuffer();

        const zip = await JSZip.loadAsync(arrayBuffer);
        let modelFile: JSZip.JSZipObject | null = null;

        // Try to find a .gltf or .glb file within the zip
        const gltfFiles = zip.file(/\.gltf$/i);
        const glbFiles = zip.file(/\.glb$/i);
        modelFile = gltfFiles[0] || glbFiles[0];

        if (modelFile) {
          const modelContent = await modelFile.async('arraybuffer');
          const loader = new GLTFLoader();
          const loadedGltf = await loader.parseAsync(modelContent, '');
          setGltfFromZip(loadedGltf);
        } else {
          throw new Error('No .gltf or .glb file found inside the zip.');
        }
      } catch (error) {
        console.error("Failed to load or decompress model from ZIP:", error);
      }
    };

    loadZipAndModel();
  }, [url, isZip]);

  // Conditional rendering based on file type
  if (isZip) {
    if (!gltfFromZip) {
      return null;
    }
    return <primitive object={gltfFromZip.scene} scale={0.5} />;
  } else if (isFBX) {
      const fbx = useLoader(FBXLoader, url) as Group;

      useEffect(() => {
        if (fbx) {
          fbx.traverse((child) => {
            if ((child as Mesh).isMesh) {
              const mesh = child as Mesh;
              // 1. Always compute normals for shading fixes
              mesh.geometry.computeVertexNormals();

              if (mesh.material) {
                const material = mesh.material as Material & {
                  isMeshStandardMaterial?: boolean;
                  metalness?: number;
                  roughness?: number;
                };

                // 2. Fix PBR-related darkness if model is using MeshStandardMaterial
                if (material.isMeshStandardMaterial) {
                  // Default values if they are missing in the FBX data
                  material.metalness = material.metalness === undefined ? 0 : material.metalness;
                  material.roughness = material.roughness === undefined ? 1 : material.roughness;
                }
                
                // 3. Force update the material properties in the renderer
                material.needsUpdate = true;
              }
            }
          });
        }
      }, [fbx]);

      return <primitive object={fbx} scale={0.5} />;
  }  else if (isGLTF) {
    // Use useGLTF for direct GLTF/GLB files
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={0.5} />;
  } else {
    // Handle unsupported file types
    console.warn(`Unsupported model format for URL: ${url}`);
    return <Html center><p>Unsupported model format</p></Html>;
  }
}

function Loader(): JSX.Element {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </Html>
  );
}

export default function SymGLTFViewer({ modelUrl }: SymGLTFViewerProps): JSX.Element {
  return (
    <div className="w-full h-[50vh]">
      <Canvas camera={{ position: [0, 0, 150], fov: 45 }}>
        
        {/* 🌟 ENHANCED LIGHTING: Much higher intensities for maximum visibility 🌟 */}
        
        {/* 1. Ambient Light (Increased from 0.8 to 1.5 for better overall fill) */}
        <ambientLight intensity={1.5} /> 
        
        {/* 2. Primary Directional Light (Increased from 3 to 5 for strong key light) */}
        <directionalLight 
          position={[5, 10, 5]} // Key light (front-top)
          intensity={5} 
          color="#ffffff"
        />

        {/* 3. Secondary Fill Light (Added to reduce harsh shadows and boost overall brightness) */}
        <directionalLight 
          position={[-5, 5, 10]} // Fill light (back-side)
          intensity={2} 
          color="#cccccc" // Slightly softer color
        />

        <Suspense fallback={<Loader />}>
          {/* Stage Environment (Increased from 0.6 to 1.2 to brighten reflections) */}
          <Stage environment="city" intensity={1.2}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}