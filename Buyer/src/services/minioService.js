// src/services/minioService.js (or similar)

/**
 * Uploads a file to the MinIO server endpoint.
 * * @param {File} fileObject The JavaScript File object to upload.
 * @returns {Promise<{imageUrl: string}>} An object containing the public URL of the uploaded image.
 * @throws {Error} Throws an error if the upload fails or returns an invalid response.
 */
export async function uploadFileToMinIO(fileObject) {
  // Check if the environment variable is available
  const DEV_SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL; 

  if (!DEV_SERVER_URL) {
    throw new Error("NEXT_PUBLIC_DEV_SERVER environment variable is not set.");
  }
  
  const endpoint = `${DEV_SERVER_URL}/upload/file`;

  // 1. Create FormData object
  // MinIO endpoint requires 'multipart/form-data' body format with key 'file'
  const formData = new FormData();
  formData.append('file', fileObject, fileObject.name);

  try {
    // 2. Make the POST request
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    // Check if the status code indicates success (201 Created in your screenshot)
    if (response.ok && (response.status === 200 || response.status === 201)) {
      const data = await response.json();
      
      // 3. Extract the URL from the response body (as seen in your screenshot)
      if (data.url) {
        return { imageUrl: data.url };
      } else {
        throw new Error("MinIO upload successful but 'url' field is missing in the response.");
      }
    } else {
      // Handle HTTP error responses
      const errorText = await response.text();
      throw new Error(`MinIO Upload failed with status ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error("Error during MinIO file upload:", error);
    // Re-throw the error to be handled by the parent component's handleSave
    throw error; 
  }
}