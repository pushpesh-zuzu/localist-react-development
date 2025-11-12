import {
  Chester,
  EllesmerePort,
  Liverpool,
  Manchester,
  Warrington,
} from "../../../assets/Images/servicesLevels/cities";
import {
  accountant,
  FreeQuotesIcon,
  WhatYouNeedIcon,
} from "../../Level1/images";
import {
  ArtificialGrassSlider,
  DrivewayInstallationSlider,
  FenceAndGateInsallationSlider,
  LandscapingSlider,
  PatioServicesSlider,
  TreeSurgeonSlider,
} from "../imagesServices";

const GUTTER_CLEANER_POPULAR_CITIES = [
  { city_image: Liverpool, city_name: "Liverpool" },
  { city_image: Manchester, city_name: "Manchester" },
  { city_image: Chester, city_name: "Chester" },
  { city_image: Warrington, city_name: "Warrington" },
  { city_image: EllesmerePort, city_name: "Ellesmere" },
];
const GUTTER_CLEANER_META = {
  "Gutter Cleaner": {
    title: "Find Gutter Cleaning Near Me | Localists",
    name: "description",
    content:
      "Find professional gutter cleaners near you who can help deal with dirt and debris in your gutters. Click to get free quotes from gutter cleaners in your area now.",
  },
};

const GUTTER_CLEANER_CONFIG_TOP = {
  "Gutter Cleaner": {
    findingHeading: "gutter cleaners",
    title: "Gutter Cleaning",
    // mainTitle: "",
    ctaText: "Gutter Cleaners",
    // avgPrice: "£200",
    // showSpeicialits: true,
    avgPriceTitle: "gutter cleaners",
  },
};
const GUTTER_CLEANER_BREADCRUMB_CONFIG = {
  "Gutter Cleaner": [
    { title: "Home & Garden", path: "/home" },
    { title: "Gutter Cleaning" },
  ],
};

const GUTTER_CLEANER_CONTENT_CONFIG = {
  "Gutter Cleaner": {
    para1:
      "If you’ve got more leaves in your gutter than you have on your trees, then you’re in the right place. We’ll help you find local gutter cleaners who can unclog, clear out, and keep the rain flowing where it should—without you trembling on a rickety ladder.",
    para2:
      "Whether it’s a one-off clearance or regular maintenance, our experts will ensure your gutters are flowing freely and your property stays protected. Share your requirements, and we’ll send free quotes from trusted local cleaners.",
    para3: "Save hours of searching - get started now!",
  },
};

const GUTTER_CLEANER_HOW_IT_WORK = {
  "Gutter Cleaner": [
    {
      id: 1,
      lBreak: false,
      title: "Start your search for gutter cleaners",
      image: WhatYouNeedIcon,
      heading1: "Start your search for gutter cleaners",
      description:
        "Tell us your location and what kind of gutter cleaning service you need. Whether it’s a full gutter clearance, minor maintenance, or an inspection, we’ll match you with local professionals ready to help.",
    },
    {
      id: 2,
      lBreak: false,
      title: "Get free quotes from local cleaners",
      image: FreeQuotesIcon,
      heading1: "Get free quotes from local cleaners",
      description:
        "Submit your request and receive free, no-obligation quotes from vetted gutter cleaning experts near you. Compare reviews, experience, and availability before deciding.",
    },
    {
      id: 3,
      lBreak: false,
      title: "Hire your gutter cleaning professional",
      image: accountant,
      heading1: "Hire your gutter cleaning professional",
      description:
        "Pick the expert who feels right for your home and your needs. Communicate your requirements, and they’ll handle the work efficiently and safely, leaving your gutters clear and your property protected.",
    },
  ],
};

