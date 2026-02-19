"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { memo } from "react";

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Section content configuration
 */
const SECTION_CONTENT = {
  title: "3D Repository",
  description: "Generate and store high-quality 3D models of any dynamic or static product from text-prompts, images, weblinks, and object scans. Choose from hundreds of templates to create marketing ad videos. Then allow your consumers to trial these products realistically in our immersive AR marketplace.",
  cta: {
    text: "Explore",
    href: "/sell-on-symspace#benefits"
  },
  image: {
    src: "/images/landing/dashboard.png",
    alt: "3D Repository Dashboard",
    width: 650,
    height: 650
  }
} as const;

/**
 * Animation configuration
 */
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, margin: "-100px" }
} as const;

// ============================================================================
// STYLES
// ============================================================================

/**
 * Tailwind CSS classes
 */
const styles = {
  section: "relative z-[2]",
  container: "container mx-auto px-4",
  wrapper: "flex-grow py-10 sm:py-16",
  
  // Grid layout
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch h-full",
  leftColumn: "flex flex-col gap-8 h-full",
  rightColumn: "flex flex-row items-center justify-center h-full",
  
  // Typography
  title: "text-lg sm:text-[55px] text-white text-center sm:text-left lowercase font-elemental",
  description: "max-w-[550px] text-white text-xs sm:text-lg px-2 sm:px-0 text-justify leading-[1.5] sm:leading-[2] font-helvetica",
  
  // Button
  ctaButton: `
    h-full flex-1 sm:flex-none min-w-full sm:min-w-[250px] text-white rounded-[50px]
    border-2 border-white py-2 sm:py-4 px-6 text-[10px] sm:text-base
    transition-all duration-300 ease-in-out lowercase font-elemental text-center
    hover:bg-gradient-to-r hover:from-white hover:to-[#AEAEAE] hover:text-black
  `,
  
  ctaWrapper: "pt-0 sm:pt-10 flex justify-center sm:justify-start",
  
  // Image
  imageWrapper: "w-full max-w-[650px] mx-auto"
} as const;

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * SectionTitle Component
 * Displays the main section heading
 */
const SectionTitle = memo(({ title }: { title: string }) => (
  <h2 className={styles.title}>
    {title}
  </h2>
));

SectionTitle.displayName = 'SectionTitle';

/**
 * SectionDescription Component
 * Displays the section description
 */
const SectionDescription = memo(({ description }: { description: string }) => (
  <p className={styles.description}>
    {description}
  </p>
));

SectionDescription.displayName = 'SectionDescription';

/**
 * CTAButton Component
 * Call-to-action button for exploring the feature
 */
const CTAButton = memo(({ href, text }: { href: string; text: string }) => (
  <div className={styles.ctaWrapper}>
    <Link href={href} className={styles.ctaButton}>
      {text}
    </Link>
  </div>
));

CTAButton.displayName = 'CTAButton';

/**
 * RepositoryImage Component
 * Displays the 3D repository dashboard image
 * Uses Next.js Image for optimization
 */
const RepositoryImage = memo(({ 
  src, 
  alt, 
  width, 
  height 
}: { 
  src: string; 
  alt: string; 
  width: number; 
  height: number;
}) => (
  <div className={styles.imageWrapper}>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="w-full h-auto"
      loading="lazy"
      quality={90}
    />
  </div>
));

RepositoryImage.displayName = 'RepositoryImage';

/**
 * LeftColumn Component
 * Contains title, description, and CTA button
 */
const LeftColumn = memo(() => (
  <div className={styles.leftColumn}>
    <SectionTitle title={SECTION_CONTENT.title} />
    <SectionDescription description={SECTION_CONTENT.description} />
    <CTAButton href={SECTION_CONTENT.cta.href} text={SECTION_CONTENT.cta.text} />
  </div>
));

LeftColumn.displayName = 'LeftColumn';

/**
 * RightColumn Component
 * Contains the dashboard image
 */
const RightColumn = memo(() => (
  <div className={styles.rightColumn}>
    <RepositoryImage
      src={SECTION_CONTENT.image.src}
      alt={SECTION_CONTENT.image.alt}
      width={SECTION_CONTENT.image.width}
      height={SECTION_CONTENT.image.height}
    />
  </div>
));

RightColumn.displayName = 'RightColumn';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Section7 Component
 * "3D Repository" section showcasing product model generation and storage
 * 
 * Features:
 * - Two-column layout (50/50 split on desktop)
 * - Scroll-triggered fade-in animation
 * - Responsive design with mobile stacking
 * - Left: Title, description, and CTA
 * - Right: Dashboard preview image
 * - Optimized Next.js Image component
 * 
 * Performance Optimizations:
 * - Components memoized to prevent unnecessary re-renders
 * - Static content extracted to constants
 * - Lazy-loaded images with Next.js optimization
 * - Shared animation configuration
 * 
 * @returns {JSX.Element} 3D Repository section component
 */
export default function Section7() {
  return (
    <section id="3d-repository" className={styles.section} aria-label="3D Repository">
      <motion.div
        initial={ANIMATION_CONFIG.initial}
        whileInView={ANIMATION_CONFIG.animate}
        transition={ANIMATION_CONFIG.transition}
        viewport={ANIMATION_CONFIG.viewport}
        className="h-full"
      >
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.grid}>
              {/* Left Column - Content */}
              <LeftColumn />

              {/* Right Column - Image */}
              <RightColumn />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}