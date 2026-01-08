import { Helmet } from "react-helmet-async";
import HeroSectionNewPPC from "../component/NewPPPpage/HeroSection/HeroSectionNewPPC";
import HowItWorkNewPPC from "../component/NewPPPpage/HowItWorkNewPPC/HowItWorkNewPPC";
import PopularServicesTypes from "../component/NewPPPpage/PopularServicesTypes/PopularServicesTypes";
import ProfessionalServiceInstallation from "../component/NewPPPpage/ProffessionalServiceInstallation/ProfessionalServiceInstallation";
import TreeSurgeryCostGuide from "../component/NewPPPpage/TreeSurgeryCostGuide/TreeSurgeryCostGuide";
import TreeSurgeryRegionalGuide from "../component/NewPPPpage/TreeSurgeryRegionalGuide/TreeSurgeryRegionalGuide";
import FAQSection from "../component/NewPPPpage/FAQSection/FAQSection";
import GuaranteedWorkIcon from "../assets/ReactIcons/GuaranteedWorkIcon";
import FloatingButtonWrapper from "../component/NewPPPpage/FloatingButtonWrapper";
import useRegistrationRedirect from "../hooks/useRegistrationRedirect";
import ExpertiseAndSafety from "../assets/ReactIcons/ExpertiseAndSafety";
import CompetitivePriceFence from "../assets/ReactIcons/CompetitivePriceFence";
import QuickAlarmFenceIcon from "../assets/ReactIcons/QuickAlarmFenceIcon";
import MeshAndWireFenceIcon from "../assets/ReactIcons/MeshAndWireFenceIcon";
import PicketAndPanelFence from "../assets/ReactIcons/PicketAndPanelFence";
import CompositeFenceIcon from "../assets/ReactIcons/CompositeFenceIcon";
import MetalFenceIcon from "../assets/ReactIcons/MetalFenceIcon";
import TimberFenceIcon from "../assets/ReactIcons/TimberFenceIcon";
import SecurityFencingIcon from "../assets/ReactIcons/SecurityFencingIcon";

export const NEW_PPC_POPULUAR_SERVICE_TYPE = [
  {
    icon: <TimberFenceIcon backgroundColor="white" iconColor="#00AFE3" />,
    inActiveIcon: <TimberFenceIcon bgColor="#00AFE3" iconColor="#FFFFFF" />,
    title: "Timber Fences",
    description:
      "Classic, versatile, and ideal for privacy or decorative screens.",
    // points: [
    //   {
    //     icon: <CheckCircleIcon />,
    //     text: "Metal Fences",
    //   },
    //   { icon: <CheckCircleIcon />, text: "Crown thinning" },

    //   { icon: <CheckCircleIcon />, text: "Structural pruning" },
    // ],
  },
  {
    icon: <MetalFenceIcon backgroundColor="white" iconColor="#00AFE3" />,
    inActiveIcon: (
      <MetalFenceIcon backgroundColor="#00AFE3" iconColor="#FFFFFF" />
    ),
    title: "Metal Fences",
    description:
      "Strong, durable, and low-maintenance; perfect for security or modern designs.",
    // points: [
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Small to large tree removal",
    //   },
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Hazardous tree work",
    //   },
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Sectional dismantling",
    //   },
    // ],
  },
  {
    icon: <CompositeFenceIcon backgroundColor="white" iconColor="#00AFE3" />,
    inActiveIcon: (
      <CompositeFenceIcon backgroundColor="#00AFE3" iconColor="#FFFFFF" />
    ),
    title: "Composite Fences ",
    description: " Long-lasting, weather-resistant, and minimal upkeep.",
    // points: [
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Complete stump removal",
    //   },
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Grinding to required depth",
    //   },
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Surface preparation",
    //   },
    // ],
  },
  {
    icon: <PicketAndPanelFence backgroundColor="white" iconColor="#00AFE3" />,
    inActiveIcon: (
      <PicketAndPanelFence backgroundColor="#00AFE3" iconColor="#FFFFFF" />
    ),
    title: "Picket & Panel Fences",
    description:
      " Decorative and charming, great for front gardens and boundaries.",
    // points: [
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Storm damage response",
    //   },
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Hazardous limb removal",
    //   },
    //   { icon: <CheckCircleIcon color="#00aef0" />, text: "Urgent clearance" },
    // ],
  },
  {
    icon: <SecurityFencingIcon bgColor="white" iconColor="#00AFE3" />,
    inActiveIcon: <SecurityFencingIcon bgColor="#00AFE3" iconColor="#FFFFFF" />,
    title: "Security Fencing ",
    description:
      "Reinforced panels, gates, and locks for protecting homes or businesses.",
    // points: [
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Tree health assessment",
    //   },
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Disease identification",
    //   },
    //   { icon: <CheckCircleIcon color="#00aef0" />, text: "Risk reporting" },
    // ],
  },
  {
    icon: <MeshAndWireFenceIcon bgColor="white" fill="#00AFE3" />,
    inActiveIcon: <MeshAndWireFenceIcon bgColor="#00AFE3" fill="#FFFFFF" />,
    title: "Mesh & Wire Fences",
    description: ` Practical for gardens, schools, or rural properties.
Concrete Panels – Extremely durable, low-maintenance, and ideal for long-term boundaries.
`,
    // points: [
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Regular hedge trimming",
    //   },
    //   {
    //     icon: <CheckCircleIcon color="#00aef0" />,
    //     text: "Specimen shrub care",
    //   },
    //   { icon: <CheckCircleIcon color="#00aef0" />, text: "Low maintenance" },
    // ],
  },
];
export const FenceInstallationRegionalPricing = [
  {
    region: "Nationwide",
    prices: [{ label: "Standard Rate", value: " £1,500 – £2,000" }],
  },
  {
    region: "London",
    prices: [{ label: "Standard Rate", value: " £1,800 – £2,400" }],
  },
  {
    region: "South East / South West",
    prices: [{ label: "Standard Rate", value: " £1,700 – £2,200" }],
  },
  {
    region: "East Midlands",
    prices: [{ label: "Standard Rate", value: "£1,600–£2,000" }],
  },
  {
    region: "North West / Scotland / Wales",
    prices: [{ label: "Standard Rate", value: "£1,500–£1,900" }],
  },
];

