// src/hooks/useCategoryTags.ts
import { useMemo } from 'react';

export type TagType = 'age_group' | 'gender' | 'season' | 'material' | 'occasion';

export interface TagDefinition {
  key: TagType;
  label: string;
  type: 'single' | 'multiple';
  options: Array<{ label: string; value: string }>;
  required: boolean;
  placeholder?: string;
}

interface UseCategoryTagsOptions {
  subcategoryDetails: any;
  ageGroups: Array<{ label: string; value: string }>;
  genders: Array<{ label: string; value: string }>;
  seasons?: Array<{ label: string; value: string }>;
  materials?: Array<{ label: string; value: string }>;
}

export function useCategoryTags({
  subcategoryDetails,
  ageGroups,
  genders,
  seasons = [],
  materials = []
}: UseCategoryTagsOptions) {
  
  // ✅ Memoize tag definitions to prevent unnecessary re-renders
  const tags = useMemo((): TagDefinition[] => {
    if (!subcategoryDetails?.tags_required || subcategoryDetails.tags_required.length === 0) {
      return [];
    }

    const tagConfigs: Record<string, Omit<TagDefinition, 'key' | 'options'> & { 
      options?: Array<{ label: string; value: string }> 
    }> = {
      age_group: {
        label: 'Age Group',
        type: 'single',
        required: true,
        placeholder: 'Select target age group'
      },
      gender: {
        label: 'Gender',
        type: 'single', // ✅ CHANGED: from 'multiple' to 'single'
        required: true,
        placeholder: 'Select gender'
      },
      season: {
        label: 'Season',
        type: 'multiple',
        required: false,
        placeholder: 'Select applicable seasons'
      },
      material: {
        label: 'Material',
        type: 'multiple',
        required: false,
        placeholder: 'Select materials'
      }
    };

    // Map options to tag configs
    const optionsMap: Record<string, Array<{ label: string; value: string }>> = {
      age_group: ageGroups,
      gender: genders,
      season: seasons,
      material: materials
    };

    return subcategoryDetails.tags_required
      .map((tagKey: string) => {
        const config = tagConfigs[tagKey as TagType];
        const options = optionsMap[tagKey];

        if (!config || !options || options.length === 0) {
          return null;
        }

        return {
          key: tagKey as TagType,
          ...config,
          options
        } as TagDefinition;
      })
      .filter(Boolean) as TagDefinition[];
  }, [subcategoryDetails, ageGroups, genders, seasons, materials]);

  // ✅ Helper to validate tag values
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
        const friendlyLabel = tag.label;
        errors[tag.key] = `${friendlyLabel} is required for this category`;
        isValid = false;
      }
    });

    return { isValid, errors };
  };

  // ✅ Helper to get tag by key
  const getTagByKey = (key: string): TagDefinition | undefined => {
    return tags.find(tag => tag.key === key);
  };

  return {
    tags,
    hasRequiredTags: tags.length > 0,
    validateTags,
    getTagByKey
  };
}