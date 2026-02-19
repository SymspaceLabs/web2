"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { memo } from "react";

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Card content configuration
 */
const CARDS_CONTENT = {
  card1: {
    title: "Environmental Impact",
    description: "Our technology addresses the implications shopping has on our environment",
    image: "/images/landing/card/tree.png",
    href: "/global-impact"
  },
  card2a: {
    title: "Website Integration",
    description: "Enhance your customers experience",
    image: "/images/landing/card/cursor.png",
    bg: "#D5D5D5",
    textColor: "#000",
    href: "/ar-app-simulation"
  },
  card2b: {
    title: "Application Integration",
    description: "An immersive way to shop conveniently",
    image: "/images/landing/card/mobile.png",
    bg: "#353535",
    textColor: "#FFF",
    href: "/ar-app-simulation"
  },
  card3: {
    title: "Underserved Customers",
    description: "We are committed to empowering underserved communities through Augmented Reality. Our AR platform prioritizes accessibility, ensuring individuals with disabilities, senior citizens, veterans, and expectant mothers have access to convenient shopping experiences. We're redefining inclusivity with the mission to create a world where technology adapts to the needs of every user.",
    image: "/images/landing/card/wheelchair.png",
    href: "/global-impact"
  }
} as const;

/**
 * Animation configuration
 */
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
  viewport: { once: true, margin: "-100px" }
};

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  section: "pt-10 sm:pt-20 pb-20 md:pb-40 h-full relative",
  container: "container mx-auto px-4 h-full",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch h-full",
  
  leftColumn: "flex flex-col justify-center items-end gap-2.5",
  rightColumn: "h-auto",
  
  cardRow: "flex gap-4 w-full items-stretch justify-between flex-wrap md:flex-nowrap",
  
  // Card 1 styles
  card1: `
    group py-2 sm:py-11 px-8 w-full h-full bg-white 
    flex justify-between items-center rounded-[25px] sm:rounded-[50px] 
    gap-4 relative overflow-hidden transition-all duration-300 ease-in-out
  `,
  card1Content: "flex-1 flex flex-col justify-center items-end gap-2 sm:gap-4 transition-transform duration-300 sm:group-hover:-translate-y-[10%]",
  
  // Card 2 styles
  card2Base: `
    group flex-1 min-w-[45%] w-full min-h-[250px] 
    py-4 sm:py-11 pr-4 pl-4 sm:pl-0
    flex justify-center items-center rounded-[25px] sm:rounded-[50px]
    relative overflow-hidden transition-all duration-300
  `,
  card2Content: "h-[143px] flex flex-col items-center gap-4 transition-transform duration-300 sm:group-hover:-translate-y-[10%]",
  
  // Card 3 styles
  card3: `
    group h-full pt-8 sm:pt-14 pb-4 sm:pb-10 px-4 sm:px-10
    flex flex-col bg-[#D5D5D5] rounded-[25px] sm:rounded-[50px]
    justify-center overflow-hidden relative transition-all duration-300
  `,
  card3Inner: "h-full flex justify-between items-center relative gap-10",
  card3Content: "h-full flex flex-col justify-between items-start gap-4 transition-transform duration-300 sm:group-hover:-translate-y-[10%]",
  
  // Typography
  title1: "self-stretch text-black text-[15px] sm:text-[24px] font-elemental lowercase",
  title2: "self-stretch text-[8.5px] sm:text-lg leading-[1.5] min-h-[26px] break-words font-elemental lowercase",
  description1: "font-helvetica self-stretch text-[#909090] text-xs sm:text-base font-bold leading-none sm:leading-[1.5] break-words max-w-[500px]",
  description2: "font-helvetica self-stretch text-[#909090] text-xs sm:text-[15px] font-bold leading-none sm:leading-[1.5] break-words max-w-[200px] min-h-[26px]",
  description3: "font-helvetica self-stretch text-[#909090] text-xs sm:text-base font-bold leading-[1.5] sm:leading-[2] break-words max-w-[330px] text-justify",
  
  // Button
  button: ` font-elemental
    inline-flex py-2 sm:py-4 px-2 sm:px-4 max-h-[30px] sm:max-h-none
    rounded-[50px] justify-center items-center text-center
    text-[10px] sm:text-base font-medium
    transition-all duration-300 ease-in-out
    opacity-100 sm:opacity-0 sm:translate-y-4
    sm:group-hover:opacity-100 sm:group-hover:translate-y-0
  `,
  buttonWrapper: "w-full h-[50px] relative flex justify-end sm:justify-start",
  buttonWrapper2: "w-full flex justify-end sm:justify-start"
} as const;

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Card1 Component
 * Environmental Impact card with image and content
 */
const Card1 = memo(() => (
  <div className={styles.card1}>
    <div className="p-0">
      <Image
        alt="Environmental Impact"
        width={175}
        height={175}
        src={CARDS_CONTENT.card1.image}
        className="w-20 h-20 sm:w-[175px] sm:h-[175px]"
        loading="lazy"
      />
    </div>
    
    <div className={styles.card1Content}>
      <h3 className={styles.title1}>
        {CARDS_CONTENT.card1.title}
      </h3>
      <p className={styles.description1}>
        {CARDS_CONTENT.card1.description}
      </p>
      <div className={styles.buttonWrapper}>
        <Link
          href={CARDS_CONTENT.card1.href}
          className={`${styles.button} border border-black text-black hover:bg-black hover:text-white`}
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
));

