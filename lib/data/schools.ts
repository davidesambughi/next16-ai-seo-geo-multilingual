import type { School, SchoolTranslation } from "../types";

export type { School };

/**
 * Returns the best available translation for a school.
 * Falls back to `en` if the requested locale is not yet translated.
 */
export function getSchoolT(school: School, locale: string): SchoolTranslation {
  return (school.translations as Record<string, SchoolTranslation>)[locale]
    ?? school.translations.en;
}

import rawSchools from "./raw/schools-database.json";

const curatedSchools: School[] = [
  {
    id: "1",
    slug: "st-julians-school",
    name: "St. Julian's School",
    location: "Carcavelos, Cascais",
    neighborhoodSlug: "cascais",
    curriculum: "British, IB Diploma",
    fees: "€16,000 – €26,000",
    inspectionDate: "2024-11-15",
    acceptanceRate: "8%",
    visitCount: 7,
    coordinates: { lat: 38.68503590639778, lng: -9.336226846132435 },
    translations: {
      en: {
        description:
          "Historic British international school with extensive grounds near the Cascais coastline. Known for academic rigour, a very competitive entry process, and one of the strongest IB results in Portugal.",
        highlights: ["Historic Campus", "Strong Sports Program", "Excellent IB Results"],
        trustBadges: ["Non-Profit", "CIS Accredited", "High Demand"],
        verdict:
          "The gold standard for British families — if you can get a place, take it.",
        parentWhisper:
          "\"The community here is incredible. Our kids made lifelong friends within weeks.\" — British parent, relocated 2023",
      },
      pt: {
        description:
          "Escola internacional britânica histórica com extensos terrenos perto da costa de Cascais. Reconhecida pelo rigor académico, um processo de entrada muito competitivo e alguns dos melhores resultados de IB em Portugal.",
        highlights: ["Campus Histórico", "Programa Desportivo Forte", "Excelentes Resultados IB"],
        trustBadges: ["Sem Fins Lucrativos", "Acreditada CIS", "Alta Procura"],
        verdict:
          "O padrão de ouro para famílias britânicas — se conseguir uma vaga, aceite-a.",
        parentWhisper:
          "\"A comunidade aqui é incrível. Os nossos filhos fizeram amigos para a vida em semanas.\" — Pai britânico, chegou em 2023",
      },
      de: {
        description:
          "Historische britische Internationalschule mit weitläufigem Gelände nahe der Küste von Cascais. Bekannt für akademische Strenge, ein sehr wettbewerbsintensives Aufnahmeverfahren und eines der besten IB-Ergebnisse in Portugal.",
        highlights: ["Historischer Campus", "Starkes Sportprogramm", "Hervorragende IB-Ergebnisse"],
        trustBadges: ["Gemeinnützig", "CIS-Akkreditiert", "Hohe Nachfrage"],
        verdict:
          "Der Goldstandard für britische Familien — wenn Sie einen Platz bekommen, nehmen Sie ihn.",
        parentWhisper:
          "\"Die Gemeinschaft hier ist unglaublich. Unsere Kinder haben innerhalb von Wochen lebenslange Freunde gefunden.\" — Britische Eltern, umgezogen 2023",
      },
      fr: {
        description:
          "École internationale britannique historique avec de vastes terrains près de la côte de Cascais. Reconnue pour sa rigueur académique, un processus d'admission très sélectif et l'un des meilleurs résultats IB du Portugal.",
        highlights: ["Campus Historique", "Programme Sportif Reconnu", "Excellents Résultats IB"],
        trustBadges: ["Sans But Lucratif", "Accréditation CIS", "Forte Demande"],
        verdict:
          "La référence absolue pour les familles britanniques — si vous obtenez une place, saisissez-la.",
        parentWhisper:
          "\"La communauté ici est incroyable. Nos enfants ont noué des amitiés pour la vie en quelques semaines.\" — Parent britannique, relocalisé en 2023",
      },
      nl: {
        description:
          "Historische Britse internationale school met uitgestrekte terreinen nabij de kust van Cascais. Bekend om academische strengheid, een zeer competitief toelatingsprocedure en een van de sterkste IB-resultaten van Portugal.",
        highlights: ["Historische Campus", "Sterk Sportprogramma", "Uitstekende IB-Resultaten"],
        trustBadges: ["Non-Profit", "CIS-Geaccrediteerd", "Hoge Vraag"],
        verdict:
          "De gouden standaard voor Britse gezinnen — als u een plek kunt krijgen, grijp die dan.",
        parentWhisper:
          "\"De gemeenschap hier is ongelooflijk. Onze kinderen hebben binnen enkele weken vrienden voor het leven gemaakt.\" — Britse ouder, verhuisd in 2023",
      },
      es: {
        description:
          "Histórico colegio internacional británico con amplias instalaciones cerca de la costa de Cascais. Reconocido por su rigor académico, un proceso de admisión muy competitivo y algunos de los mejores resultados de Bachillerato Internacional en Portugal.",
        highlights: ["Campus Histórico", "Sólido Programa Deportivo", "Excelentes Resultados IB"],
        trustBadges: ["Sin Ánimo de Lucro", "Acreditado CIS", "Alta Demanda"],
        verdict:
          "El estándar de oro para familias británicas — si consigues una plaza, acéptala.",
        parentWhisper:
          "\"La comunidad aquí es increíble. Nuestros hijos hicieron amigos para toda la vida en semanas.\" — Padre británico, reubicado en 2023",
      },
    },
  },
  {
    id: "2",
    slug: "tasis-portugal",
    name: "TASIS Portugal",
    location: "Sintra",
    neighborhoodSlug: "sintra",
    curriculum: "American, IB Diploma",
    fees: "€18,000 – €32,000",
    inspectionDate: "2025-01-20",
    acceptanceRate: "18%",
    visitCount: 4,
    coordinates: { lat: 38.759967, lng: -9.386631 },
    translations: {
      en: {
        description:
          "The newest luxury campus in Portugal, set in the forested hills of Sintra. TASIS offers exceptional arts and STEM facilities under the American curriculum plus IB Diploma — and the smallest class sizes of any school on this list.",
        highlights: ["Modern Facilities", "Arts & Music Focus", "Global Network"],
        trustBadges: ["NEASC Accredited", "Modern Campus", "Small Class Sizes"],
        verdict:
          "Premium choice for creative families who want a US-track education in a stunning European setting.",
        parentWhisper:
          "\"The teachers actually know each child by name — the small size is a huge differentiator.\" — American parent, relocated 2024",
      },
      pt: {
        description:
          "O mais recente e luxuoso campus de Portugal, situado nas colinas arborizadas de Sintra. TASIS oferece instalações excecionais de artes e STEM no currículo americano com Diploma IB — e as turmas mais pequenas de todas as escolas desta lista.",
        highlights: ["Instalações Modernas", "Foco em Artes e Música", "Rede Global"],
        trustBadges: ["Acreditada NEASC", "Campus Moderno", "Turmas Reduzidas"],
        verdict:
          "Escolha premium para famílias criativas que querem uma formação americana num cenário europeu deslumbrante.",
        parentWhisper:
          "\"Os professores conhecem cada criança pelo nome — o tamanho reduzido faz toda a diferença.\" — Pai americano, chegou em 2024",
      },
      de: {
        description:
          "Portugals neuester Luxuscampus in den bewaldeten Hügeln von Sintra. TASIS bietet außergewöhnliche Kunst- und STEM-Einrichtungen im amerikanischen Lehrplan plus IB Diploma — und die kleinsten Klassengrößen aller Schulen auf dieser Liste.",
        highlights: ["Moderne Einrichtungen", "Fokus auf Kunst & Musik", "Globales Netzwerk"],
        trustBadges: ["NEASC-Akkreditiert", "Moderner Campus", "Kleine Klassengrößen"],
        verdict:
          "Premium-Wahl für kreative Familien, die eine US-Ausbildung in einem atemberaubenden europäischen Umfeld wünschen.",
        parentWhisper:
          "\"Die Lehrer kennen jedes Kind beim Namen — die kleine Größe ist ein enormer Vorteil.\" — Amerikanische Eltern, umgezogen 2024",
      },
      fr: {
        description:
          "Le campus le plus récent et le plus luxueux du Portugal, niché dans les collines boisées de Sintra. TASIS propose des équipements exceptionnels pour les arts et les STEM dans le cadre du programme américain avec le Diplôme IB — et les plus petits effectifs de toutes les écoles de cette liste.",
        highlights: ["Équipements Modernes", "Accent Arts & Musique", "Réseau Mondial"],
        trustBadges: ["Accrédité NEASC", "Campus Moderne", "Petits Effectifs"],
        verdict:
          "Choix premium pour les familles créatives souhaitant une formation américaine dans un cadre européen époustouflant.",
        parentWhisper:
          "\"Les enseignants connaissent chaque enfant par son prénom — la petite taille est un avantage énorme.\" — Parent américain, relocalisé en 2024",
      },
      nl: {
        description:
          "De nieuwste luxe campus in Portugal, gelegen in de beboste heuvels van Sintra. TASIS biedt uitzonderlijke kunst- en STEM-faciliteiten binnen het Amerikaanse curriculum plus IB Diploma — en de kleinste klassengrootte van alle scholen op deze lijst.",
        highlights: ["Moderne Faciliteiten", "Focus op Kunst & Muziek", "Wereldwijd Netwerk"],
        trustBadges: ["NEASC-Geaccrediteerd", "Moderne Campus", "Kleine Klassen"],
        verdict:
          "Premium keuze voor creatieve gezinnen die een Amerikaans-spoor onderwijs willen in een prachtige Europese omgeving.",
        parentWhisper:
          "\"De leraren kennen elk kind bij naam — de kleine omvang is een enorm voordeel.\" — Amerikaanse ouder, verhuisd in 2024",
      },
      es: {
        description:
          "El campus de lujo más nuevo de Portugal, situado en las colinas boscosas de Sintra. TASIS ofrece instalaciones excepcionales de artes y STEM bajo el currículo americano más el Diploma IB — y los grupos más pequeños de todos los colegios de esta lista.",
        highlights: ["Instalaciones Modernas", "Enfoque en Artes y Música", "Red Global"],
        trustBadges: ["Acreditado NEASC", "Campus Moderno", "Grupos Reducidos"],
        verdict:
          "Elección premium para familias creativas que quieren una educación americana en un entorno europeo impresionante.",
        parentWhisper:
          "\"Los profesores conocen a cada niño por su nombre — el tamaño reducido marca una gran diferencia.\" — Padre americano, reubicado en 2024",
      },
    },
  },
  {
    id: "3",
    slug: "carlucci-american-international-school",
    name: "Carlucci American International School (CAISL)",
    location: "Sintra / Linho",
    neighborhoodSlug: "sintra",
    curriculum: "American, IB Diploma",
    fees: "€14,000 – €24,000",
    inspectionDate: "2024-10-05",
    acceptanceRate: "35%",
    visitCount: 5,
    coordinates: { lat: 38.76880050809409, lng: -9.379711401417946 },
    translations: {
      en: {
        description:
          "The only US State Department-supported school in Portugal. CAISL combines an inclusive admissions policy with solid IB results and a close-knit community feel — making it the best value for American families.",
        highlights: ["US State Dept Support", "Inclusive Community", "Strong STEM"],
        trustBadges: ["Non-Profit", "US State Dept Supported", "Inclusive"],
        verdict:
          "Best value for American families — official US State Dept backing with a real community atmosphere.",
        parentWhisper:
          "\"We looked at four schools. CAISL felt like home from day one — the parents' network is extraordinary.\" — German-American family, relocated 2023",
      },
      pt: {
        description:
          "A única escola apoiada pelo Departamento de Estado dos EUA em Portugal. A CAISL combina uma política de admissão inclusiva com sólidos resultados IB e um ambiente de comunidade unida — tornando-a a melhor relação qualidade-preço para famílias americanas.",
        highlights: ["Apoio do Dep. Estado EUA", "Comunidade Inclusiva", "STEM Forte"],
        trustBadges: ["Sem Fins Lucrativos", "Apoiada pelo Dep. Estado EUA", "Inclusiva"],
        verdict:
          "Melhor relação qualidade-preço para famílias americanas — respaldo oficial dos EUA com uma verdadeira atmosfera comunitária.",
        parentWhisper:
          "\"Visitámos quatro escolas. A CAISL pareceu-nos casa desde o primeiro dia — a rede de pais é extraordinária.\" — Família luso-americana, chegou em 2023",
      },
      de: {
        description:
          "Die einzige vom US-Außenministerium unterstützte Schule in Portugal. CAISL verbindet eine integrative Aufnahmepolitik mit soliden IB-Ergebnissen und einem engen Gemeinschaftsgefühl — und ist damit der beste Wert für amerikanische Familien.",
        highlights: ["US-Außenministerium-Unterstützung", "Inklusive Gemeinschaft", "Starkes STEM"],
        trustBadges: ["Gemeinnützig", "Vom US-Außenministerium Unterstützt", "Inklusiv"],
        verdict:
          "Bestes Preis-Leistungs-Verhältnis für amerikanische Familien — offizielle US-Unterstützung mit echter Gemeinschaftsatmosphäre.",
        parentWhisper:
          "\"Wir haben vier Schulen angesehen. CAISL hat sich vom ersten Tag an wie Zuhause angefühlt — das Elternnetzwerk ist außergewöhnlich.\" — Deutsch-amerikanische Familie, umgezogen 2023",
      },
      fr: {
        description:
          "La seule école soutenue par le Département d'État américain au Portugal. CAISL associe une politique d'admission inclusive à de solides résultats IB et une atmosphère communautaire chaleureuse — en faisant le meilleur rapport qualité-prix pour les familles américaines.",
        highlights: ["Soutien du Dépt. d'État US", "Communauté Inclusive", "STEM Solide"],
        trustBadges: ["Sans But Lucratif", "Soutenu par le Dépt. d'État US", "Inclusif"],
        verdict:
          "Meilleur rapport qualité-prix pour les familles américaines — soutien officiel américain avec une vraie atmosphère communautaire.",
        parentWhisper:
          "\"Nous avons visité quatre écoles. CAISL s'est sentie comme chez nous dès le premier jour — le réseau de parents est extraordinaire.\" — Famille germano-américaine, relocalisée en 2023",
      },
      nl: {
        description:
          "De enige door het Amerikaanse Ministerie van Buitenlandse Zaken ondersteunde school in Portugal. CAISL combineert een inclusief toelatingsbeleid met solide IB-resultaten en een hechte gemeenschapssfeer — waarmee het de beste waarde voor Amerikaanse gezinnen biedt.",
        highlights: ["Steun van het US State Dept", "Inclusieve Gemeenschap", "Sterk STEM"],
        trustBadges: ["Non-Profit", "Ondersteund door US State Dept", "Inclusief"],
        verdict:
          "Beste prijs-kwaliteitverhouding voor Amerikaanse gezinnen — officiële Amerikaanse steun met een echte gemeenschapssfeer.",
        parentWhisper:
          "\"We hebben vier scholen bekeken. CAISL voelde als thuis vanaf dag één — het oudernetwerk is buitengewoon.\" — Duits-Amerikaans gezin, verhuisd in 2023",
      },
      es: {
        description:
          "El único colegio apoyado por el Departamento de Estado de EE.UU. en Portugal. CAISL combina una política de admisión inclusiva con sólidos resultados de Bachillerato Internacional y un ambiente de comunidad unida — convirtiéndola en la mejor opción calidad-precio para familias americanas.",
        highlights: ["Apoyo del Depto. Estado EE.UU.", "Comunidad Inclusiva", "STEM Sólido"],
        trustBadges: ["Sin Ánimo de Lucro", "Apoyado por el Depto. Estado EE.UU.", "Inclusivo"],
        verdict:
          "La mejor relación calidad-precio para familias americanas — respaldo oficial de EE.UU. con un ambiente de comunidad real.",
        parentWhisper:
          "\"Visitamos cuatro colegios. CAISL se sintió como en casa desde el primer día — la red de padres es extraordinaria.\" — Familia germano-americana, reubicada en 2023",
      },
    },
  },
  {
    id: "4",
    slug: "united-lisbon-international-school",
    name: "United Lisbon International School",
    location: "Lisbon (Parque das Nações)",
    neighborhoodSlug: "parquedasnacoes",
    curriculum: "American, IB Diploma",
    fees: "€12,000 – €22,000",
    inspectionDate: "2025-02-01",
    acceptanceRate: "45%",
    visitCount: 3,
    coordinates: { lat: 38.75673823585819, lng: -9.107781244803101 },
    translations: {
      en: {
        description:
          "A modern vertical campus in the heart of Lisbon's most contemporary district. United Lisbon places technology, entrepreneurship, and future skills at the centre of every program — ideal for families who want city living without compromising on quality.",
        highlights: ["Tech-Focused", "Modern Campus", "Central Location"],
        trustBadges: ["Tech-Focused", "Central Location", "Growing Reputation"],
        verdict:
          "The urban choice for tech-forward families — most accessible fees on this list with real Lisbon energy.",
        parentWhisper:
          "\"Living and schooling in Parque das Nações is seamless. We walk to school past the river every morning.\" — Dutch parent, relocated 2024",
      },
      pt: {
        description:
          "Um campus vertical moderno no coração do distrito mais contemporâneo de Lisboa. A United Lisbon coloca tecnologia, empreendedorismo e competências do futuro no centro de cada programa — ideal para famílias que querem viver na cidade sem abdicar da qualidade.",
        highlights: ["Foco em Tecnologia", "Campus Moderno", "Localização Central"],
        trustBadges: ["Foco em Tecnologia", "Localização Central", "Reputação Crescente"],
        verdict:
          "A escolha urbana para famílias orientadas para a tecnologia — propinas mais acessíveis desta lista com a verdadeira energia de Lisboa.",
        parentWhisper:
          "\"Viver e estudar no Parque das Nações é perfeito. Vamos a pé para a escola junto ao rio todas as manhãs.\" — Pai holandês, chegou em 2024",
      },
      de: {
        description:
          "Ein moderner Hochcampus im Herzen von Lissabons zeitgenössischstem Viertel. United Lisbon stellt Technologie, Unternehmertum und Zukunftsfähigkeiten in den Mittelpunkt jedes Programms — ideal für Familien, die Stadtleben ohne Abstriche bei der Qualität wünschen.",
        highlights: ["Technologiefokus", "Moderner Campus", "Zentrale Lage"],
        trustBadges: ["Technologiefokus", "Zentrale Lage", "Wachsender Ruf"],
        verdict:
          "Die urbane Wahl für technologieorientierte Familien — günstigste Schulgebühren auf dieser Liste mit echter Lissabonner Energie.",
        parentWhisper:
          "\"Leben und Lernen in Parque das Nações ist perfekt. Wir gehen jeden Morgen am Fluss entlang zur Schule.\" — Niederländische Eltern, umgezogen 2024",
      },
      fr: {
        description:
          "Un campus vertical moderne au cœur du quartier le plus contemporain de Lisbonne. United Lisbon place la technologie, l'entrepreneuriat et les compétences du futur au centre de chaque programme — idéal pour les familles qui souhaitent la vie urbaine sans compromis sur la qualité.",
        highlights: ["Axé sur la Technologie", "Campus Moderne", "Emplacement Central"],
        trustBadges: ["Axé sur la Technologie", "Emplacement Central", "Réputation Croissante"],
        verdict:
          "Le choix urbain pour les familles tournées vers la technologie — les frais les plus accessibles de cette liste avec la vraie énergie de Lisbonne.",
        parentWhisper:
          "\"Vivre et étudier à Parque das Nações est parfait. Nous marchons jusqu'à l'école le long du fleuve chaque matin.\" — Parent néerlandais, relocalisé en 2024",
      },
      nl: {
        description:
          "Een moderne verticale campus in het hart van Lissabons meest hedendaagse wijk. United Lisbon plaatst technologie, ondernemerschap en toekomstvaardigheden centraal in elk programma — ideaal voor gezinnen die willen leven in de stad zonder concessies te doen aan kwaliteit.",
        highlights: ["Technologiegericht", "Moderne Campus", "Centrale Ligging"],
        trustBadges: ["Technologiegericht", "Centrale Ligging", "Groeiende Reputatie"],
        verdict:
          "De stedelijke keuze voor technologiegerichte gezinnen — de meest toegankelijke tarieven op deze lijst met echte Lissabonse energie.",
        parentWhisper:
          "\"Wonen en naar school gaan in Parque das Nações is naadloos. We lopen elke ochtend langs de rivier naar school.\" — Nederlandse ouder, verhuisd in 2024",
      },
      es: {
        description:
          "Un moderno campus vertical en el corazón del barrio más contemporáneo de Lisboa. United Lisbon sitúa la tecnología, el emprendimiento y las habilidades del futuro en el centro de cada programa — ideal para familias que quieren vida urbana sin renunciar a la calidad.",
        highlights: ["Enfoque Tecnológico", "Campus Moderno", "Ubicación Céntrica"],
        trustBadges: ["Enfoque Tecnológico", "Ubicación Céntrica", "Reputación en Crecimiento"],
        verdict:
          "La elección urbana para familias orientadas a la tecnología — las cuotas más accesibles de esta lista con la verdadera energía de Lisboa.",
        parentWhisper:
          "\"Vivir y estudiar en Parque das Nações es perfecto. Caminamos al colegio junto al río cada mañana.\" — Padre holandés, reubicado en 2024",
      },
    },
  },
];

