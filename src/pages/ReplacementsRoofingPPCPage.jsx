import React from "react";
import HeroSectionNewPPC from "../component/NewPPPpage/HeroSection/HeroSectionNewPPC";
import HowItWorkNewPPC from "../component/NewPPPpage/HowItWorkNewPPC/HowItWorkNewPPC";
import PopularServicesTypes from "../component/NewPPPpage/PopularServicesTypes/PopularServicesTypes";
import { Helmet } from "react-helmet-async";
import ProfessionalServiceInstallation from "../component/NewPPPpage/ProffessionalServiceInstallation/ProfessionalServiceInstallation";
import RegionalGuide from "../component/NewPPPpage/RegionalGuide/RegionalGuide";
import FAQSection from "../component/NewPPPpage/FAQSection/FAQSection";
import FloatingButton from "../component/NewPPPpage/UITypography/FloatingButton/FloatingButton";
import LeakRepairIcon from "../assets/ReactIcons/LeakRepairIcon";
import RoofTilesIcon from "../assets/ReactIcons/RoofTilesIcon";
import RoofFlatIcon from "../assets/ReactIcons/RoofFlatIcon";
import GutterRepairsIcon from "../assets/ReactIcons/GutterRepairsIcon";
import EmergencyRoofRepairsIcon from "../assets/ReactIcons/EmergencyRoofRepairsIcon";
import GutterFlashingIcon from "../assets/ReactIcons/GutterFlashingIcon";
import NewRoofInstallationIcon from "./NewRoofInstallationIcon";
import ExpertiseSafety from "../assets/ReactIcons/ExpertiseSafety";
import GuaranteedWork from "./GuaranteedWork";
import CompetitivePricing from "./CompetitivePricing";
import QuickTurnaround from "./QuickTurnaround";
import TreeSurgeryCostGuide from "../component/NewPPPpage/TreeSurgeryCostGuide/TreeSurgeryCostGuide";
import FlatRoofRepairs from "./FlatRoofRepairs";
import RoofReplacement from "./RoofReplacement";
import FloatingButtonWrapper from "../component/NewPPPpage/FloatingButtonWrapper";
import useRegistrationRedirect from "../hooks/useRegistrationRedirect";
import CalonicalTags from "../component/common/CalonicalTags/CalonicalTags";

export const NEW_PPC_POPULUAR_SERVICE_TYPE = [
  {
    icon: <NewRoofInstallationIcon bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: <NewRoofInstallationIcon />,
    title: "New Roof Installation",
    description:
      "Install brand-new roofs with high-quality materials, tailored designs, and expert craftsmanship for long-lasting protection and aesthetic appeal.",
    points: [
      { text: "Tile & slate installation" },
      { text: "Flat roofing systems" },
      { text: "Metal & composite roofs" },
    ],
  },
  {
    icon: <RoofReplacement bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: <RoofReplacement bgColor="#00AFE3" fillColor="white" />,
    title: "Roof Replacement",
    description:
      "Remove old or damaged roofing and replace with durable, modern materials. Ideal for aging roofs, storm damage, or full upgrades.",
    points: [
      { text: "Complete roof replacement" },
      {
        text: "Structural repair & reinforcement",
      },
      { text: "Modern material upgrades" },
    ],
  },
  {
    icon: <FlatRoofRepairs bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: <FlatRoofRepairs bgColor="#00AFE3" fillColor="white" />,
    title: "Roof Inspections & Assessments",
    description:
      "Evaluate roof condition, diagnose potential issues, and recommend tailored installation solutions for safety, compliance, and longevity.",
    points: [
      { text: "Pre-installation inspections" },
      { text: "Structural checks" },
      {
        text: "Material recommendations",
      },
    ],
  },
  {
    icon: (
      <EmergencyRoofRepairsIcon
        bgColor="white"
        fillColor="#00AFE3"
        strokeColor="#00AFE3"
      />
    ),
    inActiveIcon: (
      <EmergencyRoofRepairsIcon
        bgColor="#00AFE3"
        fillColor="white"
        strokeColor="white"
      />
    ),
    title: "Emergency Roof Replacement",
    description:
      "For storm-damaged or compromised roofs, professional teams provide fast, safe, and efficient replacement to protect your property.",
    points: [
      { text: "Storm damage response" },
      {
        text: "Urgent roof replacement",
      },
      { text: "Temporary protection" },
    ],
  },
  {
    icon: (
      <GutterFlashingIcon
        bgColor="white"
        fillColor="#00AFE3"
        strokeColor="#00AFE3"
      />
    ),
    inActiveIcon: (
      <GutterFlashingIcon
        bgColor="#00AFE3"
        fillColor="white"
        strokeColor="white"
      />
    ),
    title: "Gutter & Flashing Integration",
    description:
      "Ensure seamless drainage and protection with professionally installed gutters, downpipes, and flashings integrated with your new roof.",
    points: [
      {
        text: "Gutter installation",
      },
      {
        text: "Lead & aluminum flashings",
      },
      {
        text: "Water management",
      },
    ],
  },
];
export const COST_PRICING = [
  {
    icon: "minor",
    title: "Minor leak repairs",
    price: "£120 - £450",
    // description:
    prop: { size: "18px" },
  },

  {
    icon: "tileslate",
    title: "Tile/slate replacement",
    price: " £200 - £1,000",
    // description:
    prop: { size: "18px" },
  },
  {
    icon: "flatroof",
    title: "Flat roof repairs",
    price: " £250 - £1,500",
    // description:
    prop: { size: "18px" },
  },
  {
    icon: "gutter",
    title: "Gutter & drainage repairs",
    price: "£80 - £400",
    // description:
    prop: { size: "18px" },
  },
  {
    icon: "emergency",
    title: "Emergency roof repairs",
    price: "£300 - £1,500+",
    // description:
    prop: { size: "18px" },
  },
];

