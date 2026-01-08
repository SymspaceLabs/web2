import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, ChevronDown, Info } from "lucide-react"
import { useState } from "react"
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
  const [showOptional, setShowOptional] = useState(false);

  const renderField = (tag: TagDefinition) => {
    const rawValue = values[tag.key];
    const error = errors[tag.key];
    
    // ✅ Normalize value based on tag type
    let normalizedValue: string | string[] | boolean;
    
    if (tag.type === 'single') {
      if (rawValue === undefined || rawValue === null) {
        normalizedValue = '';
      } else if (Array.isArray(rawValue)) {
        normalizedValue = rawValue.length > 0 ? String(rawValue[0]) : '';
      } else {
        normalizedValue = String(rawValue);
      }
    } else if (tag.type === 'multiple') {
      normalizedValue = Array.isArray(rawValue) ? rawValue : (rawValue ? [rawValue] : []);
    } else if (tag.type === 'boolean') {
      normalizedValue = rawValue === true || rawValue === 'true';
    } else {
      normalizedValue = rawValue || '';
    }

    // Boolean field
    if (tag.type === 'boolean') {
      return (
        <div key={tag.key} className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id={tag.key}
              checked={normalizedValue as boolean}
              onCheckedChange={(checked) => onChange(tag.key, checked)}
            />
            <Label htmlFor={tag.key} className="cursor-pointer">
              {tag.label}
              {tag.required && <span className="text-destructive ml-1">*</span>}
              {!tag.required && <span className="text-muted-foreground text-xs ml-1">(Optional)</span>}
            </Label>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      );
    }

    // Text field
    if (tag.type === 'text') {
      return (
        <div key={tag.key} className="space-y-2">
          <Label htmlFor={tag.key}>
            {tag.label}
            {tag.required && <span className="text-destructive ml-1">*</span>}
            {!tag.required && <span className="text-muted-foreground text-xs ml-1">(Optional)</span>}
          </Label>
          <Input
            id={tag.key}
            value={normalizedValue as string}
            onChange={(e) => onChange(tag.key, e.target.value)}
            placeholder={tag.placeholder}
            className={error ? 'border-destructive' : ''}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      );
    }
    
    // Single select
    if (tag.type === 'single' && tag.options) {
      return (
        <div key={tag.key} className="space-y-2">
          <Label htmlFor={tag.key}>
            {tag.label}
            {tag.required && <span className="text-destructive ml-1">*</span>}
            {!tag.required && <span className="text-muted-foreground text-xs ml-1">(Optional)</span>}
          </Label>
          
          <Select
            value={normalizedValue as string}
            onValueChange={(newValue) => onChange(tag.key, newValue)}
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
          
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      );
    }
    
    // Multiple select
    if (tag.type === 'multiple' && tag.options) {
      const selectedValues = normalizedValue as string[];
      
      return (
        <div key={tag.key} className="space-y-2">
          <Label htmlFor={tag.key}>
            {tag.label}
            {tag.required && <span className="text-destructive ml-1">*</span>}
            {!tag.required && <span className="text-muted-foreground text-xs ml-1">(Optional)</span>}
          </Label>
          
          <Select
            value=""
            onValueChange={(newValue) => {
              if (!selectedValues.includes(newValue)) {
                onChange(tag.key, [...selectedValues, newValue]);
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
          
          {selectedValues.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedValues.map((val) => {
                const option = tag.options?.find(opt => opt.value === val);
                return (
                  <Badge key={val} variant="secondary" className="pl-2 pr-1">
                    {option?.label || val}
                    <button
                      type="button"
                      onClick={() => {
                        onChange(tag.key, selectedValues.filter(v => v !== val));
                      }}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          )}
          
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      );
    }
    
    return null;
  };

  const requiredTags = tags.filter(t => t.required);
  const optionalTags = tags.filter(t => !t.required);

  return (
    <div className="space-y-6">
      {/* Required Tags */}
      {requiredTags.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">Required Fields</h4>
            <Badge variant="destructive" className="text-xs">
              {requiredTags.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredTags.map(tag => renderField(tag))}
          </div>
        </div>
      )}

      {/* Optional Tags */}
      {optionalTags.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors cursor-pointer"
            >
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${showOptional ? 'rotate-180' : ''}`}
              />
              Optional Fields
            </button>
            <Badge variant="secondary" className="text-xs">
              {optionalTags.length}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <Info className="h-3 w-3" />
              <span>Improve product discoverability</span>
            </div>
          </div>

          {showOptional && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border">
              {optionalTags.map(tag => renderField(tag))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}