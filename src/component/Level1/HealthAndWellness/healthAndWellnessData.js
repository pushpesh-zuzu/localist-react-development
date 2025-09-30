import { MassageTherapySlider, PersonalTrainersSlider, PhysicsMathsSlider, TutorsServiceSlider } from "../../level3/imagesServices";
import { BusinessProfessionalsIcon, FreeQuotesIcon, WhatYouNeedIcon } from "../images";

const HealthAndWellnessHowItWork = [
  {
    id: 1,
    title: "the Best Match",
    image: WhatYouNeedIcon, // Same icon as business
    heading1: "Find the ",
    heading2: "best match",
    description:
      "Share your health and wellness needs, and Localists will connect you with trusted local professionals ready to help.",
  },
  {
    id: 2,
    title: "Free Quotes",
    image: FreeQuotesIcon, // Same icon as business
    heading1: "Request ",
    heading2: "free quotes",
    description:
      "Compare their profiles, check verified reviews, and see what makes each provider stand out before making your decision.",
  },
  {
    id: 3,
    title: "Start Your Training ",
    image: BusinessProfessionalsIcon, // Same icon as business
    heading1: "Start your  ",
    heading2: "training ",
    description:
      "Once you’ve selected the right professional, contact them directly to discuss your goals, confirm details, and begin your path to better health with confidence.",
  },
];
const HealthAndWellnessPopularCategory = [
  {
    id: 1,
    title: "Personal Trainers",
    image: PersonalTrainersSlider,
    // path: "tutors-near-me",
  },
   {
      id: 2,
      image: MassageTherapySlider,
      title: "Massage Therapy",
     
    //   path: "physics-maths-tutors-near-me",
    },
 
];
export { HealthAndWellnessHowItWork,HealthAndWellnessPopularCategory };
