// src/utils/tag.utils.ts

/**
 * Tag Utility Configuration
 * 
 * Centralized definitions for all product category tags.
 * These values are used across the application for category-specific form fields.
 */

// ============================================================================
// TAG OPTION DEFINITIONS
// ============================================================================

/**
 * Age Group Options
 * Used for products that target specific age demographics
 */
export const ageGroups = [
  { label: 'Newborn (0-3 months)', value: 'newborn' },
  { label: 'Infant (3-12 months)', value: 'infant' },
  { label: 'Toddler (1-3 years)', value: 'toddler' },
  { label: 'Preschool (3-5 years)', value: 'preschool' },
  { label: 'Kids (5-12 years)', value: 'kids' },
  { label: 'Teens (13-17 years)', value: 'teens' },
  { label: 'Young Adults (18-24 years)', value: 'young_adults' },
  { label: 'Adults (25-54 years)', value: 'adults' },
  { label: 'Seniors (55+ years)', value: 'seniors' },
  { label: 'All Ages', value: 'all_ages' }
] as const;

/**
 * Gender Options
 * Used for products with gender-specific designs or targeting
 */
export const genders = [
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'Boys', value: 'boys' },
  { label: 'Girls', value: 'girls' },
  { label: 'Unisex', value: 'unisex' }
] as const;

/**
 * Season Options
 * Used for seasonal products (clothing, outdoor gear, etc.)
 */
export const seasons = [
  { label: 'Spring', value: 'spring' },
  { label: 'Summer', value: 'summer' },
  { label: 'Fall/Autumn', value: 'fall' },
  { label: 'Winter', value: 'winter' },
  { label: 'All Seasons', value: 'all_seasons' }
] as const;

/**
 * Material Options
 * Common materials used in product manufacturing
 */
export const materials = [
  { label: 'Cotton', value: 'cotton' },
  { label: 'Polyester', value: 'polyester' },
  { label: 'Wool', value: 'wool' },
  { label: 'Silk', value: 'silk' },
  { label: 'Leather', value: 'leather' },
  { label: 'Denim', value: 'denim' },
  { label: 'Linen', value: 'linen' },
  { label: 'Nylon', value: 'nylon' },
  { label: 'Spandex/Elastane', value: 'spandex' },
  { label: 'Bamboo', value: 'bamboo' },
  { label: 'Synthetic Blend', value: 'synthetic_blend' },
  { label: 'Natural Blend', value: 'natural_blend' },
  { label: 'Other', value: 'other' }
] as const;

/**
 * Occasion Options
 * Used for products designed for specific occasions or events
 */
