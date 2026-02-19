// app/_lib/constants/animations.ts
export const ANIMATION_CONFIG = {
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    viewport: { once: true, margin: "-100px" }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
    viewport: { once: true }
  }
} as const;