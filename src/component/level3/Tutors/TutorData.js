import {
  accountant,
  FreeQuotesIcon,
  WhatYouNeedIcon,
} from "../../Level1/images";
import { PhysicsMathsSlider } from "../imagesServices";

const TUTOR_META = {
  Tutor: {
    title: "Find Tutors Near Me From £25ph | Localists",
    name: "description",
    content:
      "Find top-rated tutors near you. Vetted, qualified, and background-checked. GCSE, A-Level & all levels. Get free quotes straight to your inbox",
  },
};

const TUTOR_CONFIG_TOP = {
  Tutor: {
    findingHeading: "tutors",
    title: "Tutors",
    // mainTitle: "",
    ctaText: "Tutors",
    // avgPrice: "£200",
    // showSpeicialits: true,
    faqTitle: "on tree surgeons near me",

    avgPriceTitle: "private tutor",
  },
};
const TUTOR_BREADCRUMB_CONFIG = {
  Tutor: [
    { title: "Lessons & Training", path: "/lesson-and-training" },
    { title: "Tutors" },
  ],
};

const TUTOR_CONTENT_CONFIG = {
  Tutor: {
    para1:
      "Looking for extra learning support? Find a tutor who can turn late-night stress into lightbulb moments (and maybe even a few high-fives). Whether it’s algebra giving you attitude, French verbs doing backflips, or essays that just won’t behave—we’ll help you find a local tutor who makes learning click (and maybe even fun). We’ll send you free quotes from vetted tutors straight into your inbox.",
    para2: "Your perfect tutor is just a few clicks away",
  },
};

const TUTOR_HOW_IT_WORK = {
  Tutor: [
    {
      id: 1,
      lBreak: true,
      title: "Start your search for tutors",
      image: WhatYouNeedIcon,
      heading1: "Start your search for tutors",
      description:
        "Tell us the subject, level of study, and where you require the service. Whether you want weekly sessions, short-term exam prep, or a long-term learning plan, we’ll match you with tutors who fit your needs.",
    },
    {
      id: 2,
      lBreak: false,
      title: "Get free quotes from local tutors",
      image: FreeQuotesIcon,
      heading1: "Get free quotes from local tutors",
      description:
        "Once your request is submitted, you’ll receive free, no-obligation quotes from tutors in your local area near you. Compare their profiles, read reviews, and see their experience before deciding.",
    },
    {
      id: 3,
      lBreak: true,
      title: "Hire your tutor",
      image: accountant,
      heading1: "Hire your tutor",
      description:
        "Pick the tutor that feels right for you, share your goals, and communicate with them directly to get started immediately. You’ll have the support and guidance you need to achieve your learning goals.",
    },
  ],
};

