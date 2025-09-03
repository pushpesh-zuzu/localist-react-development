import london from "../../assets/Images/subcategory/london.svg";
import birmingham from "../../assets/Images/subcategory/brimingham.svg";
import liverpool from "../../assets/Images/subcategory/liverpool.svg";
import WhatYouNeedIcon from "../../assets/Icons/WhatYouNeedIcon.png";
import FreeQuotesIcon from "../../assets/Icons/FreeQuotesIcon.png";
import accountant from "../../assets/Images/subcategory/accountant.png";
import ReviewsImage from "../../assets/Images/subcategory/reviews_girl.png";
import Driveway from "../../assets/Images/servicesLevels/Driveway-Installation.jpg";
import fenchinstal from "../../assets/Images/servicesLevels/Fence-&-Gate-Installation.jpg";
import Landscaping from "../../assets/Images/servicesLevels/Landscaping.jpg";
import Patio from "../../assets/Images/servicesLevels/Patio-Services.jpg";
import ArtificialGrass from "../../assets/Images/servicesLevels/ArtificialGrass.jpg";
import ArtificialGrassBanner from "../../assets/Images/servicesLevels/banner/ArtificialGrassInstallationBanner.jpg";
import LandscapingBanner from "../../assets/Images/servicesLevels/banner/landscapingandgardeningBanner.jpg";
import PatioServicesBanner from "../../assets/Images/servicesLevels/banner/PatioServicesBanner.jpg";
import DrivewayInstallationBanner from "../../assets/Images/servicesLevels/banner/DrivewayInstallationBanner.jpg";
import FenceGateInstallationBanner from "../../assets/banners/FenceGate-InstallationBanner.jpg";
import EllesmerePort from "../../assets/Images/servicesLevels/cities/EllesmerePort.jpg";
import Liverpool from "../../assets/Images/servicesLevels/cities/Liverpool.jpg";
import Manchester from "../../assets/Images/servicesLevels/cities/Manchester.jpg";
import Warrington from "../../assets/Images/servicesLevels/cities/Warrington.jpg";
import Chester from "../../assets/Images/servicesLevels/cities/Chester.jpg";
import { title } from "framer-motion/client";

const POPULAR_CITIES = [
  { city_image: Liverpool, city_name: "Liverpool" },
  { city_image: Manchester, city_name: "Manchester" },
  { city_image: Chester, city_name: "Chester" },
  { city_image: Warrington, city_name: "Warrington" },
  { city_image: EllesmerePort, city_name: "Ellesmere" },
];

const RELATED_PRICE_DATA = {
  "fencing-contractors-near-me": [
    {
      id: 1,
      title: "Fence Installation",
      image: fenchinstal,
      description: "How much does fence installation cost?",
      price: "From £20",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Wood Fencing",
      image: fenchinstal,
      description: "How much does wood fencing cost in 2025?",
      price: "From £18",
    },
    {
      id: 3,
      title: "Chain Link Fencing",
      image: fenchinstal,
      description: "How much does chain link fence installation cost?",
      price: "From £15",
      availableOnline: true,
    },
    {
      id: 4,
      title: "Fence Repair",
      image: fenchinstal,
      description: "Here's why you need professional fence maintenance",
      price: "Varies",
    },
  ],
  "driveway-installers-near-me": [
    {
      id: 1,
      title: "Driveway Installation",
      image: Driveway,
      description: "2025 driveway installation cost guide",
      price: "From £50",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Concrete Driveways",
      image: Driveway,
      description: "How much does a concrete driveway cost?",
      price: "From £60",
    },
    {
      id: 3,
      title: "Asphalt Paving",
      image: Driveway,
      description: "Asphalt driveway installation costs",
      price: "From £55",
      availableOnline: true,
    },
    {
      id: 4,
      title: "Driveway Resurfacing",
      image: Driveway,
      description: "When to repair vs. replace your driveway",
      price: "Varies",
    },
  ],
  landscaping: [
    {
      id: 1,
      title: "Landscaping Cost in 2025",
      image: Landscaping,
      description: "How much does landscaping cost in 2025?",
      price: "From £15",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Garden Design",
      image: Landscaping,
      description: "Pricing guide for garden design and makeovers",
      price: "From £25",
    },
    {
      id: 3,
      title: "Patio Installation",
      image: Patio,
      description: "Patio installation cost guide",
      price: "From £30",
      availableOnline: true,
    },
    {
      id: 4,
      title: "Fence & Gate Installation",
      image: fenchinstal,
      description: "How much does fence and gate installation cost?",
      price: "From £20",
    },
  ],
  "patio-layers-near-me": [
    {
      id: 1,
      title: "Patio Installation Cost",
      image: Patio,
      description: "How much does patio installation cost in 2025?",
      price: "From £30",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Patio Materials Pricing",
      image: Patio,
      description: "Cost guide for various patio materials",
      price: "Varies",
    },
    {
      id: 3,
      title: "Garden Landscaping",
      image: Landscaping,
      description: "Landscaping prices and budgeting tips",
      price: "From £15",
    },
    {
      id: 4,
      title: "Fence & Gate Installation",
      image: fenchinstal,
      description: "Cost estimates for fence and gate installation",
      price: "From £20",
    },
  ],
  "artificial-grass-installation": [
    {
      id: 1,
      title: "Artificial Grass Installation Cost",
      image: ArtificialGrass,
      description: "How much does Artificial Grass Installation cost in 2025?",
      price: "From £20",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Artificial Grass Maintenance",
      image: ArtificialGrass,
      description: "Costs and tips for maintaining your artificial lawn",
      price: "Varies",
    },
    {
      id: 3,
      title: "Pet-Friendly Artificial Grass",
      image: ArtificialGrass,
      description: "Is artificial grass safe and durable for pets?",
      price: "N/A",
    },
    {
      id: 4,
      title: "Artificial Grass vs Natural Grass",
      image: ArtificialGrass,
      description: "Cost comparison and benefits overview",
      price: "Varies",
    },
  ],
};

const RELATED_SERVICES_DATA = {
  "fencing-contractors-near-me": [
    {
      id: 1,
      title: "Fence Installation",
      image: fenchinstal,
      description:
        "Your 2025 fence installation guide: Everything you need to know in the UK",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Fence Repair",
      image: fenchinstal,
      description: "Here's why you need professional fence maintenance",
    },
    {
      id: 3,
      title: "Fence Materials",
      image: fenchinstal,
      description: "What are the best materials for fencing?",
      availableOnline: true,
    },
    {
      id: 4,
      title: "Garden Fencing",
      image: fenchinstal,
      description: "Complete guide to choosing garden fencing",
    },
  ],
  "driveway-installers-near-me": [
    {
      id: 1,
      title: "Driveway Installation",
      image: Driveway,
      description:
        "Your 2025 driveway installation guide: Everything you need to know in the UK",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Driveway Repair",
      image: Driveway,
      description: "Here's why you need professional driveway maintenance",
    },
    {
      id: 3,
      title: "Driveway Materials",
      image: Driveway,
      description: "What are the best materials for driveways?",
      availableOnline: true,
    },
    {
      id: 4,
      title: "Residential Driveways",
      image: Driveway,
      description: "Complete guide to choosing residential driveways",
    },
  ],
  "patio-layers-near-me": [
    {
      id: 1,
      title: "Installing a New Patio on a Budget",
      image: Patio,
      description: "Your ultimate guide to budget-friendly Patio installation",
    },
    {
      id: 2,
      title: "Material Options for Patios",
      image: Patio,
      description: "What are the different material options for Patios?",
    },
    {
      id: 3,
      title: "How to Landscape Your Garden on a Budget",
      image: Landscaping,
      description: "Top tips to save money on landscaping your outdoor space",
    },
    {
      id: 4,
      title: "What is Involved with Fence or Gate Installation?",
      image: fenchinstal,
      description: "Learn what to expect during fence or gate installation",
    },
  ],
  landscaping: [
    {
      id: 1,
      title: "How to Landscape Your Garden on a Budget",
      image: Landscaping,
      description:
        "From luscious landscaping to thrifty decor ideas, save money with our top budgeting tips",
    },
    {
      id: 2,
      title: "Garden Design Ideas",
      image: Landscaping,
      description: "Creative ideas to transform your garden this year",
    },
    {
      id: 3,
      title: "Material Options for Patios",
      image: Patio,
      description:
        "Explore different patio materials that complement your landscaping",
    },
    {
      id: 4,
      title: "Fence & Gate Installation Guide",
      image: fenchinstal,
      description:
        "Everything you need to know about fence and gate installation",
    },
  ],
  "artificial-grass-installation": [
    {
      id: 1,
      title: "A Guide to the Different Types of Artificial Grass",
      image: ArtificialGrass,
      description:
        "Your ultimate guide to the different types of Artificial Grass and the right choice for you",
    },
    {
      id: 2,
      title: "Benefits of Artificial Grass Installation",
      image: ArtificialGrass,
      description: "Why artificial grass is a smart choice for your garden",
    },
    {
      id: 3,
      title: "Artificial Grass Maintenance Tips",
      image: ArtificialGrass,
      description: "How to keep your artificial lawn looking pristine",
    },
    {
      id: 4,
      title: "Artificial Grass vs Natural Grass",
      image: ArtificialGrass,
      description: "Comparing costs, maintenance, and appearance",
    },
  ],
};

