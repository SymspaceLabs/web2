/**
 * Uploads a raw GLB/3D Model File object to the Minio/S3 backend and returns the resulting URL.
 * @param {File} file - The raw file object from the user's input (expected to be .glb).
 * @param {(progress: number) => void} onProgress - Optional callback for upload progress (0-100)
 * @returns {Promise<string>} The permanent public URL of the uploaded 3D model.
 */
export const uploadProductModel = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  // 1. Basic Validation
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  // File type validation
  const fileNameLower = file.name.toLowerCase();
  if (!fileNameLower.endsWith('.glb') && !fileNameLower.endsWith('.fbx')) {
    throw new Error(`Invalid file type. Only .glb and .gltf files are supported.`);
  }

  // 2. Prepare FormData
  const formData = new FormData();
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (!data || !data.url) {
            reject(new Error("3D Model upload succeeded, but response is missing the 'url' field."));
          } else {
            resolve(data.url);
          }
        } catch (error) {
          reject(new Error('Failed to parse upload response'));
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(
            `3D Model upload failed: ${xhr.status} ${xhr.statusText} - ${errorData.message || 'Unknown error'}`
          ));
        } catch {
          reject(new Error(`3D Model upload failed: ${xhr.status} ${xhr.statusText}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during 3D model upload'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('3D model upload was aborted'));
    });

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/s3/upload`;
    xhr.open('POST', url);
    xhr.send(formData);
  });
};
