import React, { useState, useEffect } from "react";
import styles from "./LoaderWithTextMultiStepForm.module.css";

const LoaderWithTextMultiStepForm = ({
  loadingTexts = [
    "Evaluating your requirements",
    "Sorting best local matches",
    "Curating top matches",
  ],
  intervalTime = 1000,
  totalLoadingTime = 3000,
  setIsInitialLoading,
  setIsBannerText,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsInitialLoading(false);
      setIsBannerText(true);
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex < loadingTexts.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, intervalTime);

    const timer = setTimeout(() => {
      clearInterval(textInterval);
    }, totalLoadingTime);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [loadingTexts, intervalTime, totalLoadingTime]);

  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loader}></div>
      <p className={styles.loadingText}>{loadingTexts[currentTextIndex]}</p>
    </div>
  );
};

export default LoaderWithTextMultiStepForm;
