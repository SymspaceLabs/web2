// app/_types/landing.ts
export interface CTAConfig {
  text: string;
  href: string;
  icon?: string;
}

export interface VideoConfig {
  sources: readonly { src: string; type: string }[];
  poster: string;
  dimensions?: { width: number; height: number };
}

export interface CategoryItem {
  id: number;
  title: string;
  thumbnail: string;
  slug: string;
}

export interface SectionContent {
  title: string;
  description: string | { part1: string; part2: string };
  cta?: CTAConfig | { primary: CTAConfig; secondary: CTAConfig };
  video?: VideoConfig;
}


// Types
export interface Testimonial {
  id: string;  // Change from number to string
  content: string;
  rating?: number;
  user: {
    name: string;
    avatar?: string;
    role: string;
  }
}