import TreeImg from "../../../assets/Images/TreeImg.jpg";
import blog_graph from "../../../assets/Images/blog_graph.jpg";
import SingleTree from "../../../assets/Images/SingleTree.png";
import VeteranTreeImg from "../../../assets/Images/VeteranTreeImg.png";
import PostCode from "../PostCodeContainer/PostCode";
import ECO4 from "../../../assets/Images/ECO4.jpg";
import HeatPump from "../../../assets/Images/Heat-Pump.jpg";

export const TreePreservationData = {
  title:
    "ECO4 Axe Will Trigger a Wave of Business Collapse and Job Carnage, Expert Warns",
  service: "Heat Pump",
  imgSrc: ECO4,
  description1: `98% of customers asking for insulation hope to use the Eco 4 Scheme (Localists data)`,
  description2: `Insulation installers represent 39% of the energy efficiency businesses and will suffer most.`,
  citbLink:
    "https://www.citb.co.uk/media/3b1fggu3/trustmark-research-summary-final-version-v2.pdf",

  description3: `Expert predicts 38% of energy efficiency businesses will cease to exist by 2027`,
  description4: `Eco4 axe will put the poorest in society under fuel poverty.`,
  detailTitle: "Chester:",
  detailDescription1: "Green Energy Expert at ",
  detailDescription2: "Localists",
  detailDescription3:
    ", Josh Wilson has warned that it’s only a matter of time before a wave of business collapses and job losses occur following the government’s scrapping of the popular ECO4 scheme in the recent budget. ",
  detailDescription4:
    "The popular scheme, which was intended to run up until 2026, will not be renewed with no replacement scheme in its place either, which Josh Wilson says will trigger a wave of business collapses and job losses.",
  detailDescription5:
    "“I don’t think people recognise the wave of business collapses and job losses that will occur as a result of scrapping ECO4,” he commented. Josh points out that despite the Boiler Upgrade Scheme (BUS) remaining intact, the demand for heat pumps would still plummet due to the amount of money it costs.",
  HeatPump: HeatPump,

  sections: [
    {
      content1: `Despite BUS offering a £7,500 grant for heat pumps, they can still cost up to £20,000 for an air-to-water heat pump to be installed, meaning you’ll still have to fork out over £10,000 – which is unaffordable for most people.`,
      content2:
        "The scheme came under great scrutiny after the government revealed that more than 30,000 homes in the UK had botched insulation fitted under the scheme, putting thousands of people at risk of damp and mould.",
      content3:
        "Government data revealed that over 50% of projects through ECO4 were insulation projects. And Josh believes that this is going to have a massive effect on small businesses.",
      postcode: PostCode,
    },

    {
      content1: `Based on our own calculations, we believe that 38% of businesses in the energy efficiency sector will cease to exist by 2027 due to the scrapping of this scheme. It’ll be SMEs that are hit the hardest, with 65% of the industry having less than 10 employees according to the `,
      CITB: "https://www.citb.co.uk/media/3b1fggu3/trustmark-research-summary-final-version-v2.pdf",
      content2:
        "Josh also highlighted that with the raise in minimum wage, SMEs are going to struggle with an increase in costs and demand for their services plummeting.  “With the increase in minimum wage too, SMEs are just going to get squeezed out of the market.” Josh also expects that many will be placed into fuel poverty because of the lack of funding.",
      content3:
        "The government’s own data reveals that the most deprived areas of the UK are in the North West, Yorkshire and the West Midlands – and these are precisely the regions that have seen the largest uptake of ECO4 within the first quarter of 2025. Ordinary families cannot afford a complete retrofit or £10,000 for a heat pump, so they will be placed in fuel poverty.",
      govData:
        "https://www.gov.uk/government/statistics/english-indices-of-deprivation-2025/english-indices-of-deprivation-2025-statistical-release#:~:text=2.-,Main%20findings,England%20according%20to%20the%20IMD25%20.",

      extraImage: blog_graph,
      extraContent1: `Michael Marshall, Sales Director of the lead generation business Localists.com stated that he sensed a growing anxiousness in the industry with a surge in demand for insulation and renewable energy leads`,
      extraContent2:
        "He said: “There has been a growing tension in the industry on the run up to the budget, and the demand for insulation and renewable energy leads has skyrocketed because of this. But this will undoubtedly fall off a cliff in 2026 when the ECO4 scheme ends. Our own data shows that 98% of those requesting insulation are requiring funding under ECO4.”",
    },
  ],
};

