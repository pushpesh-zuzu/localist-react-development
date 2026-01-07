// components/FloatingButtonWrapper.jsx
import { useEffect, useRef, useState } from "react";
import FloatingButton from "./UITypography/FloatingButton/FloatingButton";

export default function FloatingButtonWrapper({ children }) {
  const howItWorksRef = useRef(null);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    if (!howItWorksRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloating(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(howItWorksRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {children(howItWorksRef)}

      {showFloating && (
        <div
          className="floating"
          style={{
            position: "fixed",
            bottom: "1%",
          }}
        >
          <FloatingButton />
        </div>
      )}
    </>
  );
}
