import {
  accountant,
  FreeQuotesIcon,
  WhatYouNeedIcon,
} from "../../Level1/images";

const BOOKKEEPING_SERVICE_META = {
  "bookkeepers-near-me": {
    title: " Free Quotes on Holiday Transfers and bookkeepers-near-me Near You",
    name: "description",
    content:
      "Need airport taxi or airport transfer service? Get instant quotes from trusted transport providers to all major UK airports. Start search at Localists.",
  },
};
const BOOKKEEPING_SERVICE_CONFIG_TOP = {
  "bookkeepers-near-me": {
    findingHeading: "bookkeepers",
    title: "Bookkeepers",
    // mainTitle: "",
    ctaText: "Professional Bookkeepers",
    // avgPrice: "£200",
    showSpeicialits: true,
    avgPriceTitle: "a bookkeeper",
    // faqTitle: "on airport transfers",
  },
};
const BOOKKEEPING_SERVICE_BREADCRUMB_CONFIG = {
  "bookkeepers-near-me": [
    { title: "Business",path:'business' },
    { title: " Bookkeeping Services" },
  ],
};

const BOOKKEEPING_SERVICE_CONTENT_CONFIG = {
  "bookkeepers-near-me": {
    para1:
      "Lost in a sea of invoices and receipts? We’ll connect you with local bookkeepers who actually like balancing the books—so you can focus on running your business (or just enjoying your weekends). Whichever type of bookkeeping services you need, we can help you find the right one, and at absolutely no cost to you at all. Just enter a few details of what you require, and we’ll send you up to 5 quotes completely free of charge and you do the rest! ",
    para2:
      "Zero cost. Zero obligation. Just free quotes from local experts sent to you in minutes.",
  },
};
const BOOKKEEPING_SERVICE_HOW_IT_WORK = {
  "bookkeepers-near-me": [
    {
      id: 1,
      lBreak: false,
      title: "Start your search for bookkeepers",
      image: WhatYouNeedIcon,
      heading1: "Start your search for bookkeepers",
      description:
        "We will help you find the most experienced and reliable bookkeepers in your local area. Just provide us with some small details of the kind of service you require and we’ll match you with qualified professionals who fit the bill.",
    },
    {
      id: 2,
      lBreak: false,
      title: "Request free quotes from bookkeepers",
      image: FreeQuotesIcon,
      heading1: "Request free quotes from bookkeepers",
      description:
        "Once we know your requirements, we will send you free, no-obligation quotes from the best quality local bookkeepers near you. You don’t need to scroll through endless listings. 	Simply compare profiles, service offerings, and read reviews to find the right fit  - all at no cost.",
    },
    {
      id: 3,
      lBreak: true,
      title: "Hire a local bookkeeper",
      image: accountant,
      heading1: "Hire a local bookkeeper",
      description:
        "After reviewing your options, choose the bookkeeper that best fits your needs. Get started on your terms - no pressure, no commitment until you're ready. Once you are confident in your choice, hire your bookkeeper and kick off your project.",
    },
  ],
};

