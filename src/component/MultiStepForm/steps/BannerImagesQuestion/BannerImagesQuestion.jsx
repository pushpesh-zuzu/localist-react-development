import styles from "./BannerImagesQuestion.module.css";
import drivewaysBanner from "../QuestionAnswerMultiStep/banner/Driveways.webp";
import fenceBanner from "../QuestionAnswerMultiStep/banner/Fence.webp";
import landscapingBanner from "../QuestionAnswerMultiStep/banner/landscapingandgardeningBanner.webp";
import treeSurgeonBanner from "../QuestionAnswerMultiStep/banner/TreeSurgeonMultiStepBanner.webp";
import roofingBanner from "../QuestionAnswerMultiStep/banner/Roofing.webp";

const bannerMap = {
  "Driveway Installers": drivewaysBanner,
  "Fence & Gate Installation": fenceBanner,
  Landscaping: landscapingBanner,
  "Tree Surgeon": treeSurgeonBanner,
  Roofing: roofingBanner,
};

const BannerImagesQuestion = ({ serviceName = "Landscaping" }) => {
  return (
    <div className={styles.bannerMargin}>
      <img
        src={bannerMap[serviceName] || landscapingBanner}
        alt={`${serviceName} banner`}
        className={styles.bannerImage}
      />
    </div>
  );
};

export default BannerImagesQuestion;
