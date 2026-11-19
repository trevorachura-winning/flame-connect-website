/**
 * AI at work across Africa: public examples, credited and linked to their
 * sources. These are NOT Flame Connect client projects. Our own case studies
 * are added only once a client has approved them.
 *
 * Every claim here must match its linked source. Paraphrase, never copy.
 */
export interface SourceLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  country: string;
  sector: string;
  summary: string;
  lesson: string;
  sources: SourceLink[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sunbird-ai-sunflower",
    name: "Sunbird AI: Sunflower language models",
    country: "Uganda",
    sector: "Language and public services",
    summary:
      "Sunbird AI, a Ugandan non-profit lab, has released Sunflower, a family of AI models built to understand and translate 31 Ugandan languages. Its researchers report leading translation results for most of the languages covered.",
    lesson:
      "Serving customers in their own language is becoming practical. Local language support can now be part of an AI plan, not an afterthought.",
    sources: [
      { label: "Sunflower research paper (arXiv)", href: "https://arxiv.org/abs/2510.07203" },
      { label: "PC Tech Magazine coverage", href: "https://pctechmag.com/2025/10/sunbird-ai-unveils-multilingual-ai-model-in-uganda/" },
    ],
  },
  {
    slug: "airqo-air-quality",
    name: "AirQo: air quality monitoring",
    country: "Uganda",
    sector: "Environment and cities",
    summary:
      "AirQo, based at Makerere University, pairs low-cost sensors with machine learning to monitor and forecast air quality in African cities. The project received Google AI Impact Challenge funding in 2019.",
    lesson:
      "Affordable hardware plus good models can produce reliable local data where expensive systems were out of reach. Start with the data you can realistically collect.",
    sources: [
      { label: "CEGA, UC Berkeley feature", href: "https://cega.berkeley.edu/feature/measuring-air-pollution-cheaply-in-uganda/" },
    ],
  },
  {
    slug: "apollo-agriculture-credit",
    name: "Apollo Agriculture: credit for smallholder farmers",
    country: "Kenya and Zambia",
    sector: "Agriculture and finance",
    summary:
      "Apollo Agriculture uses machine learning and satellite data to assess smallholder farmers for credit, then bundles financing with seeds, inputs and farming advice.",
    lesson:
      "AI can open a market traditional processes could not serve profitably. The model works because it is wrapped in a complete service, not offered as a tool on its own.",
    sources: [
      { label: "GSMA Mobile for Development", href: "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/blog/ai-driven-smallholder-farmer-lending-in-africa-insights-from-apollo-agriculture/" },
      { label: "Apollo Agriculture", href: "https://www.apolloagriculture.com/about" },
    ],
  },
  {
    slug: "m-kopa-repayment-forecasting",
    name: "M-KOPA: forecasting repayments",
    country: "Kenya, Uganda and other markets",
    sector: "Financial inclusion",
    summary:
      "M-KOPA, which finances smartphones and other essentials for customers paying in small instalments, uses machine learning to forecast repayment across its loan book every day.",
    lesson:
      "Prediction pays off when it feeds a daily decision. The value is in acting earlier, not in the model itself.",
    sources: [
      { label: "Microsoft Source EMEA feature", href: "https://news.microsoft.com/source/emea/features/improving-lives-with-ai-and-digital-and-financial-inclusion-in-kenya-one-smartphone-at-a-time/" },
    ],
  },
  {
    slug: "lelapa-ai-vulavula",
    name: "Lelapa AI: Vulavula",
    country: "South Africa",
    sector: "Language technology",
    summary:
      "Lelapa AI, a South African research lab, offers Vulavula, a service that lets businesses transcribe, translate and analyse text and speech in South African languages.",
    lesson:
      "African-language AI is now available as a product a business can plug in, not only as research.",
    sources: [
      { label: "Vulavula product overview", href: "https://lelapa.ai/vulavula-product-overview/" },
    ],
  },
];
