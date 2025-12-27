// ===================================
// FILE: types/media.types.ts
// ===================================

export type ImageWithLoading = {
  id: string;
  url: string;
  colorId: string | null;
  sortOrder: number;
  isUploading?: boolean;
  uploadProgress?: number;
  error?: string;
  file?: File; // For retry functionality
}

export type ModelWithLoading = {
  id: string;
  url: string;
  colorId: string | null;
  fileName: string;
  fileSize: number;
  isUploading?: boolean;
  uploadProgress?: number;
}

export type Color = {
  id: string;
  name: string;
  code: string;
}