// Page to display 3D models from the VPS API

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelViewer from '../components/ModelViewer';

export default function ModelsPage() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        // Fetch model metadata from the VPS API
        axios.get('https://your-vps-url.com/api/models') // Should be the URL of the VPS server
            .then(response => setModels(response.data))
            .catch(error => console.error('Error fetching models:', error));
    }, []);

    return (
        <div className="models-container">
            <h1>3D Models</h1>
            <div className="model-list">
                {models.map(model => (
                    <div key={model.id} className="model-item">
                        <h3>{model.name}</h3>
                        <p>{model.description}</p>
                        <Canvas style={{ height: '400px' }}>
                            <OrbitControls />
                            <ambientLight />
                            <ModelViewer url={`https://your-vps-url.com${model.url}`} /> /* Change the URL to the VPS server here also */
                        </Canvas>
                    </div>
                ))}
            </div>
        </div>
    );
}
