import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { TagDefinition } from "@/hooks/useCategoryTags"

interface CategoryTagsRendererProps {
  tags: TagDefinition[]
  values: Record<string, any>
  errors: Record<string, string>
  onChange: (tagKey: string, value: any) => void
}

export function CategoryTagsRenderer({
  tags,
  values,
  errors,
  onChange
}: CategoryTagsRendererProps) {
  
  return (
    <div className="space-y-4">
      {tags.map((tag) => {
        const rawValue = values[tag.key]
        const error = errors[tag.key]
        
        // ✅ CRITICAL: Normalize value based on tag type
        let normalizedValue: string | string[]
        
        if (tag.type === 'single') {
          // ⚠️ THE BUG WAS HERE: Ensure it's ALWAYS a string (not undefined, not array)
          if (rawValue === undefined || rawValue === null) {
            normalizedValue = ''
          } else if (Array.isArray(rawValue)) {
            // Legacy data might have arrays - take first item
            normalizedValue = rawValue.length > 0 ? String(rawValue[0]) : ''
          } else {
            normalizedValue = String(rawValue)
          }
          
          console.log(`🔍 Single Select [${tag.key}]:`, {
            rawValue,
            normalizedValue,
            type: typeof normalizedValue
          })
        } else {
          // For multiple, ensure it's an array
          normalizedValue = Array.isArray(rawValue) ? rawValue : []
        }
        
        // ✅ Handle single select (like gender, age_group)
        if (tag.type === 'single') {
          return (
            <div key={tag.key} className="space-y-2">
              <Label htmlFor={tag.key}>
                {tag.label}
                {tag.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              
              <Select
                value={normalizedValue as string}  // ✅ Cast to string for single select
                onValueChange={(newValue) => {
                  console.log(`🔄 Select Changed [${tag.key}]:`, newValue)
                  onChange(tag.key, newValue)
                }}
              >
                <SelectTrigger 
                  id={tag.key}
                  className={error ? 'border-destructive cursor-pointer' : 'cursor-pointer'}
                >
                  <SelectValue placeholder={tag.placeholder || `Select ${tag.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="cursor-pointer">
                  {tag.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </div>
          )
        }
        
        // ✅ Handle multiple select (like season, occasion)
        if (tag.type === 'multiple') {
          const selectedValues = normalizedValue as string[]
          
          return (
            <div key={tag.key} className="space-y-2">
              <Label htmlFor={tag.key}>
                {tag.label}
                {tag.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              
              <Select
                value="" // Always empty for multi-select (used for adding items)
                onValueChange={(newValue) => {
                  if (!selectedValues.includes(newValue)) {
                    onChange(tag.key, [...selectedValues, newValue])
                  }
                }}
              >
                <SelectTrigger 
                  id={tag.key}
                  className={error ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder={tag.placeholder || `Select ${tag.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {tag.options.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      disabled={selectedValues.includes(option.value)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Display selected values as badges */}
              {selectedValues.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedValues.map((val) => {
                    const option = tag.options.find(opt => opt.value === val)
                    return (
                      <Badge key={val} variant="secondary" className="pl-2 pr-1">
                        {option?.label || val}
                        <button
                          type="button"
                          onClick={() => {
                            onChange(
                              tag.key,
                              selectedValues.filter(v => v !== val)
                            )
                          }}
                          className="ml-1 hover:bg-muted rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              )}
              
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </div>
          )
        }
        
        return null
      })}
    </div>
  )
}