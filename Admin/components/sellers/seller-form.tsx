// components/sellers/seller-form.tsx
"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Loader2, Upload, X } from "lucide-react"
import { updateSeller } from "@/api/seller"
import { uploadImage } from "@/api/upload"
import { Seller } from "@/types/seller.types"
import { toast } from "sonner"

interface SellerFormProps {
  seller: Seller
  onSellerUpdate?: () => Promise<Seller | void>
}

interface SellerFormData {
  entityName: string
  legalName: string
  ein: string
  slug: string
  website: string
  location: string
  address1: string
  address2: string
  city: string
  state: string
  country: string
  zip: string
  gmv: string
  category: string
  businessPhone: string
  emailSupport: string
  phoneSupport: string
  description: string
  tagLine: string
  logo: string
  banner: string
  web: string
  instagram: string
  twitter: string
  youtube: string
  facebook: string
  isOnboardingFormFilled: boolean
}

export function SellerForm({ seller, onSellerUpdate }: SellerFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const logoFileInputRef = useRef<HTMLInputElement>(null)
  const bannerFileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<SellerFormData>({
    entityName: seller.entityName || "",
    legalName: seller.legalName || "",
    ein: seller.ein || "",
    slug: seller.slug || "",
    website: seller.website || "",
    location: seller.location || "",
    address1: seller.address1 || "",
    address2: seller.address2 || "",
    city: seller.city || "",
    state: seller.state || "",
    country: seller.country || "",
    zip: seller.zip || "",
    gmv: seller.gmv || "",
    category: seller.category || "",
    businessPhone: seller.businessPhone || "",
    emailSupport: seller.emailSupport || "",
    phoneSupport: seller.phoneSupport || "",
    description: seller.description || "",
    tagLine: seller.tagLine || "",
    logo: seller.logo || "",
    banner: seller.banner || "",
    web: seller.web || "",
    instagram: seller.instagram || "",
    twitter: seller.twitter || "",
    youtube: seller.youtube || "",
    facebook: seller.facebook || "",
    isOnboardingFormFilled: seller.isOnboardingFormFilled || false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof SellerFormData, string>>>({})

  const handleInputChange = (field: keyof SellerFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  /**
   * Uploads a raw File object to the Minio backend and returns the resulting URL.
   */
  const uploadFileToBackend = async (file: File): Promise<string> => {
    try {
      return await uploadImage(file)
    } catch (error) {
      console.error("Image upload failed:", error)
      throw error
    }
  }

  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a valid image file (JPG, PNG, GIF, or WebP)",
      })
      return
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("File too large", {
        description: "Please upload an image smaller than 5MB",
      })
      return
    }

    setUploadingLogo(true)
    try {
      const imageUrl = await uploadFileToBackend(file)
      handleInputChange('logo', imageUrl)
      
      toast.success("Logo uploaded", {
        description: "Your logo has been uploaded successfully",
      })
    } catch (error) {
      toast.error("Upload failed", {
        description: "Failed to upload logo. Please try again.",
      })
    } finally {
      setUploadingLogo(false)
      if (logoFileInputRef.current) {
        logoFileInputRef.current.value = ''
      }
    }
  }

  // Handle banner upload
  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a valid image file (JPG, PNG, GIF, or WebP)",
      })
      return
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("File too large", {
        description: "Please upload an image smaller than 5MB",
      })
      return
    }

    setUploadingBanner(true)
    try {
      const imageUrl = await uploadFileToBackend(file)
      handleInputChange('banner', imageUrl)
      
      toast.success("Banner uploaded", {
        description: "Your banner has been uploaded successfully",
      })
    } catch (error) {
      toast.error("Upload failed", {
        description: "Failed to upload banner. Please try again.",
      })
    } finally {
      setUploadingBanner(false)
      if (bannerFileInputRef.current) {
        bannerFileInputRef.current.value = ''
      }
    }
  }

  // Remove uploaded logo
  const handleRemoveLogo = () => {
    handleInputChange('logo', '')
    if (logoFileInputRef.current) {
      logoFileInputRef.current.value = ''
    }
  }

  // Remove uploaded banner
  const handleRemoveBanner = () => {
    handleInputChange('banner', '')
    if (bannerFileInputRef.current) {
      bannerFileInputRef.current.value = ''
    }
  }

  // Trigger file input click
  const triggerLogoUpload = () => {
    logoFileInputRef.current?.click()
  }

  const triggerBannerUpload = () => {
    bannerFileInputRef.current?.click()
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SellerFormData, string>> = {}

    if (!formData.entityName.trim()) {
      newErrors.entityName = "Entity name is required"
    }
    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required"
    }
    if (formData.emailSupport && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailSupport)) {
      newErrors.emailSupport = "Invalid email format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setSaving(true)
    try {
      await updateSeller(seller.id, formData)
      toast.success("Seller updated successfully")

      // Refetch fresh data if callback provided
      if (onSellerUpdate) {
        await onSellerUpdate()
      }

      router.push(`/sellers/${seller.id}`)
    } catch (err) {
      console.error("Error updating seller:", err)
      toast.error("Failed to update seller")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Seller</h1>
          <p className="text-muted-foreground mt-1">Update seller information and settings</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic details about the seller's business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entityName">
                  Entity Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="entityName"
                  value={formData.entityName}
                  onChange={(e) => handleInputChange("entityName", e.target.value)}
                  placeholder="e.g., Meridian Furniture"
                />
                {errors.entityName && (
                  <p className="text-sm text-destructive">{errors.entityName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="legalName">Legal Name</Label>
                <Input
                  id="legalName"
                  value={formData.legalName}
                  onChange={(e) => handleInputChange("legalName", e.target.value)}
                  placeholder="Legal business name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ein">EIN (Tax ID)</Label>
                <Input
                  id="ein"
                  value={formData.ein}
                  onChange={(e) => handleInputChange("ein", e.target.value)}
                  placeholder="e.g., 12-3456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="e.g., meridian-furniture"
                />
                {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="e.g., Furniture, Electronics"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gmv">GMV (Gross Merchandise Value)</Label>
                <Input
                  id="gmv"
                  value={formData.gmv}
                  onChange={(e) => handleInputChange("gmv", e.target.value)}
                  placeholder="e.g., $1,000,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagLine">Tagline</Label>
              <Input
                id="tagLine"
                value={formData.tagLine}
                onChange={(e) => handleInputChange("tagLine", e.target.value)}
                placeholder="Short description or slogan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Detailed description of the business"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <CardDescription>Physical address and location information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Full Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Complete address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1">Address Line 1</Label>
              <Input
                id="address1"
                value={formData.address1}
                onChange={(e) => handleInputChange("address1", e.target.value)}
                placeholder="Street address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2">Address Line 2</Label>
              <Input
                id="address2"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
                placeholder="Apt, suite, unit, etc. (optional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="State or Province"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <Input
                  id="zip"
                  value={formData.zip}
                  onChange={(e) => handleInputChange("zip", e.target.value)}
                  placeholder="ZIP or Postal Code"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Ways to reach the seller</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://www.example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessPhone">Business Phone</Label>
                <Input
                  id="businessPhone"
                  type="tel"
                  value={formData.businessPhone}
                  onChange={(e) => handleInputChange("businessPhone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailSupport">Support Email</Label>
                <Input
                  id="emailSupport"
                  type="email"
                  value={formData.emailSupport}
                  onChange={(e) => handleInputChange("emailSupport", e.target.value)}
                  placeholder="support@example.com"
                />
                {errors.emailSupport && (
                  <p className="text-sm text-destructive">{errors.emailSupport}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneSupport">Support Phone</Label>
                <Input
                  id="phoneSupport"
                  type="tel"
                  value={formData.phoneSupport}
                  onChange={(e) => handleInputChange("phoneSupport", e.target.value)}
                  placeholder="+1 (555) 987-6543"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media & Branding */}
        <Card>
          <CardHeader>
            <CardTitle>Media & Branding</CardTitle>
            <CardDescription>Logo, banner, and visual assets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              
              {/* Hidden file input */}
              <input
                ref={logoFileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />
              
              {/* Upload/Preview Area */}
              {!formData.logo ? (
                <div
                  onClick={triggerLogoUpload}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary hover:bg-muted/50 ${
                    uploadingLogo ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      {uploadingLogo ? (
                        <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                      ) : (
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {uploadingLogo ? 'Uploading...' : 'Click to upload logo'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF or WebP (max 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted group border">
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150?text=Invalid+URL"
                    }}
                  />
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={triggerLogoUpload}
                      disabled={uploadingLogo}
                    >
                      <Upload className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveLogo}
                      disabled={uploadingLogo}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Manual URL Input (Optional) */}
              <div className="pt-2">
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    Or enter logo URL manually
                  </summary>
                  <div className="mt-2">
                    <Input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={formData.logo}
                      onChange={(e) => handleInputChange('logo', e.target.value)}
                      disabled={uploadingLogo}
                    />
                  </div>
                </details>
              </div>
            </div>

            {/* Banner Upload */}
            <div className="space-y-2">
              <Label htmlFor="banner">Banner</Label>
              
              {/* Hidden file input */}
              <input
                ref={bannerFileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleBannerUpload}
                className="hidden"
              />
              
              {/* Upload/Preview Area */}
              {!formData.banner ? (
                <div
                  onClick={triggerBannerUpload}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary hover:bg-muted/50 ${
                    uploadingBanner ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      {uploadingBanner ? (
                        <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                      ) : (
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {uploadingBanner ? 'Uploading...' : 'Click to upload banner'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF or WebP (max 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted group">
                  <img
                    src={formData.banner}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/600x200?text=Invalid+URL"
                    }}
                  />
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={triggerBannerUpload}
                      disabled={uploadingBanner}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Change Banner
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveBanner}
                      disabled={uploadingBanner}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Manual URL Input (Optional) */}
              <div className="pt-2">
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    Or enter banner URL manually
                  </summary>
                  <div className="mt-2">
                    <Input
                      type="url"
                      placeholder="https://example.com/banner.jpg"
                      value={formData.banner}
                      onChange={(e) => handleInputChange('banner', e.target.value)}
                      disabled={uploadingBanner}
                    />
                  </div>
                </details>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>Social media profiles and links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="web">Website/Web</Label>
                <Input
                  id="web"
                  type="url"
                  value={formData.web}
                  onChange={(e) => handleInputChange("web", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input
                  id="twitter"
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  type="url"
                  value={formData.youtube}
                  onChange={(e) => handleInputChange("youtube", e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Settings</CardTitle>
            <CardDescription>Onboarding and account status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="onboarding">Onboarding Form Completed</Label>
                <p className="text-sm text-muted-foreground">
                  Indicates whether the seller has completed the onboarding process
                </p>
              </div>
              <Switch
                id="onboarding"
                checked={formData.isOnboardingFormFilled}
                onCheckedChange={(checked) =>
                  handleInputChange("isOnboardingFormFilled", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
            Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={saving} className="gap-2">
            {saving ? (
            <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
            </>
            ) : (
            <>
                <Save className="h-4 w-4" />
                Save Changes
            </>
            )}
        </Button>
        </div>
      </div>
    </div>
  )
}