// import Slider from "react-slick";
// import styles from "./popular.module.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import personalTrainers from "../../../assets/Images/personalPopularTrainer.svg";
// import houseCleaning from "../../../assets/Images/houseCleaner.svg";
// import webDesign from "../../../assets/Images/webDesign.svg";
// import gardening from "../../../assets/Images/gardening.svg";
// import forwordArrow from "../../../assets/Images/forwordArrow.svg";
// import backwordAoow from "../../../assets/Images/backwordArrow.svg";

// const serviceData = [
//   { title: "Personal Trainers", image: personalTrainers },
//   { title: "House Cleaning", image: houseCleaning },
//   { title: "Web Design", image: webDesign },
//   { title: "Gardening", image: gardening },
// ];

// // eslint-disable-next-line react/prop-types
// const NextArrow = ({ onClick }) => (
//   <button
//     className={`${styles.arrow} ${styles.next}`}
//     style={arrowStyle}
//     onClick={onClick}
//   >
//     <img src={forwordArrow} alt="forwordArrow" />
//   </button>
// );

// // eslint-disable-next-line react/prop-types
// const PrevArrow = ({ onClick }) => (
//   <button
//     className={`${styles.arrow} ${styles.prev}`}
//     style={arrowStyle}
//     onClick={onClick}
//   >
//     <img src={backwordAoow} alt="forwordArrow" />
//   </button>
// );

const slideStyle = {
  width: "calc(100% - 10px)",
  height: "200px",
  // background: "cyan",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid darkcyan",
  margin: "0 5px",
};

// const arrowStyle = {
//   display: "block",
//   background: "rgba(0, 0, 0, 0.5)",
//   color: "white",
//   border: "none",
//   padding: "0px",
//   cursor: "pointer",
//   position: "absolute",
//   top: "50%",
//   transform: "translateY(-50%)",
//   zIndex: 2,
// };

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 1500,
//   slidesToShow: 2,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 300,
//   pauseOnHover: true,
//   centerPadding: "5px",
//   nextArrow: <NextArrow />,
//   prevArrow: <PrevArrow />,
//   responsive: [
//     {
//       breakpoint: 2800,
//       settings: {
//         slidesToShow: 8,
//       },
//     },
//     {
//       breakpoint: 2400,
//       settings: {
//         slidesToShow: 5,
//       },
//     },
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//       },
//     },
//     {
//       breakpoint: 767,
//       settings: {
//         slidesToShow: 3,
//       },
//     },
//     {
//       breakpoint: 400,
//       settings: {
//         slidesToShow: 2,
//       },
//     },
//   ],
// };

// const PopularService = () => {
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>
//         Popular <span>Service</span> Requests
//       </h2>
//       <div className={styles.sliderWrapper}>
//         <Slider className={`${styles.custom_slider}`} {...settings}>
//           {serviceData.map((service, index) => (
//             <div key={index} className={styles.card} style={slideStyle}>
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className={styles.image}
//               />

//               <p className={styles.serviceTitle}>{service.title}</p>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default PopularService;

import styles from "./popular.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import leftArrow from "../../../assets/Images/backwordArrow.svg";
import rightArrow from "../../../assets/Images/forwordArrow.svg";
import personalTrainers from "../../../assets/Images/personalPopularTrainer.svg";
import houseCleaning from "../../../assets/Images/houseCleaner.svg";
import webDesign from "../../../assets/Images/webDesign.svg";
import gardening from "../../../assets/Images/gardening.svg";
const serviceData = [
  { title: "Personal Trainers", image: personalTrainers },
  { title: "House Cleaning", image: houseCleaning },
  { title: "Web Design", image: webDesign },
  { title: "Gardening", image: gardening },
  { title: "House Cleaning", image: houseCleaning },
];
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

const PopularService = () => {
  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 4, spacing: 20 },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 3, spacing: 15 },
        },
        "(max-width: 768px)": {
          slides: { perView: 2, spacing: 5 },
        },
      },
    },
    [AutoplayPlugin]
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Popular <span>Service</span> Requests{" "}
      </h2>
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
          {serviceData.map((service, index) => (
            <div key={index} className={`keen-slider__slide ${styles.slide}`}>
              <img
                src={service.image}
                alt={service.title}
                className={styles.image}
              />

              <p className={styles.serviceTitle}>{service.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        className={styles.arrowRight}
        onClick={() => slider.current?.next()}
      >
        <img src={rightArrow} alt="Right" />
      </button>
    </div>
  );
};

export default PopularService;
