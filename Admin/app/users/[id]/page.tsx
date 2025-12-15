"use client"

import { useEffect, useState } from "react"
import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { API_ENDPOINTS, authFetch } from "@/lib/api"

interface APIUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "admin" | "seller" | "buyer"
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

interface UIUser {
  id: string
  name: string
  email: string
  role: "admin" | "seller" | "buyer"
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

function mapAPIUserToUI(apiUser: APIUser): UIUser {
  return {
    id: apiUser.id,
    name: `${apiUser.firstName} ${apiUser.lastName}`,
    email: apiUser.email,
    role: apiUser.role,
    status: apiUser.isVerified ? "active" : "inactive",
    createdAt: new Date(apiUser.createdAt).toLocaleDateString(),
    updatedAt: new Date(apiUser.updatedAt).toLocaleDateString(),
  }
}

export default function UserDetailPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const [user, setUser] = useState<UIUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const response = await authFetch(API_ENDPOINTS.user(userId))
        const mappedUser = mapAPIUserToUI(response)
        setUser(mappedUser)
      } catch (err) {
        console.error("[v0] Error fetching user:", err)
        setError("Failed to load user details.")
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading user details...</p>
        </div>
      </ProtectedLayout>
    )
  }

  if (error || !user) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-destructive">{error || "User not found"}</p>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
              <p className="text-muted-foreground mt-1">View user information</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => router.push(`/users/${user.id}/edit`)}>
            Edit User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-lg font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-lg capitalize">{user.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-lg">
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Created At</p>
                  <p className="text-sm font-medium">{user.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">{user.updatedAt}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}
