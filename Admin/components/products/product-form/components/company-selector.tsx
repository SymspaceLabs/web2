import { useState, useMemo, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, Search } from "lucide-react"

type Company = {
  id: string
  entityName: string
  location: string
  website: string
}

export type SelectedCompany = {
  id: string
  name: string
}

type CompanySelectorProps = {
  value?: string
  onSelect: (company: SelectedCompany) => void
  companyId?: string
}

export function CompanySelector({ value, onSelect, companyId }: CompanySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<SelectedCompany | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies`)
        if (!response.ok) {
          throw new Error('Failed to fetch companies')
        }
        const data = await response.json()
        setCompanies(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load companies')
        console.error('Error fetching companies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  // Pre-populate the company selector based on companyId
  useEffect(() => {
    if (!companyId || companies.length === 0) return

    const company = companies.find(c => c.id === companyId)
    if (company) {
      const selected: SelectedCompany = {
        id: company.id,
        name: company.entityName,
      }
      setSelectedCompany(selected)
      onSelect(selected)
    }
  }, [companyId, companies])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return companies

    const lowerQuery = searchQuery.toLowerCase().trim()
    
    return companies
      .filter(company => {
        const nameMatch = company.entityName.toLowerCase().includes(lowerQuery)
        const locationMatch = company.location?.toLowerCase().includes(lowerQuery)
        const websiteMatch = company.website?.toLowerCase().includes(lowerQuery)
        return nameMatch || locationMatch || websiteMatch
      })
      .sort((a, b) => {
        // Prioritize matches in entity name
        const aNameMatch = a.entityName.toLowerCase().startsWith(lowerQuery)
        const bNameMatch = b.entityName.toLowerCase().startsWith(lowerQuery)
        
        if (aNameMatch && !bNameMatch) return -1
        if (!aNameMatch && bNameMatch) return 1
        
        return a.entityName.localeCompare(b.entityName)
      })
  }, [companies, searchQuery])

  const handleCompanyClick = (company: Company) => {
    const selected: SelectedCompany = {
      id: company.id,
      name: company.entityName,
    }
    setSelectedCompany(selected)
    onSelect(selected)
    setIsOpen(false)
    setSearchQuery("")
  }

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <Label htmlFor="company-input">
        Company <span className="text-destructive">*</span>
      </Label>

      <div className="relative">
        <Input
          id="company-input"
          value={selectedCompany?.name || ""}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder="Select company..."
          className="cursor-pointer pr-10"
          disabled={loading}
        />
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="border rounded-lg bg-background shadow-lg overflow-hidden">
          <div className="p-3 border-b bg-background sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies..."
                className="pl-9"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Loading companies...
              </div>
            ) : error ? (
              <div className="px-4 py-8 text-center text-sm text-destructive">
                {error}
              </div>
            ) : filteredCompanies.length > 0 ? (
              <div className="divide-y">
                {filteredCompanies.map((company) => (
                  <button
                    key={company.id}
                    type="button"
                    onClick={() => handleCompanyClick(company)}
                    className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{company.entityName}</p>
                        {company.location && (
                          <p className="text-xs text-muted-foreground truncate">
                            {company.location}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-green-600 flex-shrink-0">Select</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                {searchQuery
                  ? `No companies found matching "${searchQuery}"`
                  : "No companies available"}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground">
              Select the company that will sell this product
            </p>
          </div>
        </div>
      )}
    </div>
  )
}