const COST_ICONS = {
  emergency: EmergencyRoofRepairsIcon,
  gutter: GutterRepairsIcon,
  flatroof: RoofFlatIcon,
  tileslate: RoofTilesIcon,
  minor: LeakRepairIcon,
};
export const PSI_TOP = [
  {
    icon: <ExpertiseSafety />,
    title: "Expertise & Safety",
    text: "Qualified roofers with years of experience use professional equipment, scaffolding, and safety procedures to deliver secure, high-quality roofs.",
  },
  {
    icon: <GuaranteedWork />,
    title: "Guaranteed Work",
    text: "Most professionals offer up to 10-year guarantees on workmanship and materials, providing long-term peace of mind.",
  },
  {
    icon: <CompetitivePricing />,
    title: "Competitive Pricing",
    text: "Compare transparent, fair quotes from vetted local roofers to get the best value for your budget.",
  },
  {
    icon: <QuickTurnaround />,
    title: "Quick Turnaround",
    text: "New roofs and replacements are completed efficiently without compromising quality, minimising disruption to your home.",
  },
];
export const regionPricingData = [
  {
    region: "Nationwide",
    prices: [{ label: "Standard Rate", value: "£4,500" }],
  },
  {
    region: "London",
    prices: [{ label: "Standard Rate", value: "£5,500" }],
  },
  {
    region: "South East / South West",
    prices: [{ label: "Standard Rate", value: "£5,200" }],
  },
  {
    region: "East Midlands",
    prices: [{ label: "Standard Rate", value: "£4,800" }],
  },
  {
    region: "North West / Scotland / Wales",
    prices: [{ label: "Standard Rate", value: "£4,500" }],
  },
];
const FrequentlyQuestion = [
  {
    key: "1",
    title: "How much does a new roof or replacement cost?",
    description:
      "Costs vary depending on roof size, materials, and complexity. Get up to 5 free tailored quotes from local roofers near you.",
  },
  {
    key: "2",
    title: "When should I replace my roof?",
    description:
      "Consider replacement if your roof is old, damaged, leaking, or if you want an upgrade to modern materials.",
  },
  {
    key: "3",
    title: "Do I need planning permission for a new roof?",
    description:
      "Most roof replacements are permitted development. Planning permission may be needed for listed buildings or conservation areas.",
  },
  {
    key: "4",
    title: "How long does roof installation take?",
    description:
      "Small roofs can take 1–3 days, while full replacements may take 5–7 days depending on size and complexity.",
  },
];

const CostGuidData = [
  {
    service: "New roof installation (average 3 – 4 bed)",
    price: "£5,500 – £7,000",
  },
  {
    service: "Full roof replacement (standard materials)",
    price: "£6,000 – £9,500",
  },
  {
    service: "Tile roof replacement (per sqm)",
    price: "£75 – £120",
  },
  {
    service: "Slate roof replacement (per sqm)",
    price: " £90 – £140",
  },
  {
    service: "Flat roof replacement (per sqm)",
    price: " £60 – £100",
  },
  {
    service: "Skylight / roof window installation",
    price: "£400 – £1,200",
  },
  {
    service: "Roof structure strengthening / timber repair",
    price: "£300 – £1,800+",
  },
];

function ReplacementsRoofingPPCPage() {
  useRegistrationRedirect();
  return (
    <FloatingButtonWrapper>
      {(heroRef, sectionsStartRef) => (
        <>
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
          <CalonicalTags isRequiredjsonLd={false} />
          <div ref={heroRef}>
            <HeroSectionNewPPC
              trustedText="Trusted New Roof Installation & Replacement Specialists"
              heading0="Find"
              heading1="Roof Installation & Replacement"
              heading2="Experts Near You"
              quoteText="Find Roof Installation & Replacement Experts Near You"
              questionDescription="To find the ideal Roof Installation & Replacement Specialist for your project, simply complete the quick form below."
              serviceId={113}
            />
          </div>
          <div ref={sectionsStartRef}>
            <HowItWorkNewPPC />
          </div>
          <PopularServicesTypes
            data={NEW_PPC_POPULUAR_SERVICE_TYPE}
            heading1="Roofing"
            heading2="Services"
            description="Comprehensive roofing solutions for homes and businesses:"
          />
          <TreeSurgeryCostGuide
            heading1="Roofing (New and Replacements)"
            headding2="Cost Guide"
            description="Understanding the costs involved in a new roof or full roof replacement helps you budget effectively. Prices vary based on roof size, materials, access, and complexity."
            CostGuidData={CostGuidData}
            maxWidth="900px"
          />
          <ProfessionalServiceInstallation
            heading="Roofing Expert"
            topCards={PSI_TOP}
          />
          <RegionalGuide
            heading1="Regional Roofing (New and Replacements)"
            description="Average new roof / full replacement pricing guide"
            regionPricingData={regionPricingData}
            bannerHeading="Note: Rates vary based on roof size, pitch, materials, and additional features."
            bannerPrice=""
            budget=""
          />
          <FAQSection
            description="Get answers to common roofing replacement questions"
            FrequentlyQuestion={FrequentlyQuestion}
          />
        </>
      )}
    </FloatingButtonWrapper>
  );
}

export default ReplacementsRoofingPPCPage;
