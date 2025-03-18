import React from "react";
import FindLocalJobs from "./FindLocalJobs/FindLocalJobs";
import GrowthSteps from "./GrowthSteps/GrowthSteps";
import CustomerSuccessStories from "./CustomerSuccessStories/CustomerSuccessStories";
import RatedGreat from "./RatedGreat/RatedGreat";

const ServicePanel = () => {
  return (
    <>
      <FindLocalJobs />
      <GrowthSteps />
      <CustomerSuccessStories />
      <RatedGreat />
    </>
  );
};
export default ServicePanel;
