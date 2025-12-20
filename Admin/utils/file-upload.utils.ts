import { uploadImage } from "@/api/upload";

// =========================================
// Uploads a raw File object to the Minio backend and returns the resulting URL.
// @param {File} file - The raw file object from the user's input.
// @returns {Promise<string>} The permanent public URL of the uploaded file.
// =========================================
export const uploadFileToBackend = async (file: File): Promise<string> => {
  try {
    return await uploadImage(file);
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

// ==========================================
// Formats bytes to human-readable file size
// ==========================================
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};