"use client";

import { motion } from "framer-motion";
import { memo } from 'react';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Section content configuration
 */
const SECTION_CONTENT = {
  title: "Convenient & Comfortable",
  description: {
    part1: "Explore products from the comfort of your home to conveniently and confidently shop through Augmented Reality.",
    part2: "Receive sizing recommendations and use our advanced AR application to augment products in real-time."
  },
  cta: {
    text: "Shop",
    href: "/marketplace"
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
  container: "py-20 relative z-[2]",
  contentWrapper: "container mx-auto px-4",
  innerContent: "flex flex-col items-center justify-center gap-10 sm:gap-20 py-0 sm:py-20 text-center",
  
  // Typography
  title: "text-lg sm:text-[55px] text-white font-elemental",
  description: "text-white text-xs sm:text-lg text-justify sm:text-center leading-[2] px-4 sm:px-0 font-helvetica",
  
  // Button
  ctaButton: `
    h-full flex-1 sm:flex-none min-w-full sm:min-w-[250px] text-white rounded-[50px]
    border-2 border-white py-2 sm:py-4 px-6 text-[10px] sm:text-base
    transition-all duration-300 ease-in-out lowercase font-elemental
    hover:bg-gradient-to-r hover:from-white hover:to-[#AEAEAE] hover:text-black
  `
} as const;

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * SectionTitle Component
 * Displays the main section heading
 * Memoized to prevent unnecessary re-renders
 * 
 * @param {string} title - Section title text
 */
const SectionTitle = memo(({ title }: { title: string }) => (
  <h2 className={styles.title}>
    {title}
  </h2>
));

SectionTitle.displayName = 'SectionTitle';

/**
 * SectionDescription Component
 * Displays the section description with responsive line breaks
 * Memoized to prevent unnecessary re-renders
 * 
 * @param {Object} description - Description object with two parts
 */
const SectionDescription = memo(({ 
  description 
}: { 
  description: { part1: string; part2: string } 
}) => (
  <p className={styles.description}>
    {description.part1}
    <br className="hidden sm:block" />
    {description.part2}
  </p>
));

SectionDescription.displayName = 'SectionDescription';

/**
 * CTAButton Component
 * Call-to-action button for shopping
 * Memoized to prevent unnecessary re-renders
 * Note: In your Next.js app, replace <a> with Next.js <Link>
 * 
 * @param {string} href - Link destination URL
 * @param {string} text - Button text
 */
const CTAButton = memo(({ href, text }: { href: string; text: string }) => (
  <a
    href={href}
    className={styles.ctaButton}
    aria-label={text}
  >
    {text}
  </a>
));

CTAButton.displayName = 'CTAButton';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Section5 Component
 * "Convenient & Comfortable" section highlighting AR shopping benefits
 * 
 * Features:
 * - Centered content layout with generous spacing
 * - Scroll-triggered fade-in animation
 * - Responsive text alignment (justify on mobile, center on desktop)
 * - Call-to-action button for marketplace
 * - Fully responsive design
 * 
 * Performance Optimizations:
 * - Components memoized to prevent unnecessary re-renders
 * - Static content extracted to constants
 * - Shared animation configuration
 * - Semantic HTML structure for accessibility
 * 
 * @returns {JSX.Element} Convenient & Comfortable section component
 */
export default function Section5() {
  return (
    <section className={styles.container} aria-label="AR Shopping Benefits">
      <div className={styles.contentWrapper}>
        <motion.div
          initial={ANIMATION_CONFIG.initial}
          whileInView={ANIMATION_CONFIG.animate}
          transition={ANIMATION_CONFIG.transition}
          viewport={ANIMATION_CONFIG.viewport}
          className="h-full"
        >
          <div className={styles.innerContent}>
            <SectionTitle title={SECTION_CONTENT.title} />
            <SectionDescription description={SECTION_CONTENT.description} />
            <CTAButton 
              href={SECTION_CONTENT.cta.href} 
              text={SECTION_CONTENT.cta.text} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}