import LandscapingBanner from "./SearchPostAndBanner/banner/landscapingandgardeningBanner.webp";
import formStep from "../../assets/Images/formStep.png";
import quoteStep from "../../assets/Images/conactStep.png";
import compareStep from "../../assets/Images/compareStep.svg";
import PatioServices from "./SearchPostAndBanner/banner/PatioServices.webp";
import ArtificialGrass from "./SearchPostAndBanner/banner/ArtificialGrass.webp";
import Fence from "./SearchPostAndBanner/banner/Fence.webp";
import Driveways from "./SearchPostAndBanner/banner/Driveways.webp";
import Gate from "./SearchPostAndBanner/banner/Gate.webp";

const LANDING_DETAIL_DATA = {
  fencing_ppc: {
    paragraphs: [
      "Here at <strong>Localists</strong>, finding a local fencing company is quick and easy. Simply submit your details above and we will match you with <strong>quotes from local companies in seconds</strong>.",
    ],
  },
  driveways_ppc: {
    paragraphs: [
      "Here at <strong>Localists</strong>, finding a local driveway company is quick and easy. Simply submit your details above and we will match you with <strong>quotes from local driveway specialists in seconds</strong>.",
    ],
  },
  patio_services_ppc: {
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
  gates_ppc: {
    paragraphs: [
      "Here at <strong>Localists</strong>, finding a local gating company is quick and easy. Simply submit your details above and we will match you with <strong>quotes from local companies in seconds</strong>.",
    ],
  },
};

const LANDING_DETAIL_BANNERS = {
  fencing_ppc: {
    banner: Fence,
    // reltatedImage: Landscaping,
  },
  landscaping_ppc: {
    banner: LandscapingBanner,
    // reltatedImage: Landscaping,
  },
  driveways_ppc: {
    banner: Driveways,
    // reltatedImage: Landscaping,
  },
  patio_services_ppc: {
    banner: PatioServices,
    // reltatedImage: Landscaping,
  },
  landscaping_ppc: {
    banner: LandscapingBanner,
    // reltatedImage: Landscaping,
  },
  artificial_grass_installation_ppc: {
    banner: ArtificialGrass,
    // reltatedImage: Landscaping,
  },
  gates_ppc: {
    banner: Gate,
  },
};
const LANDING_SERVICES = {
  fencing_ppc: "Fence & Gate Installation",
  driveways_ppc: "Driveway Installation",
  patio_services_ppc: "Patio Services",
  landscaping_ppc: "Landscaping",
  artificial_grass_installation_ppc: "Artificial Grass Installation",
  gates_ppc: "Gate Installation",
};
const LANDING_TITLES_AND_META = {
  landscaping_ppc: {
    title: "Landscapers now",
  },
  fencing_ppc: {
    title: "Fencing companies now",
  },
  driveways_ppc: {
    title: "Driveway companies now",
  },
  patio_services_ppc: {
    title: "Patio companies now",
  },
  artificial_grass_installation_ppc: {
    title: "Artificial Grass companies now",
  },
  gates_ppc: {
    title: "Gating companies now",
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
const ServiceId = {
  fencing_ppc: 49,
  driveways_ppc: 51,
  patio_services_ppc: 52,
  landscaping_ppc: 43,
  artificial_grass_installation_ppc: 54,
};
const META_TAG_LANDING_PAGE = {
  fencing_ppc: {
    title: "Compare Free Quotes from Local Fencing Companies | Localists",
    name: "description",
    content:
      "Get free quotes from top fencing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",
  },
  driveways_ppc: {
    title: "Compare Free Quotes from Local Driveway Companies | Localists",
    name: "description",
    content:
      "Get free quotes from trusted local driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple.",
  },
  patio_services_ppc: {
    title: "Compare Free Quotes from Local Patio Companies | Localists",
    name: "description",
    content:
      "Find trusted patio companies near you. Compare free quotes and hire the best experts for patio design, installation, and repairs – fast and easy!",
  },
  landscaping_ppc: {
    title: "Compare Free Quotes from Local Landscapers | Localists",
    name: "description",
    content:
      "Compare free quotes from trusted local landscapers in seconds. Submit your details and get matched with top-rated landscapers near you – quick, easy, and hassle-free!",
  },
  artificial_grass_installation_ppc: {
    title:
      "Compare Free Quotes from Local Artificial Grass Companies | Localists",
    name: "description",
    content:
      " Find trusted artificial grass companies near you. Compare free quotes, read reviews, and hire the best professionals for your garden project today.",
  },
  gates_ppc: {
    title: "Compare Free Quotes from Local Gating Companies | Localists",
    name: "description",
    content:
      " Get free quotes from top gating companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",
  },
};
const LANDING_WELCOM_MODAL_TITLE = {
  landscaping_ppc: "Landscapers",
  patio_services_ppc: "Patio Installers",
  artificial_grass_installation_ppc: "Artificial Grass Companies",
  fencing_ppc: " Fencing Companies",
  driveways_ppc:'Driveway Installers',
  gates_ppc: "Gating Companies",
};
export {
  LANDING_DETAIL_DATA,
  LANDING_DETAIL_BANNERS,
  LANDING_SERVICES,
  LANDING_TITLES_AND_META,
  LANDING_HOW_IT_WORK,
  CANCEL_POPUP_DATA,
  ServiceId,
  META_TAG_LANDING_PAGE,
  LANDING_WELCOM_MODAL_TITLE,
};