const GUTTER_CLEANER_FIND_SERVICE_CONTENT = {
  "Gutter Cleaner": [
    {
      type: "h2",
      text: "Why gutter cleaning is important",
    },
    {
      type: "p",
      text: "If you’ve never had your gutters cleaned, it’s easy to underestimate how important it really is. Gutters are designed to carry rainwater safely away from your property. But when they get blocked with leaves, moss, or debris, things can go wrong very quickly.",
    },
    {
      type: "p",
      text: "Instead of draining away, water overflows. It can soak walls, weaken foundations, and cause mould or rot to develop inside. These are the kinds of risks a professional can spot early, before they turn into bigger issues.",
    },
    {
      type: "p",
      text: "What makes gutter blockages tricky is that they often build up silently, out of sight. You might not notice a problem until you’re suddenly dealing with damp patches, leaks, or costly repairs.",
    },

    {
      type: "p",
      text: "Regular gutter cleaning helps by:",
      marginTop: true,
    },
    {
      type: "li",
      heading: "Clearing out blockages before they cause structural problems",
      marginTop: true,
    },
    {
      type: "li",
      heading: "Extending the lifespan of your gutters",
      marginTop: false,
    },
    {
      type: "li",
      heading:
        "Keeping water flowing where it should, even during heavy downpours",
      marginTop: false,
    },
    {
      type: "li",
      heading:
        "Spotting early issues like loose joints, leaks, or rust before they become expensive repairs",
      marginTop: false,
    },

    {
      type: "h2",
      text: "What are the signs of clogged gutters?",
    },
    {
      type: "p",
      text: "One of the most obvious is water overflowing when it rains, spilling down your walls instead of draining away. You might also spot plants, moss, or even weeds sprouting up in the gutter, a sure sign that debris has built up.",
    },

    {
      type: "p",
      text: "Over time, gutters can begin to sag or pull away under the extra weight. Inside a property, damp patches or mould may appear where water has seeped through. Pools of water collecting around the base of the building, or dripping joints along the gutter, are other red flags.",
    },
    {
      type: "p",
      text: "If you spot any of these issues, it’s best to arrange a professional gutter clearance before the problem turns into expensive damage.",
    },
    {
      type: "h2",
      text: "How much does gutter cleaning cost?",
    },
    {
      type: "p",
      text: "The cost of gutter cleaning can vary depending on a number of factors. Firstly, the size and height of your building play a big role. Next, the length of your gutters and how easy they are to access will affect the price. Finally, the amount of debris to clear can make a difference.",
    },
    {
      type: "p",
      text: "On average, gutter cleaning costs between £70 and £250. If the debris can be cleared in 30 minutes to an hour, it will usually cost less. However, more complex jobs involving multiple stories, blocked downpipes, or heavily overgrown gutters, will take longer and require specialist equipment. All of these factors build into the final price.",
    },
    {
      type: "p",
      text: "With Localists, you can receive free quotes from local gutter cleaning experts, compare prices, and choose the right service for your building and budget.",
    },

    {
      type: "h2",
      text: "Can you clean gutters yourself?",
    },
    {
      type: "p",
      text: "You can, but it’s not without risk. It might seem easy to clear your gutters yourself, but DIY gutter cleaning can be trickier and riskier than it looks. Climbing ladders, dealing with wet leaves, or navigating narrow gutters at height can quickly lead to slips, injuries, or even damage to your property.",
    },
    {
      type: "p",
      text: "Professionals come equipped with the right tools, safety gear, and experience to handle gutters efficiently and safely. They also spot problems you might miss, like leaks, rust, or loose brackets, preventing costly damage in the future.",
    },
    {
      type: "pbold",
      text: "Professional gutter cleaning services typically include:",
      marginTop: true,
    },
    {
      type: "li",
      heading: "Clearing leaves, moss, and debris from gutters and downpipes.",
      marginTop: true,
    },
    {
      type: "li",
      heading: "Checking for blockages to ensure water flows properly.",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Inspecting gutter condition, joints, and supports.",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Providing advice on maintenance and preventative care.",
      marginTop: false,
    },
    {
      type: "li",
      heading:
        "Carrying out minor repairs, like securing brackets or replacing worn sections.",
      marginTop: false,
    },
    { type: "h2", text: "How to pick the right gutter cleaner" },
    {
      type: "p",
      text: "Getting the job done right is what sets a professional apart from someone inexperienced. When choosing a gutter cleaning service, consider:",
    },
    {
      type: "uili",
      heading: "Qualifications & Insurance\u00A0",
      text: "- Make sure they have public liability insurance. This protects you if anything goes wrong during the job.",
      marginTop: true,
    },
    {
      type: "uili",
      heading: "Experience\u00A0",
      text: "- Ask how long they’ve been working and what types of properties they’ve cleaned. Someone who’s seen it all will handle tricky gutters with ease.",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Reviews & Testimonials\u00A0",
      text: "- Feedback from past customers can tell you a lot about reliability, professionalism, and attention to detail.",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Transparency\u00A0",
      text: "- A good cleaner will explain exactly what they’re doing and provide a clear written quote before starting. No surprises.",
      marginTop: false,
    },
  ],
};
const GUTTER_CLEANER_FAQ = {
  "Gutter Cleaner": [
    {
      key: "1",
      title: "How often should I clean my gutters?",
      description: `<p>Generally, most properties benefit from a gutter clean atleast twice a year. Ideally, once in spring and again in autumn. These are the times when gutters are most likely to get clogged, either from falling blossom, leaves, or seasonal debris.</p>
      <p>On the other hand, if your building is close to tall trees, or you live somewhere that gets a lot of rainfall, you might need to do it more often. Regular checks mean you can catch blockages early and avoid the hassle of water damage later.</p>`,
    },
    {
      key: "2",
      title: "How long does gutter cleaning take?",
      description: `<p>The time it takes for gutter clearance really depends on certain factors: the size of the property, the length of the gutters, and how blocked they are. For a small house with fairly clear gutters, the job might take just 30 to 60 minutes.</p>
      <p>Larger properties or badly clogged gutters can take a couple of hours, especially if there’s moss to scrape away or tricky access points to deal with. A professional cleaner will usually give you an idea of the time needed once they’ve seen the property.</p>`,
    },
    {
      key: "3",
      title: "Is it cheaper to clean gutters myself?",
      description: `<p>DIY gutter cleaning might look like a money-saver, but it’s not always the case. Buying or hiring ladders and tools can quickly add up, and without the right safety gear, the risk of falling or damaging your property is high. If you miss hidden issues like leaks, rust, or loose joints, it could cost more to fix later. Hiring a professional usually works out cheaper in the long run because the job is done safely, thoroughly, and with an expert eye for potential problems.</p>`,
    },
    {
      key: "4",
      title: "When is the best time to clean my gutter?",
      description: `<p>The ideal times are usually late autumn, after most leaves have fallen, and early spring, before heavy rainfall begins. Cleaning gutters at these points helps prevent blockages from building up, keeping your gutters clear.</p>
      <p>That said, timing isn’t always about the calendar though. If your building is surrounded by trees, or you’ve recently had storms, leaves and debris can accumulate faster than expected. In those cases, it’s worth checking your gutters sooner rather than waiting for the perfect season.</p>`,
    },
    {
      key: "5",
      title: "What happens if you don’t clean gutters?",
      description: `<p>If gutters aren’t cleaned regularly, leaves, moss, and debris build up and block water flow. This can cause rainwater to overflow, leading to damp walls, mould inside the home, damaged foundations, and even roof leaks. In winter, trapped water can freeze and cause cracks or sagging gutters, which may eventually need costly repairs or replacement.</p>`,
    },
  ],
};
const GUTTER_CLEANER_OTHER_SERVICES_DATA = {
  "Gutter Cleaner": [
    {
      id: 1,
      image: FenceAndGateInsallationSlider,
      description: "Fence & Gate Installation",
      path: "fencing-contractors-near-me",
    },
    {
      id: 2,
      image: DrivewayInstallationSlider,
      description: "Driveway Installation",
      path: "driveway-installers-near-me",
    },
    {
      id: 3,
      image: PatioServicesSlider,
      description: "Patio Services",
      path: "patio-layers-near-me",
    },
    {
      id: 4,
      image: LandscapingSlider,
      description: "Landscaping",
      path: "landscape-gardeners-near-me",
    },
    {
      id: 5,
      image: ArtificialGrassSlider,
      description: "Artificial Grass Installation",
      path: "artificial-grass-installers-near-me",
    },
    {
      id: 6,
      image: TreeSurgeonSlider,
      description: "Tree Surgery",
      path: "tree-surgeon-near-me",
    },
  ],
};

