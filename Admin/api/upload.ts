const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function uploadImage(file: File, folder: string = 'images'): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch(`${API_BASE_URL}/upload/file`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) throw new Error('Upload failed')
  
  const data = await response.json()
  return data.url
}