const REVIEWS_DATA = {
  "fencing-contractors-near-me": [
    {
      id: 1,
      name: "Alfie M.",
      // title: "(Residential Fencing)",
      date: "13 Feb 2025",
      image: ReviewsImage,
      description:
        "I found a fencing company near me, through Localists. The team helped to replace the panels along the back of my garden. They were on time, super tidy, and finished the job in just two days, and even cleaned up after themselves. I couldn’t be happier. Everything looks neat and solid. Already recommended them to my neighbour!",
    },
    {
      id: 2,
      name: "Chris T.",
      // title: "(Commercial Fencing)",
      date: "13 Feb 2025",
      image: ReviewsImage,
      description:
        "Booked through Localists for a full gate replacement and some side fencing. The local fencing contractor they matched me with was professional and gave me a fair quote. Work was completed ahead of schedule and with great attention to detail. Would 100% use this service again.",
    },
    {
      id: 3,
      name: "Claire P.",
      // title: "(Garden Fencing)",
      date: "15 Mar 2025",
      image: ReviewsImage,
      description:
        "Excellent service from start to finish. Localists helped me compare a few different installers, and I found someone local who did an amazing job on my driveway fencing. Polite, skilled, and no mess left behind",
    },
  ],
  "driveway-installers-near-me": [
    {
      id: 1,
      name: "Rachel M.,",
      title: "Nottingham",
      date: "13 Feb 2025",
      image: ReviewsImage,
      description:
        "I needed my old gravel driveway replaced with block paving, and within a day I had three quotes from local driveway contractors. The work was completed on time, and the quality is outstanding.",
    },
    {
      id: 2,
      name: "James T.,",
      title: "Bristol",
      date: "13 Feb 2025",
      image: ReviewsImage,
      description:
        "This was my first time getting a driveway installed, so I had no idea where to start. Localists connected me with a resin driveway specialist who walked me through every step. The result is stunning and completely changes the look of my home.",
    },
    {
      id: 3,
      name: "Linda Stuart",
      title: "Glasgow",
      date: "15 Mar 2025",
      image: ReviewsImage,
      description:
        "After a bad experience with a previous installer, I was hesitant to try again. But the contractor I found on Localists was professional, fast, and delivered exactly what I wanted. My new tarmac driveway looks fantastic and feels built to last.",
    },
  ],
  "patio-layers-near-me": [
    {
      id: 1,
      name: "Harry W., ",
      title: "Surrey",
      date: "17 Apr 2025",
      image: ReviewsImage,
      description:
        "I used Localists to find a patio installer near me and couldn’t be happier. The contractor was friendly, turned up on time every day, and the work was flawless. My new sandstone patio completely transformed the garden. I’ve already recommended them to my neighbour!",
    },
    {
      id: 2,
      name: "James R.,",
      title: "Manchester",
      date: "26 Apr 2025",
      image: ReviewsImage,
      description:
        "I needed a quick turnaround for a gravel patio before a family event. Localists matched me with a brilliant local patio builder who had great reviews. The quote was fair, and the job was finished ahead of schedule. Couldn’t ask for better service.",
    },
    {
      id: 3,
      name: "Helen M.,",
      title: "London",
      date: "5 june 2025",
      image: ReviewsImage,
      description:
        "After weeks of searching for patio construction near me, I found Localists. Within the same day, I had three quotes from three different patio companies near me and picked the one that best suited my budget. The new porcelain patio looks incredible and has already made the garden our favourite spot.",
    },
  ],
  landscaping: [
    {
      id: 1,
      name: "Daniel Kennedy",
      title: "(Garden Landscaping)",
      date: "2 Mar 2025",
      image: ReviewsImage,
      description:
        "I would recommend Tumbers brickwork and landscapes. Elliot and his colleague worked so hard on the hottest day to replace my old fence and did a lovely job. They also did a fence for a friend who recommended them to me as she was also very pleased.",
    },
    {
      id: 2,
      name: "Fatima H.",
      title: "(Commercial Landscaping)",
      date: "18 Mar 2025",
      image: ReviewsImage,
      description:
        "I would recommend Tumbers brickwork and landscapes. Elliot and his colleague worked so hard on the hottest day to replace my old fence and did a lovely job. They also did a fence for a friend who recommended them to me as she was also very pleased.",
    },
    {
      id: 3,
      name: "Laura M",
      title: "(Residential Landscaping)",
      date: "30 Mar 2025",
      image: ReviewsImage,
      description:
        "I would recommend Tumbers brickwork and landscapes. Elliot and his colleague worked so hard on the hottest day to replace my old fence and did a lovely job. They also did a fence for a friend who recommended them to me as she was also very pleased.",
    },
  ],
  "artificial-grass-installation": [
    {
      id: 1,
      name: "Daniel Kennedy",
      title: "(Artificial Grass Installation)",
      date: "12 Jan 2025",
      image: ReviewsImage,
      description:
        "I would recommend Tumbers brickwork and landscapes. Elliot and his colleague worked so hard on the hottest day to replace my old fence and did a lovely job. They also did a fence for a friend who recommended them to me as she was also very pleased.",
    },
    {
      id: 2,
      name: "Fatima H.",
      title: "(Artificial Turf Specialist)",
      date: "25 Jan 2025",
      image: ReviewsImage,
      description:
        "I would recommend Tumbers brickwork and landscapes. Elliot and his colleague worked so hard on the hottest day to replace my old fence and did a lovely job. They also did a fence for a friend who recommended them to me as she was also very pleased.",
    },
    {
      id: 3,
      name: "Laura M",
      title: "(Synthetic Grass Installer)",
      date: "8 Feb 2025",
      image: ReviewsImage,
      description:
        "I would recommend Tumbers brickwork and landscapes. Elliot and his colleague worked so hard on the hottest day to replace my old fence and did a lovely job. They also did a fence for a friend who recommended them to me as she was also very pleased.",
    },
  ],
};

