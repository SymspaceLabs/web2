// src/hooks/useCategoryTags.ts
import { useMemo } from 'react';

export type TagType =
  | 'age_group'
  | 'gender'
  | 'season'
  | 'occasion'
  | 'indoor_outdoor'
  | 'shape'
  | 'pattern'
  | 'pile_height'
  | 'style'
  | 'room_type'
  | 'washable'
  | 'non_slip'
  | 'prescription';

export interface TagDefinition {
  key: TagType;
  label: string;
  type: 'single' | 'multiple' | 'text' | 'boolean';
  options?: Array<{ label: string; value: string }>;
  required: boolean;
  placeholder?: string;
}

interface UseCategoryTagsOptions {
  subcategoryDetails: any;
  ageGroups: Array<{ label: string; value: string }>;
  genders: Array<{ label: string; value: string }>;
  seasons?: Array<{ label: string; value: string }>;
}

export function useCategoryTags({
  subcategoryDetails,
  ageGroups,
  genders,
  seasons = [],
}: UseCategoryTagsOptions) {
  
  const tags = useMemo((): TagDefinition[] => {
    const allTags: TagDefinition[] = [];

    // Define all possible tag configurations
    const tagConfigs: Record<string, Omit<TagDefinition, 'key' | 'required'>> = {
      age_group: {
        label: 'Age Group',
        type: 'single',
        options: ageGroups,
        placeholder: 'Select target age group'
      },
      gender: {
        label: 'Gender',
        type: 'single',
        options: genders,
        placeholder: 'Select gender'
      },
      season: {
        label: 'Season',
        type: 'multiple',
        options: [
          { label: 'Winter', value: 'winter' },
          { label: 'Summer', value: 'summer' },
          { label: 'Spring', value: 'spring' },
          { label: 'Fall', value: 'fall' },
          { label: 'All Season', value: 'all-season' }
        ],
        placeholder: 'Select applicable seasons'
      },
      occasion: {
        label: 'Occasion',
        type: 'multiple',
        options: [
          { label: 'Formal', value: 'formal' },
          { label: 'Casual', value: 'casual' },
          { label: 'Party', value: 'party' },
          { label: 'Sports', value: 'sports' },
          { label: 'Business', value: 'business' },
          { label: 'Wedding', value: 'wedding' }
        ],
        placeholder: 'Select occasions'
      },
      indoor_outdoor: {
        label: 'Indoor/Outdoor',
        type: 'single',
        options: [
          { label: 'Indoor', value: 'indoor' },
          { label: 'Outdoor', value: 'outdoor' }
        ],
        placeholder: 'Select environment'
      },
      shape: {
        label: 'Shape',
        type: 'single',
        options: [
          { label: 'Rectangle', value: 'rectangle' },
          { label: 'Square', value: 'square' },
          { label: 'Round', value: 'round' },
          { label: 'Oval', value: 'oval' },
          { label: 'Runner', value: 'runner' },
          { label: 'Hexagon', value: 'hexagon' },
          { label: 'Irregular', value: 'irregular' }
        ],
        placeholder: 'Select shape'
      },
      pattern: {
        label: 'Pattern',
        type: 'text',
        placeholder: 'e.g., solid, striped, geometric'
      },
      pile_height: {
        label: 'Pile Height',
        type: 'single',
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' }
        ],
        placeholder: 'Select pile height'
      },
      style: {
        label: 'Style',
        type: 'text',
        placeholder: 'e.g., Modern, Traditional, Bohemian'
      },
      room_type: {
        label: 'Room Type',
        type: 'single',
        options: [
          { label: 'Living Room', value: 'living room' },
          { label: 'Bedroom', value: 'bedroom' },
          { label: 'Bathroom', value: 'bathroom' },
          { label: 'Kitchen', value: 'kitchen' },
          { label: 'Hallway', value: 'hallway' },
          { label: 'Office', value: 'office' }
        ],
        placeholder: 'Select room type'
      },
      non_slip: {
        label: 'Non slip',
        type: 'boolean',
        placeholder: 'e.g., Non-slip, Rubber, Felt'
      },
      washable: {
        label: 'Washable',
        type: 'boolean',
        placeholder: 'Machine washable'
      },
      prescription: {
        label: 'Prescription',
        type: 'single',
        options: [
          { label: 'No Prescription', value: 'none' },
          { label: 'Prescription Ready', value: 'ready' },
          { label: 'Prescription Only', value: 'only' }
        ],
        placeholder: 'Select prescription support'
      },

    };

    // Process required tags
    if (subcategoryDetails?.tags_required && subcategoryDetails.tags_required.length > 0) {
      subcategoryDetails.tags_required.forEach((tagKey: string) => {
        const config = tagConfigs[tagKey as TagType];
        if (config) {
          allTags.push({
            key: tagKey as TagType,
            ...config,
            required: true
          } as TagDefinition);
        }
      });
    }

    // Process optional tags
    if (subcategoryDetails?.tags_optional && subcategoryDetails.tags_optional.length > 0) {
      subcategoryDetails.tags_optional.forEach((tagKey: string) => {
        const config = tagConfigs[tagKey as TagType];
        if (config) {
          allTags.push({
            key: tagKey as TagType,
            ...config,
            required: false
          } as TagDefinition);
        }
      });
    }

    return allTags;
  }, [subcategoryDetails, ageGroups, genders, seasons]);

  const validateTags = (tagValues: Record<string, any>): { 
    isValid: boolean; 
    errors: Record<string, string> 
  } => {
    const errors: Record<string, string> = {};
    let isValid = true;

    tags.forEach(tag => {
      if (!tag.required) return;

      const value = tagValues[tag.key];
      const isEmpty = !value || 
                      (Array.isArray(value) && value.length === 0) ||
                      (typeof value === 'string' && value.trim() === '');

      if (isEmpty) {
        errors[tag.key] = `${tag.label} is required for this category`;
        isValid = false;
      }
    });

    return { isValid, errors };
  };

  const getTagByKey = (key: string): TagDefinition | undefined => {
    return tags.find(tag => tag.key === key);
  };

  return {
    tags,
    hasRequiredTags: tags.some(t => t.required),
    validateTags,
    getTagByKey
  };
}