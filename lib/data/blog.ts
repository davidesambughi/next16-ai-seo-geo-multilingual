/**
 * Canonical article data for the Raising Kids in Portugal blog.
 * Used by both the blog listing page and individual /blog/[slug] pages.
 * Phase 5: migrate to CMS (Sanity / Contentful) — keep shape stable.
 */

export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogFaqItem {
  q: string;
  a: string;
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
  keyTakeaways?: string[];
  faq?: BlogFaqItem[];
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
  {
    slug: "what-age-enrol-child-international-school-portugal",
    title: "What Age Should You Enrol Your Child in an International School in Portugal?",
    subtitle: "Entry points, waitlists, and application deadlines — a practical guide for 2026–2027",
    datePublished: "2026-03-28",
    dateModified: "2026-03-28",
    readTime: "7 min read",
    intro:
      "Choosing the right age to enrol your child in an international school in Portugal can feel like a high-stakes decision: too early, and the transition may be overwhelming; too late, and you risk missing out on popular year groups or facing multi-year waitlists. Around Lisbon, families often debate whether to start Reception/Pre-K at age 3–4 or wait until Year 1 or Grade 1, especially when juggling relocation timelines, language, and visa steps. This guide covers the practical realities — entry points, waitlists, and application deadlines — for St. Julian's School, CAISL, TASIS Portugal, and United Lisbon International School.",
    sections: [
      {
        heading: "Entry points: when schools accept new students",
        body: "Most international schools in Greater Lisbon cluster their entry around a few key year groups. For British-style and IB-influenced schools, typical entry points are Reception (age 3–4), Year 1 (age 5–6), and Year 7 (age 11–12) — the years when schools form larger cohorts and language-support structures are most robust. At St. Julian's, these three entry points see the most available places. CAISL and United Lisbon follow a similar cycle, while TASIS Portugal's American curriculum sees its highest turnover at Kindergarten (age 5) and Grade 1 (age 6). Families moving with children aged 4–6 generally find the transition fastest — younger learners absorb English more fluidly in play-based settings. For children entering late primary or early secondary (Years 5–7), places are scarcer and language expectations are higher. For secondary entry (Year 7+), schools strongly prefer a September start to avoid missed assessments and curriculum gaps.",
      },
      {
        heading: "Waitlists: how early is early enough",
        body: "In Lisbon's international-school market, popular entry points fill up fast and some schools now operate on a near-first-come basis once a cohort closes. St. Julian's School has an acceptance rate of roughly 8% for popular year groups and maintains waitlists of approximately two to three years for Reception, Year 1, and Year 7. CAISL and United Lisbon also report 18–24 month waitlists for early-years and Grade 1 cohorts. TASIS Portugal's Upper School (Grades 9–12) sees constrained capacity in IB-track years — apply no later than the year before the intended start. Many schools now operate priority or rolling lists: families pay a small deposit to register, then advance as spaces open. Sibling-priority rules mean non-sibling applicants can find the queue longer than expected. If your child is in a middle year group (Year 4/Grade 4) and you are flexible on timing, mid-year entry is occasionally possible when a space opens — but cannot be relied on.",
      },
      {
        heading: "Application deadlines and what to do right now",
        body: "For the 2026–2027 school year, most major international schools in Greater Lisbon open application windows roughly 12–18 months before the September start. St. Julian's and CAISL typically open applications in September of the prior year, with firm deadlines between January and March. TASIS Portugal and United Lisbon encourage submissions by end of calendar year, with decisions communicated by March or April. Late applications are accepted on a case-by-case basis, but by late spring only less-popular year groups or long-term waitlist positions remain. If you are in early research mode: start your school search at least 12–15 months before your child's intended start date. Register with each school's admissions portal now, and begin collecting documents — birth certificates, passports, previous school reports, and vaccination records. Most schools also require a short admissions assessment or interview; scheduling a visit or virtual meeting early lets you gauge fit and understand available language-support options.",
      },
    ],
    keyTakeaways: [
      "International schools near Lisbon treat Reception (age 3–4), Year 1 (age 5–6), and Year 7 (age 11–12) as their main entry points — these are the year groups with the most available places.",
      "St. Julian's School has an acceptance rate of ~8% for popular year groups and waitlists of roughly 2–3 years for Reception, Year 1, and Year 7.",
      "For the 2026–2027 academic year, most Lisbon-area schools open applications around September of the prior year, with firm deadlines between January and March.",
      "Start your school search at least 12–15 months before your intended start date and register with waitlists immediately — documents needed include passports, school reports, and vaccination records.",
    ],
    faq: [
      {
        q: "What age should I enrol my child in an international school in Portugal?",
        a: "Most international schools in Portugal — including St. Julian's School, CAISL, TASIS Portugal, and United Lisbon International School — treat Reception (age 3–4), Year 1/Grade 1 (age 5–6), and Year 7/Grade 7 (age 11–12) as their main entry points. Younger children typically adapt more quickly to language and school routines, but families can join at any stage — availability and waitlist length vary by year group.",
      },
      {
        q: "How early should I apply to an international school in Portugal?",
        a: "For popular entry points like Reception and Year 1, families should apply 18–24 months in advance. St. Julian's School, the most competitive school near Lisbon, operates a 2–3 year waitlist for its most sought-after year groups. A safe rule is to start researching and registering at least 12–15 months before your intended start date.",
      },
    ],
    cta: { text: "Compare all international schools →", href: "/best-private-and-public-international-schools-portugal-2026" },
  },
];

/** Returns a single article by slug, or undefined if not found. */
export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}
