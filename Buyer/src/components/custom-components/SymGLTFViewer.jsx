'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html } from '@react-three/drei';
import React, { Suspense, useState, useEffect } from 'react';
import JSZip from 'jszip';
// Corrected import paths for GLTFLoader and FBXLoader with .js extension
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'; // Import FBXLoader

function Model({ url }) {
  // Determine file type based on the URL extension
  const isZip = url.toLowerCase().endsWith('.zip');
  const isFBX = url.toLowerCase().endsWith('.fbx');
  const isGLTF = url.toLowerCase().endsWith('.gltf') || url.toLowerCase().endsWith('.glb');

  // State to hold the loaded GLTF model from a ZIP file
  const [gltfFromZip, setGltfFromZip] = useState(null);

  // Effect to handle loading ZIP files
  useEffect(() => {
    // Only run this effect if the URL is a ZIP file
    if (!isZip) return;

    const loadZipAndModel = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const arrayBuffer = await response.arrayBuffer(); // Get binary data

        const zip = await JSZip.loadAsync(arrayBuffer); // Load the zip file
        let modelFile = null;

        // Try to find a .gltf or .glb file within the zip
        modelFile = zip.file(/\.gltf$/i)[0] || zip.file(/\.glb$/i)[0];

        if (modelFile) {
          const modelContent = await modelFile.async('arraybuffer'); // Get content as ArrayBuffer
          const loader = new GLTFLoader(); // Use GLTFLoader
          const loadedGltf = await loader.parseAsync(modelContent, ''); // Parse the model
          setGltfFromZip(loadedGltf); // Set the loaded GLTF model
        } else {
          throw new Error('No .gltf or .glb file found inside the zip.');
        }
      } catch (error) {
        console.error("Failed to load or decompress model from ZIP:", error);
      }
    };

    loadZipAndModel();
  }, [url, isZip]); // Re-run if URL or isZip changes

  // Conditional rendering based on file type
  if (isZip) {
    if (!gltfFromZip) {
      return null; // Show nothing or a custom loading indicator while zip is processing
    }
    return <primitive object={gltfFromZip.scene} scale={0.5} />;
  } else if (isFBX) {
    // Use useLoader with FBXLoader for FBX files
    const fbx = useLoader(FBXLoader, url);
    return <primitive object={fbx} scale={0.5} />;
  } else if (isGLTF) {
    // Use useGLTF for direct GLTF/GLB files
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={0.5} />;
  } else {
    // Handle unsupported file types
    console.warn(`Unsupported model format for URL: ${url}`);
    return <Html center><p>Unsupported model format</p></Html>;
  }
}

function Loader() {
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="loader" />
        <style>{`
          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Html>
  );
}

export default function SymGLTFViewer({ modelUrl }) {
  return (
    <div style={{ width: '100%', height: '50vh'  }}> {/* Added background for better visibility */}
      <Canvas camera={{ position: [0, 0, 150], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={<Loader />}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
