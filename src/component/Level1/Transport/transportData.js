import { AirportTransfers, BusinessProfessionalsIcon, FreeQuotesIcon, WhatYouNeedIcon } from "./images/images"

const TransportHowItWork= [
    {
      id: 1,
      title: "the Best Match",
      image: WhatYouNeedIcon, // Same icon as business
      heading1: "Find the ",
      heading2: "best match",
      description:
        "We’ll help you find quality transportation services in your local area. Just share your requirements, and Localists will match you with trusted drivers and companies.",
    },
    {
      id: 2,
      title: "Free Quotes",
      image: FreeQuotesIcon, // Same icon as business
      heading1: "Request ",
      heading2: "free quotes",
      description:
        "Get free quotes from local transport professionals. Compare profiles, check reviews, and see what makes each provider stand out before making your choice.",
    },
    {
      id: 3,
      title: "Book your ",
      image: BusinessProfessionalsIcon, // Same icon as business
      heading1: "Book your ",
      heading2: "transport service ",
      description:
        "Once you’ve found the right transport provider, contact them directly to discuss your journey, confirm the details, and book with confidence.",
    },
  ]
  const TransportPopularCategory = [
  {
    id: 1,
    // availableOnline: true,
    title: "Airport Transfers",
    image: AirportTransfers,
    path:'airport-transfers-near-me'
  },
  //  {
  //   id: 2,
  //   // availableOnline: true,
  //   title: "Holiday transfers",
  //   // image: AccountingImage,
  // },
  //  {
  //   id: 3,
  //   // availableOnline: true,
  //   title: "Group minibus ",
  //   // image: AccountingImage,
  // },
  //  {
  //   id: 4,
  //   // availableOnline: true,
  //   title: "Shared shuttle",
  //   // image: AccountingImage,
  // },
  //  {
  //   id: 5,
  //   // availableOnline: true,
  //   title: "Special transfers",
  //   // image: AccountingImage,
  // },
]
  export {
    TransportHowItWork,
    TransportPopularCategory
  }