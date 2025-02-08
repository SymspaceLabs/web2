import { useState } from 'react';

export default function UploadModel() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('model', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      setMessage(`Success! Download the GLTF file here: ${result.url}`);
    } else {
      setMessage(`Error: ${result.error}`);
    }
  };

  return (
    <div>
      <h1>Upload and Convert 3D Model to GLTF</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".obj,.fbx,.stl,.dae" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
