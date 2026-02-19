// ===========================================
// BlobBox Component
// components/blobBox.tsx
// ===========================================

"use client";

interface BlobBoxProps {
  top?: string | number | null;
  right?: string | number | null;
  bottom?: string | number | null;
  left?: string | number | null;
  background?: string;
  displayNoneMobile?: boolean;
  widthHeight?: string;
}

export const BlobBox = ({
  top = null,
  right = null,
  bottom = null,
  left = null,
  background = "#0366FE",
  displayNoneMobile = false,
  widthHeight = '500px',
}: BlobBoxProps) => {
  // Helper function to convert number to px string
  const formatPosition = (value: string | number | null) => {
    if (value === null) return undefined;
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  return (
    <div
      className={`${displayNoneMobile ? 'hidden sm:block' : 'block'} absolute rounded-full filter blur-[75px] opacity-50 animate-blob`}
      style={{
        top: formatPosition(top),
        right: formatPosition(right),
        bottom: formatPosition(bottom),
        left: formatPosition(left),
        width: widthHeight,
        height: widthHeight,
        background,
      }}
    />
  );
};