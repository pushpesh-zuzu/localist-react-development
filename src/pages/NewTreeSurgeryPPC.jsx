import { Helmet } from "react-helmet-async";
import HeroSectionNewPPC from "../component/NewPPPpage/HeroSection/HeroSectionNewPPC";
import HowItWorkNewPPC from "../component/NewPPPpage/HowItWorkNewPPC/HowItWorkNewPPC";
import PopularServicesTypes from "../component/NewPPPpage/PopularServicesTypes/PopularServicesTypes";

import TreeEditIcon from "../assets/ReactIcons/TreeEditIcon";
import TreeUserIcon from "../assets/ReactIcons/TreeUserIcon";
import TreeDocumentSearchIcon from "../assets/ReactIcons/TreeDocumentSearchIcon";
import CheckCircleIcon from "../assets/ReactIcons/CheckCircleIcon";
import CompetitivePricingIcon from "../assets/ReactIcons/CompetitivePricingIcon";
import QuicAlarmIcon from "../assets/ReactIcons/QuicAlarmIcon";
import ProfessionalServiceInstallation from "../component/NewPPPpage/ProffessionalServiceInstallation/ProfessionalServiceInstallation";
import TreeSurgeryCostGuide from "../component/NewPPPpage/TreeSurgeryCostGuide/TreeSurgeryCostGuide";
import TreeSurgeryRegionalGuide from "../component/NewPPPpage/TreeSurgeryRegionalGuide/TreeSurgeryRegionalGuide";
import { treeSurgeryRegionalPricing } from "../component/NewPPPpage/TreeSurgeryRegionalGuide/treeSurgeryReginalPricingData ";
import FAQSection from "../component/NewPPPpage/FAQSection/FAQSection";
import FloatingButton from "../component/NewPPPpage/UITypography/FloatingButton/FloatingButton";
import TreeComplexIcon from "../assets/ReactIcons/TreeComplexIcon";
import TreeServiceIcon from "../assets/ReactIcons/TreeServiceIcon";
import TreeWorkerIcon from "../assets/ReactIcons/TreeWorkerIcon";
import CloudSupportIcon from "../assets/ReactIcons/CloudSupportIcon";
import SearchDocumentIcon from "../assets/ReactIcons/SearchDocumentIcon";
import ComplexServiceIcon from "../assets/ReactIcons/ComplexServiceIcon";
import CuttingToolIcon from "../assets/ReactIcons/CuttingToolIcon";
import GuaranteedWorkIcon from "../assets/ReactIcons/GuaranteedWorkIcon";
import FloatingButtonWrapper from "../component/NewPPPpage/FloatingButtonWrapper";

export const NEW_PPC_POPULUAR_SERVICE_TYPE = [
  {
    icon: <TreeComplexIcon />,
    inActiveIcon: <TreeComplexIcon bgColor="#00AFE3" iconColor="#FFFFFF" />,
    title: "Tree Pruning & Trimming",
    description:
      "Keep trees healthy and well-shaped with professional pruning that removes dead or risky branches and encourages growth.",
    points: [
      {
        icon: <CheckCircleIcon />,
        text: "Deadwood removal",
      },
      { icon: <CheckCircleIcon />, text: "Crown thinning" },

      { icon: <CheckCircleIcon />, text: "Structural pruning" },
    ],
  },
  {
    icon: <TreeServiceIcon bgColor="white" iconColor="#00AFE3" />,
    inActiveIcon: <TreeServiceIcon bgColor="#00AFE3" iconColor="#FFFFFF" />,
    title: "Tree Removal",
    description:
      "Safe dismantling and removal of trees that pose risks, are diseased, or need clearing for construction or landscaping purposes.",
    points: [
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Small to large tree removal",
      },
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Hazardous tree work",
      },
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Sectional dismantling",
      },
    ],
  },
  {
    icon: <TreeWorkerIcon bgColor="white" iconColor="#00AFE3" />,
    inActiveIcon: <TreeWorkerIcon bgColor="#00AFE3" iconColor="#FFFFFF" />,
    title: "Stump Grinding & Removal",
    description:
      "Remove unsightly stumps and prevent regrowth. Grinding creates a smooth, level surface ready for replanting or landscaping.",
    points: [
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Complete stump removal",
      },
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Grinding to required depth",
      },
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Surface preparation",
      },
    ],
  },
  {
    icon: <CloudSupportIcon bgColor="white" iconColor="#00AFE3" />,
    inActiveIcon: <CloudSupportIcon bgColor="#00AFE3" iconColor="#FFFFFF" />,
    title: "Emergency Tree Care",
    description:
      "Storm damage and urgent tree hazards require prompt attention. Professional teams handle emergency removals safely and efficiently.",
    points: [
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Storm damage response",
      },
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Hazardous limb removal",
      },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Urgent clearance" },
    ],
  },
  {
    icon: <SearchDocumentIcon bgColor="white" iconColor="#00AFE3" />,
    inActiveIcon: <SearchDocumentIcon bgColor="#00AFE3" iconColor="#FFFFFF" />,
    title: "Tree Health & Inspections",
    description:
      "Assess tree vitality, diagnose disease, and get tailored care plans to protect tree health and reduce long-term risks.",
    points: [
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Tree health assessment",
      },
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Disease identification",
      },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Risk reporting" },
    ],
  },
  {
    icon: <ComplexServiceIcon bgColor="white" iconColor="#00AFE3" />,
    inActiveIcon: <ComplexServiceIcon bgColor="#00AFE3" iconColor="#FFFFFF" />,
    title: "Hedge Cutting & Shrub Care",
    description:
      "Maintain tidy hedges and shrub lines with professional trimming and shaping services, ensuring neat boundaries and healthy growth.",
    points: [
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Regular hedge trimming",
      },
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Specimen shrub care",
      },
      // { icon: <CheckCircleIcon color="#00aef0" />, text: "Low maintenance" },
    ],
  },
];

