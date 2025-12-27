// components/products/product-form/components/category-tags-renderer.tsx
import type React from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { TagDefinition } from "@/hooks/useCategoryTags"

interface CategoryTagsRendererProps {
  tags: TagDefinition[]
  values: Record<string, any>
  errors?: Record<string, string>
  onChange: (tagKey: string, value: string | string[]) => void
}

/**
 * CategoryTagsRenderer Component
 * 
 * Dynamically renders category-specific tags based on the selected category's requirements.
 * Supports both single-select and multi-select tag types.
 * 
 * @example
 * ```tsx
 * <CategoryTagsRenderer
 *   tags={categoryTags}
 *   values={formData}
 *   errors={validationErrors}
 *   onChange={(key, value) => updateFormData({ [key]: value })}
 * />
 * ```
 */
export function CategoryTagsRenderer({ 
  tags, 
  values, 
  errors, 
  onChange 
}: CategoryTagsRendererProps) {
  // Don't render anything if there are no tags
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {tags.map(tag => (
        <div key={tag.key} className="space-y-2">
          {tag.type === 'single' ? (
            <SingleSelectTag
              tag={tag}
              value={values[tag.key]}
              error={errors?.[tag.key]}
              onChange={(value) => onChange(tag.key, value)}
            />
          ) : (
            <MultiSelectTag
              tag={tag}
              value={values[tag.key] || []}
              error={errors?.[tag.key]}
              onChange={(value) => onChange(tag.key, value)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * SingleSelectTag Component
 * 
 * Renders a single-select dropdown for tags that allow only one selection.
 * Commonly used for tags like 'age_group' where only one value makes sense.
 */
interface SingleSelectTagProps {
  tag: TagDefinition
  value: string
  error?: string
  onChange: (value: string) => void
}

function SingleSelectTag({ 
  tag, 
  value, 
  error, 
  onChange 
}: SingleSelectTagProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={tag.key}>
        {tag.label}
        {tag.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger 
          id={tag.key}
          className={error ? 'border-destructive focus:ring-destructive' : ''}
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
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}

/**
 * MultiSelectTag Component
 * 
 * Renders a checkbox grid for tags that allow multiple selections.
 * Commonly used for tags like 'gender' where products can apply to multiple categories.
 */
interface MultiSelectTagProps {
  tag: TagDefinition
  value: string[]
  error?: string
  onChange: (value: string[]) => void
}

function MultiSelectTag({ 
  tag, 
  value = [], 
  error, 
  onChange 
}: MultiSelectTagProps) {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  // Determine grid columns based on number of options
  const gridCols = tag.options.length <= 3 ? 'grid-cols-1' : 'grid-cols-2'

  return (
    <div className="space-y-2">
      <Label>
        {tag.label}
        {tag.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className={`grid ${gridCols} gap-3 p-3 border rounded-md ${error ? 'border-destructive' : 'border-input'}`}>
        {tag.options.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${tag.key}-${option.value}`}
              checked={value.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
            />
            <label
              htmlFor={`${tag.key}-${option.value}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
      {!error && tag.options.length > 2 && (
        <p className="text-xs text-muted-foreground mt-1">
          Select all that apply
        </p>
      )}
    </div>
  )
}

/**
 * Alternative: Compact Multi-Select with Badges (Optional)
 * 
 * This is an alternative rendering style that shows selected items as badges.
 * Uncomment and use if you prefer a more compact visual representation.
 */
/*
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

function MultiSelectTagWithBadges({ 
  tag, 
  value = [], 
  error, 
  onChange 
}: MultiSelectTagProps) {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  const handleRemove = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue))
  }

  const getOptionLabel = (optionValue: string) => {
    return tag.options.find(opt => opt.value === optionValue)?.label || optionValue
  }

  return (
    <div className="space-y-2">
      <Label>
        {tag.label}
        {tag.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      // Selected items as badges
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/30">
          {value.map(val => (
            <Badge 
              key={val} 
              variant="secondary"
              className="flex items-center gap-1"
            >
              {getOptionLabel(val)}
              <button
                type="button"
                onClick={() => handleRemove(val)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      // Checkbox options
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
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
*/