"use client";

import { motion } from "framer-motion";
import { useState, useCallback, memo } from 'react';
import { Card } from '@/components/ui/card';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Benefits displayed as pill-shaped badges below the video
 */
const BENEFITS = [
  'realistic 3d product visualization',
  '3d product ads',
  'real-time ar product Sizing',
  'virtual try-on technology',
  'advanced ar functionality',
  'community support + engagement',
  'accessibility awareness',
  'digital staging'
] as const;

/**
 * Video sources for optimal browser compatibility
 */
const VIDEO_SOURCES = [
  { src: '/videos/landing-page/reimagining-shopping.webm', type: 'video/webm' },
  { src: '/videos/landing-page/reimagining-shopping.mp4', type: 'video/mp4' }
] as const;

const VIDEO_POSTER = 'https://placehold.co/1280x720/cccccc/cccccc';

/**
 * Animation configuration for consistent motion across components
 */
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
} as const;

// ============================================================================
// STYLES
// ============================================================================

/**
 * Centralized Tailwind CSS classes converted from MUI theme
 * Organized by component type for easy maintenance
 */
const styles = {
  // Typography
  sectionHeader: "text-lg sm:text-[55px] text-white",
  sectionParagraph: "text-white text-xs sm:text-lg text-justify container leading-[1.5] sm:leading-[2]",
  
  // Buttons
  gradientBtn: `
    flex-1 sm:flex-none gap-2 min-w-full sm:min-w-[250px] text-white rounded-[50px] 
    border-2 border-white py-2 sm:py-4 px-4
    bg-gradient-to-br from-[#18C8FF] via-[#18C8FF] to-[#933FFE]
    transition-all duration-300 ease-in-out
    hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:border-white/50
  `,
  outlinedBtn: `
    h-full flex-1 sm:flex-none min-w-full sm:min-w-[250px] text-white rounded-[50px]
    border-2 border-white py-2 sm:py-4 px-6 text-[10px] sm:text-base
    transition-all duration-300 ease-in-out
    hover:bg-gradient-to-r hover:from-white hover:to-[#AEAEAE] hover:text-black
  `,
  outlinedLightBtn: `
    border-2 border-black font-normal min-w-[175px] text-black rounded-[50px]
    py-2 sm:py-4 px-6 text-[10px] sm:text-base
    transition-all duration-300 ease-in-out
    hover:bg-gradient-to-r hover:from-[#666666] hover:to-black hover:text-white hover:border-white
  `,
  
  // Layout
  textBubbleContainer: "flex flex-wrap gap-4 sm:gap-6 py-4 w-full justify-between",
  textBubble: `
    text-center items-center content-center
    max-w-[150px] sm:max-w-[250px] md:max-w-[500px]
    py-2 sm:py-4 px-2 sm:px-6 mb-0 sm:mb-4
    bg-white/35 rounded-[80px]
    shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)]
  `
} as const;

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * VideoPlayer Component
 * Handles lazy loading of video content with placeholder image
 * Only renders video element after viewport entry to improve initial load time
 * 
 * @param {boolean} isLoaded - Whether video should be loaded and displayed
 * @param {function} onLoad - Callback when video should be loaded
 */
const VideoPlayer = memo(({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <Card 
      className="hidden sm:block border-[5px] border-gray-300 container mx-auto bg-gray-100 rounded-3xl sm:rounded-[2rem] md:rounded-[2.5rem] shadow-none overflow-hidden p-0"
      role="img"
      aria-label="Product visualization video"
    >
      {isLoaded ? (
        <video
          playsInline
          className="w-full h-auto object-cover block"
          preload="metadata"
          autoPlay
          loop
          muted
          poster={VIDEO_POSTER}
        >
          {VIDEO_SOURCES.map(({ src, type }) => (
            <source key={src} src={src} type={type} />
          ))}
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={VIDEO_POSTER}
          alt="Reimagining Shopping Preview"
          className="w-full h-auto object-cover block"
          loading="lazy"
        />
      )}
    </Card>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

/**
 * BenefitPill Component
 * Displays a single benefit badge with glassmorphism effect
 * Memoized to prevent unnecessary re-renders
 * 
 * @param {string} text - Benefit text to display
 */
const BenefitPill = memo(({ text }: { text: string }) => (
  <div className={styles.textBubble}>
    <h2 className="text-white text-xs sm:text-sm lowecase font-elemental">
      {text}
    </h2>
  </div>
));

BenefitPill.displayName = 'BenefitPill';

/**
 * BenefitsList Component
 * Renders the grid of benefit pills below the video
 * Wrapped in motion.div for scroll-triggered animation
 */
const BenefitsList = memo(() => (
  <div className="flex flex-col items-center justify-center py-4 sm:py-10 w-full">
    <div className="container w-full">
      <motion.div
        initial={ANIMATION_CONFIG.initial}
        whileInView={ANIMATION_CONFIG.animate}
        transition={ANIMATION_CONFIG.transition}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className={styles.textBubbleContainer}>
          {BENEFITS.map((benefit, index) => (
            <BenefitPill key={index} text={benefit} />
          ))}
        </div>
      </motion.div>
    </div>
  </div>
));

BenefitsList.displayName = 'BenefitsList';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Section2 Component
 * Main section displaying product visualization video and feature benefits
 * 
 * Features:
 * - Lazy loads video on viewport entry to improve initial page load
 * - Scroll-triggered animations for smooth user experience
 * - Responsive design with mobile-first approach
 * - Glassmorphism UI effects on benefit pills
 * 
 * Performance Optimizations:
 * - Video only loads when section enters viewport
 * - Components memoized to prevent unnecessary re-renders
 * - Animation config reused across components
 * - Static content extracted to constants
 */
export default function Section2() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  /**
   * Handles video loading trigger
   * Uses useCallback to maintain referential equality across renders
   */
  const handleVideoLoad = useCallback(() => {
    if (!isVideoLoaded) {
      setIsVideoLoaded(true);
    }
  }, [isVideoLoaded]);

  return (
    <section className="relative overflow-hidden z-[2]" aria-label="Product Features">
      <div className="container mx-auto px-4">
        {/* Video Section */}
        <motion.div
          initial={ANIMATION_CONFIG.initial}
          whileInView={ANIMATION_CONFIG.animate}
          transition={ANIMATION_CONFIG.transition}
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={handleVideoLoad}
        >
          <VideoPlayer isLoaded={isVideoLoaded} />
        </motion.div>

        {/* Benefits Pills Section */}
        <BenefitsList />
      </div>
    </section>
  );
}