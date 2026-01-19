import { useEffect, useRef, useState } from "react";
import FloatingButton from "./UITypography/FloatingButton/FloatingButton";

export default function FloatingButtonWrapper({ children }) {
  const heroRef = useRef(null);
  const sectionsStartRef = useRef(null);
  const [showFloating, setShowFloating] = useState(false);

 useEffect(() => {
    // Wait until refs are available
    // if (!heroRef.current || !sectionsStartRef.current) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFloating(false);
        }
      },
      { threshold: 0.5 },
    );

    const sectionsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFloating(true);
        }
      },
      { threshold: 0.35 },
    );

    heroObserver.observe(heroRef.current);
    sectionsObserver.observe(sectionsStartRef.current);

    return () => {
      heroObserver.disconnect();
      sectionsObserver.disconnect();
    };
  }, [heroRef.current, sectionsStartRef.current]);

  return (
    <>
      {children(heroRef, sectionsStartRef)}

      {showFloating && (
        <div className="floating" style={{ position: "fixed", bottom: "1%" }}>
          <FloatingButton />
        </div>
      )}
    </>
  );
}
