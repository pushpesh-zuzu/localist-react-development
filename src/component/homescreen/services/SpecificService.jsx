import { BASE_URL_IMAGE } from "../../../utils";
import styles from "./services.module.css";
import PropTypes from "prop-types";
import imgBanner from "../../../assets/Images/houseCleaner.svg";

const SpecificService = ({ service }) => {
  return (
    <>
      <div className={styles.serviceCard}>
       <img
          src={
          service.banner_image
          ? `${BASE_URL_IMAGE}${service.banner_image}`
          : imgBanner
          }
          alt={`${service.title} ${service.seo_title}`.trim()}
          className={styles.serviceImage}
          loading="lazy"
          width={400}  
          height={300} 
          style={{
          objectFit: 'cover',
          backgroundColor: '#f5f5f5' 
          }}
          onError={(e) => {
          e.target.src = imgBanner;
          }}
          />
        <p className={styles.serviceTitle}>{service.name}</p>
      </div>
    </>
  );
};

SpecificService.propTypes = {
  service: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SpecificService;