const OTHER_SERVICES_DATA = {
  "fencing-contractors-near-me": [
    {
      id: 1,
      image: Driveway,
      description: "Driveway Installation",
      availableOnline: true,
      path: "driveway-installers-near-me",
    },
    {
      id: 2,
      image: Patio,
      description: "Patio Services",
      // path: "patio-layers-near-me",
    },
    {
      id: 3,
      image: Landscaping,
      description: "Landscaping",
      availableOnline: true,
      // path: "landscaping",
    },
    {
      id: 4,
      image: ArtificialGrass,
      description: "Artificial Grass Installation",
      // path: "artificial-grass-installation",
    },
  ],
  "driveway-installers-near-me": [
    {
      id: 1,
      image: fenchinstal,
      description: "Fence & Gate Installation",
      path: "fencing-contractors-near-me",
    },
    {
      id: 2,
      image: Patio,
      description: "Patio Services",
      // path: "patio-layers-near-me",
    },
    {
      id: 3,
      image: Landscaping,
      description: "Landscaping",
      // path: "landscaping",
      availableOnline: true,
    },
    {
      id: 4,
      image: ArtificialGrass,
      description: "Artificial Grass Installation",
      // path: "artificial-grass-installation",
    },
  ],
  "patio-layers-near-me": [
    {
      id: 1,
      image: fenchinstal,
      description: "Fence & Gate Installation",
      path: "fencing-contractors-near-me",
    },
    {
      id: 2,
      image: Driveway,
      description: "Driveway Installation",
      availableOnline: true,
      path: "driveway-installers-near-me",
    },
    {
      id: 3,
      image: Landscaping,
      description: "Landscaping",
      availableOnline: true,
      path: "landscaping",
    },
    {
      id: 4,
      image: ArtificialGrass,
      description: "Artificial Grass Installation",
      path: "artificial-grass-installation",
    },
  ],
  landscaping: [
    {
      id: 1,
      image: fenchinstal,
      description: "Fence & Gate Installation",
      path: "fencing-contractors-near-me",
    },
    {
      id: 2,
      image: Driveway,
      description: "Driveway Installation",
      availableOnline: true,
      path: "driveway-installers-near-me",
    },
    {
      id: 3,
      image: Patio,
      description: "Patio Services",
      path: "patio-layers-near-me",
    },
    {
      id: 4,
      image: ArtificialGrass,
      description: "Artificial Grass Installation",
      path: "artificial-grass-installation",
    },
  ],
  "artificial-grass-installation": [
    {
      id: 1,
      image: fenchinstal,
      description: "Fence & Gate Installation",
      path: "fencing-contractors-near-me",
    },
    {
      id: 2,
      image: Driveway,
      description: "Driveway Installation",
      availableOnline: true,
      path: "driveway-installers-near-me",
    },
    {
      id: 3,
      image: Patio,
      description: "Patio Services",
      path: "patio-layers-near-me",
    },
    {
      id: 4,
      image: Landscaping,
      description: "Landscaping",
      availableOnline: true,
      path: "landscaping",
    },
  ],
};

const AVERAGE_PRICE = {
  "fencing-contractors-near-me": [
    {
      Region: "Nationwide",
      "Great Value": "£300",
      Average: "£975",
      Premium: "£2300",
    },
    {
      Region: "East Midlands",
      "Great Value": "£240",
      Average: "£1000",
      Premium: "£2300",
    },
    {
      Region: "East of England",
      "Great Value": "£350",
      Average: "£950",
      Premium: "£2550",
    },
  ],
  "driveway-installers-near-me": [
    {
      Region: "Nationwide",
      "Great Value": "£3800",
      Average: "£4200",
      Premium: "£8800",
    },
    {
      Region: "London",
      "Great Value": "£3950",
      Average: "£4800",
      Premium: "£7950",
    },
  ],
  "patio-layers-near-me": [
    {
      Region: "Nationwide",
      "Great Value": "£2350",
      Average: "£3300",
      Premium: "£10000",
    },
    {
      Region: "East Midlands",
      "Great Value": "£4500",
      Average: "£5900",
      Premium: "£9200",
    },
  ],
  landscaping: [
    {
      Region: "Nationwide",
      "Great Value": "£100",
      Average: "£150",
      Premium: "£300",
    },
    {
      Region: "East Midlands",
      "Great Value": "£95",
      Average: "£140",
      Premium: "£280",
    },
    {
      Region: "East of England",
      "Great Value": "£105",
      Average: "£145",
      Premium: "£310",
    },
  ],
  "artificial-grass-installation": [
    {
      Region: "Nationwide",
      "Great Value": "£80",
      Average: "£120",
      Premium: "£250",
    },
    {
      Region: "East Midlands",
      "Great Value": "£75",
      Average: "£110",
      Premium: "£230",
    },
    {
      Region: "East of England",
      "Great Value": "£85",
      Average: "£115",
      Premium: "£240",
    },
  ],
};

