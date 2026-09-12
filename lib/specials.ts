export interface FeaturedSpecial {
  id: string
  image: string
  alt: string
  title: string
  chineseTitle: string
  description: string
  badge?: string
}

/** Update this list when new promotional posters are added. */
export const featuredSpecials: FeaturedSpecial[] = [
  {
    id: "monthly",
    image: "/images/Special/Month.webp",
    alt: "Monthly featured specials at café de A",
    title: "Monthly Specials",
    chineseTitle: "本月特介",
    description: "Seasonal dishes and limited-time offerings, refreshed throughout the month.",
    badge: "Featured",
  },
  {
    id: "chef-rec",
    image: "/images/Special/ChefRec.webp",
    alt: "Chef's recommendations at café de A",
    title: "Chef's Recommendations",
    chineseTitle: "廚師推介",
    description: "Signature recipes perfected with time-honored Cantonese techniques.",
    badge: "Chef's Pick",
  },
  {
    id: "mid-week",
    image: "/images/Special/MidWeekSpecial.webp",
    alt: "Mid-week specials Monday through Thursday at café de A",
    title: "Mid-Week Special",
    chineseTitle: "每周優惠",
    description:
      "Mon–Thu chef picks: duo seafood baked rice, roasted pork knuckle, four-seafood baked rice, and beef trio baked rice.",
    badge: "Mon–Thu",
  },
  {
    id: "seasonal-lobster",
    image: "/images/Special/SeasonalLobster.webp",
    alt: "Seasonal lobster special at café de A",
    title: "Seasonal Lobster",
    chineseTitle: "時令龍蝦",
    description:
      "Chef's special recommendation — à la carte from $49.95 or lobster combo with two sides for $89.95.",
    badge: "Limited Time",
  },
  {
    id: "lobster-special",
    image: "/images/Special/LobsterSpecial.webp",
    alt: "Lobster special baked rice with basa and salmon at café de A",
    title: "Lobster Special",
    chineseTitle: "龍蝦特選",
    description:
      "Baked lobster with basa and salmon on rice — choose lobster, tomato, or curry sauce. Set $26.95. Can be swapped for spaghetti or penne.",
    badge: "New",
  },
]
