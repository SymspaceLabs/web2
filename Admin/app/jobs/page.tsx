"use client"

import { useState, useMemo, useEffect } from "react"
import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, MapPin, Briefcase } from "lucide-react"
import { Job } from "@/types/job.type"
import { toast } from "sonner"
import { API_ENDPOINTS, authFetch } from "@/lib/api"
import { deleteJob } from "@/api/job"

const ITEMS_PER_PAGE = 10

export default function JobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all")
  const [remoteWorkFilter, setRemoteWorkFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [remoteWorkPolicies, setRemoteWorkPolicies] = useState<string[]>([])
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        const response = await authFetch(API_ENDPOINTS.jobs)
        setJobs(response)

        // Extract unique job types and remote work policies
        const uniqueJobTypes = [...new Set(response.map((j: Job) => j.jobType).filter(Boolean))]
        const uniqueRemoteWork = [...new Set(response.map((j: Job) => j.remoteWorkPolicy).filter(Boolean))]
        setJobTypes(uniqueJobTypes as string[])
        setRemoteWorkPolicies(uniqueRemoteWork as string[])
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError("Failed to load jobs. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesJobType = jobTypeFilter === "all" || job.jobType === jobTypeFilter
      const matchesRemoteWork = remoteWorkFilter === "all" || job.remoteWorkPolicy === remoteWorkFilter
      return matchesSearch && matchesJobType && matchesRemoteWork
    })
  }, [searchTerm, jobTypeFilter, remoteWorkFilter, jobs])

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleDeleteClick = (job: Job) => {
    setJobToDelete(job)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return

    setIsDeleting(true)
    try {
      await deleteJob(jobToDelete.id)
      
      setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id))
      
      toast.success("Job deleted", {
        description: `${jobToDelete.title} has been successfully deleted.`,
      })
      
      setDeleteDialogOpen(false)
      setJobToDelete(null)
    } catch (error) {
      console.error("Failed to delete job:", error)
      
      toast.error("Delete failed", {
        description: "Failed to delete the job. Please try again.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setJobToDelete(null)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading jobs...</p>
        </div>
      </ProtectedLayout>
    )
  }

  if (error) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-destructive">{error}</p>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Management</h1>
            <p className="text-muted-foreground mt-2">Manage all job postings and opportunities</p>
          </div>
          <Button onClick={() => router.push("/jobs/create")} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Job
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 h-12"
            />
          </div>
          <Select
            value={jobTypeFilter}
            onValueChange={(v) => {
              setJobTypeFilter(v)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-full md:w-48 !h-12">
              <SelectValue placeholder="Filter by job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Types</SelectItem>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={remoteWorkFilter}
            onValueChange={(v) => {
              setRemoteWorkFilter(v)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-full md:w-48 !h-12">
              <SelectValue placeholder="Filter by remote work" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Remote Policies</SelectItem>
              {remoteWorkPolicies.map((policy) => (
                <SelectItem key={policy} value={policy}>
                  {policy}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Jobs ({filteredJobs.length})</CardTitle>
            <CardDescription>
              Showing {paginatedJobs.length} of {filteredJobs.length} job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Job Type</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Remote Work</TableHead>
                    <TableHead>Visa Sponsorship</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div className="max-w-md">
                            <p className="font-medium">{truncateText(job.title, 50)}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {truncateText(job.location, 30)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{job.location}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{job.jobType}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{job.experience}</TableCell>
                      <TableCell>
                        <Badge variant={job.remoteWorkPolicy === "Fully Remote" ? "default" : "outline"}>
                          {job.remoteWorkPolicy}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={job.visaSponsorship === "Yes" ? "default" : "secondary"}>
                          {job.visaSponsorship}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => router.push(`/jobs/${job.id}`)}
                              className="cursor-pointer"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => router.push(`/jobs/edit/${job.id}`)}
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(job)}
                              className="text-destructive focus:text-destructive cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </CardContent>
        </Card>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <span className="font-semibold">{jobToDelete?.title}</span> and remove
                all associated data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDelete} disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                style={{ color: 'white' }}
                className="bg-destructive hover:bg-destructive/90 gap-2"
              >
                {isDeleting ? (
                  <>Deleting...</>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Job
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedLayout>
  )
}