Card1.displayName = 'Card1';

/**
 * Card2 Component
 * Reusable integration card with customizable background and text color
 */
const Card2 = memo(({ 
  title, 
  description, 
  image, 
  bg, 
  textColor, 
  href 
}: {
  title: string;
  description: string;
  image: string;
  bg: string;
  textColor: string;
  href: string;
}) => (
  <div 
    className={styles.card2Base}
    style={{ backgroundColor: bg }}
  >
    <div className="p-0 hidden lg:block">
      <Image
        alt={title}
        width={100}
        height={100}
        src={image}
        className="w-20 h-20 sm:w-[100px] sm:h-[100px]"
        loading="lazy"
      />
    </div>
    
    <div className={styles.card2Content}>
      <div className="flex flex-col">
        <h3 
          className={styles.title2}
          style={{ color: textColor }}
        >
          {title}
        </h3>
        <p className={styles.description2}>
          {description}
        </p>
      </div>
      
      <div className={styles.buttonWrapper2}>
        <Link
          href={href}
          className={`${styles.button} border`}
          style={{ 
            borderColor: textColor,
            color: textColor
          }}
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
));

Card2.displayName = 'Card2';

/**
 * Card3 Component
 * Underserved Customers card with overlapping image
 */
const Card3 = memo(() => (
  <div className={styles.card3}>
    <div className={styles.card3Inner}>
      <div className={styles.card3Content}>
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <h3 className="font-elemental self-stretch text-black text-[15px] sm:text-[25px] leading-none">
            {CARDS_CONTENT.card3.title}
          </h3>
          <p className={styles.description3}>
            {CARDS_CONTENT.card3.description}
          </p>
        </div>
        
        <div className="w-full h-[50px] relative flex justify-end sm:justify-start">
          <Link
            href={CARDS_CONTENT.card3.href}
            className={`${styles.button} border border-black text-black hover:bg-black hover:text-white`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
    
    <Image
      alt="Accessibility"
      width={300}
      height={300}
      src={CARDS_CONTENT.card3.image}
      className="w-[120px] h-[120px] sm:w-[300px] sm:h-[300px] hidden lg:block absolute -right-[50px] top-1/2 -translate-y-1/2"
      loading="lazy"
    />
  </div>
));

Card3.displayName = 'Card3';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Section8 Component
 * Feature cards section showcasing environmental impact, integrations, and accessibility
 * 
 * Features:
 * - Responsive grid layout (2 columns on desktop, 1 on mobile)
 * - Three types of feature cards with different layouts
 * - Scroll-triggered animations on each card
 * - Hover effects (desktop only) with button reveal
 * - Image optimization with Next.js
 * 
 * Layout:
 * Left Column:
 * - Card1: Environmental Impact (full width)
 * - Card2a & Card2b: Website and App Integration (side by side)
 * 
 * Right Column:
 * - Card3: Underserved Customers (full height)
 * 
 * Performance Optimizations:
 * - All cards memoized to prevent unnecessary re-renders
 * - Static content extracted to constants
 * - Lazy-loaded images with Next.js optimization
 * - CSS-only hover effects (no JavaScript)
 * - Shared animation configuration
 * 
 * @returns {JSX.Element} Feature cards section component
 */
export default function Section8() {
  return (
    <section className={styles.section} aria-label="Features">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Card 1 - Environmental Impact */}
            <motion.div
              initial={ANIMATION_CONFIG.initial}
              whileInView={ANIMATION_CONFIG.animate}
              transition={ANIMATION_CONFIG.transition}
              viewport={ANIMATION_CONFIG.viewport}
              className="w-full"
            >
              <Card1 />
            </motion.div>

            {/* Card 2 - Integration Cards */}
            <div className={styles.cardRow}>
              <motion.div
                initial={ANIMATION_CONFIG.initial}
                whileInView={ANIMATION_CONFIG.animate}
                transition={ANIMATION_CONFIG.transition}
                viewport={ANIMATION_CONFIG.viewport}
                className="flex-1 min-w-[45%]"
              >
                <Card2
                  title={CARDS_CONTENT.card2a.title}
                  description={CARDS_CONTENT.card2a.description}
                  image={CARDS_CONTENT.card2a.image}
                  bg={CARDS_CONTENT.card2a.bg}
                  textColor={CARDS_CONTENT.card2a.textColor}
                  href={CARDS_CONTENT.card2a.href}
                />
              </motion.div>

              <motion.div
                initial={ANIMATION_CONFIG.initial}
                whileInView={ANIMATION_CONFIG.animate}
                transition={ANIMATION_CONFIG.transition}
                viewport={ANIMATION_CONFIG.viewport}
                className="flex-1 min-w-[45%]"
              >
                <Card2
                  title={CARDS_CONTENT.card2b.title}
                  description={CARDS_CONTENT.card2b.description}
                  image={CARDS_CONTENT.card2b.image}
                  bg={CARDS_CONTENT.card2b.bg}
                  textColor={CARDS_CONTENT.card2b.textColor}
                  href={CARDS_CONTENT.card2b.href}
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Card 3 */}
          <div className={styles.rightColumn}>
            <motion.div
              initial={ANIMATION_CONFIG.initial}
              whileInView={ANIMATION_CONFIG.animate}
              transition={ANIMATION_CONFIG.transition}
              viewport={ANIMATION_CONFIG.viewport}
              className="h-full"
            >
              <Card3 />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}