export const PSI_TOP = [
  {
    icon: <CuttingToolIcon />,
    title: "Expertise & Safety",
    text: "Qualified tree surgeons with years of hands-on experience use professional climbing equipment and industry-approved techniques to carry out safe, precise tree work.",
  },
  {
    icon: <GuaranteedWorkIcon />,
    title: "Guaranteed Work",
    text: "Most professionals offer up to 10-year guarantees on workmanship where applicable, giving you long-term peace of mind after the work is complete.",
  },
  {
    icon: <CompetitivePricingIcon />,
    title: "Competitive Pricing",
    text: "Receive fair, transparent pricing from vetted local tree surgeons, allowing you to compare quotes and choose the best value for your budget.",
  },
  {
    icon: <QuicAlarmIcon />,
    title: "Quick Turnaround",
    text: "Tree work is completed efficiently and safely, minimising disruption while ensuring high standards are maintained.",
  },
];

const FrequentlyQuestion = [
  {
    key: "1",
    title: "How much does tree surgery cost?",
    description: `Tree surgery costs vary widely depending on service type, tree size, and location -typical daily rates and averages range from a few hundred to over a thousand pounds. Get free tailored quotes now from local tree surgery services near you.`,
  },
  {
    key: "2",
    title: "When should I call a tree surgeon?",
    description: `You should call a tree surgeon when a tree needs professional care to ensure safety, health, or compliance. This includes situations where a tree is diseased, damaged by storms, growing dangerously close to buildings or power lines, causing root damage to property, or requiring proper pruning or removal. A qualified tree surgeon can assess risks, treat problems early, and carry out work safely without causing further damage.`,
  },
  {
    key: "3",
    title: "Do I need permission for tree work?",
    description:
      "It depends. You may need permission if the tree is protected by a Tree Preservation Order (TPO) or is in a conservation area. For unprotected trees on private property, permission is usually not required. Always check with your local council before starting work.",
  },
  {
    key: "4",
    title: "What happens to the tree waste?",
    description: `Tree waste is usually chipped, recycled, or removed by the tree surgeon. Wood can be turned into mulch or firewood, and smaller waste is disposed of responsibly.`,
  },
  {
    key: "5",
    title: "How long does tree surgery take?",
    description: `Tree surgery can take a few hours to a full day, depending on the tree’s size, condition, and the type of work needed. Smaller jobs may be completed quickly, while large or complex trees can take longer.`,
  },
];
const CostGuidData = [
  {
    service: "Tree pruning / crown reduction",
    price: "£150 – £800 per tree",
  },
  {
    service: "Tree removal (small / medium)",
    price: "£250 – £1,200+",
  },
  {
    service: "Stump grinding",
    price: "£60 – £300 per stump",
  },
  {
    service: "Hedge trimming",
    price: "£40 – £500 depending on size",
  },
  {
    service: "Emergency tree work",
    price: "£300 – £1,500+",
  },
];
function NewTreeSurgeryPPC() {
  return (
    <FloatingButtonWrapper>
      {(howItWorksRef) => (
        <>
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>

          <HeroSectionNewPPC
            heading1="Tree Surgeon"
            trustedText="Trusted Tree Surgery"
            quoteText="Find Expert Tree Surgeons Near You"
          />
          <div ref={howItWorksRef}>
            <HowItWorkNewPPC
              steps={[
                {
                  icon: <TreeEditIcon />,
                  text: "Fill in your details for your project",
                },
                {
                  icon: <TreeUserIcon />,
                  text: "Receive quotes from professionals",
                },
                {
                  icon: <TreeDocumentSearchIcon />,
                  text: "Compare your quotes and enjoy great savings",
                },
              ]}
            />
          </div>

          <PopularServicesTypes
            heading1="Tree Surgery"
            heading2="Services"
            description="Local comprehensive tree care services tailored to your needs:"
            data={NEW_PPC_POPULUAR_SERVICE_TYPE}
          />

          <TreeSurgeryCostGuide CostGuidData={CostGuidData} />
          <ProfessionalServiceInstallation
            heading="Tree Surgery"
            topCards={PSI_TOP}
          />

          <TreeSurgeryRegionalGuide
            pricingData={treeSurgeryRegionalPricing}
            background="white"
          />

          <FAQSection
            FrequentlyQuestion={FrequentlyQuestion}
            background="#FAFAFA"
          />
        </>
      )}
    </FloatingButtonWrapper>
  );
}
export default NewTreeSurgeryPPC;
