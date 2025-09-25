import styles from "../SearchPostAndBanner/searchpostandbanner.module.css";
import FindDetail from "../FindDetail/FindDetail";
import SearchPostAndBanner from "../SearchPostAndBanner/SearchPostAndBanner";
import RatingBadge from "../RatingBadge/RatingBadge";

const FindDetailAndBannerWrapper = ({
  title,
  bannerImage,
  paragraphs,
  defaultService,
  cancelHeading,
  cancelPara,
  serviceId,
  welcomModalTitle
}) => {
  const style = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // height: "539px",
    color: "white",
  };

  return (
    <>
      <div
        className={styles.findAccountantContainer}
        style={{ ...style, position: "relative" }}
      >
        <SearchPostAndBanner
          serviceId={serviceId}
          defaultService={defaultService}
          title={title}
          cancelHeading={cancelHeading}
          cancelPara={cancelPara}
          welcomModalTitle={welcomModalTitle}
        />
        {/* <RatingBadge /> */}
      </div>
      <div>
        <FindDetail paragraphs={paragraphs} />
      </div>
    </>
  );
};

export default FindDetailAndBannerWrapper;