/** Decode URL-encoded IDs and convert to clean URL slugs, transliterating accented chars */
function sanitizeSlug(id: string): string {
  return decodeURIComponent(id)
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ýÿ]/g, "y")
    .replace(/[ñ]/g, "n")
    .replace(/[ç]/g, "c")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Build a factual auto-description from available structured data */
function buildAutoDescription(s: {
  name: string;
  type?: string | null;
  location?: { city?: string | null };
  academics?: { curriculum?: string[] | null; qualifications?: string[] | null };
  enrollment?: { age_range_years?: string | null; total_students?: number | null };
  fees?: { annual_min_eur?: number | null; annual_max_eur?: number | null };
  expat_family_features?: { english_as_primary?: boolean | null };
}): string {
  const parts: string[] = [];
  const city = s.location?.city ? `${s.location.city}, Portugal` : "Portugal";
  const schoolType =
    s.type?.toLowerCase() === "international" ? "international" : "private";
  const article = schoolType === "international" ? "an" : "a";
  parts.push(`${s.name} is ${article} ${schoolType} school in ${city}.`);
  if (s.academics?.curriculum?.length) {
    parts.push(`Curriculum: ${s.academics.curriculum.join(", ")}.`);
  }
  if (s.academics?.qualifications?.length) {
    parts.push(`Qualifications: ${s.academics.qualifications.join(", ")}.`);
  }
  if (s.enrollment?.age_range_years) {
    parts.push(`Ages ${s.enrollment.age_range_years}.`);
  }
  if (s.fees?.annual_min_eur) {
    const min = Math.round(s.fees.annual_min_eur).toLocaleString("en-US");
    const maxSuffix =
      s.fees.annual_max_eur &&
      s.fees.annual_max_eur !== s.fees.annual_min_eur
        ? ` – €${Math.round(s.fees.annual_max_eur).toLocaleString("en-US")}`
        : "";
    parts.push(`Annual fees: €${min}${maxSuffix}.`);
  }
  if (s.expat_family_features?.english_as_primary === true) {
    parts.push("English is the primary language of instruction.");
  }
  if (s.enrollment?.total_students) {
    parts.push(`${s.enrollment.total_students} students enrolled.`);
  }
  return parts.join(" ");
}

