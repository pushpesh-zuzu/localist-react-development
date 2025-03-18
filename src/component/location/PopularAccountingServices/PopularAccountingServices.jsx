import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./PopularAccountingServices.module.css";
import { PopularAccountingServicesData } from "../../../constant/Location";
import leftArrow from "../../../assets/Images/location/LeftArrow.svg";
import rightArrow from "../../../assets/Images/location/RightArrow.svg";

function AutoplayPlugin(slider) {
  let timeout;
  let mouseOver = false;

  function start() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearTimeout(timeout);
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      start();
    });
    start();
  });

  slider.on("dragStarted", () => {
    clearTimeout(timeout);
  });

  slider.on("animationEnded", start);
  slider.on("updated", start);
}

const PopularAccountingServices = () => {
  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      infinite: true,
      slides: { perView: 3, spacing: 15 },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(max-width: 600px)": {
          slides: { perView: 1, spacing: 5 },
        },
      },
    },

    [AutoplayPlugin]
  );

  const restartAutoplay = () => {
    if (!slider.current) return;
    slider.current.stop();
    setTimeout(() => slider.current?.start(), 500);
  };

  return (
    <div className={styles.container}>
      {/* Title with Left & Right Arrow */}
      <div className={styles.titleWrapper}>
        <span className={styles.leftArrowWrapper}>
          <img
            src={leftArrow}
            alt="Left"
            className={styles.arrowIcon}
            // onClick={() => slider.current?.prev()}
            onClick={() => {
              slider.current?.prev();
              restartAutoplay();
            }}
          />
        </span>

        <h2 className={styles.heading}>
          Popular <span className={styles.highlight}>Accounting Services</span>
        </h2>
        <span className={styles.rightArrowWrapper}>
          <img
            src={rightArrow}
            alt="Right"
            className={styles.arrowIcon}
            onClick={() => slider.current?.next()}
          />
        </span>
      </div>

      {/* Slider */}
      <div className={styles.sliderWrapper}>
        <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
          {PopularAccountingServicesData.map((service) => (
            <div
              key={service.id}
              className={`keen-slider__slide ${styles.slide}`}
            >
              <img src={service.image} alt={service.title} />
              <p>{service.description}</p>

              {service?.availableOnline && (
                <span className={styles.availableOnline}>Available Online</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularAccountingServices;
