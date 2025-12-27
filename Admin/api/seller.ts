// api/seller.ts
import { API_ENDPOINTS, authFetch } from "@/lib/api"
import { Seller } from "@/types/seller.type"

export async function getSeller(id: string): Promise<Seller> {
  const response = await authFetch(`${API_ENDPOINTS.sellers}/${id}`)
  return response
}

export async function updateSeller(id: string, data: Partial<Seller>): Promise<Seller> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${id}`;
  const response = await authFetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
  return response
}

export async function deleteSeller(id: string): Promise<void> {
  await authFetch(`${API_ENDPOINTS.sellers}/${id}`, {
    method: "DELETE",
  })
}

export async function getAllSellers(): Promise<Seller[]> {
  const response = await authFetch(API_ENDPOINTS.sellers)
  return Array.isArray(response) ? response : response.sellers || []
}