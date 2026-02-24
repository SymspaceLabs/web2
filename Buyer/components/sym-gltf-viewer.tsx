'use client';

import JSZip from 'jszip';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, useFBX, Html } from '@react-three/drei';
import { Suspense, useState, useEffect, JSX, Component, ReactNode } from 'react';
import { Group, Mesh, Material } from 'three';

import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

interface ModelProps {
  url: string;
}

interface SymGLTFViewerProps {
  modelUrl: string;
}

// ============================================================================
// ERROR BOUNDARY — catches 403s, missing files, and any Three.js crash
// ============================================================================

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('SymGLTFViewer: failed to load model —', error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5">
          <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          <p className="text-white/30 text-sm font-elemental lowercase">3d model unavailable</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// MODEL
// ============================================================================

function Model({ url }: ModelProps): JSX.Element | null {
  const isZip = url.toLowerCase().endsWith('.zip');
  const isFBX = url.toLowerCase().endsWith('.fbx');
  const isGLTF = url.toLowerCase().endsWith('.gltf') || url.toLowerCase().endsWith('.glb');

  const [gltfFromZip, setGltfFromZip] = useState<GLTF | null>(null);

  useEffect(() => {
    if (!isZip) return;

    const loadZipAndModel = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ZIP: ${response.status} ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        const gltfFiles = zip.file(/\.gltf$/i);
        const glbFiles = zip.file(/\.glb$/i);
        const modelFile = gltfFiles[0] || glbFiles[0];

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

  if (isZip) {
    if (!gltfFromZip) return null;
    return <primitive object={gltfFromZip.scene} scale={0.5} />;
  } else if (isFBX) {
    const fbx = useLoader(FBXLoader, url) as Group;

    useEffect(() => {
      if (fbx) {
        fbx.traverse((child) => {
          if ((child as Mesh).isMesh) {
            const mesh = child as Mesh;
            mesh.geometry.computeVertexNormals();

            if (mesh.material) {
              const material = mesh.material as Material & {
                isMeshStandardMaterial?: boolean;
                metalness?: number;
                roughness?: number;
              };

              if (material.isMeshStandardMaterial) {
                material.metalness = material.metalness === undefined ? 0 : material.metalness;
                material.roughness = material.roughness === undefined ? 1 : material.roughness;
              }
              material.needsUpdate = true;
            }
          }
        });
      }
    }, [fbx]);

    return <primitive object={fbx} scale={0.5} />;
  } else if (isGLTF) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={0.5} />;
  } else {
    console.warn(`Unsupported model format for URL: ${url}`);
    return <Html center><p>Unsupported model format</p></Html>;
  }
}

// ============================================================================
// LOADER
// ============================================================================

function Loader(): JSX.Element {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </Html>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export default function SymGLTFViewer({ modelUrl }: SymGLTFViewerProps): JSX.Element {
  return (
    <ModelErrorBoundary>
      <div className="w-full h-[50vh]">
        <Canvas camera={{ position: [0, 0, 150], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={5} color="#ffffff" />
          <directionalLight position={[-5, 5, 10]} intensity={2} color="#cccccc" />

          <Suspense fallback={<Loader />}>
            <Stage environment="city" intensity={1.2}>
              <Model url={modelUrl} />
            </Stage>
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </ModelErrorBoundary>
  );
}