import React from "react";
import styles from "./GetCTAButton.module.css";
import Button1 from "../UITypography/Button1";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";

const GetCTAButton = ({
  text='Get A Free Quotes Now',
  onClick,
  variant = "warning",
  buttonClassName = "",
}) => {
  return (
    <div className={styles.cta}>
      <Button1
        onClick={onClick}
        variant={variant}
        className={`${styles.button} ${buttonClassName}`}
      >
        {text}
        <GetQuotesIcon color="white" />
      </Button1>
    </div>
  );
};

export default GetCTAButton;
