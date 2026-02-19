// app/(main)/(landing)/sections/section-1.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useCallback, memo } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface PrimaryCta {
  text: string;
  href: string;
  icon: string;
}

interface SecondaryCta {
  text: string;
  href: string;
}

interface HeroContentConfig {
  subtitle: string;
  title: string;
  description: string;
  cta: {
    primary: PrimaryCta;
    secondary: SecondaryCta;
  };
}

interface VideoSource {
  src: string;
  type: string;
}

interface VideoConfig {
  sources: readonly VideoSource[];
  poster: string;
  dimensions: {
    width: number;
    height: number;
  };
}

interface AnimationConfig {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  transition: { duration: number };
  viewport: { once: boolean; margin: string };
}

interface CTAButtonProps {
  href: string;
  text: string;
  isPrimary?: boolean;
  iconSrc?: string;
}

interface HeroVideoProps {
  shouldLoad: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const HERO_CONTENT: HeroContentConfig = {
  subtitle: "AI Powered AR Commerce",
  title: "SYMSPACE",
  description: "Revolutionize your shopping experience through Augmented Reality.",
  cta: {
    primary: {
      text: "Get Started",
      href: "/register",
      icon: "/images/sparkler-white.webp"
    },
    secondary: {
      text: "Shop Now",
      href: "/marketplace"
    }
  }
} as const;

const VIDEO_CONFIG: VideoConfig = {
  sources: [
    { src: "/videos/landing-page/hero.webm", type: "video/webm" },
    { src: "/videos/landing-page/hero.mp4", type: "video/mp4" }
  ],
  poster: "/videos/landing-page/hero-poster.webp",
  dimensions: { width: 300, height: 500 }
} as const;

const ANIMATION_CONFIG: AnimationConfig = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, margin: "-100px" }
} as const;

// ============================================================================
// STYLES (Tailwind Classes)
// ============================================================================

const styles = {
  primaryCta: `
    flex items-center gap-3 
    bg-gradient-to-br from-[#18C8FF] to-[#933FFE] 
    text-white rounded-[50px] px-6 py-[15.5px] min-w-[250px]
    transition-all duration-300 
    hover:shadow-md border-2 border-white
  `.replace(/\s+/g, ' ').trim(),
  
  secondaryCta: `
    flex justify-center items-center font-elemental 
    px-6 py-[15.5px] border-2 border-white rounded-[50px] 
    text-white text-[10px] sm:text-sm min-w-[250px]
    transition-all duration-300 
    hover:bg-gradient-to-r hover:from-white hover:to-gray-400 hover:text-black
  `.replace(/\s+/g, ' ').trim(),
  
} as const;

// ============================================================================
// KEYFRAMES CSS
// ============================================================================

const blobKeyframes = `
  @keyframes blob-animation {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
`;

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * CTAButton Component
 * Reusable call-to-action button with optional icon
 */
const CTAButton = memo(({ 
  href, 
  text, 
  isPrimary = false, 
  iconSrc 
}: CTAButtonProps) => (
  <Link
    href={href}
    className={isPrimary ? styles.primaryCta : styles.secondaryCta}
    aria-label={text}
  >
    <span className="text-[10px] sm:text-[16px] font-elemental">
      {text}
    </span>
    {iconSrc && (
      <div className="flex justify-center items-center w-5 sm:w-9 flex-shrink-0">
        <Image
          alt=""
          width={35}
          height={35}
          src={iconSrc}
          className="w-full h-auto"
          priority
        />
      </div>
    )}
  </Link>
));

CTAButton.displayName = 'CTAButton';

/**
 * HeroVideo Component
 * Lazy-loaded video player with poster image fallback
 * Only loads video when section enters viewport
 */
const HeroVideo = memo(({ shouldLoad }: HeroVideoProps) => (
  <div className="relative max-w-[300px] md:max-w-[250px] overflow-hidden rounded-[40px] ml-20">
    {shouldLoad ? (
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={VIDEO_CONFIG.poster}
        width={VIDEO_CONFIG.dimensions.width}
        height={VIDEO_CONFIG.dimensions.height}
        className="w-full h-auto block"
        aria-label="Product demonstration video"
      >
        {VIDEO_CONFIG.sources.map(({ src, type }) => (
          <source key={src} src={src} type={type} />
        ))}
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        src={VIDEO_CONFIG.poster}
        alt="Product preview"
        width={VIDEO_CONFIG.dimensions.width}
        height={VIDEO_CONFIG.dimensions.height}
        className="w-full h-auto block"
        loading="lazy"
      />
    )}
  </div>
));

HeroVideo.displayName = 'HeroVideo';

/**
 * HeroContent Component
 * Left column containing headline, description, and CTAs
 */
const HeroContent = memo(() => (
  <motion.div
    initial={ANIMATION_CONFIG.initial}
    whileInView={ANIMATION_CONFIG.animate}
    transition={ANIMATION_CONFIG.transition}
    viewport={ANIMATION_CONFIG.viewport}
    className="flex flex-col w-full md:w-1/2 z-20 md:mt-[-50px]"
  >
    {/* Subtitle */}
    <p className="text-white/70 font-bold font-helvetica text-lg sm:text-[25px]">
      {HERO_CONTENT.subtitle}
    </p>

    {/* Main Title */}
    <h1 className="text-white text-5xl sm:text-6xl md:text-[90px] lowercase font-elemental">
      {HERO_CONTENT.title}
    </h1>

    {/* Description */}
    <p className="text-white text-[10px] sm:text-[18px] text-justify max-w-[600px] leading-[1.5] sm:leading-[2] mt-4 font-helvetica">
      {HERO_CONTENT.description}
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-wrap gap-6 mt-8">
      <CTAButton
        href={HERO_CONTENT.cta.primary.href}
        text={HERO_CONTENT.cta.primary.text}
        iconSrc={HERO_CONTENT.cta.primary.icon}
        isPrimary
      />
      <CTAButton
        href={HERO_CONTENT.cta.secondary.href}
        text={HERO_CONTENT.cta.secondary.text}
      />
    </div>
  </motion.div>
));

HeroContent.displayName = 'HeroContent';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Section1 Component
 * Hero section of the landing page featuring product headline and demo video
 */
export default function Section1() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const handleViewportEnter = useCallback(() => {
    if (!shouldLoadVideo) {
      setShouldLoadVideo(true);
    }
  }, [shouldLoadVideo]);

  return (
    <>
      {/* Inject keyframes */}
      <style jsx global>{blobKeyframes}</style>
      
      <section className="relative bg-transparent overflow-hidden" aria-label="Hero Section">       
        <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-center gap-12 py-24 md:py-36 px-4 md:px-0">
          {/* Left Column: Hero Content */}
          <HeroContent />

          {/* Right Column: Demo Video */}
          <motion.div
            initial={ANIMATION_CONFIG.initial}
            whileInView={ANIMATION_CONFIG.animate}
            transition={ANIMATION_CONFIG.transition}
            viewport={ANIMATION_CONFIG.viewport}
            onViewportEnter={handleViewportEnter}
            className="hidden md:flex w-full md:w-1/2 justify-center z-20"
          >
            <HeroVideo shouldLoad={shouldLoadVideo} />
          </motion.div>
        </div>
      </section>
    </>
  );
}