export const PSI_TOP = [
  {
    icon: <ExpertiseAndSafety />,
    title: "Expertise & Safety",
    text: "Qualified installers understand all types of fencing materials and know how to fit them securely and durably, even on uneven ground.",
  },
  {
    icon: <GuaranteedWorkIcon />,
    title: "Guaranteed Work",
    text: "Most installers offer up to 10-year guarantees on workmanship and materials, giving you long-term peace of mind that your fence will last.",
  },
  {
    icon: <CompetitivePriceFence />,
    title: "Competitive Pricing",
    text: "Best competitive prices. Get clear, transparent quotes from vetted local installers. Choose the best value for your project and budget.",
  },
  {
    icon: <QuickAlarmFenceIcon />,
    title: "Quick Turnaround",
    text: "Fence installations are completed efficiently without compromising quality, so you get a secure and finished boundary quickly.",
  },
];

const FrequentlyQuestion = [
  {
    key: "1",
    title: "How much does fence installation cost?",
    description: `Costs vary based on fence type, length, and materials. Typical installations start from a few hundred pounds, with detailed quotes available from local professionals.`,
  },
  {
    key: "2",
    title: "How long does fence installation take?",
    description: `Smaller fences can often be completed in a single day, while larger or more complex projects may take 2–5 days.`,
  },
  {
    key: "3",
    title: "Do I need planning permission for a fence?",
    description:
      "Most domestic fences under 2m high don’t require permission. Taller fences or those near roads may need council approval.",
  },
  {
    key: "4",
    title: "Can old fences be removed as part of installation?",
    description: `Yes, most installers handle the safe removal and disposal of old fencing as part of their service.`,
  },
  {
    key: "5",
    title: "What maintenance is needed for my new fence?",
    description: `Timber may need staining or sealing every few years. Metal and composite fences are largely low-maintenance but should be inspected occasionally for damage or rust`,
  },
];
const CostGuidData = [
  {
    service: "Fence Panel Installation (per panel)",
    price: "£50–£120",
  },
  {
    service: "Metal Security Fencing (per metre)",
    price: "£80–£200",
  },
  {
    service: "Composite Fencing (per panel)",
    price: "£120–£250",
  },
  {
    service: "Picket Fence (per metre)",
    price: "£40–£100",
  },
  {
    service: "Gate Installation (manual or automated)",
    price: "£200–£1,200",
  },
];
function NewFenceInstallationPPCPage() {
  useRegistrationRedirect();
  return (
    <FloatingButtonWrapper>
      {(heroRef, sectionsStartRef) => (
        <>
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
          <div ref={heroRef}>
            <HeroSectionNewPPC
            heading0="Find"
              heading1="Fence"
              heading2="Experts Near You"
              quoteText="Find Fencing Experts Near You"
              questionDescription="To find the ideal Fence Installation for your project, simply complete the quick form below"
              serviceId={49}
            />
          </div>
          <div ref={sectionsStartRef}>
            <HowItWorkNewPPC />
          </div>

          <PopularServicesTypes
            heading1="Popular"
            heading2="Fence Types"
            description="Local comprehensive fence care services tailored to your needs:"
            data={NEW_PPC_POPULUAR_SERVICE_TYPE}
          />

          <TreeSurgeryCostGuide CostGuidData={CostGuidData} />
          <ProfessionalServiceInstallation
            heading="Fence Installation"
            topCards={PSI_TOP}
          />

          <TreeSurgeryRegionalGuide
            pricingData={FenceInstallationRegionalPricing}
            background="white"
            heading2="Pricing Guide"
          />

          <FAQSection
            description="Get answers to common fence installation questions"
            FrequentlyQuestion={FrequentlyQuestion}
            background="#FAFAFA"
          />
        </>
      )}
    </FloatingButtonWrapper>
  );
}
export default NewFenceInstallationPPCPage;