export const occasions = [
  { label: 'Casual', value: 'casual' },
  { label: 'Formal', value: 'formal' },
  { label: 'Business', value: 'business' },
  { label: 'Athletic/Sports', value: 'athletic' },
  { label: 'Party/Celebration', value: 'party' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Outdoor/Adventure', value: 'outdoor' },
  { label: 'Beach/Pool', value: 'beach' },
  { label: 'Evening/Night Out', value: 'evening' },
  { label: 'Everyday', value: 'everyday' }
] as const;

/**
 * Style Options
 * General style categories for products
 */
export const styles = [
  { label: 'Modern', value: 'modern' },
  { label: 'Classic', value: 'classic' },
  { label: 'Vintage', value: 'vintage' },
  { label: 'Minimalist', value: 'minimalist' },
  { label: 'Bohemian', value: 'bohemian' },
  { label: 'Streetwear', value: 'streetwear' },
  { label: 'Preppy', value: 'preppy' },
  { label: 'Athletic', value: 'athletic' },
  { label: 'Elegant', value: 'elegant' },
  { label: 'Casual', value: 'casual' }
] as const;

/**
 * Size Options
 * Standard size ranges (can be customized per category)
 */
export const sizes = [
  { label: 'Extra Small (XS)', value: 'xs' },
  { label: 'Small (S)', value: 's' },
  { label: 'Medium (M)', value: 'm' },
  { label: 'Large (L)', value: 'l' },
  { label: 'Extra Large (XL)', value: 'xl' },
  { label: '2XL', value: '2xl' },
  { label: '3XL', value: '3xl' },
  { label: 'One Size', value: 'one_size' }
] as const;

/**
 * Color Family Options
 * Basic color categories for product filtering
 */
export const colorFamilies = [
  { label: 'Black', value: 'black' },
  { label: 'White', value: 'white' },
  { label: 'Gray', value: 'gray' },
  { label: 'Brown', value: 'brown' },
  { label: 'Beige/Tan', value: 'beige' },
  { label: 'Red', value: 'red' },
  { label: 'Orange', value: 'orange' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Purple', value: 'purple' },
  { label: 'Pink', value: 'pink' },
  { label: 'Multicolor', value: 'multicolor' }
] as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type AgeGroupValue = typeof ageGroups[number]['value'];
export type GenderValue = typeof genders[number]['value'];
export type SeasonValue = typeof seasons[number]['value'];
export type MaterialValue = typeof materials[number]['value'];
export type OccasionValue = typeof occasions[number]['value'];
export type StyleValue = typeof styles[number]['value'];
export type SizeValue = typeof sizes[number]['value'];
export type ColorFamilyValue = typeof colorFamilies[number]['value'];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a tag option by its value
 * 
 * @example
 * ```typescript
 * const ageGroup = getTagOption(ageGroups, 'teens');
 * // Returns: { label: 'Teens (13-17 years)', value: 'teens' }
 * ```
 */
export function getTagOption<T extends { label: string; value: string }>(
  options: readonly T[],
  value: string
): T | undefined {
  return options.find(option => option.value === value);
}

/**
 * Get multiple tag options by their values
 * 
 * @example
 * ```typescript
 * const selectedGenders = getTagOptions(genders, ['male', 'female']);
 * // Returns: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]
 * ```
 */
export function getTagOptions<T extends { label: string; value: string }>(
  options: readonly T[],
  values: string[]
): T[] {
  return values
    .map(value => getTagOption(options, value))
    .filter((option): option is T => option !== undefined);
}

/**
 * Get labels from tag values
 * 
 * @example
 * ```typescript
 * const labels = getTagLabels(genders, ['male', 'unisex']);
 * // Returns: ['Male', 'Unisex']
 * ```
 */
export function getTagLabels<T extends { label: string; value: string }>(
  options: readonly T[],
  values: string[]
): string[] {
  return getTagOptions(options, values).map(option => option.label);
}

/**
 * Validate if a value exists in tag options
 * 
 * @example
 * ```typescript
 * isValidTagValue(ageGroups, 'teens'); // true
 * isValidTagValue(ageGroups, 'invalid'); // false
 * ```
 */
export function isValidTagValue<T extends { label: string; value: string }>(
  options: readonly T[],
  value: string
): boolean {
  return options.some(option => option.value === value);
}

/**
 * Validate if all values exist in tag options
 */
export function areValidTagValues<T extends { label: string; value: string }>(
  options: readonly T[],
  values: string[]
): boolean {
  return values.every(value => isValidTagValue(options, value));
}

// ============================================================================
// TAG CONFIGURATION MAP
// ============================================================================

/**
 * Centralized map of all tag options
 * Useful for dynamic tag rendering
 */
export const TAG_OPTIONS_MAP = {
  age_group: ageGroups,
  gender: genders,
  season: seasons,
  material: materials,
  occasion: occasions,
  style: styles,
  size: sizes,
  color_family: colorFamilies
} as const;

export type TagKey = keyof typeof TAG_OPTIONS_MAP;

/**
 * Get tag options by key
 * 
 * @example
 * ```typescript
 * const options = getTagOptionsByKey('age_group');
 * // Returns: ageGroups array
 * ```
 */
export function getTagOptionsByKey(key: TagKey) {
  return TAG_OPTIONS_MAP[key];
}

// ============================================================================
// TAG METADATA
// ============================================================================

/**
 * Metadata about each tag type
 * Useful for dynamic form generation and validation
 */
export const TAG_METADATA = {
  age_group: {
    key: 'age_group',
    label: 'Age Group',
    type: 'single' as const,
    placeholder: 'Select target age group',
    description: 'The age demographic this product is designed for'
  },
  gender: {
    key: 'gender',
    label: 'Gender',
    type: 'multiple' as const,
    placeholder: 'Select applicable genders',
    description: 'The gender(s) this product is designed for'
  },
  season: {
    key: 'season',
    label: 'Season',
    type: 'multiple' as const,
    placeholder: 'Select applicable seasons',
    description: 'The season(s) this product is suitable for'
  },
  material: {
    key: 'material',
    label: 'Material',
    type: 'multiple' as const,
    placeholder: 'Select materials',
    description: 'The primary materials used in this product'
  },
  occasion: {
    key: 'occasion',
    label: 'Occasion',
    type: 'multiple' as const,
    placeholder: 'Select occasions',
    description: 'The occasions this product is suitable for'
  },
  style: {
    key: 'style',
    label: 'Style',
    type: 'multiple' as const,
    placeholder: 'Select styles',
    description: 'The style category of this product'
  },
  size: {
    key: 'size',
    label: 'Size',
    type: 'multiple' as const,
    placeholder: 'Select available sizes',
    description: 'The sizes available for this product'
  },
  color_family: {
    key: 'color_family',
    label: 'Color Family',
    type: 'multiple' as const,
    placeholder: 'Select color families',
    description: 'The color family/families of this product'
  }
} as const;

export type TagMetadataKey = keyof typeof TAG_METADATA;