const TUTOR_FIND_SERVICE_CONTENT = {
  Tutor: [
    {
      type: "h2",
      text: "Get the results you need, with a tutor through Localists",
    },

    {
      type: "p",
      text: "Every learner is different, and the right tutor can make a real difference. Whether it’s building confidence at school, preparing for important uni exams, or studying for professional certifications, the right guidance helps.",
    },
    {
      type: "p",
      text: "With Localists, you can connect with fully vetted, qualified tutors who come highly reviewed, giving you peace of mind. From a physics and maths tutor to support in English, science, languages, or specialist subjects, we’ll match you with a tutor nearby who’s ready to help you reach your goals.",
    },
    { type: "h2", text: "How to choose the right tutor" },
    {
      type: "p",
      text: "It’s easy to assume that the most expensive tutor must be the best, or that the cheapest option will save you money. But the truth is, there’s no one-size-fits-all guide. The right tutor is really the one who fits your needs and helps you or your child make “real progress”.",
    },
    {
      type: "p",
      text: "A great tutor isn’t simply knowledgeable; they know how to break things down in a way that clicks. They strive to build confidence lesson by lesson, and keep learning engaging rather than overwhelming. The right tutor should feel like a partner in your learning journey, not just someone who bombards you with a load of information.",
    },
    {
      type: "p",
      text: "Qualifications matter too. While not every private tutor has to be a qualified teacher, it helps if they have a strong academic background, subject expertise, or plenty of tutoring experience. For parents, it’s also worth checking whether the tutor has a DBS certificate for peace of mind.",
    },
    {
      type: "p",
      text: "What really makes the difference, though, is how well the tutor matches your goals and personality. For example, if your child struggles with GCSE maths and feels anxious about exams, the best tutor will be someone calm, encouraging, and experienced with exam board techniques. Taking the time to compare profiles, reviews, and qualifications will help you feel confident you’ve made the right choice.",
    },
    {
      type: "pbold",
      text: "Practical ways to assess a tutor:",
      marginTop: true,
    },
    {
      type: "uili",
      heading: "Approach to teaching:\u00A0",
      text: "Do they ask questions about your goals and learning style before starting?",
      marginTop: true,
    },
    {
      type: "uili",
      heading: "Clarity of explanation:\u00A0",
      text: "Can they break complex topics into steps you can follow?",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Patience and encouragement:\u00A0",
      text: "Reviews often reveal whether the tutor is supportive and adaptable.",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Experience with similar learners:\u00A0",
      text: "Have they helped students at the same level or with similar challenges?",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Engagement and motivation:\u00A0",
      text: "Do past students mention that lessons are interesting and confidence-building?",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Communication style:\u00A0",
      text: "Can you easily reach them and feel comfortable discussing progress or concerns?",
      marginTop: false,
    },
    {
      type: "uili",
      heading: "Safety checks (DBS):\u00A0",
      text: "For tutors working with children, ensure they hold a valid DBS certificate for peace of mind.",
      marginTop: false,
    },
    {
      type: "h2",
      text: "Is private tutoring worth it?",
    },
    {
      type: "p",
      text: "Yes, private tutoring is often worth it because it offers something that classroom teaching can’t - personalised attention. Think about it this way - in a classroom, lessons move at a set pace, and teachers have to divide their focus among many students. This may often leave gaps in understanding, as different learners learn differently.",
    },
    {
      type: "p",
      text: "However, with a private tutor, the sessions are built entirely around your needs, whether that means slowing down to master tricky topics, preparing for exams with a tailored plan, or pushing ahead in areas where you excel. This one-to-one support helps you build confidence, stay consistent, and make faster progress than relying on general classroom instruction alone.",
            marginTop:true

    },
    {
      type: "h2",
      text: "How much does a private tutor cost?",
    },
    {
      type: "p",
      text: "The cost of a private tutor can vary depending on the subject, level, and location, but in the UK you can usually expect to pay <strong>£20–£40 per hour</strong>. Tutors with specialist expertise or many years of experience may charge more, especially for exam preparation or advanced subjects.",
    },
    {
      type: "p",
      text: "With Localists, you don’t have to guess. Once you tell us what you need, we’ll send you quotes from vetted tutors near you, so you can compare options and choose what best fits your budget and learning needs.",
    },
  ],
};
const TUTOR_FAQ = {
  Tutor: [
    {
      key: "1",
      title: "Do tutors need to be Ofsted registered?",
      description: `<p>No, private tutors do not need to be Ofsted registered. Ofsted inspects schools and registered childcare providers, not individual tutors. However, if a tutor works within a school or college setting, that institution will be covered by Ofsted. For private tutoring, what matters more is their qualifications, experience, and background checks.</p>`,
    },
    {
      key: "2",
      title: "Do private tutors need a DBS?",
      description: `<p>While it’s not a legal requirement for all tutors, most parents and students prefer to hire tutors with a DBS check (Disclosure and Barring Service), especially if they are working with children. A DBS check provides reassurance that the tutor has no history that would make them unsuitable to work with young people. At Localists, we connect you with only qualified and vetted tutors, many of whom already hold DBS certification.</p>`,
    },
    {
      key: "3",
      title: "Do tutors need qualifications?",
      description: `<p>Strictly speaking, you don’t need formal teaching qualifications to work as a private tutor in the UK. However, most professional tutors do hold teaching credentials, university degrees, or subject-specific qualifications.</p>
      <p> Many also have tutoring experience and can provide references or reviews. For parents and students, choosing a tutor with relevant qualifications is a good way to ensure safe, effective, and reliable teaching.</p>
      `,
    },
    {
      key: "4",
      title: "How much is a GCSE tutor per hour?",
      description: `<p>A GCSE tutor in the UK typically charges <strong>£25 - £40 per hour</strong>. Prices can vary depending on the subject, for example, physics and maths tutors are often in higher demand and may cost slightly more. Tutors with lots of experience or proven exam results may also charge above average.</p>`,
    },
    {
      key: "5",
      title: "Is online tutoring better than in-person?",
      description: `<p>Whether online tutoring is better than in-person really depends on your needs and learning style. Neither is “better” overall. The best choice is the one that helps you feel comfortable, supported, and motivated to learn. Many tutors now offer both, so you can even mix and match.</p>
      <ul>
        <li><strong>Online tutoring</strong> offers flexibility, convenience, and sometimes lower costs. It also makes it easy to record lessons, share resources, and fit sessions around a busy schedule.</li>
        <li><strong>In-person tutoring</strong> can feel more personal, with the benefit of face-to-face interaction and fewer distractions. Some students find it easier to stay engaged this way.</li>
      </ul>
      <p>With Localists, you can find private tutors near you, in your local area, who offer both online service and in-person service. Simply start your search and we will send free no obligation quotes to your inbox in a matter of minutes.</p>`,
    },
  ],
};