const FREQUENTLY_DATA = {
  "fencing-contractors-near-me": [
    {
      key: "1",
      title: "Which is the best fencing company near me?",
      description:
        "The best fencing company near you is one that’s reliable, well-reviewed, fully insured, and experienced with projects similar to yours. Rather than spend hours searching the internet, <b>Localists</b> simplifies the process. All you need to do is share a few project details, and we’ll connect you with top-rated local fencing contractors who fit your needs.",
    },
    {
      key: "2",
      title: "How much does fence and gate installation cost?",
      description: `<p>The cost of installing fences and gates can vary based on several factors -<b> the size of your project, the materials you choose, and the type of fencing or gate you need</b> (manual or automated, wooden or metal, decorative or security-focused).</p>
      <p>Naturally, more complex or custom installations will cost more, and the number of fences or gates you want to install will affect the final price too.</p>
      <p>When you connect with a professional through Localists, you’ll get clear, tailored quotes based on your specific needs. Your local fence installer can walk you through your options and help you choose the best solution to fit your budget and style.</p>
      <p>Want an accurate quote? With Localists, you can quickly get free, no-obligation estimates from qualified fencing contractors nearby, so you know exactly what to expect before committing.</p>`,
    },
    {
      key: "3",
      title: "How long does a fence take to install?",
      description:
        "<p>Most fencing projects take between 1 to 3 days, but the timeline can vary based on the size of the project, style, materials, and even the weather. Simple wooden fences are generally quicker to install, while custom metal fencing might take longer. If time is a factor, just let us know. Localists will match you with professionals who can work to your timeline and deliver quality results.<p>",
    },
    {
      key: "4",
      title: "What is a fencing contractor?",
      description:
        "A fence contractor is a skilled professional who manages everything involved in building or repairing fences or gates. From sorting materials to hiring tradespeople for the job, and providing guidance for budgeting to project completion. They bring both expertise and efficiency. Whether you're building new gate or just replacing your  old fencing, a fencing contractor ensures it’s done right. Let Localists help you find trusted, vetted fencing contractors local to you - quickly and easily.",
    },
    {
      key: "5",
      title: "How do I choose a fence or gate installation professional?",
      description: `<p>
Choosing the right fencing or gate professional isn’t just about price - it’s about ensuring they’re properly qualified, experienced, and capable of delivering a safe, high-quality job that lasts. Here’s what to look for: 
</p>

        <ul>
  <li><strong>Relevant qualifications & certifications</strong></li>
</ul>
<p>
  For fencing, look for professionals with a <strong>Level 2 Diploma in Fencing (NVQ)</strong> or a 
  <strong>FISS/CSCS card</strong> (Fencing Industry Skills Scheme/Construction Skills Certification Scheme). 
  For gate installation, check for qualifications like the NVQ in Specialist Installation Occupations – 
  Door, Gate and Shutter Systems, as well as accreditations such as BFT approval or Gate Safe training.
</p>

<ul>
  <li><strong>Proven track record</strong></li>
</ul>
<p>
  Asking to see examples of past work of previous fence and gate installations can give you a clear sense of their workmanship, style, and attention to detail.
</p>

<ul>
  <li><strong>Reviews & reputation</strong></li>
</ul>
<p>
  Browse through verified customer reviews, testimonials, or ratings to get a sense of how reliable and professional they are.
</p>

<ul>
  <li><strong>Transparent quotes & timelines</strong></li>
</ul>
<p>
  A trustworthy professional will give you a clear, itemised quote and realistic timeframes, so there are no surprises along the way.
</p>

<ul>
  <li><strong>Proper licensing & insurance</strong></li>
</ul>
<p>
  Make sure they’re fully insured and compliant with local regulations. This is especially important for automated gate systems.
</p>

<ul>
  <li><strong>Written agreements</strong></li>
</ul>
<p>
  Always request a formal contract or service agreement that outlines scope, timelines, cost, and warranty (if available).
</p>

<p>Don’t worry about doing all the research yourself. Localists takes the guesswork out of it. Just tell us what you need, and we’ll match you with vetted, qualified fencing contractors near you, so you can hire with confidence. </p>
        `,
    },
    {
      key: "6",
      title: "How much is fencing per metre in the uk?",
      description:
        "<p>On average, fencing in the UK costs <b>around £49 per metre</b>, excluding labour. Labour typically ranges between <b>£25–£30</b> per hour. Final costs depend on materials, fence design, location, and any groundwork or repairs needed. Want to get a detailed estimate for your property? With Localists, one quick request gets you matched with local experts who can break down the full costs clearly.</p>",
    },
  ],
  "driveway-installers-near-me": [
    {
      key: "1",
      title: "How much does it cost to install a driveway?",
      description: `
       Driveway installation costs can vary widely depending on the <strong> surface material, size of your driveway, your location</strong>, and any <strong> extra features</strong> you’d like. For example, adding drainage, decorative edging, lighting, or electric gates will affect the total price. You can get free quotes from specialists here on Localists once you start your search. Depending on what you nee, you’ll be provided a cost breakdown.
  <br/>
  <p style="margin-top:12px;">
    As a general rule, <strong>the larger the driveway, the lower the cost per square metre</strong> — so it’s worth asking for quotes based on your exact dimensions. A typical full installation might cost around <strong>£4,500 across the UK</strong> and <strong>£4,800 in London.</strong>
  </p>

  <p style="margin-top:20px;">
    However, on average, here’s what you can expect to pay per square metre in the UK:
  </p>

  <style>
    .driveway-table {
      border-collapse: collapse;
      width: 100%;
      min-width: 400px;
      text-align: left;
      font-size: 16px;
    }
    .driveway-table th,
    .driveway-table td {
      border: 1px solid #ccc;
      padding: 8px;
    }
    .driveway-table thead {
      background: #f5f5f5;
    }
    @media (min-width: 1024px) {
      .driveway-table {
        font-size: 18px;
      }
    }
  </style>

  <div style="overflow-x:auto; margin-top:8px;">
    <table class="driveway-table">
      <thead>
        <tr>
          <th>Driveway Type</th>
          <th>Average Cost per m²</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tarmac</td>
          <td>£45–£60</td>
        </tr>
        <tr>
          <td>Resin Bound</td>
          <td>~£60</td>
        </tr>
        <tr>
          <td>Gravel</td>
          <td>~£60</td>
        </tr>
        <tr>
          <td>Block Paving / Stone</td>
          <td>~£110</td>
        </tr>
        <tr>
          <td>Concrete</td>
          <td>~£90</td>
        </tr>
      </tbody>
    </table>
  </div>
`,
    },
    {
      key: "2",
      title: "Do you need planning permission for a driveway?",
      description:
        "In most cases, planning permission may not be required to install or replace a driveway. However, if your new driveway is over <strong>5 square metres</strong> and uses <strong>impermeable materials</strong> without a drainage solution, you’ll need permission under UK regulations. Smaller installations, or those using permeable surfaces such as gravel, permeable block paving, or porous asphalt, are generally exempt. If you’re unsure, Localists can connect you with a vetted driveway contractor near you who can advise on the latest rules in your area.",
    },
    {
      key: "3",
      title: "How long does it take to build a driveway?",
      description:
        "The time to build a driveway depends on its size, the surface material, and site conditions. On average, most driveway installations take <strong>3 to 7 days</strong> from start to finish. For example, gravel driveways are often the quickest to install, while block paving or decorative stonework can take longer due to the precision involved. Weather conditions (especially for concrete), site preparation, and contractor availability can also affect the timeline. Hiring an experienced driveway installer through Localists ensures your project runs smoothly and on schedule.",
    },
    {
      key: "4",
      title: " What is the cheapest driveway to install?",
      description:
        "Gravel driveways are generally the most affordable to install, thanks to the low cost of materials and straightforward installation process. They’re also quick to lay and come in a wide range of colours and/or stone sizes. However, what they offer in affordability, they can lack in long-term durability compared to paved options. They do require periodic maintenance, such as topping up the gravel and keeping weeds at bay.",
    },
  ],
  "patio-layers-near-me": [
    {
      key: "6",
      title: " How do I find a patio construction company near me?",
      description: `
  <p>
    Good news - You’re already halfway there! Use Localists to search for reputable <strong>patio contractors</strong> wherever you are. Simply tell us your project vision, your location, and we'll match you with trusted professionals who can bring it to life. Pick your builder, get the ball rolling, and relax.
  </p>
`,
    },
    {
      key: "7",
      title: "How long does patio installation take?",
      description: `
  <p>
    A typical <strong>patio construction</strong> job usually takes anywhere from 2 to 7 days, depending on size, design complexity, and prep needed. For example, a straightforward 10 m² project might be finished in around 2–2.5 days, while a more expansive or complex project may take up to a week. Weather and groundwork (like excavation and base preparation) can lengthen the schedule, but your <strong>patio installer</strong> will walk you through what to expect.
  </p>
`,
    },
    {
      key: "8",
      title: "What’s the best patio on a budget?",
      description: `
  <p>
    If you're keeping costs down, <strong>gravel patios</strong> are often the most affordable option. They use inexpensive materials and are quick to install. That said, they do need some upkeep, like topping up stones and tackling weeds. If you’re looking for reliable <strong>patio construction near me</strong>, Localists can connect you with specialists who’ll offer budget-friendly advice tailored to your site.
  </p>
`,
    },
    {
      key: "9",
      title: "Can I see designs before construction?",
      description: `
  <p>
    Absolutely! Most experienced patio contractors or builders will share past work, photos and customer reviews, to help you make a confident decision. Many local patio companies even offer design consultations or mood boards before they begin. If you'd like help choosing a style or material, your matched <strong>patio installer</strong> here on Localists will be happy to guide you with real examples.
  </p>
`,
    },
  ],
  landscaping: [
    {
      key: "1",
      title: "Do I need planning permission for landscaping?",
      description:
        "Most landscaping projects don’t require planning permission, but certain changes—like adding large structures or altering boundaries—may need approval from your local council.",
    },
    {
      key: "2",
      title: "How long does a landscaping project take?",
      description:
        "It depends on the scope. A small garden refresh may take a few days, while a full redesign could take several weeks.",
    },
  ],
  "artificial-grass-installation": [
    {
      key: "1",
      title: "How long does artificial grass installation take?",
      description:
        "Most installations are completed within 1–3 days, depending on the size of your lawn and site preparation requirements.",
    },
    {
      key: "2",
      title: "Is artificial grass pet-friendly?",
      description:
        "Yes! Quality artificial grass is safe for pets, easy to clean, and durable enough to handle active use.",
    },
  ],
};

const TAXRETURNDATA = {
  "fencing-contractors-near-me": {
    key: "5",
    heading1: "What is involve with fence and gate installation",
    heading2: "fence and gate installation",
    shortDes:
      "Get the low-down on what's involved in a fence and gate installation project",
    name: "Alex, Staff Writer",
    date: "2025-11-15",
  },
  "driveway-installers-near-me": {
    key: "1",
    heading1: "Creative driveway ideas",
    heading2: "Driveway installation",
    shortDes:
      "Your ultimeet guide to the hottest driveway guarantees to turn heads!",
    name: "Alex, Staff Writer",
    date: "2025-06-15",
  },
  "patio-layers-near-me": {
    key: "2",
    heading1: "Installing a new Patio on a budget",
    heading2: "Patio installation",
    shortDes: "Your ultimate guide to budget-friendly Patio installation",
    name: "Alex, Staff Writer",
    date: "2021-04-21",
  },
  landscaping: {
    key: "3",
    heading1: "How to Landscape your garden on a budget",
    heading2: "Landscaping",
    shortDes:
      "From luscious landscaping to thrifty decor ideas, save money with our top budgeting tips for landscaping your outside space",
    name: "Alex, Staff Writer",
    date: "2021-03-10",
  },
  "artificial-grass-installation": {
    key: "4",
    heading1: "A guide to the different types of Artificial Grass",
    heading2: "Artificial Grass Installation",
    shortDes:
      "Your ultimate guide to the different types of Artificial Grass and the right choice for you",
    name: "Mika, Staff Writer",
    date: "2021-04-15",
  },
};

