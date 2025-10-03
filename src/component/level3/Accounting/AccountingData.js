import { path } from "framer-motion/client";
import {
  accountant,
  FreeQuotesIcon,
  WhatYouNeedIcon,
} from "../../Level1/images";

const ACCOUNTING_CONFIG_TOP = {
  "accountants-near-me": {
    findingHeading: "accountants ",
    title: "Accountants",
    // mainTitle: "",
    ctaText: "Local Accountants",
    // avgPrice: "£200",
    showSpeicialits: true,
    avgPriceTitle: "an accountant",
    // faqTitle: "Accountants",
  },
};
const ACCOUNTING_BREADCRUMB_CONFIG = {
  "accountants-near-me": [
    { title: "Business", path: "/business" },
    { title: " Bookkeeping Services" },
  ],
};

const ACCOUNTING_CONTENT_CONFIG = {
  "accountants-near-me": {
    para1:
      "Receipts piling up? Tax forms giving you nightmares? We’ll connect you with local accountants who can crunch the numbers, balance the books, and maybe even save you enough for that extra coffee (or holiday). Just fill in a few simple details below, and we’ll do the rest",
    para2:
      "Localists can deliver you up to 5 instant quotes from accountants near you or nationwide. Just give us a few details, and we’ll do the rest. And what’s more, its absolutely free, with zero obligation. So whether you need help submitting your end of year accounts, or you just want help with your paperwork, get free no obligation quotes today!",
    para3: "Start your search now and obtain free, no obligation quotes.",
  },
};
const ACCOUNTING_HOW_IT_WORK = {
  "accountants-near-me": [
    {
      id: 1,
      lBreak: false,
      title: "Start search for local accountants",
      image: WhatYouNeedIcon,
      heading1: "Start search for local accountants",
      description:
        "We will help you find the best accountants in your area for your needs. Whether you are looking to hire a personal accountant, or a professional for small or large businesses, Localists is here to help. From expert bookkeeping support to finding a trusted tax accountant, we make it simple. A few quick details are all we need to recommend the best quality local accountants near you.",
    },
    {
      id: 2,
      lBreak: false,
      title: "Request free quotes from  accountants",
      image: FreeQuotesIcon,
      heading1: "Request free quotes from  accountants",
      description:
        "We will match your request with qualified local accountants near you and send you personalised quotes for free. Take your time to review profiles, compare quotes, and ask questions if you need to. There’s no obligation to make a hire until you are sure.",
    },
    {
      id: 3,
      lBreak: true,
      title: "Hire your accountant",
      image: accountant,
      heading1: "Hire your accountant",
      description:
        "When you’ve found the right professional accountant for the job, all that is left to do is hire them directly. Whether it’s one-off advice or ongoing support, managing payroll or long-term financial planning, your local accountant will be ready to support you from day one.",
    },
  ],
};

