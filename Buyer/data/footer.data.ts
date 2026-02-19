// ==============================================================
// data.ts - Updated with images for App Store buttons
// ==============================================================

import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  Facebook, 
  Twitter
} from "lucide-react";

export interface SocialIconLink {
  Icon: React.ComponentType<{ className?: string }>;
  url: string;
}

export interface LinkItem {
  title: string;
  url: string;
}

export interface AppStoreLink {
  url: string;
  imageSrc: string; // Path to image
  imageAlt: string; // Alt text for accessibility
  title: string;
  subtitle: string;
}

export const ABOUT_LINKS: LinkItem[] = [
  {
    title: 'About Us',
    url: '/about-us'
  },
  {
    title: 'Careers',
    url: '/careers'
  },
  {
    title: 'Press Releases',
    url: '/press-releases'
  },
  {
    title: 'Global Impact',
    url: '/global-impact'
  },
  {
    title: 'Contact Us',
    url: '/contact-us'
  }
];

export const CUSTOMER_CARE_LINKS: LinkItem[] = [
  {
    title: 'Sell On Symspace',
    url: '/sell-on-symspace'
  },
  {
    title: 'Services',
    url: '/sell-on-symspace'
  },
  {
    title: 'Increase Sales',
    url: '/sell-on-symspace'
  },
  {
    title: 'Terms & Conditions',
    url: '/terms-and-conditions#terms'
  },
  {
    title: 'FAQs',
    url: '/faq'
  }
];

export const SOCIAL_ICON_LINKS: SocialIconLink[] = [
  {
    Icon: Instagram,
    url: "https://www.instagram.com/symspacelabs/"
  },
  {
    Icon: Linkedin,
    url: "https://www.linkedin.com/company/symspace/"
  },
  {
    Icon: Youtube,
    url: "https://www.youtube.com/@SymspaceLabs"
  },
  {
    Icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=100086581636416"
  },
  {
    Icon: Twitter,
    url: "https://x.com/symspacelabs"
  }
];

export const PLAY_APP_STORE_DATA: AppStoreLink[] = [
  {
    url: "/",
    imageSrc: "/images/ar-app-simulation/google-play-store.png", // Path to Google Play logo
    imageAlt: "Google Play Store",
    title: "Google Play",
    subtitle: "Get it on"
  },
  {
    url: "/",
    imageSrc: "/images/ar-app-simulation/apple-app-store.png", // Path to Apple App Store logo
    imageAlt: "Apple App Store",
    title: "App Store",
    subtitle: "Download on the"
  }
];