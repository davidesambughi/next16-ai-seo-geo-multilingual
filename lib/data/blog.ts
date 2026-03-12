/**
 * Canonical article data for the Raising Kids in Portugal blog.
 * Used by both the blog listing page and individual /blog/[slug] pages.
 * Phase 5: migrate to CMS (Sanity / Contentful) — keep shape stable.
 */

export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  subtitle: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  intro: string;
  sections: BlogSection[];
  cta: {
    text: string;
    href: '/best-private-and-public-international-schools-portugal-2026' | '/top-neighborhoods' | '/relocation-guide' | '/school-finder';
  };
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "how-to-choose-international-school-portugal",
    title: "How to Choose an International School in Portugal (2026 Guide)",
    subtitle: "A framework used by Raising Kids in Portugal with 200+ expat families",
    datePublished: "2026-01-15",
    dateModified: "2026-02-01",
    readTime: "8 min read",
    intro:
      "Choosing an international school in Portugal is one of the most consequential decisions expat families make — and one of the most stressful. With four major international schools within 45 minutes of Lisbon, each with different curricula, admission processes, and cultures, the choice is far from obvious.",
    sections: [
      {
        heading: "Step 1: Align curriculum with your long-term plan",
        body: "The most common mistake is choosing a school based on reputation alone without considering where your children will study next. If you plan to return to the UK, St. Julian's British curriculum (IGCSEs + IB Diploma) maintains the smoothest transition. If you are American or plan to apply to US universities, CAISL or TASIS Portugal's American curriculum is a natural fit. For maximum flexibility, the IB Diploma — offered by all four leading schools — is universally recognised.",
      },
      {
        heading: "Step 2: Calculate the real cost of fees",
        body: "Annual tuition is only part of the picture. Registration fees (€1,000–3,000 one-time), transport, uniforms, and extra-curricular activities typically add 15–25% to the headline fee. At St. Julian's, for example, families frequently budget €20,000–22,000 all-in versus the advertised €16,000–26,000 range. Ask every school for a full-cost breakdown before comparing.",
      },
      {
        heading: "Step 3: Visit before you commit",
        body: "Every school in our guide has been visited by a Raising Kids in Portugal consultant at least 3 times. The difference between a school's marketing materials and its actual atmosphere can be significant. Request a shadow day — where your child attends classes for a full morning — before signing any enrolment contract. Acceptance rates as low as 8% (St. Julian's) mean you should apply to 2–3 schools simultaneously.",
      },
    ],
    cta: { text: "Compare all 4 schools →", href: "/best-private-and-public-international-schools-portugal-2026" },
  },
  {
    slug: "cascais-vs-estoril-expat-families",
    title: "Cascais vs Estoril: Which Is Better for Expat Families?",
    subtitle: "The two most popular expat towns on the Lisbon Riviera, compared side by side",
    datePublished: "2026-01-28",
    dateModified: "2026-02-01",
    readTime: "6 min read",
    intro:
      "Cascais and Estoril sit just 3 km apart on the Estoril Coast — and both are consistently in the top 3 choices for expat families relocating to greater Lisbon. They share the same train line, similar beaches, and comparable property prices. So what actually separates them?",
    sections: [
      {
        heading: "Community & atmosphere",
        body: "Cascais wins on community size. With the largest concentration of expats in Portugal, it has English-language parent WhatsApp groups, international sports leagues, and a weekly expat meetup scene. Estoril is quieter, more residential, and more Portuguese in flavour — which some families prefer once they have settled and want to integrate more deeply.",
      },
      {
        heading: "Proximity to St. Julian's School",
        body: "Both towns are approximately 15–20 minutes from St. Julian's School in Carcavelos by car. The Cascais Line train runs through both, but Carcavelos station is directly served — meaning there is no school bus dependency if you live centrally. Cascais town centre is 10 minutes further by car than Estoril on the morning school run.",
      },
      {
        heading: "Our recommendation",
        body: "For families with younger children (ages 4–10) who are new to Portugal and want a ready-made expat network: choose Cascais. For families with teenagers who are settled or want to immerse in Portuguese culture, and who value being slightly quieter: choose Estoril. Property prices are essentially equivalent — the decision is lifestyle, not financial.",
      },
    ],
    cta: { text: "Explore Cascais & Estoril →", href: "/top-neighborhoods" },
  },
  {
    slug: "true-cost-international-school-fees-portugal",
    title: "The True Cost of International School Fees in Portugal (2026)",
    subtitle: "What the brochures don't tell you — a full cost breakdown from real families",
    datePublished: "2026-02-10",
    dateModified: "2026-02-10",
    readTime: "7 min read",
    intro:
      "The headline annual fees for international schools in Portugal range from €12,000 to €32,000. But the total cost of education almost always exceeds those figures. Here is what Raising Kids in Portugal's data from 200+ families reveals about the all-in cost.",
    sections: [
      {
        heading: "Registration & application fees",
        body: "Every school charges a one-time registration fee ranging from €500 (CAISL) to €3,000 (TASIS Portugal). Many also require a non-refundable deposit of 1 month's fees upon acceptance. Budget €1,500–4,000 additional in the first year.",
      },
      {
        heading: "Transport, uniforms, and extras",
        body: "School transport for families living more than 5 km from campus typically costs €2,000–4,000 per year (return journeys). Uniforms are €300–600 per child for the full kit. Lunch programmes add €800–1,500 per year. Extra-curriculars (music, sport, drama) run €500–2,000 depending on activity level. Our conservative all-in estimate for one child at St. Julian's: €20,000–23,000 per year.",
      },
      {
        heading: "The cheapest and most expensive options",
        body: "United Lisbon International School is currently the most accessible school on our list, with all-in costs starting closer to €14,000 per year for families living in Parque das Nações (no transport cost). TASIS Portugal in Sintra is the most expensive — with all-in costs for a family of two children exceeding €55,000–60,000 per year. Both schools offer merit-based bursaries; ask directly at enquiry stage.",
      },
    ],
    cta: { text: "Compare all school fees →", href: "/best-private-and-public-international-schools-portugal-2026" },
  },
];

/** Returns a single article by slug, or undefined if not found. */
export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}
