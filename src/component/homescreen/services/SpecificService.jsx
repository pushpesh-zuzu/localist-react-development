import { BASE_URL_IMAGE } from "../../../utils";
import styles from "./services.module.css";
import PropTypes from "prop-types";
import imgBanner from "../../../assets/Images/houseCleaner.svg";
import { useState } from "react";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";

// Import optimized WebP images

import {
  ArtificialGrassSlider,
  DrivewayInstallationSlider,
  FenceAndGateInsallationSlider,
  LandscapingSlider,
  PatioServicesSlider,
  RoofingSlider,
  TreeSurgeryHomeSlider,
} from "../../level3/imagesServices";

// Service ID to optimized image mapping
const OPTIMIZED_IMAGES = {
  // Replace these IDs with your actual service IDs
  52: PatioServicesSlider,
  54: ArtificialGrassSlider,
  49: FenceAndGateInsallationSlider,
  51: DrivewayInstallationSlider,
  112: TreeSurgeryHomeSlider,
  43: LandscapingSlider,
  113: RoofingSlider,
};

const SpecificService = ({ service }) => {
  const getOptimizedImage = () => {
    const serviceKey =service.id

    // Check if optimized image exists
    if (OPTIMIZED_IMAGES[serviceKey]) {
      return OPTIMIZED_IMAGES[serviceKey];
    }

    // Fallback to API image or default banner
    return service.banner_image
      ? `${BASE_URL_IMAGE}${service.banner_image}`
      : imgBanner;
  };

  return (
    <>
      <div className={styles.serviceCard}>
        <img
          src={getOptimizedImage()}
          alt={service.seo_title}
          className={styles.serviceImage}
          loading="eager"
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
