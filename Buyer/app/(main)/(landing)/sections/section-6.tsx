"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { memo } from "react";

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Section content configuration
 */
const SECTION_CONTENT = {
  title: "Application",
  description: "Optimized for user experience, our AR application allows consumers to leverage various advanced AR features to trial products like never before. Consumers are able to augment 3D products realistically in their own space, providing a virtual trial room experience for clothes, furniture, and more. The Symspace app goes beyond visualization by offering near-precise sizing recommendations, reducing returns, and increasing consumer confidence levels.",
  cta: {
    text: "Learn More",
    href: "/ar-app-simulation"
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

const LEFT_ANIMATION = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
  viewport: { once: true, margin: "-100px" }
} as const;

// ============================================================================
// STYLES
// ============================================================================

/**
 * Tailwind CSS classes
 */
const styles = {
  section: "bg-[#FAFAFA]",
  container: "container mx-auto px-4",
  contentWrapper: "relative z-[2] min-h-[400px] md:min-h-[600px] flex flex-col gap-6 py-8 md:py-16 items-start justify-center",
  
  // Grid layout
  grid: "grid grid-cols-1 md:grid-cols-12 gap-8 items-center",
  leftColumn: "md:col-span-4 flex flex-col z-[2]",
  rightColumn: "md:col-span-8 z-[2]",
  
  // Typography
  title: "text-lg sm:text-[55px] text-black px-4 sm:px-0 text-center sm:text-left font-elemental lowercase",
  description: "py-4 sm:py-10 max-w-[1000px] text-[#353535] text-xs sm:text-lg px-4 sm:px-0 text-justify leading-[1.5] sm:leading-[2] font-helvetica",
  
  // Button
  ctaButton: `
    border-2 border-black font-normal min-w-[175px] text-black rounded-[50px]
    py-2 sm:py-4 px-6 text-[10px] sm:text-base
    transition-all duration-300 ease-in-out font-elemental text-center
    hover:bg-gradient-to-r hover:from-[#666666] hover:to-black hover:text-white hover:border-white
  `,
  
  ctaWrapper: "pt-4 flex justify-center sm:justify-start"
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
 * Call-to-action button for learning more
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
 * LeftColumn Component
 * Left content area with scroll-triggered animation
 * Currently empty but can be populated with additional content
 */
const LeftColumn = memo(() => (
  <motion.div
    initial={LEFT_ANIMATION.initial}
    whileInView={LEFT_ANIMATION.animate}
    transition={LEFT_ANIMATION.transition}
    viewport={LEFT_ANIMATION.viewport}
    className={styles.leftColumn}
  >
    {/* Add content here if needed in the future */}
  </motion.div>
));

LeftColumn.displayName = 'LeftColumn';

/**
 * RightColumn Component
 * Main content area with title, description, and CTA
 */
const RightColumn = memo(() => (
  <motion.div
    initial={ANIMATION_CONFIG.initial}
    whileInView={ANIMATION_CONFIG.animate}
    transition={ANIMATION_CONFIG.transition}
    viewport={ANIMATION_CONFIG.viewport}
    className={styles.rightColumn}
  >
    <SectionTitle title={SECTION_CONTENT.title} />
    <SectionDescription description={SECTION_CONTENT.description} />
    <CTAButton href={SECTION_CONTENT.cta.href} text={SECTION_CONTENT.cta.text} />
  </motion.div>
));

RightColumn.displayName = 'RightColumn';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Section6 Component
 * "Application" section showcasing AR app features and benefits
 * 
 * Features:
 * - Light background (#FAFAFA) for contrast with other sections
 * - Two-column layout (4/8 grid split on desktop)
 * - Scroll-triggered animations using Framer Motion's whileInView
 * - Responsive design with mobile-first approach
 * - CTA button to learn more about AR application
 * 
 * Layout:
 * - Left: Empty placeholder (can be populated with image/video)
 * - Right: Title, description, and CTA button
 * 
 * Performance Optimizations:
 * - Components memoized to prevent unnecessary re-renders
 * - Static content extracted to constants
 * - Shared animation configurations
 * - Framer Motion viewport detection for optimized animations
 * 
 * @returns {JSX.Element} Application section component
 */
export default function Section6() {
  return (
    <section className={styles.section} aria-label="AR Application">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.grid}>
            {/* Left Column - Empty placeholder for future content */}
            <LeftColumn />

            {/* Right Column - Main content */}
            <RightColumn />
          </div>
        </div>
      </div>
    </section>
  );
}