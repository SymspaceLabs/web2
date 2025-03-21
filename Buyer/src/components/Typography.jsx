"use client";
// ==============================================================

import clsx from "clsx";
import { elementalEnd } from "@/app/layout";
import { Typography, Box } from "@mui/material";
import styled from "@mui/material/styles/styled";

// ==============================================================
const StyledBox = styled(Box, {
  shouldForwardProp: prop => prop !== "ellipsis"
})(({
  ellipsis
}) => ({ ...(ellipsis && {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  })
}));

export function H1({
  children,
  ...props
}) {
  return (
    <Typography
      {...props}
      fontFamily={`${elementalEnd.style.fontFamily}, sans-serif`}
      textTransform='lowercase'
      fontWeight={500}
    >
      {children}
    </Typography>);
}

export function Paragraph({
  children,
  ...props
}) {
  return (
    <Typography
      {...props}
      fontFamily="Helvetica"
      fontWeight={500}
    >
      {children}
    </Typography>);
}

export function H2(props) {
  const {
    ellipsis,
    children,
    className,
    ...others
  } = props;
  return <StyledBox fontSize={25} component="h2" fontWeight={700} ellipsis={ellipsis ? 1 : 0} {...className && {
    className: clsx({
      [className]: true
    })
  }} {...others}>
      {children}
    </StyledBox>;
}
export function H3(props) {
  const {
    ellipsis,
    children,
    className,
    ...others
  } = props;
  return <StyledBox fontSize={20} component="h3" fontWeight={700} ellipsis={ellipsis ? 1 : 0} {...className && {
    className: clsx({
      [className]: true
    })
  }} {...others}>
      {children}
    </StyledBox>;
}
export function H4(props) {
  const {
    ellipsis,
    children,
    className,
    ...others
  } = props;
  return <StyledBox fontSize={17} component="h4" fontWeight={600} ellipsis={ellipsis ? 1 : 0} {...className && {
    className: clsx({
      [className]: true
    })
  }} {...others}>
      {children}
    </StyledBox>;
}
export function H5(props) {
  const {
    ellipsis,
    children,
    className,
    ...others
  } = props;
  return <StyledBox fontSize={16} component="h5" lineHeight={1} fontWeight={600} ellipsis={ellipsis ? 1 : 0} {...className && {
    className: clsx({
      [className]: true
    })
  }} {...others}>
      {children}
    </StyledBox>;
}
export function H6(props) {
  const {
    ellipsis,
    children,
    className,
    ...others
  } = props;
  return <StyledBox fontSize={14} component="h6" fontWeight={600} ellipsis={ellipsis ? 1 : 0} {...className && {
    className: clsx({
      [className]: true
    })
  }} {...others}>
      {children}
    </StyledBox>;
}
// export function Paragraph(props) {
//   const {
//     ellipsis,
//     children,
//     className,
//     ...others
//   } = props;
//   return <StyledBox   fontSize={14} component="p" fontWeight={400} ellipsis={ellipsis ? 1 : 0} {...className && {
//     className: clsx({
//       [className]: true
//     })
//   }} {...others}>
//       {children}
//     </StyledBox>;
// }
export function Small(props) {
  const {
    ellipsis = false,
    children,
    className,
    ...others
  } = props;
  return <StyledBox fontSize={12} fontWeight={400} component="small" ellipsis={ellipsis ? 1 : 0} {...className && {
    className: clsx({
      [className]: true
    })
  }} {...others}>
      {children}
    </StyledBox>;
}
export function Span(props) {
  const {
    ellipsis = false,
    children,
    className,
    ...others
  } = props;
  return <StyledBox component="span" ellipsis={ellipsis ? 1 : 0} {...className && {
    className: clsx({
      [className]: true
    })
  }} {...others}>
      {children}
    </StyledBox>;
}
export function Tiny(props) {
  const {
    ellipsis = false,
    children,
    className,
    ...others
  } = props;
  return <StyledBox component="small" fontSize={10} fontWeight={400} ellipsis={ellipsis ? 1 : 0} {...className && {
    className: clsx({
      [className]: true
    })
  }} {...others}>
      {children}
    </StyledBox>;
}