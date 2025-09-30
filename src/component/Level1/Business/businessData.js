import {
  AccountingSlider,
  BookkeepingServicesSlider,
} from "../../level3/imagesServices";
import {
  BusinessProfessionalsIcon,
  FreeQuotesIcon,
  WhatYouNeedIcon,
} from "../images";

const BusinessHowItWork = [
  {
    id: 1,
    title: "the Best Match",
    image: WhatYouNeedIcon, // Same icon as business
    heading1: "Find the ",
    heading2: "best match",
    break: true,
    description:
      "We will help you find quality Business Professionals in your local area. Let us know your requirements, and Localists will match you with the best service provider to help you.",
  },
  {
    id: 2,
    title: "Free Quotes",
    image: FreeQuotesIcon, // Same icon as business
    heading1: "Request ",
    heading2: "free quotes",
    break: true,
    description:
      "We will send you quotes from local Business Professionals for free. You can then compare profiles from Business Professionals near you, read verified reviews, see what makes them stand out, and pick the best Business Professional for you. ",
  },
  {
    id: 3,
    title: "Start Your Training ",
    image: BusinessProfessionalsIcon, // Same icon as business
    heading1: "Work with your  ",
    heading2: "business professional ",
    description:
      "Once you’ve found the right Business Professional, you can contact them straight away. Discuss your project, ask questions, and get things moving with confidence.",
  },
];
const BusinessPopularCategory = [
  {
    id: 1,
    title: "Bookkeeping Services",
    image: BookkeepingServicesSlider,
    // path: "",
  },
  {
    id: 2,
    image: AccountingSlider,
    title: "Accounting",
    // path: "",
  },
];
export { BusinessHowItWork, BusinessPopularCategory };
