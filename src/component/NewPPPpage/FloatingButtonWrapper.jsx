import { useEffect, useRef, useState } from "react";
import FloatingButton from "./UITypography/FloatingButton/FloatingButton";

export default function FloatingButtonWrapper({ children }) {
  const heroRef = useRef(null);
  const sectionsStartRef = useRef(null);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    if (!heroRef.current || !sectionsStartRef.current) return;

    // Hero section observer
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // Agar Hero visible hai (top par hai) → Button hide
        if (entry.isIntersecting) {
          setShowFloating(false);
        }
      },
      { threshold: 0.5 } // 50% hero visible → button hide
    );

    // How It Works section observer
    const sectionsObserver = new IntersectionObserver(
      ([entry]) => {
        // Agar How It Works visible hai → Button show
        if (entry.isIntersecting) {
          setShowFloating(true);
        }
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(heroRef.current);
    sectionsObserver.observe(sectionsStartRef.current);

    return () => {
      heroObserver.disconnect();
      sectionsObserver.disconnect();
    };
  }, []);

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
