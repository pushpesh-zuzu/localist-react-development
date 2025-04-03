import styles from "./popular.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import leftArrow from "../../../assets/Images/backwordArrow.svg";
import rightArrow from "../../../assets/Images/forwordArrow.svg";
import personalTrainers from "../../../assets/Images/personalPopularTrainer.svg";
import houseCleaning from "../../../assets/Images/houseCleaner.svg";
import webDesign from "../../../assets/Images/webDesign.svg";
import gardening from "../../../assets/Images/gardening.svg";
import { useEffect, useState } from "react";
import Modal from "../serviceCategory/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getPopularServiceList } from "../../../store/FindJobs/findJobSlice";
import imgBanner from "../../../assets/Images/houseCleaner.svg"
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { BASE_IMAGE_URL, BASE_URL_IMAGE } from "../../../utils";
// import Modal from "./Modal";
const serviceData = [
  { title: "Personal Trainers", image: personalTrainers },
  { title: "House Cleaning", image: houseCleaning },
  { title: "Web Design", image: webDesign },
  { title: "Gardening", image: gardening },
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

const PopularService = ({closeModal}) => {
  const [selectedServiceId, setSelectedServiceId] = useState({ id: null, name: "" })
  const [show,setShow] = useState(false)
const dispatch = useDispatch()
   const { popularList } =  useSelector((state) => state.findJobs);
   const handleOpen = (id, name) => {
    setSelectedServiceId({ id, name });
    setShow(true);
  };
  
  const handleClose = () => {
    setShow(false);
    setSelectedServiceId({ id: null, name: "" });
  };
useEffect(()=>{
dispatch(getPopularServiceList())
},[])
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
    <>
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
      <div className={styles.sliderWrapper} >
        <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
          {popularList?.map((service, index) => (
            <div key={index} className={`keen-slider__slide ${styles.slide}`} onClick={() => handleOpen(service?.id,service?.name)}>
              <img
             src={service.banner_image ? `${BASE_URL_IMAGE}${service.banner_image}` : imgBanner}
                alt={service.name}
                className={styles.image}
              />

              <p className={styles.serviceTitle}>{service.name}</p>
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
      {show && (
      <>
         <BuyerRegistration closeModal={handleClose} serviceId={selectedServiceId?.id}  serviceName={selectedServiceId.name} />
        </>
      )}
    </div>
    
  
    </>
  );
};

export default PopularService;