const ACCOUNTING_FIND_SERVICE_CONTENT = {
  "accountants-near-me": [
    {
      type: "h2",
      text: "How to find an accountant?",
    },

    {
      type: "p",
      text: `Getting professional financial help can be a game-changer for your personal or business needs. When choosing a financial expert, it is best to hire a certified accountant or chartered accountant. Choosing a qualified accounting expert, regulated by a professional body, can save you from costly mistakes.`,
    },
    {
      type: "p",
      text: `At Localists, we help you find quality local accounting professionals, from certified general accountants to forensic, fund, and management accountants. No matter your need, we’ll find the right professional near you. But before you make that hire, ensure you check for the following:`,
    },

    {
      type: "h3",
      text: "1. Check qualifications:",
    },
    {
      type: "p",
      text: `Look out for accounting professionals with recognised certifications such as:`,
    },
    {
      type: "uili",
      text: "Chartered Accountant (ACA, ACCA, or CIMA).",
      marginTop: true,
    },
    {
      type: "uili",
      text: "Certified Public Accountant (CPA).",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Association of Accounting Technicians (AAT).",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Member of the Association of International Accountants (AIA).",
      marginTop: false,
    },
    {
      type: "h3",
      text: "2. Check for local experience.",
    },
    {
      type: "p",
      text: `When searching for accountants online, it’s important to narrow your search to local accounting service providers who understand UK tax laws and business regulations.`,
    },
    {
      type: "h3",
      text: "3. Check reviews and ratings.",
    },
    {
      type: "p",
      text: `Feedback from other clients helps you understand how highly skilled your choice of local accounting professional is and the quality of their work. At Localist, we match you with only qualified, vetted accountants near you.`,
    },
    {
      type: "h2",
      text: "What is a chartered accountant?",
    },
    {
      type: "p",
      text: `A Chartered Accountant is a qualified accounting professional who provides audit services and financial advice to business owners, individuals, and organisations. They are strategic partners often regulated and accredited by professional bodies such as ACCA, or ICAS.`,
    },
    {
      type: "p",
      text: `Whether you’re a business owner looking to improve your financial strategy or an individual needing help with taxes or personal finances, hiring a local or associate chartered accountant in the UK can give you a significant edge.`,
    },
    {
      type: "p",
      text: `These professionals bring in-depth knowledge of UK tax laws, compliance regulations, and financial planning, offering guidance on everything from budgeting and forecasting to forensic accounting. At Localists, we make it easy to find the right financial expert for your unique needs.`,
    },
    {
      type: "h2",
      text: "What is the role of an accountant?",
    },
    {
      type: "p",
      text: `Before you set out to find an accountant, it helps to understand what they really do - and why it matters. These professionals don’t just handle taxes; they play a vital role in helping both individuals and businesses stay financially healthy and compliant. Accountants manage, analyse, and report financial information to enable smarter decisions.`,
    },
    {
      type: "p",
      text: `However, depending on your needs, their role can become much more specific. For example, if you are expanding your business operations abroad, you may need an accountant with experience in navigating cross-border financial complexities. If you are managing investment portfolios or business funds, a fund accountant ensures that all records are accurate and compliant with financial regulations.`,
    },
    {
      type: "p",
      text: `On the other hand, if you're dealing with financial irregularities or concerns around fraud and legal disputes, a forensic accountant is what you need. Whether you’re planning your personal finances, running a startup, or growing a limited company, Localists helps you find exactly what you need. Our professional accountants are skilled at supporting you with a wide range of services, including:`,
    },
    {
      type: "uili",
      text: "Personal and Business Tax Returns.",
      marginTop: true,
    },
    {
      type: "uili",
      text: "Bookkeeping and Payroll Services.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Tax Return Assistance.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Financial Forecasting and Budgeting.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "VAT Registration and Filing.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "HMRC Submissions and Correspondence.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Business Start-up Advice.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Limited Company Formation and Support.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Annual Accounts and Reporting.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Management Accounts.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Auditing Services.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Online Accounting Tools & Support.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Fund Accounting.",
      marginTop: false,
    },
    {
      type: "uili",
      text: "Forensic Accounting for Investigations.",
      marginTop: false,
    },
    {
      type: "h2",
      text: "How to check if an accountant is qualified in the UK?",
    },
    {
      type: "p",
      text: `To check if an accountant is qualified in the UK, the first thing to look for is a professional certification. Reputable accountants are usually accredited by recognised bodies such as the ACCA (Association of Chartered Certified Accountants), ICAEW (Institute of Chartered Accountants in England and Wales), Association of Accounting Technicians (AAT), or CIMA (Chartered Institute of Management Accountants).`,
    },
    {
      type: "p",
      text: `You can verify an accountant’s credentials by visiting the official websites of these organisations and using their online member directories. If in doubt, ask the accountant for their membership or registration number to confirm their status.`,
    },
    {
      type: "p",
      text: `However, if you'd rather skip the hassle of vetting professionals yourself, <strong>Localists</strong> makes it easy. We’ve already done the background checks and will connect you with trusted, qualified accountants and accounting firms near you. Get started today and receive <strong>free, no-obligation quotes</strong> from verified professionals in your local area.`,
    },
    {
      type: "h2",
      text: "How much does an accountant cost?",
    },
    {
      type: "p",
      text: `In the UK, hiring an accounting professional typically ranges between £25 to £150 per hour. This usually depends on their experience and the services you need, whether you're hiring for personal or business use. For individuals, basic tax return services may cost between £100 and £300, while companies may pay up to £500+ per month for ongoing support.`,
    },
  ],
};
const ACCOUNTING_FAQ = {
  "accountants-near-me": [
    {
      key: "1",
      title:
        "What is the difference between an accountant and a chartered accountant?",
      description: `<p>The main difference between a general accountant and a chartered accountant lies in their level of qualification, accreditation, and the scope of services they provide. While a general accountant can be highly skilled in tasks like bookkeeping, payroll, and managing financial records, they may not always hold a formal certification. For general accountants, their expertise is often suitable for day-to-day financial management in smaller businesses or sole trader operations.</p>
      <p>On the other hand, a chartered accountant is a finance professional who has undergone extensive training and is formally accredited by internationally recognised professional bodies such as ACCA or ICAS. Typically, chartered accountants are called upon when it has to do with complex financial tasks, including audit, tax planning, compliance, strategic advice, and forensic accounting.</p>
      <p>However, it ultimately comes down to your specific need. Simply start your search today, let us know requirements, and we will match you with the right financial accountant near you.</p>`,
    },
    {
      key: "2",
      title: "How to change your accountant",
      description: `<p>If you're no longer satisfied with your current service provider or simply looking for a better fit, making the switch doesn't have to be complicated. At Localists, we make the transition easy by connecting you with qualified accounting professionals near you. Whether you prefer an online accountant or someone local, you will find one here.</p>
      <p>The first step, however, is to inform your current accounting professional of your decision to move on. Next, gather all the information you need, from financial records to reports and account details. This way, the transition is smooth, and your new accountant can access all previous financial records.</p>`,
    },
    {
      key: "3",
      title: "How to choose an accountant in the UK?",
      description: `<p>To find a qualified accountant in the UK, start by researching and comparing local accountancy firms or accounting professionals near you. Look for candidates with strong client reviews and ask for recommendations when possible. Also ensure they are registered under the right professional body.</p>
      <p>Localists will connect you with the best quality professionals, whether you're looking for support with your personal finances or a qualified accountant for your small business, we’ve got you covered.</p>`,
    },
    {
      key: "4",
      title: "How much do accountants charge for self-assessment in the UK?",
      description: `<p>Depending on the complexity of your self-assessment tax return, charges may vary. However, the average cost of hiring an accountant in the UK typically ranges anywhere from £150 to over £300. Other factors such as, level of experience and hourly rates, can also determine what cost you will incur for these professional services.</p>
      <p>Start your search now and obtain free quotes from quality accounting professionals anywhere you are in the UK.</p>`,
    },
  ],
};

