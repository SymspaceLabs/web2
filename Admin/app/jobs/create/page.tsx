"use client"

import { useState } from "react"
import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { createJob } from "@/api/job"
import { toast } from "sonner"

export default function CreateJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: "",
    experience: "",
    remoteWorkPolicy: "",
    visaSponsorship: "",
    preferredTimezone: "",
    summary: "",
    scope: "",
    qualifications: "",
    benefits: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.jobType) newErrors.jobType = "Job type is required"
    if (!formData.experience.trim()) newErrors.experience = "Experience is required"
    if (!formData.remoteWorkPolicy) newErrors.remoteWorkPolicy = "Remote work policy is required"
    if (!formData.visaSponsorship) newErrors.visaSponsorship = "Visa sponsorship status is required"
    if (!formData.preferredTimezone.trim()) newErrors.preferredTimezone = "Preferred timezone is required"
    if (!formData.summary.trim()) newErrors.summary = "Job summary is required"
    if (!formData.scope.trim()) newErrors.scope = "Scope of work is required"
    if (!formData.qualifications.trim()) newErrors.qualifications = "Qualifications are required"
    if (!formData.benefits.trim()) newErrors.benefits = "Benefits are required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Validation failed", {
        description: "Please fill in all required fields.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await createJob(formData)
      
      toast.success("Job created", {
        description: "The job posting has been successfully created.",
      })
      
      router.push("/jobs")
    } catch (error) {
      console.error("Failed to create job:", error)
      
      toast.error("Creation failed", {
        description: "Failed to create the job posting. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/jobs")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Job Posting</h1>
          <p className="text-muted-foreground mt-2">Add a new job opportunity</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of the job posting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Job Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Software Engineer"
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., New York, NY"
                      className={errors.location ? "border-destructive" : ""}
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive">{errors.location}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Experience Required <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g., 5+ years"
                      className={errors.experience ? "border-destructive" : ""}
                    />
                    {errors.experience && (
                      <p className="text-sm text-destructive">{errors.experience}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobType">
                      Job Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.jobType}
                      onValueChange={(value) => handleSelectChange("jobType", value)}
                    >
                      <SelectTrigger className={errors.jobType ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Permanent">Permanent</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.jobType && (
                      <p className="text-sm text-destructive">{errors.jobType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="remoteWorkPolicy">
                      Remote Work <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.remoteWorkPolicy}
                      onValueChange={(value) => handleSelectChange("remoteWorkPolicy", value)}
                    >
                      <SelectTrigger className={errors.remoteWorkPolicy ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fully Remote">Fully Remote</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="On-site">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.remoteWorkPolicy && (
                      <p className="text-sm text-destructive">{errors.remoteWorkPolicy}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visaSponsorship">
                      Visa Sponsorship <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.visaSponsorship}
                      onValueChange={(value) => handleSelectChange("visaSponsorship", value)}
                    >
                      <SelectTrigger className={errors.visaSponsorship ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.visaSponsorship && (
                      <p className="text-sm text-destructive">{errors.visaSponsorship}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTimezone">
                    Preferred Timezone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="preferredTimezone"
                    name="preferredTimezone"
                    value={formData.preferredTimezone}
                    onChange={handleChange}
                    placeholder="e.g., ET, PST, GMT"
                    className={errors.preferredTimezone ? "border-destructive" : ""}
                  />
                  {errors.preferredTimezone && (
                    <p className="text-sm text-destructive">{errors.preferredTimezone}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide detailed information about the role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="summary">
                    Job Summary <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Provide a comprehensive overview of the role and company..."
                    rows={8}
                    className={errors.summary ? "border-destructive" : ""}
                  />
                  {errors.summary && (
                    <p className="text-sm text-destructive">{errors.summary}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scope">
                    Scope of Work <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="scope"
                    name="scope"
                    value={formData.scope}
                    onChange={handleChange}
                    placeholder="List the main responsibilities and duties (use line breaks for bullet points)..."
                    rows={8}
                    className={errors.scope ? "border-destructive" : ""}
                  />
                  {errors.scope && (
                    <p className="text-sm text-destructive">{errors.scope}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualifications">
                    Qualifications <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="List required skills, education, and experience (use line breaks for bullet points)..."
                    rows={8}
                    className={errors.qualifications ? "border-destructive" : ""}
                  />
                  {errors.qualifications && (
                    <p className="text-sm text-destructive">{errors.qualifications}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">
                    Benefits <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="List the benefits and perks offered (use line breaks for bullet points)..."
                    rows={6}
                    className={errors.benefits ? "border-destructive" : ""}
                  />
                  {errors.benefits && (
                    <p className="text-sm text-destructive">{errors.benefits}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/jobs")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>Creating...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Job
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </ProtectedLayout>
  )
}