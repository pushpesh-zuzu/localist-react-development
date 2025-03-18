import React from "react";
import AccountantInLocation from "./AccountantInLocation/AccountantInLocation";
import HowWeWork from "./HowWeWorkLocation/HowWeWork";
import PopularAccountingServices from "./PopularAccountingServices/PopularAccountingServices";
import AveragePriceLocation from "./AveragePriceLocation/AveragePriceLocation";
import PopularAccountant from "./PopularAccountant/PopularAccountant";
import PopularCitiesLocation from "./PopularCitiesLocation/PopularCitiesLocation";
import GetQuotes from "../common/getQuotes/GetQuotes";

const Location = () => {
  return (
    <>
      <AccountantInLocation />
      <HowWeWork />
      <PopularAccountingServices />
      <AveragePriceLocation />
      <PopularAccountant />
      <PopularCitiesLocation />
      <GetQuotes message="from Accountants in Derbyshire" />
    </>
  );
};

export default Location;