const TUTOR_AVERAGE_PRICE = {
  Tutor: [
    {
      Region: "Nationwide",
      "Great Value": "£25.00",
      Average: "£29.00",
      Premium: "£34.00",
    },
    {
      Region: "East Midlands",
      "Great Value": "£25.00",
      Average: "£29.00",
      Premium: "£34.00",
    },
    {
      Region: "East of England",
      "Great Value": "£25.00",
      Average: "£28.25",
      Premium: "£34.00",
    },
    {
      Region: "London",
      "Great Value": "£25.00",
      Average: "£28.50",
      Premium: "£34.00",
    },
    {
      Region: "North East England",
      "Great Value": "£25.00",
      Average: "£29.25",
      Premium: "£34.00",
    },
    {
      Region: "North West England",
      "Great Value": "£25.00",
      Average: "£28.00",
      Premium: "£34.00",
    },
    {
      Region: "Scotland",
      "Great Value": "£20.00",
      Average: "£25.00",
      Premium: "£35.00",
    },
    {
      Region: "South East England",
      "Great Value": "£25.00",
      Average: "£29.00",
      Premium: "£33.00",
    },
    {
      Region: "South West England",
      "Great Value": "£25.00",
      Average: "£29.50",
      Premium: "£34.00",
    },
    {
      Region: "West Midlands",
      "Great Value": "£25.00",
      Average: "£28.50",
      Premium: "£34.00",
    },
    {
      Region: "Yorkshire and the Humber",
      "Great Value": "£25.00",
      Average: "£29.00",
      Premium: "£34.00",
    },
  ],
};

const TUTOR_REVIEWS_DATA = {
  Tutor: [
    {
      id: 1,
      name: "Sarah Martins,",
      title: "Leeds",
      date: "12 Feb 2025",
      //   image: ReviewsImage,
      description:
        "We found a brilliant maths tutor for my son through Localists. She was patient, encouraging, and his grades have improved massively.",
    },
    {
      id: 2,
      name: "Jason D,",
      title: "Manchester",
      date: "18 Feb 2025",
      //   image: ReviewsImage,
      description:
        "I needed help with A-level chemistry, and Localists connected me with a fantastic tutor who explained everything clearly and boosted my confidence before exams.",
    },
    {
      id: 3,
      name: "Priya K.,",
      title: "Birmingham",
      date: "05 Mar 2025",
      //   image: ReviewsImage,
      description:
        "The whole process was easy. I shared what I needed and had quotes from tutors within minutes. Highly recommend!",
    },
  ],
};

const TUTOR_REGION_DATA = {
  Tutor: [
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
const TUTOR_OTHER_SERVICES_DATA = {
  Tutor: [
    {
      id: 1,
      image: PhysicsMathsSlider,
      description: "Physics and Maths",
      // availableOnline: true,
      path: "physics-maths-tutors-near-me",
    },
  ]
}

export {
  TUTOR_META,
  TUTOR_BREADCRUMB_CONFIG,
  TUTOR_CONFIG_TOP,
  TUTOR_CONTENT_CONFIG,
  TUTOR_HOW_IT_WORK,
  TUTOR_FIND_SERVICE_CONTENT,
  TUTOR_FAQ,
  TUTOR_AVERAGE_PRICE,
  TUTOR_REVIEWS_DATA,
  TUTOR_REGION_DATA,
  TUTOR_OTHER_SERVICES_DATA
};
