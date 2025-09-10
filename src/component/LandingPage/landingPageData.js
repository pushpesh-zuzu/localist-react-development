import LandscapingBanner from "../../assets/Images/servicesLevels/banner/landscapingandgardeningBanner.jpg";
import formStep from "../../assets/Images/formStep.png";
import quoteStep from "../../assets/Images/conactStep.png";
import compareStep from "../../assets/Images/compareStep.svg";

const LANDING_DETAIL_DATA = {
  fencing_ppc: {
    paragraphs: [
      "Here at <strong>Localists</strong>, finding a local fencing or gating company is quick and easy. Simply submit your details above and we will match you with <strong>quotes from local companies in seconds</strong>.",
    ],
  },
  driveways_ppc: {
    paragraphs: [
      "Here at <strong>Localists</strong>, finding a local driveway company is quick and easy. Simply submit your details above and we will match you with <strong>quotes from local driveway specialists in seconds</strong>.",
    ],
  },
  patio_ppc: {
    paragraphs: [
      "Here at <strong>Localists</strong>, finding a local patio company is quick and easy. Simply submit your details above and we will match you with <strong>quotes from local patio experts in seconds</strong>.",
    ],
  },
  landscaping_ppc: {
    paragraphs: [
      "Here at <strong>Localists</strong>, finding a local landscaper is quick and easy. Simply submit your details above and we will match you with <strong>quotes from local landscapers in seconds</strong>.",
    ],
  },
  artificial_grass_installation_ppc: {
    paragraphs: [
      "Here at <strong>Localists</strong>, finding a local artificial grass company is quick and easy. Simply submit your details above and we will match you with <strong>quotes from local experts in seconds</strong>.",
    ],
  },
};

const LANDING_DETAIL_BANNERS = {
   fencing_ppc: {
    banner: LandscapingBanner,
    // reltatedImage: Landscaping,
  },
  landscaping_ppc: {
    banner: LandscapingBanner,
    // reltatedImage: Landscaping,
  },
  driveways_ppc: {
    banner: LandscapingBanner,
    // reltatedImage: Landscaping,
  },
  patio_ppc: {
    banner: LandscapingBanner,
    // reltatedImage: Landscaping,
  },
  landscaping_ppc: {
    banner: LandscapingBanner,
    // reltatedImage: Landscaping,
  },
  artificial_grass_installation_ppc: {
    banner: LandscapingBanner,
    // reltatedImage: Landscaping,
  },
};
const LANDING_SERVICES = {
  fencing_ppc: "Fence & Gate Installation",
  driveways_ppc: "Driveway Installation",
  patio_ppc: "Patio Services",
  landscaping_ppc: "Landscaping",
  artificial_grass_installation_ppc: "Artificial Grass Installation",
};
const LANDING_TITLES_AND_META = {
  landscaping_ppc: {
    title: "Landscapers now",
  },
  fencing_ppc: {
    title: "Fencing & Gating companies now",
  },
  driveways_ppc: {
    title: "Driveway companies now",
  },
  patio_ppc: {
    title: "Patio companies now",
  },
  artificial_grass_installation_ppc: {
    title: "Artificial Grass companies now",
  },
};
const LANDING_HOW_IT_WORK = {
  landscaping_ppc: [
    {
      id: 1,
      icon: formStep,
      description: "Answer some quick questions about your requirements",
    },
    {
      id: 2,
      icon: quoteStep,
      description: "Receive quotes from approved local companies",
    },
    {
      id: 3,
      icon: compareStep,
      description:
        "Compare your results and choose the one that works for you!",
    },
  ],
};
const CANCEL_POPUP_DATA = {
  cancelHeading: "Don’t forget to check prices!",
  cancelPara: `Simply answer a few questions about your requirement, and we will match you with local professionals in seconds! `,
};

export {
  LANDING_DETAIL_DATA,
  LANDING_DETAIL_BANNERS,
  LANDING_SERVICES,
  LANDING_TITLES_AND_META,
  LANDING_HOW_IT_WORK,
  CANCEL_POPUP_DATA
};
