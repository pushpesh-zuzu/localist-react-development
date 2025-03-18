import styles from "./Reviews.module.css";
import reviewsStar from "../../../assets/Images/subcategory/reviews-star.svg";
import leftArrowDark from "../../../assets/Images/subcategory/left-arrow.svg";
import rightArrowDark from "../../../assets/Images/subcategory/right-arrow.svg";
import { REVIEWS_DATA } from "../../../constant/subCategory";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
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
const Reviews = () => {
  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      infinite: true,
      slides: { perView: 1, spacing: 30 },
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
      <div className={styles.reviews_container}>
        <div className={styles.reviews_container_wrap}>
          <span
            className={styles.leftArrowWrapper}
            onClick={() => {
              slider.current?.prev();
              restartAutoplay();
            }}
          >
            <img
              src={leftArrowDark}
              alt="Left"
              className={styles.arrowIcon}
              width={17}
            />
          </span>

          <div className={styles.reviews_slider_wrap}>
            <h1 className={styles.reviews_heading}>Reviews</h1>
            <div
              ref={sliderRef}
              className={`keen-slider ${styles.reviews_content_wrapper}`}
            >
              {REVIEWS_DATA?.map((reviews) => (
                <div
                  key={reviews.id}
                  className={`keen-slider__slide ${styles.reviews_slide}`}
                >
                  <div className={styles.reviews_star_Image_wrap}>
                    <img src={reviewsStar} />
                    <span>{reviews?.date}</span>
                  </div>
                  <p className={styles.reviews_description}>
                    {reviews?.description}
                  </p>
                  <img
                    src={reviews?.image}
                    className={styles.reviews_image_wrap}
                  />
                  <h4 className={styles.reviews_name_content}>
                    <b>{reviews?.name} </b> {reviews?.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
          <span
            className={styles.rightArrowWrapper}
            onClick={() => slider.current?.next()}
          >
            <img
              src={rightArrowDark}
              alt="Right"
              className={styles.arrowIcon}
              width={17}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Reviews;
