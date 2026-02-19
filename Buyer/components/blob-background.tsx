// app/(main)/(landing)/components/blob-background.tsx
'use client';

import { memo } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface BlobBoxProps {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  background: string;
  displayNoneMobile?: boolean;
  widthHeight?: string;
}

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

const BlobBox = memo(({ 
  top, 
  right, 
  bottom, 
  left, 
  background, 
  displayNoneMobile = false, 
  widthHeight = '500px' 
}: BlobBoxProps) => (
  <div
    className={`absolute rounded-full ${displayNoneMobile ? 'hidden sm:block' : 'block'} pointer-events-none`}
    style={{
      top,
      right,
      bottom,
      left,
      width: widthHeight,
      height: widthHeight,
      background,
      zIndex: 0,
      filter: 'blur(75px)',
      opacity: 0.5,
      animation: 'blob-animation 7s infinite',
    }}
  />
));

BlobBox.displayName = 'BlobBox';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BlobBackground() {
  return (
    <>
      {/* Inject keyframes */}
      <style jsx global>{blobKeyframes}</style>
      
      {/* Animated Gradient Blobs */}
        <BlobBox 
            top="0" 
            left="8%" 
            background="#0366FE"
            displayNoneMobile={false}
            widthHeight="500px"
        />

        <BlobBox
            top="0" 
            left="25%" 
            background="#FFF"
            displayNoneMobile={false}
            widthHeight="450px"
        />



        <BlobBox 
            top="2%"
            right="2%" 
            background="#FFF"
            displayNoneMobile={true}
            widthHeight="450px"
        />

        <BlobBox 
            top="0"
            right="2%" 
            background="#0366FE"
            displayNoneMobile={true}
            widthHeight="500px"
        />
    </>
  );
}