const importedSchools: School[] = (rawSchools as any[])
  // Filter out non-school entries and low-quality data
  .filter((s) =>
    s.name &&
    !s.name.startsWith("Wikipedia:") &&
    s.meta?.data_confidence !== "Low"
  )
  .map((s) => {
    const slug = sanitizeSlug(s.id);
    const autoDescription = buildAutoDescription(s);
    const schoolBusRaw = s.expat_family_features?.school_bus_routes;
    const schoolBusRoutes =
      schoolBusRaw == null
        ? undefined
        : Array.isArray(schoolBusRaw)
          ? schoolBusRaw.length > 0
          : Boolean(schoolBusRaw);

    return {
      id: s.id,
      slug,
      name: s.name,
      location: s.location?.city
        ? `${s.location.city}${s.location.region ? `, ${s.location.region}` : ""}`
        : "Portugal",
      // B1 fix: no neighborhoodSlug for imported schools — avoids 404 on /neighborhoods/portugal
      curriculum:
        s.academics?.curriculum?.length > 0
          ? s.academics.curriculum.join(", ")
          : "International",
      fees: s.fees?.annual_min_eur
        ? `€${Math.round(s.fees.annual_min_eur).toLocaleString("en-US")}` +
          (s.fees.annual_max_eur &&
          s.fees.annual_max_eur !== s.fees.annual_min_eur
            ? ` – €${Math.round(s.fees.annual_max_eur).toLocaleString("en-US")}`
            : "")
        : "Contact school",
      acceptanceRate: s.enrollment?.acceptance_rate || undefined,
      coordinates: s.location?.coordinates ?? null,
      // New enriched fields from improved scraper
      ageRange: s.enrollment?.age_range_years || undefined,
      schoolType: s.type || undefined,
      website: s.contact?.website || undefined,
      englishAsPrimary: s.expat_family_features?.english_as_primary ?? undefined,
      schoolBusRoutes,
      dataConfidence: s.meta?.data_confidence || undefined,
      studentCount: s.enrollment?.total_students || undefined,
      admissionProcess:
        typeof s.admission_process === "string" && s.admission_process.trim()
          ? s.admission_process.trim()
          : undefined,
      extracurriculars:
        Array.isArray(s.expat_family_features?.extracurricular_activities) &&
        s.expat_family_features.extracurricular_activities.length > 0
          ? s.expat_family_features.extracurricular_activities
          : undefined,
      transport:
        typeof s.expat_family_features?.transport === "string" &&
        s.expat_family_features.transport.trim()
          ? s.expat_family_features.transport.trim()
          : undefined,
      languageSupport:
        typeof s.language_support === "string" && s.language_support.trim()
          ? s.language_support.trim()
          : undefined,
      rawDescription:
        Array.isArray(s.description) && s.description.length > 0
          ? s.description
          : undefined,
      snippet: (() => {
        const nc = typeof s.narrative_context === "string" ? s.narrative_context : "";
        const idx = nc.indexOf(s.name);
        return idx >= 0 ? nc.slice(idx).trim() : undefined;
      })(),
      qualifications:
        Array.isArray(s.academics?.qualifications) &&
        s.academics.qualifications.length > 0
          ? s.academics.qualifications
          : undefined,
      classSize: s.enrollment?.class_size_avg ?? undefined,
      nationalities: s.enrollment?.student_nationalities ?? undefined,
      coverImageUrl:
        typeof s.images?.cover_url === "string" && s.images.cover_url.trim()
          ? s.images.cover_url.trim()
          : undefined,
      imageAlt:
        typeof s.images?.alt === "string" && s.images.alt.trim()
          ? s.images.alt.trim()
          : undefined,
      rawRegion:
        typeof s.location?.region === "string" && s.location.region.trim()
          ? s.location.region.trim()
          : undefined,
      translations: {
        en: {
          description: autoDescription || undefined,
        },
      },
    };
  });

const curatedSlugs = new Set([
  ...curatedSchools.map(c => c.slug),
  // Raw JSON ids for curated schools whose slug differs from the JSON id
  "st-julian's-school-lisbon",
  "tasis-portugal-lisbon",
  "carlucci-american-international-school-of-lisbon",
]);
const curatedNames = new Set(curatedSchools.map(c => c.name.toLowerCase()));
const filteredImports = importedSchools.filter(
  s => !curatedSlugs.has(s.slug) && !curatedNames.has(s.name.toLowerCase())
);

export const schoolsData: School[] = [...curatedSchools, ...filteredImports];