const regionsData = {
  "fencing-contractors-near-me": [
    {
      id: 3,
      title: "North West England",
      items: [
        { name: "Cheshire", path: "" },
        { name: "Greater Manchester", path: "" },
        { name: "Lancashire", path: "" },
        { name: "Merseyside", path: "" },
      ],
    },
  ],
  "driveway-installers-near-me": [
    {
      id: 3,
      title: "North West England",
      items: [
        { name: "Cheshire", path: "" },
        { name: "Greater Manchester", path: "" },
        { name: "Lancashire", path: "" },
        { name: "Merseyside", path: "" },
      ],
    },
  ],
  "patio-layers-near-me": [
    {
      id: 3,
      title: "North West England",
      items: [
        { name: "Cheshire", path: "" },
        { name: "Greater Manchester", path: "" },
        { name: "Lancashire", path: "" },
        { name: "Merseyside", path: "" },
      ],
    },
  ],
  landscaping: [
    {
      id: 3,
      title: "North West England",
      items: [
        { name: "Cheshire", path: "" },
        { name: "Greater Manchester", path: "" },
        { name: "Lancashire", path: "" },
        { name: "Merseyside", path: "" },
      ],
    },
  ],
  "artificial-grass-installation": [
    {
      id: 3,
      title: "North West England",
      items: [
        { name: "Cheshire", path: "" },
        { name: "Greater Manchester", path: "" },
        { name: "Lancashire", path: "" },
        { name: "Merseyside", path: "" },
      ],
    },
  ],
};

export const POPULARCITY = {
  "fencing-contractors-near-me": [
    { id: 1, city_name: "Liverpool", city_image: Liverpool },
    { id: 2, city_name: "Manchester", city_image: Manchester },
    { id: 3, city_name: "Chester", city_image: Chester },
    { id: 4, city_name: "Warrington", city_image: Warrington },
    { id: 5, city_name: "Ellesmere", city_image: EllesmerePort },
  ],
  "driveway-installers-near-me": [
    { id: 1, city_name: "Liverpool", city_image: Liverpool },
    { id: 2, city_name: "Manchester", city_image: birmingham },
    { id: 3, city_name: "Chester", city_image: liverpool },
    { id: 4, city_name: "Warrington", city_image: london },
    { id: 5, city_name: "Ellesmere", city_image: london },
  ],
  "patio-layers-near-me": [
    { id: 1, city_name: "Liverpool", city_image: Liverpool },
    { id: 2, city_name: "Manchester", city_image: birmingham },
    { id: 3, city_name: "Chester", city_image: liverpool },
    { id: 4, city_name: "Warrington", city_image: london },
    { id: 5, city_name: "Ellesmere", city_image: london },
  ],
  landscaping: [
    { id: 1, city_name: "Liverpool", city_image: Liverpool },
    { id: 2, city_name: "Manchester", city_image: birmingham },
    { id: 3, city_name: "Chester", city_image: liverpool },
    { id: 4, city_name: "Warrington", city_image: london },
    { id: 5, city_name: "Ellesmere", city_image: london },
  ],
  "artificial-grass-installation": [
    { id: 1, city_name: "Liverpool", city_image: Liverpool },
    { id: 2, city_name: "Manchester", city_image: birmingham },
    { id: 3, city_name: "Chester", city_image: liverpool },
    { id: 4, city_name: "Warrington", city_image: london },
    { id: 5, city_name: "Ellesmere", city_image: london },
  ],
};

const HowItWorksData = {
  "fencing-contractors-near-me": [
    {
      id: 1,
      title: "Start Your Search For Fencing Contractors",
      image: WhatYouNeedIcon,
      heading1: "Start your search for fencing contractors",
      description:
        "Share your project details and we’ll match you with experienced local fencing contractors. Whether it’s a garden fence, driveway gate, or a larger commercial project, we’ll get you started with vetted experts you can trust.",
    },
    {
      id: 2,
      title: "Request free quotes from contractors.",
      image: FreeQuotesIcon,
      heading1: "Request free quotes from contractors.",
      description:
        "Once you share your requirements, we’ll send over a selection of free, no-obligation quotes tailored to your project. No need to dig through endless listings. Just compare your offers from specialists and choose the best fit.",
    },
    {
      id: 3,
      title: "Hire your chosen local fencing contractor",
      image: accountant, // Note: You might want to rename this variable to 'fencerIcon' or similar
      heading1: "Hire your chosen local fencing contractor",
      description:
        "With Localists, you stay in control. There is no obligation to hire immediately. Take your time. Once you’re ready, go with the fence installers who meet your needs, preferences, and budget.",
    },
  ],
  "driveway-installers-near-me": [
    {
      id: 1,
      title: "Search for driveway installers near you",
      image: WhatYouNeedIcon,
      heading1: "Search for driveway installers near you",
      description:
        "Tell us what you need and where, and we’ll connect you with trusted local driveway contractors ready to help. Whether it’s a quick refresh or a full driveway installation, our platform makes finding the right specialist simple and fast.",
    },
    {
      id: 2,
      title: "Get free quotes from driveway installers near you",
      image: FreeQuotesIcon,
      heading1: "Get free quotes from driveway installers near you",
      description:
        "Once you submit your project details, we’ll send you free, no-obligation quotes from the best driveway contractors near you. Compare offers, review profiles, explore previous work - all at no cost until you’re ready to decide.",
    },
    {
      id: 3,
      title: "Hire a local driveway installer",
      image: accountant, // Consider renaming to 'installerIcon' for consistency
      heading1: "Hire a local driveway installer",
      description:
        "Once you’ve found the perfect match, all you need to do is sit back while your new driveway takes shape.",
    },
  ],
  "patio-layers-near-me": [
    {
      id: 1,
      title: "Search for local patio contractors",
      image: WhatYouNeedIcon,
      heading1: "Search for local patio contractors",
      description:
        "Tell us about your project, size, style, and budget, and we’ll match you with vetted local patio contractors. Whether you want a low-maintenance concrete patio, a warm and textured sandstone surface, or a fully customised layout, we connect you with an expert nearby ready to help.",
    },
    {
      id: 2,
      title: "Request free quotes from patio layers",
      image: FreeQuotesIcon,
      heading1: "Request free quotes from patio layers",
      description:
        "Once we know your needs, we’ll match you with trusted patio companies near you. Compare free, no-obligation quotes, see their work, and choose the one who feels right for you.",
    },
    {
      id: 3,
      title: "Hire your local contractor",
      image: accountant, // Consider renaming for clarity if needed
      heading1: "Hire your local contractor",
      description:
        "When you’re ready, hire with confidence. Every local patio builder on our platform is vetted for quality, professionalism, and reliability. So you can move forward knowing your project is in safe hands.",
    },
  ],
  landscaping: [
    {
      id: 1,
      title: "Find a Landscaper Near You",
      image: WhatYouNeedIcon,
      heading1: "Find a Landscaper Near You",
      description:
        "Tell us what you need and where you need it, and we’ll do the searching for you. Whether you dream of a classic English rose garden, a modern outdoor living space, or a low-maintenance design, provide as many details as possible so we can match you with the ideal landscaping specialist in your area.",
    },
    {
      id: 2,
      title: "Get Free Quotes from Local Landscapers",
      image: FreeQuotesIcon,
      heading1: "Get Free Quotes from Local Landscapers",
      description:
        "We’ll review hundreds of landscaping experts near you and handpick the best matches for your project. You’ll receive free, no-obligation quotes from interested professionals. You can choose to get instant notifications or check your quotes whenever it suits you.",
    },
    {
      id: 3,
      title: "Hire with Confidence",
      image: accountant,
      heading1: "Hire with Confidence",
      description:
        "Check reviews, see before-and-after photos, and explore detailed profiles—all in one place. With all the information at your fingertips, hiring the right landscaper becomes simple. Once you’ve found your match, you can get started transforming your outdoor space.",
    },
  ],
  "artificial-grass-installation": [
    {
      id: 1,
      title: "Tell Us Your Needs",
      image: WhatYouNeedIcon,
      heading1: "Tell Us Your Needs",
      description:
        "Share your requirements, and we’ll match you with the most suitable installers in your area.",
    },
    {
      id: 2,
      title: "Get Free Quotes",
      image: FreeQuotesIcon,
      heading1: "Get Free Quotes",
      description:
        "Receive multiple free quotes from professionals, plus instant updates via our website or app. We do all the hard work for you.",
    },
    {
      id: 3,
      title: "Choose Your Installer",
      image: accountant,
      heading1: "Choose Your Installer",
      description:
        "Compare reviews, check credentials, and speak directly with providers before making your choice.",
    },
  ],
};