const ACCOUNTING_AVERAGE_PRICE = {
  "accountants-near-me": [
    {
      Region: "Nationwide",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£400",
    },
    {
      Region: "East Midlands",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£350",
    },
    {
      Region: "East of England",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£375",
    },
    {
      Region: "London",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£450",
    },
    {
      Region: "North East England",
      "Great Value": "£125",
      Average: "£190",
      Premium: "£250",
    },
    {
      Region: "North West England",
      "Great Value": "£125",
      Average: "£200",
      Premium: "£450",
    },
    {
      Region: "Scotland",
      "Great Value": "£125",
      Average: "£180",
      Premium: "£350",
    },
    {
      Region: "South East England",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£450",
    },
    {
      Region: "South West England",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£450",
    },
    {
      Region: "West Midlands",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£300",
    },
    {
      Region: "Yorkshire and the Humber",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£450",
    },
  ],
};

const ACCOUNTING_REVIEWS_DATA = {
  "accountants-near-me": [
    {
      id: 1,
      name: "-Daniel Kennedy",
      location: "London",
      date: "",
      description:
        "As a small business owner, I had no idea where to start when it came to finding someone trustworthy for my payroll and VAT returns. I worked with Abel through their platform, and I’ve never felt more confident in my finances.",
    },
    {
      id: 2,
      name: "Fatima H.",
      location: "Chester",
      date: "",
      description:
        "I was looking for someone to help me with my personal tax return and was honestly dreading the process. Localists gave me options quickly, and I ended up hiring someone who was professional, clear, and very thorough. Highly recommend if you’re not sure where to start.",
    },
    {
      id: 3,
      name: "Laura M",
      location: "Liverpool",
      date: "",
      description:
        "Definitely the best platform for finding trusted accountants near you. I needed help with bookkeeping and quarterly VAT returns, and I was matched with Tracy, an experienced accountant in my area who understood my industry and took time to explain everything to me. The service was quick, and the quality of professionals was impressive.",
    },
  ],
};

const ACCOUNTING_REGION_DATA = {
  "accountants-near-me": [
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
  ACCOUNTING_BREADCRUMB_CONFIG,
  ACCOUNTING_CONFIG_TOP,
  ACCOUNTING_CONTENT_CONFIG,
  ACCOUNTING_HOW_IT_WORK,
  ACCOUNTING_FIND_SERVICE_CONTENT,
  ACCOUNTING_FAQ,
  ACCOUNTING_AVERAGE_PRICE,
  ACCOUNTING_REVIEWS_DATA,
  ACCOUNTING_REGION_DATA,
};
