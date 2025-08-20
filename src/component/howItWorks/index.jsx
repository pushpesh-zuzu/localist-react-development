import HowLoaclistsWorks from "./HowLoaclistsWorks/HowLoaclistsWorks";
import FindLocalServices from "./FindLocalServices/FindLocalServices";
import ServicesSteps from "./ServicesSteps/ServicesSteps";
import ResigterNow from "./RegisterNow/RegisterNow";
import { Helmet } from "react-helmet-async";

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title> How It Works for Sellers - Localists</title>
        <meta
          name="description"
          content="Learn how Localists connect you with ready-to-hire customers in your
          area. Get quality leads, grow your business, and boost your visibility
          online today. pending"
        />
      </Helmet>
      <HowLoaclistsWorks />
      <FindLocalServices />
      <ServicesSteps />
      <ResigterNow />
    </>
  );
};

export default HowItWorks;
