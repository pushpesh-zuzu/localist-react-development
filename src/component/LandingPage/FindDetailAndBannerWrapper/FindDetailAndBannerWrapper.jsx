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
        />
        {/* <div style={{ position: "absolute", bottom: "5%" }}>
          <div className={styles.ratingRow}>
            <p className={styles.mainText}>Excellent</p>
              <img src={FiveStar} alt="star" className={styles.fiveStar} />

            <p className={styles.reviews}>18,359 reviews on </p>
            <div style={{display:'flex',alignItems:'center'}}><img src={GreenStar} alt="star" className={styles.starIcon} />
            <p className={styles.mainText}>Trustpilot</p></div>
          </div>
        </div> */}
        <RatingBadge />
      </div>
      <div>
        <FindDetail paragraphs={paragraphs} />
      </div>
    </>
  );
};

export default FindDetailAndBannerWrapper;