const CONTENT_CONFIG = {
  "fencing-contractors-near-me": {
    para1:
      "Looking to upgrade your property with a secure fence or gate? With Localists, you’re instantly matched with trusted fencing contractors near you - no combing through an endless list.",
    para2:
      "Whether you're planning a new build, replacing an old fence, securing a commercial space or adding an automatic gate, we’ll connect you with the best fencing company and fence builders near you for your needs. From start to finish, we make the process simple. Just tell us what you need, and we’ll connect you with the best hands.",
  },
  "driveway-installers-near-me": {
    para1:
      "Looking to give your outdoor space a facelift? Localists connects you with top-rated driveway contractors near you.",
    para2:
      "No matter your location in the UK, we match you with trusted driveway installers nearby, who specialise in all kinds of installation. From classic block paved driveways to modern resin driveway surfaces, we’ll only connect you with professionals who understand the job. No more endless scrolling or calling around. Just tell us your requirements, and we’ll do the rest.",
    para3: "No fees, no catch, just expert help at no cost!",
  },
  "patio-layers-near-me": {
    para1:
      "At Localists, we make it simple to find trusted patio installers near me who can transform your garden into the outdoor space you’ve been dreaming of. From a fresh garden patio design to a full-scale rebuild, we connect you with local experts",
    para2:
      "Whether you’re picturing a modern porcelain patio, a classic sandstone patio, or a budget-friendly gravel patio, we’ll help you find the right patio contractors for the job. Compare fair, transparent quotes and choose a professional who shares your vision.",
    para3: "It’s free from start to finish !",
  },
  landscaping: {
    para1:
      "Looking for a skilled landscaper but not sure where to begin? At Localists.com, we make it easy. Simply tell us about your project, and we’ll connect you with trusted local landscaping professionals. Compare quotes, browse reviews, and view past work—all at no cost to you. There’s no pressure to hire until you’re ready.",
    para2: "",
    para3: "Best of all – it’s completely free!",
  },
  "artificial-grass-installation": {
    para1:
      "Looking for top-quality Artificial Grass Installers? Start your search today and get free, no-obligation quotes in minutes!",
    para2:
      "If it’s your first time hiring an Artificial Grass Installer and you’re unsure where to begin, simply tell us about your project. We’ll connect you with trusted local professionals so you can review profiles, read real customer feedback, and request more details—without any pressure to commit.",
    para3: "Best of all – it’s completely free!",
  },
};

const BREADCRUMB_CONFIG = {
  "fencing-contractors-near-me": [
    { title: "Home & Garden", path: "/home" },
    { title: "Fence & Gate Installation", path: "fencing-contractors-near-me" }, // no path for last item
  ],
  "driveway-installers-near-me": [
    { title: "Home & Garden", path: "/home" },
    { title: "Driveway Installation", path: "driveway-installers-near-me" }, // no path
  ],
  "patio-layers-near-me": [
    { title: "Home & Garden", path: "/home" },
    { title: "Patio Services", path: "patio-layers-near-me" }, // no path
  ],
  landscaping: [
    { title: "Home & Garden", path: "/home" },
    {
      title: "Gardening & Landscaping",
      path: "/gardening-landscaping",
    },
    { title: "Landscaping", path: "landscaping" }, // no path
  ],
  "artificial-grass-installation": [
    { title: "Home & Garden", path: "/home" },
    {
      title: "Gardening & Landscaping",
      path: "/gardening-landscaping",
    },
    {
      title: "Artificial Grass Installation",
      path: "artificial-grass-installation",
    }, // no path
  ],
};

const CONTENT_CONFIG_TOP = {
  "fencing-contractors-near-me": {
    findingHeading: " fence and gate installation experts",
    title: "Fencing Contractors",
    mainTitle: "fence & gate installation",
    ctaText: "Fencer",
    avgPrice: "£200",
    showSpeicialits: true,
    avgPriceTitle: "fence & gate installation",
  },
  "driveway-installers-near-me": {
    findingHeading: "driveway companies",
    title: "Driveway Companies",
    mainTitle: "driveway installers",
    ctaText: "Driveway Installer",
    avgPriceTitle: "driveway installers",
  },
  "patio-layers-near-me": {
    findingHeading: "patio contractors",
    title: "Patio Installers",
    mainTitle: "Patio and Paving Service",
    ctaText: "Patio Service",
    avgPriceTitle: "a patio",
  },
  landscaping: {
    findingHeading: "Landscaping",
    title: "Landscaper",
    mainTitle: "Landscape Gardener",
  },
  "artificial-grass-installation": {
    findingHeading: "Artificial Grass Installation",
    title: "Artificial Grass Installer",
    mainTitle: "Artificial Installer",
  },
};

const CONTENT_CONFIG_BANNER = {
  "fencing-contractors-near-me": {
    banner: FenceGateInstallationBanner,
    reltatedImage: fenchinstal,
  },
  "driveway-installers-near-me": {
    banner: DrivewayInstallationBanner,
    reltatedImage: Driveway,
  },
  "patio-layers-near-me": {
    banner: PatioServicesBanner,
    reltatedImage: Patio,
  },
  landscaping: {
    banner: LandscapingBanner,
    reltatedImage: Landscaping,
  },
  "artificial-grass-installation": {
    banner: ArtificialGrassBanner,
    reltatedImage: ArtificialGrass,
  },
};