const BOOKKEEPING_SERVICE_FIND_SERVICE_CONTENT = {
  "bookkeepers-near-me": [
    {
      type: "h2",
      text: "Find quality local bookkeepers",
    },

    {
      type: "p",
      text: `At Localists, our reliable and qualified bookkeeping professionals can keep your financial affairs in perfect order. Whether you’re a business owner or an individual, there are huge benefits to using accountancy and bookkeeping services. You don’t have to stress over tax returns, payroll, invoices, or bills. The best part? Our service is completely free.`,
    },
    {
      type: "p",
      text: `Our vetted and verified bookkeepers can take care of your daily financial tasks, allowing you to concentrate on what matters - growing your business, and enjoying your weekends.`,
    },
    {
      type: "p",
      text: `Start your search now and start receiving quotes within minutes from the best bookkeeping service providers in your local area.`,
    },
    ,
    {
      type: "h2",
      text: "Key qualities to look for in a professional bookkeeper",
    },
    {
      type: "uili",
      heading: "Basic understanding of accounting principles:\u00A0",
      text: "A solid foundation in accounting principles helps bookkeepers maintain accurate financial records and understand the broader context of their work.",
      marginTop: true,
    },
    {
      type: "uili",
      heading: "Relevant qualifications:\u00A0",
      text: "Look for bookkeepers with certifications from recognised bodies such as:",
      marginTop: false,
    },
    {
      type: "h3uiliWithoutStyle",
      text: `- <a style="margin-left:2%; color:#00afe3; " href="https://www.aat.org.uk/" target="_blank" rel="noopener noreferrer">AAT (Association of Accounting Technicians)</a>`,
      marginTop: false,
    },
    {
      type: "h3uiliWithoutStyle",
      text: `- <a style="margin-left:2%; color:#00afe3; " href="https://www.bookkeepers.org.uk/" target="_blank" rel="noopener noreferrer">ICB (Institute of Certified Bookkeepers)</a>`,
      marginTop: false,
    },
    {
      type: "h3uiliWithoutStyle",
      text: `- <a style="margin-left:2%; color:#00afe3;" href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer">ICAEW</a> or <a style="color:#00afe3;" href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer">ACCA</a> (if they also offer higher-level financial advice)`,
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Industry experience:\u00A0",
      text: "When choosing a bookkeeper, investigate their experience. Bookkeepers with experience in your industry will better understand sector-specific regulations, workflows, and financial needs.",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Technical proficiency:\u00A0",
      text: "A skilled bookkeeper should be familiar with accounting software and tools such as Xero, QuickBooks, Sage, FreeAgent, or Excel - depending on what you use.",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Adaptability and analytical skills:\u00A0",
      text: "Knowing how to analyse financial data and spot trends or anomalies is necessary for keeping accurate records and preparing reports.",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Effective time management:\u00A0",
      text: "Finance tasks often run on strict deadlines. A dependable bookkeeper can manage their workload effectively and meet critical deadlines without compromising quality.",
      marginTop: false,
    },
    {
      type: "h2",
      text: "What does bookkeeping service typically include?",
    },
    {
      type: "p",
      text: "The specific tasks a bookkeeper handles can vary depending on your needs and the experience of the professional. At <strong>Localists</strong>, we connect you with quality bookkeepers that typically offer support with:",
    },

    {
      type: "uili",
      text: "Recording and categorising daily income and expenses",
      marginTop:true
    },
    {
      type: "uili",
      text: "Managing accounts payable and accounts receivable",
    },
    { type: "uili", text: "Invoicing and payment tracking" },
    {
      type: "uili",
      text: "Payroll processing and maintaining payroll records for compliance",
    },
    { type: "uili", text: "Bank and credit card reconciliations" },
    { type: "uili", text: "Maintaining the general ledger" },
    { type: "uili", text: "Preparing cash flow statements" },
    {
      type: "uili",
      text: "Producing basic financial reports and statements (such as balance sheets and profit & loss summaries)",
    },
    { type: "uili", text: "Budgeting assistance" },
    { type: "uili", text: "Cleaning up and organising account books" },
    { type: "uili", text: "Managing and maintaining financial records" },
    ,
    {
      type: "li",
      heading: "Recording and categorising daily income and expenses",
      marginTop: true,
    },
    {
      type: "li",
      heading: "Managing accounts payable and accounts receivable",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Invoicing and payment tracking",
      marginTop: false,
    },
    {
      type: "li",
      heading:
        "Payroll processing and maintaining payroll records for compliance",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Bank and credit card reconciliations",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Maintaining the general ledger",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Preparing cash flow statements",
      marginTop: false,
    },
    {
      type: "li",
      heading:
        "Producing basic financial reports and statements (such as balance sheets and profit & loss summaries)",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Budgeting assistance",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Cleaning up and organising account books",
      marginTop: false,
    },
    {
      type: "li",
      heading: "Managing and maintaining financial records",
      marginTop: false,
    },

    {
      type: "h2",
      heading: "How much does a professional bookkeeper cost in the UK?",
    },
    {
      type: "p",
      text: "The cost of hiring a professional bookkeeper in the UK can vary depending on the level of service you need, their experience, and whether they work remotely or in-house. On average, bookkeepers charge between <strong>£15 and £50 per hour</strong>. Those with more experience, specialist skills, or who work in high-demand areas may charge at the higher end of that range.",
    },
    {
      type: "p",
      text: "Many businesses and individuals now choose to outsource their bookkeeping to freelancers or remote bookkeepers. This can often be more affordable than hiring someone in-house, especially for smaller businesses or individuals with simpler needs.",
    },
    {
      type: "p",
      text: "However, several factors can influence the cost, including how complex your finances are, how often you require support, and whether you are employing online bookkeeping services. For instance, sole trader bookkeeping is generally more straightforward and cost-effective, as it typically involves fewer transactions and simpler reporting, compared to larger businesses with payroll, VAT, or inventory to manage. ",
    },
    {
      type: "p",
      text: "In addition, the size and nature of your business, the software you use, and the bookkeeper’s qualifications - such as AAT or ICB certification, can all impact pricing. ",
    },
    {
      type: "p",
      text: "No matter your situation, Localists will help you find trusted bookkeeping professionals to match your needs and budget. Tell us about your requirements and receive free, no-obligation quotes tailored to your business or personal finances.",
    },
  ],
};
const BOOKKEEPING_SERVICE_FAQ = {
  "bookkeepers-near-me": [
    {
      key: "1",
      title: "What is bookkeeping in accounting?",
      description: `<p>The task of recording daily financial transactions is known as bookkeeping in accounting. Bookkeeping helps track income and expenses and other financial aspects of your business. Hence, it helps you maintain accurate books to make informed financial decisions that drive business growth. Find the best bookkeepers from our wide network of local professionals, tailored to suit your business needs.</p>`,
    },
    {
      key: "2",
      title: "What does a bookkeeper do?",
      description: `<p>A bookkeeper is a financial expert responsible for updating business financial account records for entrepreneurs, business owners, startups, and businesses of all sizes. They help fact-check and reconcile business accounts, process payroll, file financial records, and assist with tax returns. Additionally, they have an in-depth understanding of local task laws that apply to your region anywhere in the UK. Find your next bookkeeper today. Get free quotes today!</p>`,
    },
    {
      key: "3",
      title: "Is hiring a bookkeeper worth it?",
      description: `<p>Simple answer - yes, especially for business or personal finances. Whether you want to track income, manage accounts, or handle accurate financial records, you will need expert help.</p>
<p>Professional bookkeepers ensure accurate financial records, help with cash flow monitoring, and keep you compliant with HMRC regulations. This accuracy helps prevent costly errors, avoid tax penalties, and allows you to focus on other core growth activities.</p>
<p>If you are a business owner, hiring a bookkeeper is an investment in your business’s future, especially given the complexity of managing accounts and financial data. Many sole traders make the mistake of trying to do everything themselves, and end up having a mountain of paperwork and minimal time away from the business. A bookkeeper will relieve you of this excess paperwork, and allow you to fully commit to growing your business.</p>`,
    },
    {
      key: "4",
      title: "Do I need a bookkeeper if I have an accountant?",
      description: `<p>Our professional advice is yes, it’s often a smart move to have both! While an accountant focuses on financial strategy, tax planning, and compliance, a bookkeeper manages your day-to-day financial records, ensuring everything is accurate, up to date, and ready for your accountant to review.</p>
<p>Having a bookkeeper means your accountant spends less time untangling records and more time adding value where it matters. It also helps you avoid costly mistakes, stay organised, and make informed decisions throughout the year, not just at tax time.</p>`,
    },
    {
      key: "5",
      title: "What’s the difference between bookkeeping and accounting?",
      description: `<p>Bookkeeping and accounting serve different but complementary roles. Bookkeeping involves recording and organising your daily financial transactions — such as income, expenses, invoices, and bank reconciliations. It ensures your financial records are accurate and up to date.</p>
<p>Accounting, on the other hand, goes a step further. Accountants take the data provided by bookkeepers and use it to analyse financial performance, prepare reports, manage tax obligations, and offer strategic advice for business growth.</p>
<p>At Localists, we believe both roles are essential, especially if you want to stay compliant and make smart financial decisions. Whether you're a business owner or an individual, we’ll help you find trusted local bookkeepers who work seamlessly alongside your accountant.</p>`,
    },
    {
      key: "6",
      title: "Can bookkeeping be outsourced?",
      description: `<p>Yes, many businesses and individuals employ outsourced bookkeeping services via freelance or virtual services. These setups offer convenience, affordability, and the ability to scale support when your business evolves.</p>`,
    },
  ],
};

