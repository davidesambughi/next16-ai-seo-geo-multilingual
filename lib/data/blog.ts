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
      {
        heading: "Step 4: Start the admissions process earlier than you think",
        body: "Portugal's international school market has tightened considerably since 2022. St. Julian's School in Carcavelos — consistently the most sought-after option — operates a waitlist of 2–3 years for Reception and Year 1. CAISL and United Lisbon report 18–24 month waitlists for popular year groups. Even TASIS Portugal, historically more accessible, now fills Year 7 and IB-track years quickly. The practical implication: if your relocation is more than 12 months away, register with your top 2–3 schools now, even if you have not yet confirmed your move date. Most schools charge a small holding deposit (€150–500) to join the list, which is refundable if you withdraw. Families who wait until they have signed a lease in Portugal routinely find all preferred schools full for their child's year group.",
      },
      {
        heading: "Step 5: Evaluate language support and pastoral care",
        body: "Arriving mid-year or from a non-English-speaking background adds a layer of complexity that many families underestimate. All four leading Lisbon-area international schools offer English as an Additional Language (EAL) programmes, but the intensity and cost varies significantly. St. Julian's integrates EAL support within its standard fees for the first year; TASIS Portugal charges separately for intensive EAL beyond a threshold of hours. When visiting schools, ask specifically: How many hours per week of dedicated EAL support does my child receive? How long before a new student typically transitions to mainstream classes without support? Pastoral care quality is equally important. Look for schools with a dedicated head of year or house system, a counsellor accessible to students (not just for crises), and clear communication protocols with parents during the settling-in period. A school that excels academically but has weak pastoral structures can be a difficult environment for a child navigating a new country, language, and social network simultaneously.",
      },
      {
        heading: "Step 6: Match school culture to your child's learning profile",
        body: "Beyond curriculum and location, school culture is often the deciding factor families report in hindsight. St. Julian's has a strong co-curricular tradition — sport, drama, music — and a house system that creates vertical friendships across age groups. It suits outgoing children who thrive in busy, competitive environments. CAISL tends to attract families with a strong American identity and a more relaxed social culture; it is a good fit for students who struggled with high-pressure academic environments. TASIS Portugal combines an American curriculum with a Swiss boarding-school heritage, resulting in a particularly structured, disciplined environment — excellent for focused, driven learners and those preparing for US university applications. United Lisbon is the newest of the four; its smaller size means children receive more individual attention, and its IB-only curriculum appeals to families with a clear international trajectory. Visit at least two schools before shortlisting, and bring your child to at least one visit — their gut reaction is often a reliable signal.",
      },
    ],
    keyTakeaways: [
      "Align curriculum choice with your long-term plan: British (St. Julian's) for UK re-entry, American (CAISL/TASIS) for US university applications, IB at all four schools for maximum global flexibility.",
      "Budget 15–25% above headline tuition for registration fees, transport, uniforms, lunches, and extra-curriculars — St. Julian's all-in cost is typically €20,000–23,000 per year.",
      "Apply to 2–3 schools simultaneously: St. Julian's has an 8% acceptance rate for popular year groups and a 2–3 year waitlist for Reception and Year 1.",
      "Request a shadow day (your child attends classes for a morning) at every shortlisted school before signing an enrolment contract.",
      "EAL support and pastoral care quality vary significantly between schools — ask specific questions about hours per week and transition timelines during your visit.",
    ],
    faq: [
      {
        q: "Which international school in Portugal is best for expat families?",
        a: "There is no single best school — the right choice depends on your family's long-term plan, your child's learning profile, and where you plan to live. St. Julian's School in Carcavelos is the most academically prestigious and competitive, with an 8% acceptance rate. CAISL suits families with US university ambitions. TASIS Portugal in Sintra is ideal for structured, high-achieving learners. United Lisbon International School is the best option for families in Parque das Nações who want a smaller, more personal IB environment.",
      },
      {
        q: "How far in advance should I apply to an international school in Portugal?",
        a: "For the most popular year groups (Reception, Year 1, Year 7), families should apply at least 18–24 months in advance. St. Julian's School, the most competitive school near Lisbon, maintains a 2–3 year waitlist for these entry points. A safe rule of thumb is to register with your top 2–3 schools as soon as your relocation to Portugal becomes likely — even if your move date is not yet confirmed.",
      },
      {
        q: "Do international schools in Portugal teach in English?",
        a: "Yes. All four leading international schools near Lisbon — St. Julian's School, CAISL, TASIS Portugal, and United Lisbon International School — use English as the primary language of instruction. Portuguese language is taught as a subject at all schools (usually 3–5 hours per week), and EAL (English as an Additional Language) support is available for students who arrive without strong English proficiency. French, Spanish, and German are also offered as additional languages at most schools.",
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
      {
        heading: "Property prices and rental costs in 2026",
        body: "Cascais and Estoril sit within the same rental band. As of early 2026, a 3-bedroom family apartment in Cascais town centre rents for approximately €2,800–3,800 per month; a comparable property in Estoril is €2,600–3,500. Villas with gardens — common among families with primary-school-aged children — range from €3,500 to €6,000+ depending on size and proximity to the waterfront. The Cascais premium over Estoril is typically 5–10%, reflecting higher demand from the expat community. Purchase prices follow a similar pattern: €5,000–8,500 per square metre in Cascais town centre, €4,500–7,500 in Estoril and Estoril's neighbouring villages of Monte Estoril and São João do Estoril. Families prioritising value within the Estoril Line corridor often find better square-metre pricing in the slightly inland villages of Alcabideche and São Domingos de Rana, which are well-connected to Cascais by car and close to St. Julian's School.",
      },
      {
        heading: "Getting to Lisbon centre and the airport",
        body: "The Cascais Line train — one of Portugal's best-maintained commuter lines — runs every 20 minutes and connects Cascais to Cais do Sodré in Lisbon in approximately 40 minutes, with Estoril 5 minutes closer at 35 minutes. Both towns are served by the same fast train and the journey is reliable, air-conditioned, and affordable (around €2.50 per single journey with a Navegante card). Lisbon's Humberto Delgado Airport is 45–55 minutes by car from both towns in off-peak traffic; the A5 motorway connects directly to the airport via the A1. Peak-hour traffic on the A5 can extend the journey to 70–90 minutes, so families who travel internationally more than once a month should factor this in. The planned metro extension to Cascais, discussed for years, has no confirmed delivery date and should not be relied upon for relocation planning.",
      },
      {
        heading: "Healthcare, schools, and day-to-day practicalities",
        body: "Both Cascais and Estoril are well-served for family life beyond the flagship international schools. Hospital CUF Cascais — a private hospital with English-speaking staff and paediatric wards — is 5 minutes by car from Cascais town centre and widely used by the expat community. Cascais also has a larger selection of international supermarkets (El Corte Inglés, Continente), English-language family activities, and a year-round events calendar including the Cascais Jazz Festival and the Portugal Bike Race. Estoril has its own private clinic (Clínica Médica de Estoril), a smaller but well-regarded pharmacy network, and the famous Estoril Casino complex — which doubles as a cultural and events hub for the local community. Both towns are considered extremely safe by European standards, and the Cascais municipality consistently scores highest in Portugal for quality of life surveys conducted by national newspapers. For day trips and weekend activities, both towns give access to Sintra (20 minutes inland), the beaches of Guincho and Praia de Cascais, and the fishing village of Azenhas do Mar.",
      },
    ],
    keyTakeaways: [
      "Cascais and Estoril are just 3 km apart on the Estoril Line — both offer beach living, 40-minute train access to Lisbon, and proximity to St. Julian's School in Carcavelos.",
      "Cascais is better for newly arrived families with young children who want a large, ready-made expat network with English-language activities and support.",
      "Estoril suits families who are more settled, prefer a quieter atmosphere, and want to integrate more deeply into Portuguese culture.",
      "Rental prices are comparable: 3-bedroom apartments run €2,600–3,800/month; Cascais carries a 5–10% premium over Estoril for equivalent properties.",
      "Hospital CUF Cascais provides private English-speaking healthcare including paediatrics — the most-used private hospital among expat families in the Estoril corridor.",
    ],
    faq: [
      {
        q: "Is Cascais or Estoril better for families with international school-aged children?",
        a: "Both towns are approximately 15–20 minutes from St. Julian's School in Carcavelos, the most popular international school on the Estoril Coast. For families new to Portugal with younger children (ages 3–10), Cascais is generally the better choice due to its larger expat community, more English-language services, and more activity options. Estoril is a slightly quieter, more Portuguese town that suits families who are already settled or who have older children and want to integrate more deeply.",
      },
      {
        q: "How much does it cost to rent a family home in Cascais or Estoril?",
        a: "As of 2026, a 3-bedroom family apartment in Cascais town centre rents for approximately €2,800–3,800 per month. Comparable properties in Estoril are typically €2,600–3,500 per month — around 5–10% less than Cascais. Villas with gardens cost €3,500–6,000+ depending on size and sea views. Slightly inland villages like Alcabideche and São Domingos de Rana offer better value for families who primarily commute by car.",
      },
      {
        q: "How long is the commute from Cascais or Estoril to Lisbon?",
        a: "The Cascais Line train takes approximately 35 minutes from Estoril and 40 minutes from Cascais to Cais do Sodré in central Lisbon. Trains run every 20 minutes throughout the day and are reliable and comfortable. By car on the A5 motorway, the journey is 35–45 minutes in off-peak traffic and can extend to 70–90 minutes during morning rush hour. The airport is approximately 45–55 minutes by car in normal traffic.",
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
      {
        heading: "How fees increase as your child progresses through school",
        body: "International school fees in Portugal are not flat throughout a child's education — they typically rise by 10–20% between primary and secondary, and by a further 10–15% in the IB Diploma years (Years 12–13 / Grades 11–12). At St. Julian's, a child entering Reception at €14,000 per year will likely be paying €24,000–26,000 by the time they reach the IB Diploma, before additional costs. CAISL follows a similar trajectory: elementary fees of approximately €17,000 rise to €24,000–26,000 at high school level. The practical implication is that families should model their long-term education budget based on secondary and IB-year costs, not primary fees. Over a 13-year schooling journey (Reception through Year 13), the total cost of educating one child at an international school near Lisbon is typically €250,000–350,000 inclusive of all ancillary costs, depending on the school chosen.",
      },
      {
        heading: "Annual fee increases and budgeting for inflation",
        body: "All four international schools near Lisbon publish annual fee adjustments each spring for the following academic year. In the 2023–2025 period, fee increases ranged from 4% to 9% per year, tracking broadly with Portuguese and European inflation but also reflecting rising staffing costs and campus investment. TASIS Portugal completed a significant campus expansion in 2024, which was accompanied by a 7% fee increase. Families should model annual fee inflation of at least 5–6% per year when projecting 10-year education costs. Currency risk is another consideration for families earning in non-euro currencies: all fees are invoiced in euros, and sterling, dollar, or Swiss franc exposure can add 10–20% to effective costs in adverse exchange-rate years.",
      },
      {
        heading: "Bursaries, sibling discounts, and how to negotiate",
        body: "All four schools on our list offer some form of financial assistance, though the approach varies significantly. St. Julian's offers merit-based academic bursaries through a competitive process for Year 7 entry — families should apply at the same time as the regular admissions process. CAISL has a limited needs-based bursary fund and sibling discounts of approximately 10% on the second child's fees. TASIS Portugal offers early-enrolment discounts and occasional partial scholarships for academically exceptional applicants. United Lisbon is the most flexible on pricing and has been known to negotiate fee arrangements for families making multi-year commitments. In practice, bursaries cover 10–30% of fees for the families who receive them; full-fee waivers are extremely rare at these schools. The most effective approach: ask at the initial enquiry meeting what financial assistance is available, state your budget constraints clearly, and apply simultaneously for the school place and any available funding. Schools prefer to confirm a great family at a discount over losing them to a competitor.",
      },
    ],
    keyTakeaways: [
      "Headline annual fees (€12,000–32,000) understate the true cost — budget 15–25% more for registration, transport, uniforms, lunches, and extra-curriculars.",
      "United Lisbon is the most affordable all-in option (from ~€14,000/year for families in Parque das Nações); TASIS Portugal is the most expensive (€55,000–60,000+ for two children).",
      "Fees increase 10–20% between primary and secondary school and a further 10–15% in IB Diploma years — always model costs based on secondary-level fees.",
      "Budget for 5–6% annual fee inflation; in the 2023–2025 period schools raised fees by 4–9% per year.",
      "All four schools offer bursaries or sibling discounts — ask explicitly at your first admissions meeting and apply simultaneously for a place and available funding.",
    ],
    faq: [
      {
        q: "How much do international schools in Portugal cost per year?",
        a: "Annual tuition fees at international schools near Lisbon range from approximately €12,000 (United Lisbon International School, primary level) to €32,000 (TASIS Portugal, secondary). However, the true all-in cost — including registration fees, transport, uniforms, lunches, and extra-curriculars — typically runs 15–25% above headline tuition. A realistic all-in budget for one child at St. Julian's School is €20,000–23,000 per year; for TASIS Portugal, €28,000–35,000 per child.",
      },
      {
        q: "Do international schools in Portugal offer financial aid or bursaries?",
        a: "Yes. All four leading international schools near Lisbon — St. Julian's, CAISL, TASIS Portugal, and United Lisbon — offer some form of financial assistance. St. Julian's offers academic merit bursaries for Year 7 entry. CAISL provides sibling discounts (~10%) and a limited needs-based fund. TASIS Portugal offers early-enrolment discounts and occasional partial scholarships. United Lisbon is the most flexible on fee arrangements. Bursaries typically cover 10–30% of fees; apply simultaneously with your admissions application for the best chance of an award.",
      },
      {
        q: "Are international school fees in Portugal increasing?",
        a: "Yes. Between 2023 and 2025, Lisbon-area international schools raised fees by 4–9% per year, broadly tracking European inflation and rising staffing costs. Families should model annual fee inflation of at least 5–6% per year when projecting long-term education costs. Currency risk is also a factor for families earning in sterling, dollars, or Swiss francs, as all fees are invoiced in euros.",
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
