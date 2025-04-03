import styles from "./services.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import leftArrow from "../../../assets/Images/backwordArrow.svg";
import rightArrow from "../../../assets/Images/forwordArrow.svg";
import { services } from "../../../constant/Homepage";
import SpecificService from "./SpecificService";

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

const formatTitle = (title) => {
  const parts = title.split("&");

  if (parts.length > 1) {
    return (
      <>
        <h4 className={styles.categoryTitleText}>
          {parts[0]} <span className={styles.blackText}>&</span> {parts[1]}
        </h4>
      </>
    );
  } else {
    return (
      <>
        <span className={styles.categoryTitleText}>{parts[0]}</span>
      </>
    );
  }
};

const Services = () => {
  return (
    <div className={styles.container1}>
      {services.map((category, categoryIndex) => {
        const [sliderRef, slider] = useKeenSlider(
          {
            loop: true,
            slides: { perView: 3, spacing: 20 },
            breakpoints: {
              "(max-width: 1024px)": { slides: { perView: 3, spacing: 15 } },
              "(max-width: 768px)": { slides: { perView: 2, spacing: 5 } },
            },
          },
          [AutoplayPlugin]
        );

        return (
          <div key={categoryIndex} className={styles.container}>
            <h2 className={styles.heading}>{formatTitle(category.type)}</h2>

            {/* Left Arrow */}
            <button
              className={styles.arrowLeft}
              onClick={() => slider.current?.prev()}
            >
              <img src={leftArrow} alt="Left" />
            </button>

            {/* Slider */}
            <div className={styles.sliderWrapper}>
              <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
                {category.services.map((service, index) => (
                  <div
                    key={index}
                    className={`keen-slider__slide ${styles.slide}`}
                  >
                    <SpecificService service={service} />
                  </div>
                ))}
              </div>
            </div>

            <button
              className={styles.arrowRight}
              onClick={() => slider.current?.next()}
            >
              <img src={rightArrow} alt="Right" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Services;
