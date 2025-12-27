// components/products/product-form/components/category-tags.tsx
import type React from "react"
import { Info } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import type { TagDefinition } from "@/hooks/useCategoryTags"

interface CategoryTagsProps {
  tags: TagDefinition[]
  values: Record<string, string | string[]>
  errors?: Record<string, string>
  onChange: (tagKey: string, value: string | string[]) => void
  isLoading?: boolean
}

export function CategoryTags({ tags, values, errors, onChange, isLoading }: CategoryTagsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4 border border-dashed rounded-lg">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (tags.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold">Category Requirements</h3>
        <Badge variant="secondary" className="text-xs">
          Required
        </Badge>
        <Info className="h-4 w-4 text-muted-foreground ml-auto" />
      </div>
      
      <p className="text-xs text-muted-foreground">
        The selected category requires additional information
      </p>

      <div className="space-y-4">
        {tags.map(tag => (
          <div key={tag.key} className="space-y-2">
            {tag.type === 'single' ? (
              <SingleSelectTag
                tag={tag}
                value={values[tag.key] as string}
                error={errors?.[tag.key]}
                onChange={(value) => onChange(tag.key, value)}
              />
            ) : (
              <MultiSelectTag
                tag={tag}
                value={values[tag.key] as string[]}
                error={errors?.[tag.key]}
                onChange={(value) => onChange(tag.key, value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Single Select Component
function SingleSelectTag({ 
  tag, 
  value, 
  error, 
  onChange 
}: { 
  tag: TagDefinition
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={tag.key}>
        {tag.label}
        {tag.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger 
          id={tag.key}
          className={error ? 'border-destructive' : ''}
        >
          <SelectValue placeholder={tag.placeholder || `Select ${tag.label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {tag.options.map(option => (
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

// Multi Select Component
function MultiSelectTag({ 
  tag, 
  value = [], 
  error, 
  onChange 
}: { 
  tag: TagDefinition
  value: string[]
  error?: string
  onChange: (value: string[]) => void
}) {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  return (
    <div className="space-y-2">
      <Label>
        {tag.label}
        {tag.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="grid grid-cols-2 gap-3 p-3 border rounded-md">
        {tag.options.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${tag.key}-${option.value}`}
              checked={value.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
            />
            <label
              htmlFor={`${tag.key}-${option.value}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}