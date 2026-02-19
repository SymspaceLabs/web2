import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BoxLinkProps {
  href: string;
  title: string;
  textColor?: string;
  fw?: number;
  children?: React.ReactNode;
  className?: string;
}

const BoxLink: React.FC<BoxLinkProps> = ({
  href,
  title,
  textColor = '#fff',
  fw = 600,
  children,
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'inline-block border-b border-white font-helvetica',
        className
      )}
      style={{
        color: textColor,
        fontWeight: fw,
      }}
    >
      {title}
    </Link>
  );
};

export default BoxLink;