"use client";

import clsx from "clsx";
import { ReactNode, HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

interface EllipsisTypographyProps extends TypographyProps {
  ellipsis?: boolean;
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 className={clsx("lowercase font-elemental", className)} {...props}>
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2 className={clsx("font-sans font-bold", className)} {...props}>
      {children}
    </h2>
  );
}

export function Paragraph({ children, className, ...props }: TypographyProps) {
  return (
    <p className={clsx("font-sans font-medium", className)} {...props}>
      {children}
    </p>
  );
}

export function H3({ children, ellipsis = false, className, ...props }: EllipsisTypographyProps) {
  return (
    <h3 className={clsx("text-[20px] font-bold", ellipsis && "truncate", className)} {...props}>
      {children}
    </h3>
  );
}

export function H4({ children, ellipsis = false, className, ...props }: EllipsisTypographyProps) {
  return (
    <h4 className={clsx("text-[17px] font-semibold", ellipsis && "truncate", className)} {...props}>
      {children}
    </h4>
  );
}

export function H5({ children, ellipsis = false, className, ...props }: EllipsisTypographyProps) {
  return (
    <h5 className={clsx("text-[16px] font-semibold leading-none", ellipsis && "truncate", className)} {...props}>
      {children}
    </h5>
  );
}

export function H6({ children, ellipsis = false, className, ...props }: EllipsisTypographyProps) {
  return (
    <h6 className={clsx("text-[14px] font-semibold", ellipsis && "truncate", className)} {...props}>
      {children}
    </h6>
  );
}

export function Small({ children, ellipsis = false, className, ...props }: EllipsisTypographyProps) {
  return (
    <small className={clsx("text-[12px] font-normal", ellipsis && "truncate", className)} {...props}>
      {children}
    </small>
  );
}

export function Span({ children, ellipsis = false, className, ...props }: EllipsisTypographyProps) {
  return (
    <span className={clsx(ellipsis && "truncate", className)} {...props}>
      {children}
    </span>
  );
}

export function Tiny({ children, ellipsis = false, className, ...props }: EllipsisTypographyProps) {
  return (
    <small className={clsx("text-[10px] font-normal", ellipsis && "truncate", className)} {...props}>
      {children}
    </small>
  );
}