export const FIND_SERVICE_CONTENT_BLOG = {
  blog1: [
    {
      type: "li",
      heading:
        "98% of customers asking for insulation hope to use the Eco 4 Scheme (Localists data)",
    },

    {
      type: "li",
      heading: `Insulation installers represent <a style="color:#00afe3"; href="https://www.citb.co.uk/media/3b1fggu3/trustmark-research-summary-final-version-v2.pdf." target="_blank" rel="noopener noreferrer">39%</a> of the energy efficiency businesses and will suffer most.`,
    },

    {
      type: "li",
      heading:
        "Expert predicts 38% of energy efficiency businesses will cease to exist by 2027",
    },
    {
      type: "li",
      heading: "Eco4 axe will put the poorest in society under fuel poverty.",
    },

    {
      type: "p",
      // heading:"Chester:\u00A0",
      text: `<strong>Chester:</strong> Green Energy Expert at <a style="color:#00afe3"; href="https://www.localists.com/en/gb/" target="_blank" rel="noopener noreferrer">Localists</a>, Josh Wilson has warned that it’s only a matter of time before a wave of business collapses and job losses occur following the government’s scrapping of the popular ECO4 scheme in the recent budget.`,
      marginTop: true,
    },
    {
      type: "p",
      text: "The popular scheme, which was intended to run up until 2026, will not be renewed with no replacement scheme in its place either, which Josh Wilson says will trigger a wave of business collapses and job losses.",
    },
    {
      type: "p",
      text: "“I don’t think people recognise the wave of business collapses and job losses that will occur as a result of scrapping ECO4,” he commented. Josh points out that despite the Boiler Upgrade Scheme (BUS) remaining intact, the demand for heat pumps would still plummet due to the amount of money it costs.",
    },
    {
      type: "image",
      source: HeatPump,
    },

    {
      type: "p",
      text: `Despite BUS offering a £7,500 grant for heat pumps, they can still cost up to £20,000 for an air-to-water heat pump to be installed, meaning you’ll still have to fork out over £10,000 – which is unaffordable for most people.`,
      marginTop: true,
    },
    {
      type: "p",
      text: "The scheme came under great scrutiny after the government revealed that more than 30,000 homes in the UK had botched insulation fitted under the scheme, putting thousands of people at risk of damp and mould.",
      marginTop: true,
    },
    {
      type: "p",
      text: "Government data revealed that over 50% of projects through ECO4 were insulation projects. And Josh believes that this is going to have a massive effect on small businesses.",
      marginTop: true,
    },
    {
      type: "p",
      text: `Based on our own calculations, we believe that 38% of businesses in the energy efficiency sector will cease to exist by 2027 due to the scrapping of this scheme. It’ll be SMEs that are hit the hardest, with 65% of the industry having less than 10 employees according to the <a style="color:#00afe3"; href="https://www.citb.co.uk/media/3b1fggu3/trustmark-research-summary-final-version-v2.pdf." target="_blank" rel="noopener noreferrer">CITB</a>.`,
      marginTop: true,
    },
    {
      type: "p",
      text: "Josh also highlighted that with the raise in minimum wage, SMEs are going to struggle with an increase in costs and demand for their services plummeting.  “With the increase in minimum wage too, SMEs are just going to get squeezed out of the market.” Josh also expects that many will be placed into fuel poverty because of the lack of funding.",
      marginTop: true,
    },
    {
      type: "p",
      text: `The government’s <a style="color:#00afe3"; href="https://www.gov.uk/government/statistics/english-indices-of-deprivation-2025/english-indices-of-deprivation-2025-statistical-release#:~:text=2.-,Main%20findings,England%20according%20to%20the%20IMD25%20." target="_blank" rel="noopener noreferrer">own data</a> reveals that the most deprived areas of the UK are in the North West, Yorkshire and the West Midlands – and these are precisely the regions that have seen the largest uptake of ECO4 within the first quarter of 2025. Ordinary families cannot afford a complete retrofit or £10,000 for a heat pump, so they will be placed in fuel poverty.`,
      marginTop: true,
    },
    {
      type: "image",
      source: blog_graph,
    },
    {
      type: "p",
      text: "Michael Marshall, Sales Director of the lead generation business Localists.com stated that he sensed a growing anxiousness in the industry with a surge in demand for insulation and renewable energy leads",
      marginTop: true,
    },
    {
      type: "p",
      text: "He said: “There has been a growing tension in the industry on the run up to the budget, and the demand for insulation and renewable energy leads has skyrocketed because of this. But this will undoubtedly fall off a cliff in 2026 when the ECO4 scheme ends. Our own data shows that 98% of those requesting insulation are requiring funding under ECO4.”",
      marginTop: true,
    },
    // {
    //   type:"p",
    //   text:""
    // },
    // {
    //   type:"p",
    //   text:""
    // },
  ],
};
