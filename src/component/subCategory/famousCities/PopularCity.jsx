import styles from "./popularcity.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import leftArrow from "../../../assets/Images/backwordArrow.svg";
import rightArrow from "../../../assets/Images/forwordArrow.svg";
import { POPULAR_CITIES } from "../../../constant/subCategory";
import CityBox from "./CityBox";
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
const PopularCity = ({ sliderdata, title }) => {
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
          slides: { perView: 2, spacing: 5 },
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
    <>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.heading} style={{fontWeight:600, flex: 1, textAlign: 'center'}}>
            {title}
          </h2>
          <span
            className={styles.leftArrowWrapper}
            onClick={() => {
              slider.current?.prev();
              restartAutoplay();
            }}
          >
            <img
              src={leftArrow}
              alt="Left"
              className={styles.arrowIcon}
              width={17}
            />
          </span>
          <span
            className={styles.rightArrowWrapper}
            onClick={() => slider.current?.next()}
          >
            <img
              src={rightArrow}
              alt="Right"
              className={styles.arrowIcon}
              width={17}
            />
          </span>
        </div>

        {/* Slider */}
        <div className={styles.sliderWrapper}>
          <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
            {POPULAR_CITIES.map((service) => (
              <div
                key={service.id}
                className={`keen-slider__slide ${styles.slide}`}
              >
              <CityBox city={service}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCity;