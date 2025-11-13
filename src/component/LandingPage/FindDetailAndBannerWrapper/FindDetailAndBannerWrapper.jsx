import styles from "../SearchPostAndBanner/searchpostandbanner.module.css";
import FindDetail from "../FindDetail/FindDetail";
import SearchPostAndBanner from "../SearchPostAndBanner/SearchPostAndBanner";

const FindDetailAndBannerWrapper = ({
  title,
  bannerImage,
  paragraphs,
  defaultService,
  cancelHeading,
  cancelPara,
  serviceId,
  welcomModalTitle,
  welcomModalButtonText
}) => {
  const style = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
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
          welcomModalButtonText={welcomModalButtonText}
        />
      </div>
      <div>
        <FindDetail paragraphs={paragraphs} />
      </div>
    </>
  );
};

export default FindDetailAndBannerWrapper;
