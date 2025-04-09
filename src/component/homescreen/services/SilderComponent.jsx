import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./services.module.css";
import leftArrow from "../../../assets/Images/backwordArrow.svg";
import rightArrow from "../../../assets/Images/forwordArrow.svg";
import SpecificService from "./SpecificService";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { useState } from "react";
import { useSelector } from "react-redux";

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

const SliderComponent = ({ subcategory }) => {
    const [selectedServiceId, setSelectedServiceId] = useState({ id: null, name: "" })
        const [show, setShow] = useState(false)
        const { userToken } = useSelector((state)=> state.auth)
      const handleOpen = (id, name) => {
        setSelectedServiceId({ id, name });
        setShow(true);
      };
      const handleClose = () => {
        setShow(false)
      }
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
    <>
     {subcategory?.length > 0 && (<> <button
        className={styles.arrowLeft}
        onClick={() => slider.current?.prev()}
      >
        <img src={leftArrow} alt="Left" />
      </button>

      <div className={styles.sliderWrapper}>
        <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
          {subcategory?.map((service, index) => (
            <div key={index} className={`keen-slider__slide ${styles.slide}`} onClick={() => handleOpen(service?.id, service?.name)}>
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
      </button></>)}

      {show && (userToken?.active_status == 2 || !userToken )  && (
          <>
            <BuyerRegistration closeModal={handleClose} serviceId={selectedServiceId?.id} serviceName={selectedServiceId.name} />
          </>
        )}
    </>
  );
};

export default SliderComponent;