const CONTENT_CONFIG_META = {
  "fencing-contractors-near-me": {
    title: "Fencing Companies & Fencing Contractors Near Me | Localists",
    name: "description",
    content:
      "Searching for secure fence and gate installation experts near you? Get matched instantly with fencing companies  in your area on localists using free quotes.",
  },
  "driveway-installers-near-me": {
    title: "Find Driveway Companies & Driveway Contractors Near Me - Localists",
    name: "description",
    content:
      " Find the best local driveway installers and contractors near you. Need resin bound, gravel or tarmac driveways? Get free quotes from local specialists nearby.",
  },
  "patio-layers-near-me": {
    title: "Find Patio Contractors and Patio Layers Near me | Localists",
    name: "description",
    content:
      "Looking for patio installers near you? Find trusted patio contractors and patio layers in your local area. Get free quotes and start today at Localists.",
  },
  landscaping: {
    title: "Landscape Gardeners Near Me | Local Garden landscaper - Localists",
    name: "description",
    content:
      "Find skilled landscape gardeners near you for stunning outdoor designs, lawn care, and garden makeovers. Quality local services at affordable rates.",
  },
  "artificial-grass-installation": {
    title:
      "Artificial Grass Installation | Find Installers Near You - Localists",
    name: "description",
    content:
      "Find trusted artificial grass installers near you with Localists. Get free quotes for expert artificial grass installation and transform your outdoor space today.",
  },
};
const FIND_SERVICE_CONTENT = {
  "fencing-contractors-near-me": [
    {
      type: "h2",
      text: "Find top rated fencing companies near you",
    },
    {
      type: "p",
      text: `From residential gardens to commercial properties, we match you with local and trusted fencing companies. Just give us a few details and we’ll do the legwork. 
You can find any type of specialist you need to cover everything from : residential fencing, commercial fencing, agricultural fencing, and even custom-built solutions. Whatever the style or scale of your project, you’ll find professionals who combine craftsmanship with quality to deliver impeccable results, wherever you are.`,
    },
    {
      type: "h3",
      text: "Why hire fencing contractors through localists.",
    },
    {
      type: "p",
      text: `When it comes to finding trusted, local fencing contractors, homeowners, property managers, and businesses alike turn to Localists first. Hundreds of customers use our platform daily to connect with top-rated, fully insured, and vetted fence installers in their local area.
Whether you're securing your home, upgrading your garden, or managing a large commercial project, we make it simple to find the right expert for the job. All professionals we recommend are checked, approved, and reviewed, so you can hire with complete peace of mind.`,
    },
    {
      type: "pbold",
      text: "When you hire from Localists you get:",
    },
    {
      type: "uili",
      heading: "Reliable local experts:\u00A0",
      text: "We match you with local fencing contractors who are familiar with your region. That means better communication, faster service, and local insight you can rely on.",
    },
    {
      type: "uili",
      heading: "Quotes tailored to you:\u00A0",
      text: `No more one-size-fits-all pricing. Once you tell us what you're looking for, we’ll connect you with fence installers who provide custom quotes, helping you compare options and make the best choice.`,
    },
    {
      type: "uili",
      heading: "Durable, premium materials:\u00A0",
      text: `From wood to metal to vinyl, we’ll connect you with contractors who use durable, high-quality materials—perfect for long-term peace of mind.`,
    },
    {
      type: "uili",
      heading: "Quick turnaround time:\u00A0",
      text: `Want your project completed within a timeframe? Once you're matched, many professionals are ready to begin promptly and work within your preferred timeline.`,
    },
    {
      type: "uili",
      heading: "Design flexibility:\u00A0",
      text: `Have something specific in mind? Whether you're after inspiration or already know exactly what you want, the right fence and gate installation specialist, is just a few clicks away`,
    },
    {
      type: "uili",
      heading: "Ongoing maintenance services available:\u00A0",
      text: `Some fencing contractors offer more than just setup; they’ll help with repairs, upgrades, and ongoing maintenance.`,
    },

    {
      type: "h2",
      text: "Fence and gate installation: network of qualified contractors wherever you are",
    },
    {
      type: "uili",
      heading: "Wooden fence & gate Installation:\u00A0",
      text: "A classic, traditional option that adds charm and privacy.",
    },
    {
      type: "uili",
      heading: "Metal and iron gates:\u00A0",
      text: "Perfect for a strong, secure finish with peace of mind.",
    },
    {
      type: "uili",
      heading: "Vinyl fencing:\u00A0",
      text: "A low-maintenance option that’s easy to install and lasts for years.",
    },
    {
      type: "uili",
      heading: "Decorative garden fences:\u00A0",
      text: "Add a personal touch to your garden with bespoke design options.",
    },
    {
      type: "uili",
      heading: "Security fencing:\u00A0",
      text: "Ideal for keeping properties safe and protected.",
    },
    {
      type: "uili",
      heading: "Automatic gate installation:\u00A0",
      text: "Enhance security and convenience with smart, automatic solutions.",
    },
    {
      type: "uili",
      heading: "Gate repairs and replacements:\u00A0",
      text: "From rusted hinges to stuck gates, find the right professionals who can help you fix it.",
    },
    {
      type: "uili",
      heading: "Agricultural fencing:\u00A0",
      text: "Perfect for keeping your farming stock secure.",
    },
  ],

  "driveway-installers-near-me": [
    {
      type: "h2",
      text: "Qualified driveway installers near you",
    },
    {
      type: "p",
      text: "Whether it’s your first time planning a driveway, you’re upgrading an old design, or you’ve been let down by installers in the past, Localists is the right place for you. We connect you with trusted driveway contractors who deliver quality results every time. In just a few clicks, you’ll be matched with the best qualified specialists in your local area.",
    },
    {
      type: "h2",
      text: "Why hire driveway contractors through localists?",
    },
    {
      type: "p",
      text: "Hiring the right driveway professional shouldn’t be a guessing game. At Localists, we make the process simple by connecting you directly with local driveway contractors who are proven experts.",
    },
    {
      type: "p",
      text: "We’ve helped hundreds of clients find trusted specialists for everything from minor repairs to complete driveway installation projects. Every builder on our platform is vetted for skill, reliability, and quality - so you can choose with confidence and get the perfect fit for your project fast. Here’s what you should hire at Localists:",
    },
    {
      type: "uili",
      heading: "Streamlined hiring process:\u00A0",
      text: "No endless searching or unanswered calls. Tell us what you need, and we’ll instantly match you with experienced people who specialise in your preferred surface. Be it resin bound, gravel, tarmac, block paving, or concrete. You call the shots.",
    },
    {
      type: "uili",
      heading: "Vetted local professionals:\u00A0",
      text: "Every installer we recommend is fully vetted for skills, insurance, and professionalism. Many hold respected industry credentials such as membership in The Association of Paving Contractors, ensuring they meet the highest standards.",
    },
    {
      type: "uili",
      heading: "Personalised, no-obligation quotes:\u00A0",
      text: "You get free, tailored quotes from the best driveway builders in your local area. All that’s left is to choose the expert who best fits your needs and budget.",
    },
    {
      type: "uili",
      heading: "Expert guidance and local knowledge:\u00A0",
      text: "Our driveway specialists offer expert advice, from determining whether your driveway project requires planning permission to recommending the most suitable materials for your property. They also provide insights on regional regulations, soil conditions, and weather patterns, ensuring your driveway is built to last.",
    },
    {
      type: "uili",
      heading: "Real feedback from real clients:\u00A0",
      text: "All reviews on Localists are 100% genuine, from clients who have transformed their properties, homes, and business premises through our trusted specialists. We’re proud to work with professionals whose results speak for themselves.",
    },
    {
      type: "h2",
      text: "What to look for in a driveway installation professional?",
    },
    {
      type: "p",
      text: "If it’s your first time hiring a driveway installer, it’s natural to feel unsure about where to start. Even if you’ve hired before, finding someone you can fully trust these days isn’t always easy. A good place to begin is by checking for industry qualifications and memberships, such as The Association of Paving Contractors (Interlay) which offers a Seal of Approval to members who meet strict professional standards",
    },
    {
      type: "p",
      text: "Ask to see photos of past projects so you can get a feel for their workmanship and style across different materials. Read genuine customer reviews to see how reliable and communicative they are. Before committing, always ask for a clear, written quote that outlines costs and timelines. If any local or planning rules apply, an installer who understands regional planning requirements can save you delays or headaches",
    },
    {
      type: "p",
      text: "Fortunately, with Localists, that legwork is already done. Every professional in our network is pre-vetted, reviewed, insured, and trained. You don’t need to spend hours comparing credentials, just tell us what you need, and we’ll match you with trusted driveway specialists nearby.",
    },
    {
      type: "h2",
      text: "Bespoke driveway installation services UK",
    },
    {
      type: "p",
      text: "Whether you need a car park fixed, front yard redesigned, or a completely new driveway installation, we've got the right driveway specialist for the job. You will find driveway resin bound or tarmac driveway specialists offering expert installation and repair services near you. You will find experts in resin bound, tarmac, gravel, block paving, concrete, and stone driveway, to name a few. Covering both installation and repairs.",
    },
    {
      type: "p",
      text: "To help you choose the best surface for your property, here’s a quick look at the most popular driveway types available on Localists, along with their key benefits and possible considerations:",
    },
    {
      type: "table",
      tableHeaders: ["Driveway Type", "Pros", "Cons"],
      rowData: [
        [
          "Resin bound driveway",
          "Stylish, wide choice of colours and textures, permeable (reduces puddles), prevents weed growth, quick to install",
          "May need upkeep in high-traffic areas, quality depends on expert installation",
        ],
        [
          "Tarmac driveway",
          "Fast and simple to lay, very durable, low maintenance, cost-effective, handles heavy traffic",
          "Fewer design options, can soften in extreme heat",
        ],
        [
          "Block paving / stone driveway",
          "Premium look, versatile patterns, great for small or unusual shapes, frost-resistant surface",
          "Longer installation time, higher cost, freeze-thaw can affect joints",
        ],
        [
          "Gravel driveway",
          "Budget-friendly, great for long driveways, wide colour options, easy to replenish",
          "Needs regular raking and topping up, harder to clear snow, weeds without membrane",
        ],
        [
          "Concrete driveway",
          "Strong, long-lasting, low maintenance, can be coloured or patterned",
          "Can crack over time, repairs may be visible, less permeable unless modified",
        ],
      ],
    },
  ],

  "patio-layers-near-me": [
    {
      type: "h2",
      text: "Top tips in choosing the best patio contractors near you",
    },
    {
      type: "p",
      text: "Finding the right patio contractors near me isn’t just about who can start the quickest or who gives the cheapest quote. It’s about making sure your project is done right the first time. Here are a few practical tips to help you hire with confidence:",
    },
    {
      type: "uili",
      heading: "Get at least three quotes –\u00A0",
      text: "Prices can vary more than you think. Having a few quotes to compare gives you a better sense of what’s fair and helps you spot anyone who’s too high or suspiciously low.",
    },
    {
      type: "uili",
      heading: "Ask for tailored design suggestions –\u00A0",
      text: "A good local patio builder won’t just say “yes” to everything; they’ll offer creative ideas that work with your garden’s size, shape, and style.",
    },
    {
      type: "uili",
      heading: "See real examples of past projects –\u00A0",
      text: "Photos speak volumes. Ask to see finished patios in materials you’re considering, like sandstone patios or porcelain patios, so you can judge the quality for yourself.",
    },
    {
      type: "uili",
      heading: "Avoid paying everything upfront –\u00A0",
      text: "A trusted patio installer will be happy to work with staged payments, so you only pay in full when you’re completely satisfied.",
    },
    {
      type: "uili",
      heading: "Check genuine local recommendations –\u00A0",
      text: "It’s one thing to have online reviews, but hearing from someone in your own area gives extra peace of mind that the contractor delivers on their promises.",
    },
    {
      type: "h2",
      text: "Why choose patio contractors at Localists?",
    },
    {
      type: "p",
      text: "Hiring through Localists isn’t just convenient, it’s smart. We connect you to the best specialists in your local area. The best part is, these builders know your area’s climate, understand planning requirements, and design trends, meaning your patio will be built to last. Here’s why hiring a patio installer near you makes sense:",
    },
    {
      type: "li",
      heading: "Faster site visits and easier communication.",
    },
    {
      type: "li",
      heading: "Materials that suit your region’s weather conditions.",
    },
    {
      type: "li",
      heading: "Designs that blend with your house style.",
    },
    {
      type: "li",
      heading: "Easy-to-check reputation from nearby customers.",
    },
    {
      type: "li",
      heading: "Support for your local economy.",
    },
    {
      type: "li",
      heading: "Quicker help if anything needs adjusting later",
    },
    {
      type: "h3",
      text: "Questions to ask your local patio contractor",
    },
    {
      type: "p",
      text: "If you are hiring a Local patio designer or installer for the first time, and you don’t know where to start, we have put together a few questions below. Even if you’ve done it before, having a few key questions prepared makes sure you get clear answers and avoid surprises later. When you receive your quote from a specialist here on Localists, try asking::",
    },
    {
      type: "libold",
      heading: "Can I see reviews or testimonials from recent clients?",
    },
    {
      type: "libold",
      heading: "Do you have insurance in case something goes wrong?",
    },
    {
      type: "libold",
      heading: "How long have you been building patios?",
    },
    {
      type: "libold",
      heading: "Do you offer a guarantee for your work?",
    },
    {
      type: "libold",
      heading: "Can I have a detailed written quote?",
    },
    {
      type: "libold",
      heading: "How long will the installation take from start to finish?",
    },
    {
      type: "libold",
      heading: "Are you a member of any trade organisations?",
    },
    {
      type: "libold",
      heading: "Can we agree on a staged payment plan?",
    },
    {
      type: "libold",
      heading: "When could you start the job?",
    },
    {
      type: "libold",
      heading:
        "Do you have photos or examples of similar projects you’ve done?",
    },
    {
      type: "h2",
      text: "How much does it cost to have a patio laid?",
    },
    {
      type: "p",
      text: "How much a patio layer charges to lay a patio varies across the UK. The total cost depends on your location, the size of your project, the materials choice, labour & site prep, for example, removing old patios, ensuring drainage, or levelling over uneven ground adds time and cost.",
    },
    {
      type: "p",
      text: "A simple gravel or concrete-style patio will generally cost less than a premium porcelain or sandstone finish. On average, you can expect to spend around £80–£120 per m² for materials and labour combined, or around £2,800 on a new complete patio installation. Though this figure can be significantly higher or slightly lower depending on your location. Here’s a rough guide based on popular options:",
    },
    {
      type: "uili",
      heading: "Gravel patio",
      text: "– £40–£60 per m² (budget-friendly)",
    },
    {
      type: "uili",
      heading: "Concrete patio",
      text: "– £70–£90 per m²",
    },
    {
      type: "uili",
      heading: "Sandstone patio ",
      text: "– £90–£120 per m²",
    },
    {
      type: "uili",
      heading: "Porcelain patio",
      text: " – £100–£140 per m² (premium, sleek look)",
    },
    {
      type: "p",
      text: "Labour typically makes up 50–70% of the cost, so location and contractor experience can also affect the final price. If you need a custom estimate, there’s no need to stress. Localists can connect you with local patio installers who’ll provide free, no-obligation quotes tailored to your garden, materials, and budget.",
    },
    {
      type: "h2",
      text: "What to look for when choosing a patio contractor",
    },
    {
      type: "p",
      text: "Every patio contractor has their own way of working, so it’s worth taking a bit of time to find the one that matches your vision, budget, and expectations. Here’s what’s worth keeping an eye out for:",
    },
    {
      type: "uili",
      heading: "Experience and skill",
      text: "– They should be confident in working with materials that you intend to use for your project, whether it's sandstone, gravel, or concrete, and have a portfolio to prove it.",
    },
    {
      type: "uili",
      heading: "Trustworthiness",
      text: "– Someone who communicates clearly, turns up on time, and delivers what they promise. They should also be ready to provide a written contract and clear timelines.",
    },
    {
      type: "uili",
      heading: "Knowledge",
      text: "– They can provide expert advice on what works best for your garden, soil, climate and even any local regulations you need to adhere to.",
    },
    {
      type: "uili",
      heading: "Insurance and guarantees",
      text: "– This protects you if anything goes wrong.",
    },
    {
      type: "uili",
      heading: "Good reputation",
      text: "– Positive feedback from previous clients speaks volumes. Ensure you look at testimonials from previous clients.",
    },
    {
      type: "uili",
      heading: "Willingness to answer questions",
      text: "– A good contractor won’t rush you; they’ll take time to explain options, next steps and are happy to hold your hands throughout the project.",
    },
    {
      type: "p",
      text: "Remember, all specialists here on Localists are verified and vetted, so you can skip the risky guesswork. We’ve already done the legwork - you just go ahead and choose a builder who feels right for your project.",
    },
  ],

  landscaping: [
    {
      type: "h2",
      text: "Transform Your Garden Today",
    },
    {
      type: "p",
      text: "From small garden makeovers to large-scale landscaping projects, we’ll connect you with skilled landscapers who can bring your vision to life. Whether it’s a new patio, fresh planting, or a complete garden redesign, our experts can add beauty, functionality, and value to your property.",
    },
    {
      type: "h3",
      text: "How Much Does Landscaping Cost?",
    },
    {
      type: "p",
      text: "On average, UK garden landscapers charge between £20 and £25 per hour. Prices can vary depending on location, project size, and the complexity of the design.\n\nIf you’d like a more detailed breakdown, our Landscaping Cost Guide explains hourly rates, typical services included, and how to budget for your garden transformation.",
    },
  ],

  "artificial-grass-installation": [
    {
      type: "h2",
      text: "Find Artificial Grass Installation near you",
    },
    {
      type: "p",
      text: "Artificial grass is a fantastic way to maintain your garden. Keeping on top of your lawn can be tricky, especially with the forces of nature making your job even harder. With an artificial lawn, you can keep your garden looking pristine the whole year-round. Thankfully, finding the right artificial lawn installation specialist isn’t difficult - Localists can help you get free quotes in a matter of minutes.",
    },
  ],
};
const LEVEL_THIRD_SERVICES_NAME = {
  "fencing-contractors-near-me": "Fence & Gate Installation",
  "driveway-installers-near-me": "Driveway Installation",
  "patio-layers-near-me": "Patio Services",
  landscaping: "Landscaping",
  "artificial-grass-installation": "Artificial Grass Installation",
};

export {
  POPULAR_CITIES,
  regionsData,
  AVERAGE_PRICE,
  HowItWorksData,
  FREQUENTLY_DATA,
  OTHER_SERVICES_DATA,
  RELATED_SERVICES_DATA,
  RELATED_PRICE_DATA,
  REVIEWS_DATA,
  TAXRETURNDATA,
  CONTENT_CONFIG,
  BREADCRUMB_CONFIG,
  CONTENT_CONFIG_TOP,
  CONTENT_CONFIG_BANNER,
  FIND_SERVICE_CONTENT,
  CONTENT_CONFIG_META,
  LEVEL_THIRD_SERVICES_NAME,
};
