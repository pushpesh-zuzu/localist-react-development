import { Spin } from "antd";
import styles from "./CardLayoutWrapper.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import leftNormalArrow from "../../../../assets/Icons/leftNormalArrow.svg";
const CardLayoutWrapper = ({
  children,
  title,
  subtitle,
  buttonText = "Next",
  onButtonClick,
  onBackClick,
  showButton = true,
  showBackButton = false,
  disableNextButton,
  loader = false,
  headingCenter = true,
  titlePrimary = false,
  NameEmailContainer = false,
  titleHeading = "",
}) => {
  return (
    <div
      className={`${
        NameEmailContainer
          ? styles.cardContainerNameEmail
          : styles.cardContainer
      }`}
    >
      <div className={styles.cardWrapper}>
        {titleHeading && (
          <h1 style={{ marginBottom: "12px" }} className={styles.headingH1}>
            {titleHeading}
          </h1>
        )}
        {title && (
          <h2
            style={{ color: titlePrimary ? "#00afe3" : "#000" }}
            className={`${headingCenter ? styles.title : styles.leftTitle}`}
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <p
            style={{
              textAlign: headingCenter ? "center" : "left",
              marginBottom: "20px",
            }}
            className={styles.subtitle}
          >
            {subtitle}
          </p>
        )}

        {children}

        {showButton && (
          <div className={styles.buttonContainer}>
            {showBackButton && (
              <button className={styles.backButton} onClick={onBackClick}>
                {/* &lt; */}
                <img
                  style={{ height: "12px", width: "6px" }}
                  alt="leftNormalArrow"
                  src={leftNormalArrow}
                />
              </button>
            )}
            <button
              className={styles.actionButton}
              onClick={onButtonClick}
              disabled={disableNextButton}
            >
              {loader ? (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                />
              ) : (
                buttonText
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardLayoutWrapper;
