import multer from 'multer';
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false,  // Disable Next.js's built-in body parser for file uploads
  },
};

// Helper to convert uploaded models to GLTF
const convertToGltf = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const command = `assimp export ${inputPath} ${outputPath} --format gltf2`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting model: ${stderr}`);
        return reject(error);
      }
      resolve(stdout);
    });
  });
};

// Handler to process the upload and conversion
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Handle file upload
  const uploadMiddleware = upload.single('model');

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    const file = req.file;
    const inputPath = file.path;
    const outputPath = path.join('converted', `${path.parse(file.originalname).name}.gltf`);

    try {
      // Ensure output directory exists
      if (!fs.existsSync('converted')) fs.mkdirSync('converted');

      // Convert the uploaded model to GLTF
      await convertToGltf(inputPath, outputPath);

      res.status(200).json({ message: 'Conversion successful', url: `/converted/${path.basename(outputPath)}` });
    } catch (error) {
      res.status(500).json({ error: 'Conversion failed', details: error.message });
    } finally {
      // Clean up the uploaded file
      fs.unlinkSync(inputPath);
    }
  });
};

export default handler;
