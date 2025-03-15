import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ModelViewer({ url }) {
    const gltf = useLoader(GLTFLoader, url);

    return (
        <primitive object={gltf.scene} scale={1.5} />
    );
}
