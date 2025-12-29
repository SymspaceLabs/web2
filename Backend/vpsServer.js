// Placeholder for the VPS server that will host the 3D models and serve them to the frontend.
// Upload the 3D model files to public/assets/ on the VPS. We can use nginx to serve static files instead of Express if preferred.

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Database setup (example with models metadata)
const models = [
    { id: 1, name: 'Model A', url: '/assets/modelA.gltf', description: 'A 3D model.' },
    { id: 2, name: 'Model B', url: '/assets/modelB.glb', description: 'Another model.' }
];

// Endpoint to fetch all models
app.get('/api/models', (req, res) => {
    res.json(models);
});

// Serve static model files
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