const GUTTER_CLEANER_AVERAGE_PRICE = {
  "Gutter Cleaner": [
    {
      Region: "Nationwide",
      "Great Value": "£65",
      Average: "£90",
      Premium: "£150",
    },
    {
      Region: "London",
      "Great Value": "£70",
      Average: "£100",
      Premium: "£150",
    },
    {
      Region: "North West England",
      "Great Value": "£75",
      Average: "£90",
      Premium: "£145",
    },
    {
      Region: "South East England",
      "Great Value": "£60",
      Average: "£100",
      Premium: "£195",
    },
    {
      Region: "South West England",
      "Great Value": "£59",
      Average: "£80",
      Premium: "£220",
    },
    {
      Region: "West Midlands",
      "Great Value": "£60",
      Average: "£80",
      Premium: "£140",
    },
  ],
};

const GUTTER_CLEANER_REVIEWS_DATA = {
  "Gutter Cleaner": [
    {
      id: 1,
      name: "Tom H.,",
      title: "Blackburn",
      date: "12 Feb 2025",
      //   image: ReviewsImage,
      description:
        "Excellent service! The team cleared all our gutters quickly and professionally. They even pointed out a few problem areas I wouldn’t have noticed. Highly recommend Localists for anyone looking for reliable gutter cleaning.",
    },
    {
      id: 2,
      name: "Janis R.,",
      title: "Oxford",
      date: "18 Feb 2025",
      //   image: ReviewsImage,
      description:
        "Our building had severe blockages, and we were worried about water damage. Localists connected us with a great local gutter cleaning service. The team was friendly, arrived on time, and explained everything they were doing. Peace of mind knowing the job was done properly. Oh, and they left everything spotless!",
    },
    {
      id: 3,
      name: "Thomas Martin,",
      title: "Liverpool",
      date: "05 Mar 2025",
      //   image: ReviewsImage,
      description:
        "Quick, professional, and thorough. They even helped us identify a minor leak we didn’t know about. After the gutters were cleaned, I realised how much water had been overflowing during storms. Definitely worth using a vetted service instead of trying this ourselves!",
    },
  ],
};

