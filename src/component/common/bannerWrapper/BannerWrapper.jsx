import styles from "./bannerwrapper.module.css";

const BannerWrapper = ({ image, children }) => {
  const bannerStyle = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={styles.contactSection}>
      <div className={styles.bannerImage} style={bannerStyle}>
        <h1 className={styles.bannerTitle}>About Us</h1>

        {children && <div className={styles.bannerContent}>{children}</div>}
      </div>
    </div>
  );
};

export default BannerWrapper;