const BOOKKEEPING_SERVICE_AVERAGE_PRICE = {
  "bookkeepers-near-me": [
    {
      Region: "Nationwide",
      "Great Value": "£16",
      Average: "£20",
      Premium: "£25",
    },
    {
      Region: "London",
      "Great Value": "£15",
      Average: "£20",
      Premium: "£25",
    },
    {
      Region: "North West England",
      "Great Value": "£20",
      Average: "£22",
      Premium: "£25",
    },
    {
      Region: "South East England",
      "Great Value": "£15",
      Average: "£20",
      Premium: "£25",
    },
    {
      Region: "West Midlands",
      "Great Value": "£18",
      Average: "£20",
      Premium: "£25",
    },
    {
      Region: "Yorkshire and the Humber",
      "Great Value": "£20",
      Average: "£21",
      Premium: "£22",
    },
  ],
};

const BOOKKEEPING_SERVICE_REVIEWS_DATA = {
  "bookkeepers-near-me": [
    {
      id: 1,
      name: "Michael Gamblin",
      location: "Birmingham",
      date: "",
      description:
        "I needed help finding someone to manage my day-to-day bookkeeping, and I was genuinely impressed. Within an hour, I received three competitive quotes and decided to work with Hakeem, who now handles my invoicing, reconciliation, and monthly reports with zero hassle.",
    },
    {
      id: 2,
      name: "Richard Hague",
      location: "Loughborough",
      date: "",
      description:
        "Hiring a bookkeeper does make a difference! I was spending way too much time on my accounts and needed help fast. Localists connected me with a bookkeeper who took over seamlessly and even set up better systems for my finances. It’s saved me hours every week.",
    },
    {
      id: 3,
      name: "Anita N",
      location: "Liverpool",
      date: "",
      description:
        "I’ve been working with Priya, a professional freelance bookkeeper, for over 4 months now, and all I can say is amazing! She’s organised, efficient, and genuinely cares about keeping my finances in order. Her attention to detail and clear communication have made a huge difference in how I manage my business accounts.",
    },
  ],
};

const BOOKKEEPING_SERVICE_REGION_DATA = {
  "bookkeepers-near-me": [
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

export {
  BOOKKEEPING_SERVICE_META,
  BOOKKEEPING_SERVICE_BREADCRUMB_CONFIG,
  BOOKKEEPING_SERVICE_CONFIG_TOP,
  BOOKKEEPING_SERVICE_CONTENT_CONFIG,
  BOOKKEEPING_SERVICE_HOW_IT_WORK,
  BOOKKEEPING_SERVICE_FIND_SERVICE_CONTENT,
  BOOKKEEPING_SERVICE_FAQ,
  BOOKKEEPING_SERVICE_AVERAGE_PRICE,
  BOOKKEEPING_SERVICE_REVIEWS_DATA,
  BOOKKEEPING_SERVICE_REGION_DATA,
};
