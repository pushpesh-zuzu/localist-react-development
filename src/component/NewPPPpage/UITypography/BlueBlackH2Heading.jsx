import React from "react";
import H2 from "./H2";
import { color } from "framer-motion";

function BlueBlackH2Heading({ className = "", blueText = "", blackText = "" }) {
  return (
    <H2   className={`${className}`} style={{color:"#00aef0",fontWeight:900 }} >
      {blueText} <span style={{color:"#252525"}} >{blackText}</span>
    </H2>
  );
}

export default BlueBlackH2Heading;
