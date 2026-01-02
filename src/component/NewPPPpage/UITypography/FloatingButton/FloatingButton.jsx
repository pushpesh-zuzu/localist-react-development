import React from "react";
import GetQuotesIcon from "../../../../assets/ReactIcons/GetQuotesIcon";
import { handleScrollToBottom } from "../../../../utils/scroll";
import styles from './FloatingButton.module.css'
function FloatingButton() {
  return (
    <button onClick={()=>{handleScrollToBottom()}} className={`${styles.base} ${styles.floating}`}>
      Get A Free Quotes Now{" "}
      <GetQuotesIcon style={{ marginLeft: "5px" }} color="white" />
    </button>
  );
}

export default FloatingButton;
