"use client";

import { motion } from "framer-motion";
import { memo } from 'react';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Section content configuration
 * Centralized for easy content management and i18n support
 */
const SECTION_CONTENT = {
  title: "Future of Retail",
  description: `In the rapidly growing XR industry, Symspace is at the forefront of empowering brands for the future. By creating highly accurate, detailed, realistic 3D models, we help brands prepare for the AR revolution when XR hardware becomes more accessible and affordable. We imagine a world where individuals can effortlessly explore and purchase products remotely by immersing themselves in virtual experiences. We aim to become the standard for XR accessibility by prioritizing and empowering those unable to travel our convenient AR solution. With Symspace, consumers can shop from home, receive sizing recommendations, and feel confident in their purchases. Embrace the future and simulate the retail space with us.`,
  cta: {
    text: "partner sign up",
    href: `${process.env.NEXT_PUBLIC_SELLER_URL}/register`
  }
} as const;

/**
 * Animation configuration for consistent motion
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
 * Tailwind CSS classes converted from MUI styles
 * Organized for maintainability and reusability
 */
const styles = {
  // Typography
  sectionHeader: "text-lg sm:text-[55px] text-white text-center font-elemental lowercase",
  sectionParagraph: "text-white text-xs sm:text-lg text-justify container leading-[1.5] sm:leading-[2] font-helvetica",
  
  // Button
  outlinedBtn: `
    h-full flex-1 sm:flex-none min-w-full sm:min-w-[250px] text-white rounded-[50px]
    border-2 border-white py-2 sm:py-4 px-6 text-[10px] sm:text-base
    transition-all duration-300 ease-in-out text-center font-elemental lowercase
    hover:bg-gradient-to-r hover:from-white hover:to-[#AEAEAE] hover:text-black
  `,
  
  // Layout
  container: "relative z-[2] py-4 sm:py-10",
  contentWrapper: "flex flex-col items-center justify-center py-4 sm:py-10 px-4 gap-8 sm:gap-16"
} as const;

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * SectionTitle Component
 * Displays the main section heading with consistent styling
 * Memoized to prevent unnecessary re-renders
 * 
 * @param {string} title - Section title text
 */
const SectionTitle = memo(({ title }: { title: string }) => (
  <h2 className={styles.sectionHeader}>
    {title}
  </h2>
));

SectionTitle.displayName = 'SectionTitle';

/**
 * SectionDescription Component
 * Displays the main section description with justified text alignment
 * Memoized to prevent unnecessary re-renders
 * 
 * @param {string} description - Section description text
 */
const SectionDescription = memo(({ description }: { description: string }) => (
  <p className={styles.sectionParagraph}>
    {description}
  </p>
));

SectionDescription.displayName = 'SectionDescription';

/**
 * CTAButton Component
 * Call-to-action button for partner sign up
 * Memoized to prevent unnecessary re-renders
 * Note: In your actual Next.js app, replace <a> with Next.js <Link> component
 * 
 * @param {string} href - Link destination URL
 * @param {string} text - Button text
 */
const CTAButton = memo(({ href, text }: { href: string; text: string }) => (
  <a
    href={href}
    className={styles.outlinedBtn}
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
 * Section3 Component
 * "Future of Retail" section showcasing Symspace's vision and XR capabilities
 * 
 * Features:
 * - Centered content layout with responsive spacing
 * - Scroll-triggered fade-in animation
 * - Partner sign-up CTA
 * - Fully responsive design
 * 
 * Performance Optimizations:
 * - Components memoized to prevent unnecessary re-renders
 * - Static content extracted to constants
 * - Shared animation configuration
 * - Semantic HTML structure for accessibility
 * 
 * @returns {JSX.Element} Future of Retail section component
 */
export default function Section3() {
  return (
    <section className={styles.container} aria-label="Future of Retail">
      <motion.div
        initial={ANIMATION_CONFIG.initial}
        whileInView={ANIMATION_CONFIG.animate}
        transition={ANIMATION_CONFIG.transition}
        viewport={ANIMATION_CONFIG.viewport}
        className="h-full"
      >
        <div className={styles.contentWrapper}>
          <SectionTitle title={SECTION_CONTENT.title} />
          <SectionDescription description={SECTION_CONTENT.description} />
          <CTAButton 
            href={SECTION_CONTENT.cta.href} 
            text={SECTION_CONTENT.cta.text} 
          />
        </div>
      </motion.div>
    </section>
  );
}