const GUTTER_CLEANER_REGION_DATA = {
  "Gutter Cleaner": [
    {
      id: 1,
      title: "North West England",
      items: [
        { name: "Cheshire", path: "" },
        { name: "Greater Manchester", path: "" },
        { name: "Lancashire", path: "" },
        { name: "Merseyside", path: "" },
        { name: "Cumbria", path: "" },
      ],
    },
    {
      id: 2,
      title: "Yorkshire and the Humber ",
      items: [
        { name: "North Yorkshire", path: "" },
        { name: "South Yorkshire", path: "" },
        { name: "West Yorkshire", path: "" },
        { name: "East Riding of Yorkshire", path: "" },
      ],
    },
    {
      id: 3,
      title: "North East",
      items: [
        { name: "Tyne and Wear", path: "" },
        { name: "County Durham", path: "" },
        { name: "Northumberland", path: "" },
      ],
    },
    {
      id: 4,
      title: "Wales",
      items: [
        { name: "Wrexham", path: "" },
        { name: "Flintshire", path: "" },
      ],
    },
    {
      id: 5,
      title: "East Midlands",
      items: [
        { name: "Derbyshire", path: "" },
        { name: "Nottinghamshire", path: "" },
        { name: "Lioncolnshire ", path: "" },
      ],
    },
    {
      id: 6,
      title: "West Midlands",
      items: [{ name: "Staffordshire", path: "" }],
    },
  ],
};

export {
  GUTTER_CLEANER_POPULAR_CITIES,
  GUTTER_CLEANER_META,
  GUTTER_CLEANER_BREADCRUMB_CONFIG,
  GUTTER_CLEANER_CONFIG_TOP,
  GUTTER_CLEANER_CONTENT_CONFIG,
  GUTTER_CLEANER_HOW_IT_WORK,
  GUTTER_CLEANER_FIND_SERVICE_CONTENT,
  GUTTER_CLEANER_FAQ,
  GUTTER_CLEANER_AVERAGE_PRICE,
  GUTTER_CLEANER_REVIEWS_DATA,
  GUTTER_CLEANER_REGION_DATA,
  GUTTER_CLEANER_OTHER_SERVICES_DATA,
};
