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
import RoofInspections from "../assets/ReactIcons/RoofInspections";
import DesignExpertsIcon from "../assets/ReactIcons/DesignExpertsIcon";
import ProffesionalToolsIcon from "../assets/ReactIcons/ProffesionalToolsIcon";
import GuaranteedWorkIcon from "../assets/ReactIcons/GuaranteedWorkIcon";
import TreeSurgeryCostGuide from "../component/NewPPPpage/TreeSurgeryCostGuide/TreeSurgeryCostGuide";

export const NEW_PPC_POPULUAR_SERVICE_TYPE = [
  {
    icon: <LeakRepairIcon bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: <LeakRepairIcon />,
    title: "Roof Leak Repairs",
    description:
      "Fix leaks caused by damaged tiles, flashing, or gutter issues to prevent water damage.",
    points: [
      { text: "Tile replacement" },
      { text: "Flashing repairs" },
      { text: "Gutter and valley fixes" },
    ],
  },
  {
    icon: <RoofTilesIcon bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: <RoofTilesIcon bgColor="#00AFE3" fillColor="white" />,
    title: "Roof Tile & Slate Replacement",
    description:
      "Professional replacement of damaged or missing tiles and slates to restore roof integrity.",
    points: [
      { text: "Matching existing roof materials" },
      { text: "Structural reinforcement" },
      { text: "Storm damage repair" },
    ],
  },
  {
    icon: <RoofFlatIcon bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: <RoofFlatIcon bgColor="#00AFE3" fillColor="white" />,
    title: "Flat Roof Repairs",
    description:
      "Specialist solutions for flat roof issues including leaks, ponding water, and membrane damage.",
    points: [
      { text: "Felt repairs" },
      { text: "EPDM & rubber membrane fixes" },
      { text: "Resin or liquid-applied coatings" },
    ],
  },
  {
    icon: <GutterRepairsIcon bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: <GutterRepairsIcon bgColor="#00AFE3" fillColor="white" />,
    title: "Gutter & Drainage Repairs",
    description:
      "Ensure proper water flow to prevent leaks, rot, and structural damage.",
    points: [
      { text: "Gutter replacement & repair" },
      { text: "Downpipe repair" },
      { text: "Drainage channel clearing" },
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
    title: "Emergency Roof Repairs",
    description:
      "Storm, wind, or accidental damage handled promptly and safely.",
    points: [
      { text: "Tarping and temporary fixes" },
      { text: "Hazardous tile or structure removal" },
      { text: "Rapid response for urgent leaks" },
    ],
  },
  {
    icon: <RoofInspections bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: <RoofInspections bgColor="#00AFE3" fillColor="white" />,
    title: "Roof Inspections & Maintenance",
    description:
      "Assess roof condition, identify potential issues, and provide preventative care.",
    points: [
      { text: "Full roof inspection" },
      { text: "Structural assessment" },
      { text: "Maintenance plans" },
    ],
  },
];

const CostGuidData = [
  {
    service: "Minor leak repairs",
    price: "£120 - £450",
  },
  {
    service: "Tile/slate replacement",
    price: "£200 - £1,000",
  },
  {
    service: "Flat roof repairs",
    price: "£250 - £1,500",
  },
  {
    service: "Gutter & drainage repairs",
    price: "£80 - £400",
  },
  {
    service: "Emergency roof repairs",
    price: "£300 - £1,500+",
  },
];
export const PSI_TOP = [
  {
    icon: <DesignExpertsIcon />,
    title: "Design Expertise",
    text: "Professional designers create beautiful, functional spaces that maximise your property’s potential.",
  },
  // {
  //   icon: <SettingIcon />,
  //   title: "Plant Knowledge",
  //   text: "Expert selection of plants suited to your soil, climate, and maintenance preferences.",
  // },
  {
    icon: <ProffesionalToolsIcon />,
    title: "Professional Tools",
    text: "Specialised equipment ensures quality results that are not possible with DIY approaches.",
  },
  {
    icon: <GuaranteedWorkIcon />,
    title: "Guaranteed Work",
    text: "5–10 year guarantees on plants, materials, and workmanship provide peace of mind.",
  },
];
export const regionPricingData = [
  {
    region: "Nationwide",
    prices: [{ label: "Standard Rate", value: "£350" }],
  },
  {
    region: "London",
    prices: [{ label: "Standard Rate", value: "£450" }],
  },
  {
    region: "South East / South West",
    prices: [{ label: "Standard Rate", value: "£400" }],
  },
  {
    region: "East Midlands",
    prices: [{ label: "Standard Rate", value: "£375" }],
  },
  {
    region: "North West / Scotland / Wales",
    prices: [{ label: "Standard Rate", value: "£350" }],
  },
];
const FrequentlyQuestion = [
  {
    key: "1",
    title: "What are common signs that my roof needs repairing?",
    description:
      "Look for slipped or missing tiles, cracked flashing, water stains on ceilings or walls, blocked gutters, or moss and algae growth. These are common signs of roof damage that should be inspected by a professional.",
  },
  {
    key: "2",
    title: "How much do roof repairs cost in the UK?",
    description:
      "Roof repair costs vary depending on the type of work, access, and materials. Small jobs like replacing a few tiles may cost a few hundred pounds, while larger repairs such as flashing or flat roof patches can be higher. Getting multiple local quotes is the best way to understand your exact cost.",
  },
  {
    key: "3",
    title: "Do I need permission for roof work?",
    description:
      "Planning permission is usually not required unless your property is listed, in a conservation area, or you are changing the height or structure of the roof.",
  },
  {
    key: "4",
    title: "How long does roof repair take?",
    description:
      "Minor roof repairs can often be completed within a few hours, while larger repairs or full roof replacements may take several days depending on the scope of work.",
  },
  {
    key: "5",
    title: "Will I need scaffolding for roof repairs?",
    description:
      "Scaffolding is often required for safe access during external roof repairs, especially on pitched roofs. Minor internal fixes may not require it, but your roofer will assess safety needs during the site survey.",
  },
];

function NewRoofingPPCPage() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <HeroSectionNewPPC
        trustedText="Trusted Roofing Specialists"
        heading1=" Roofing Repairs"
        heading2="Near You"
        text1="Vetted Contractors"
      />
      <HowItWorkNewPPC description="Get matched quickly with trusted local roofing contractors who specialise in all types of roof repairs - from minor leak fixes to roof tiles or full roof replacement. Receive up to 5 free quotes from local experts, compare experience and pricing, and choose the option that works best for your project. No obligation, no pressure." />
      <PopularServicesTypes
        data={NEW_PPC_POPULUAR_SERVICE_TYPE}
        heading1="Roofing"
        heading2="Repair Services"
        description="Explore our comprehensive range of roofing installation options to
          find the perfect solution for your property"
      />
      {/* <CostGuide
        heading1="Roofing Installation"
        description="Understanding the costs involved in roofing installation helps you
          budget effectively. Prices vary based on material, size, and
          complexity."
        pricing={COST_PRICING}
        icons={COST_ICONS}
      /> */}
      <TreeSurgeryCostGuide
        CostGuidData={CostGuidData}
        heading1="Roofing Installation"
        description="Understanding the costs involved in roofing installation helps you
          budget effectively. Prices vary based on material, size, and
          complexity."
      />
      <ProfessionalServiceInstallation
        heading="Roofing Experts"
        topCards={PSI_TOP}
      />
      <RegionalGuide
        heading2="Roofing Repairs Costs"
        description="Average roofing installation costs across different UK regions"
        regionPricingData={regionPricingData}
        bannerHeading="Note: Prices are averages for guidance. Final costs may vary depending on roof size, type, access, and specific work required."
        bannerPrice=""
        budget=""
      />
      <FAQSection
        description="Get answers to common roofing installation questions"
        FrequentlyQuestion={FrequentlyQuestion}
      />
      <div className="floating" style={{ position: "fixed", bottom: "1%" }}>
        <FloatingButton />
      </div>
    </>
  );
}

export default NewRoofingPPCPage;
