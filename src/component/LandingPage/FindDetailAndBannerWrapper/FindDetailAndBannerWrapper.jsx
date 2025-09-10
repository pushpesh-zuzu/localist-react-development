import styles from "../SearchPostAndBanner/searchpostandbanner.module.css";
import FindDetail from "../FindDetail/FindDetail";
import SearchPostAndBanner from "../SearchPostAndBanner/SearchPostAndBanner";
import GreenStar from "../../../assets/Icons/GreenStar.png";
import FiveStar from "../../../assets/Icons/FiveStar.png";


const FindDetailAndBannerWrapper = ({
  title,
  bannerImage,
  paragraphs,
  defaultService,
  cancelHeading,
  cancelPara
}) => {
  const style = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "539px",
    color: "white",
  };

  return (
    <>
      <div
        className={styles.findAccountantContainer}
        style={{ ...style, position: "relative" }}
      >
        <SearchPostAndBanner defaultService={defaultService} title={title} cancelHeading={cancelHeading} cancelPara={cancelPara} />
        <div style={{ position: "absolute", bottom: "32px" }}>
          <div className={styles.ratingRow}>
            <p className={styles.mainText}>Excellent</p>
            {/* <div style={{ display: "flex", gap: "2px",marginTop:'2px',height:'20px' }}> */}
              <img src={FiveStar} alt="star" className={styles.fiveStar} />
            {/* </div> */}

            <p className={styles.reviews}>18,359 reviews on </p>
            <div style={{display:'flex',alignItems:'center'}}><img src={GreenStar} alt="star" className={styles.starIcon} />
            <p className={styles.mainText}>Trustpilot</p></div>
          </div>
        </div>
      </div>
      <div>
        <FindDetail paragraphs={paragraphs} />
      </div>
    </>
  );
};

export default FindDetailAndBannerWrapper;
