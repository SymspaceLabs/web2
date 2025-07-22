import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { StyledBox } from "./styles"; // Assuming StyledBox is where the base styles are defined

// ============================================================
// Sticky Component - Adjusted for Z-Index Compatibility
// ============================================================
export default function Sticky({
  fixedOn,
  children,
  onSticky,
  scrollDistance = 0,
  // Added a zIndex prop to allow external control, defaulting to a low value
  zIndex = 100 
}) {
  const [fixed, setFixed] = useState(false);
  const elementRef = useRef(null);
  const [height, setHeight] = useState(0);

  const scrollListener = useCallback(() => {
    if (!window) return;
    const isFixed = window.scrollY >= fixedOn + scrollDistance;
    setFixed(isFixed);
  }, [fixedOn, scrollDistance]);

  useEffect(() => {
    if (!window) return;
    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [scrollListener]);

  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed, onSticky]);

  useEffect(() => {
    if (elementRef.current) {
      setHeight(elementRef.current.offsetHeight);
      // Re-run scroll listener after height is set to correctly determine fixed state
      scrollListener(); 
    }
  }, [scrollListener]); // Depend on scrollListener to re-evaluate when it changes

  return (
    // Pass the zIndex prop to StyledBox. StyledBox should consume it for styling
    // and not pass it down to the underlying DOM element.
    <StyledBox fixedOn={fixedOn} componentHeight={height} fixed={fixed} zIndex={zIndex}>
      <div className={clsx({
        hold: !fixed,
        fixed: fixed 
      })} ref={elementRef}>
        {children}
      </div>
    </StyledBox>
  );
}
