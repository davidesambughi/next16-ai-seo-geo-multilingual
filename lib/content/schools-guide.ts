/**
 * Schools Guide prose content — all 6 locales in one file.
 *
 * Architecture: Option C extended — locale-keyed strings, same pattern as lib/schools-data.ts.
 * Usage:  const c = getSchoolsGuideContent(locale)
 *
 * Locale order throughout this file: en · pt · de · fr · nl · es
 */

type L = "en" | "pt" | "de" | "fr" | "nl" | "es";
type T = Record<L, string>;

const t = (
  en: string,
  pt: string,
  de: string,
  fr: string,
  nl: string,
  es: string
): T => ({ en, pt, de, fr, nl, es });

/**
 * GUIDE_SCHOOL_FACTS — Single source of truth for school
 * facts used in this guide's prose content.
 *
 * WHY NOT import from lib/data/schools.ts?
 * → schools.ts fees are string ranges ("€18,000 – €32,000"),
 *   not parsed min/max numbers
 * → wait times don't exist in schools.ts at all
 * → JSON database has many nulls, these values are manually verified
 *
 * @sync-check: if you update curatedSchools in lib/data/schools.ts,
 * update these values too.
 *
 * TODO: when schools.ts has parsed numeric fees and wait times,
 * replace this with a direct import.
 */
const GUIDE_SCHOOL_FACTS = {
  stJulians:    { rate: "8%",  wait: "12–18 months" },
  tasis:        { rate: "18%", wait: "6–12 months"  },
  caisl:        { rate: "35%", wait: "3–6 months"   },
  unitedLisbon: { rate: "45%", wait: "1–3 months"   },
} as const;

// ── HEADER ────────────────────────────────────────────────────────────────────

const header = {
  updatedDate: t(
    "Updated February 2026",
    "Atualizado fevereiro 2026",
    "Aktualisiert Februar 2026",
    "Mis à jour février 2026",
    "Bijgewerkt februari 2026",
    "Actualizado febrero 2026"
  ),
  schoolsReviewedLabel: t(
    "{count} schools reviewed",
    "{count} escolas avaliadas",
    "{count} Schulen bewertet",
    "{count} écoles examinées",
    "{count} scholen beoordeeld",
    "{count} escuelas evaluadas"
  ),
  byline: t(
    "Raising Kids in Portugal Editorial",
    "Raising Kids in Portugal Editorial",
    "Raising Kids in Portugal Editorial",
    "Raising Kids in Portugal Éditorial",
    "Raising Kids in Portugal Redactioneel",
    "Raising Kids in Portugal Editorial"
  ),
  h1: t(
    "Best Private & Public International Schools Portugal 2026",
    "Melhores Escolas Internacionais Privadas e Públicas em Portugal 2026",
    "Beste private und öffentliche internationale Schulen Portugal 2026",
    "Meilleures écoles internationales privées et publiques au Portugal 2026",
    "Beste private en openbare internationale scholen Portugal 2026",
    "Mejores escuelas internacionales privadas y públicas en Portugal 2026"
  ),
  subtitle: t(
    "An independent comparison of the top international schools near Lisbon. We review IB, British, and American curricula — with real acceptance rates, all-in fee breakdowns, and editorial verdicts based on first-hand school visits. No paid placements. No sponsored rankings.",
    "Uma comparação independente das principais escolas internacionais perto de Lisboa. Avaliamos currículos IB, britânico e americano — com taxas de aceitação reais, análise detalhada de custos totais e veredictos editoriais baseados em visitas presenciais. Sem pagamentos de colocação. Sem rankings patrocinados.",
    "Ein unabhängiger Vergleich der besten internationalen Schulen in der Nähe von Lissabon. Wir bewerten IB-, britische und amerikanische Lehrpläne — mit realen Aufnahmequoten, vollständigen Kostenaufschlüsselungen und redaktionellen Urteilen auf Basis persönlicher Schulbesuche. Keine bezahlten Platzierungen. Kein gesponsertes Ranking.",
    "Une comparaison indépendante des meilleures écoles internationales près de Lisbonne. Nous examinons les programmes IB, britannique et américain — avec de vrais taux d'acceptation, des analyses détaillées des frais et des verdicts éditoriaux basés sur des visites en personne. Pas de placements payants. Pas de classements sponsorisés.",
    "Een onafhankelijke vergelijking van de beste internationale scholen in de buurt van Lissabon. We beoordelen IB-, Britse en Amerikaanse curricula — met werkelijke toelatingscijfers, uitgebreide kostenanalyses en redactionele oordelen op basis van persoonlijke schoolbezoeken. Geen betaalde plaatsingen. Geen gesponsorde ranglijsten.",
    "Una comparación independiente de las mejores escuelas internacionales cerca de Lisboa. Revisamos currículos IB, británico y americano — con tasas de aceptación reales, desgloses completos de costes y veredictos editoriales basados en visitas presenciales. Sin colocaciones pagadas. Sin clasificaciones patrocinadas."
  ),
} as const;

// ── KEY TAKEAWAYS ─────────────────────────────────────────────────────────────

const keyTakeaways = {
  heading: t(
    "Key takeaways",
    "Pontos-chave",
    "Wesentliche Erkenntnisse",
    "Points clés",
    "Kernpunten",
    "Puntos clave"
  ),
  // item1 uses {count} placeholder — replace in page with String(schoolsData.length)
  item1: t(
    "There are {count} top internationally accredited schools within 45 minutes of Lisbon — covering IB, British (IGCSE), and American curricula.",
    "Existem {count} escolas de topo com acreditação internacional a 45 minutos de Lisboa — cobrindo currículos IB, britânico (IGCSE) e americano.",
    "Es gibt {count} international akkreditierte Spitzenschulen innerhalb von 45 Minuten von Lissabon — mit IB-, britischem (IGCSE) und amerikanischem Lehrplan.",
    "Il existe {count} écoles internationales accréditées de premier plan à 45 minutes de Lisbonne — couvrant les programmes IB, britannique (IGCSE) et américain.",
    "Er zijn {count} internationaal geaccrediteerde topscholen binnen 45 minuten van Lissabon — met IB-, Britse (IGCSE) en Amerikaanse curricula.",
    "Hay {count} escuelas de primer nivel con acreditación internacional a 45 minutos de Lisboa — cubriendo currículos IB, británico (IGCSE) y americano."
  ),
  // @sync-check: €12,000 = curatedSchools[3].fees min (United Lisbon); €32,000 = curatedSchools[1].fees max (TASIS Portugal)
  item2: t(
    "Annual fees range from €12,000 (United Lisbon) to €32,000 (TASIS Portugal). All-in costs including transport and extras are 15–30% higher than headline tuition.",
    "As propinas anuais variam entre €12.000 (United Lisbon) e €32.000 (TASIS Portugal). Os custos totais incluindo transporte e extras são 15–30% superiores à propina base.",
    "Die Jahresgebühren reichen von €12.000 (United Lisbon) bis €32.000 (TASIS Portugal). Die Gesamtkosten einschließlich Transport und Extras sind 15–30% höher als die Grundgebühr.",
    "Les frais annuels vont de 12 000 € (United Lisbon) à 32 000 € (TASIS Portugal). Les coûts globaux incluant le transport et les extras sont 15–30% supérieurs aux frais de base.",
    "De jaarlijkse schoolkosten variëren van €12.000 (United Lisbon) tot €32.000 (TASIS Portugal). De totale kosten inclusief transport en extra's zijn 15–30% hoger dan het basisbedrag.",
    "Las tasas anuales oscilan entre €12.000 (United Lisbon) y €32.000 (TASIS Portugal). Los costes totales incluyendo transporte y extras son un 15–30% superiores a la matrícula base."
  ),
  item3: t(
    `Acceptance rates vary widely: ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) to ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Apply to 2–3 schools simultaneously.`,
    `As taxas de aceitação variam significativamente: ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) a ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Candidate-se a 2–3 escolas em simultâneo.`,
    `Die Aufnahmequoten variieren stark: ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) bis ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Bewerben Sie sich gleichzeitig bei 2–3 Schulen.`,
    `Les taux d'acceptation varient considérablement : ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) à ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Postulez dans 2–3 écoles simultanément.`,
    `De acceptatiepercentages variëren sterk: ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) tot ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Solliciteer tegelijkertijd bij 2–3 scholen.`,
    `Las tasas de aceptación varían ampliamente: ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) hasta ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Solicite plaza en 2–3 escuelas simultáneamente.`
  ),
  item4: t(
    "All four schools offer the IB Diploma Programme — the most portable qualification for internationally mobile families.",
    "Todas as quatro escolas oferecem o Programa de Diploma IB — a qualificação mais portátil para famílias internacionalmente móveis.",
    "Alle vier Schulen bieten das IB-Diploma-Programm an — die portabelste Qualifikation für international mobile Familien.",
    "Les quatre écoles proposent le Programme du Diplôme IB — la qualification la plus portable pour les familles mobiles à l'international.",
    "Alle vier de scholen bieden het IB Diploma Programme aan — de meest overdraagbare kwalificatie voor internationaal mobiele gezinnen.",
    "Las cuatro escuelas ofrecen el Programa del Diploma IB — la cualificación más portable para familias con movilidad internacional."
  ),
  item5: t(
    `St. Julian's School (Carcavelos): best overall, British/IB curriculum, top IB results, ${GUIDE_SCHOOL_FACTS.stJulians.rate} acceptance rate — apply ${GUIDE_SCHOOL_FACTS.stJulians.wait} ahead.`,
    `St. Julian's School (Carcavelos): a melhor no geral, currículo britânico/IB, melhores resultados IB, taxa de aceitação de ${GUIDE_SCHOOL_FACTS.stJulians.rate} — candidate-se com ${GUIDE_SCHOOL_FACTS.stJulians.wait} de antecedência.`,
    `St. Julian's School (Carcavelos): insgesamt die beste, britischer/IB-Lehrplan, beste IB-Ergebnisse, ${GUIDE_SCHOOL_FACTS.stJulians.rate} Aufnahmequote — ${GUIDE_SCHOOL_FACTS.stJulians.wait} im Voraus bewerben.`,
    `St. Julian's School (Carcavelos) : la meilleure dans l'ensemble, programme britannique/IB, meilleurs résultats IB, taux d'acceptation de ${GUIDE_SCHOOL_FACTS.stJulians.rate} — postulez ${GUIDE_SCHOOL_FACTS.stJulians.wait} à l'avance.`,
    `St. Julian's School (Carcavelos): beste overall, Brits/IB curriculum, beste IB-resultaten, ${GUIDE_SCHOOL_FACTS.stJulians.rate} acceptatiepercentage — solliciteer ${GUIDE_SCHOOL_FACTS.stJulians.wait} van tevoren.`,
    `St. Julian's School (Carcavelos): la mejor en general, currículo británico/IB, mejores resultados IB, tasa de aceptación del ${GUIDE_SCHOOL_FACTS.stJulians.rate} — solicite con ${GUIDE_SCHOOL_FACTS.stJulians.wait} de antelación.`
  ),
  item6: t(
    "United Lisbon International School: best value, American/IB, most accessible, walking distance from Parque das Nações.",
    "United Lisbon International School: melhor custo-benefício, americano/IB, mais acessível, a pé do Parque das Nações.",
    "United Lisbon International School: bestes Preis-Leistungs-Verhältnis, amerikanisch/IB, am zugänglichsten, Fußweg vom Parque das Nações.",
    "United Lisbon International School : meilleur rapport qualité-prix, américain/IB, la plus accessible, à distance de marche du Parque das Nações.",
    "United Lisbon International School: beste prijs-kwaliteitverhouding, Amerikaans/IB, meest toegankelijk, op loopafstand van Parque das Nações.",
    "United Lisbon International School: mejor relación calidad-precio, americano/IB, más accesible, a distancia a pie del Parque das Nações."
  ),
  item7: t(
    "For September entry, schools open applications October–December the preceding year. Shadow days (where your child attends classes) are recommended before committing.",
    "Para entrada em setembro, as escolas abrem candidaturas de outubro a dezembro do ano anterior. Dias de observação (onde o seu filho frequenta aulas) são recomendados antes de se comprometer.",
    "Für den September-Eintritt öffnen Schulen die Bewerbungen von Oktober bis Dezember des Vorjahres. Schnuppertage (bei denen Ihr Kind am Unterricht teilnimmt) werden vor der Entscheidung empfohlen.",
    "Pour une rentrée en septembre, les écoles ouvrent les candidatures d'octobre à décembre de l'année précédente. Des journées d'observation (où votre enfant assiste aux cours) sont recommandées avant de vous engager.",
    "Voor instroom in september openen scholen de aanmeldingen van oktober tot december van het voorafgaande jaar. Schaduwdagen (waarbij uw kind deelneemt aan lessen) worden aanbevolen voordat u zich verbindt.",
    "Para la entrada en septiembre, las escuelas abren las solicitudes de octubre a diciembre del año anterior. Se recomiendan jornadas de observación (donde su hijo asiste a las clases) antes de comprometerse."
  ),
} as const;

// ── TABLE OF CONTENTS ─────────────────────────────────────────────────────────

const toc = {
  heading: t("In this guide", "Neste guia", "In diesem Leitfaden", "Dans ce guide", "In deze gids", "En esta guía"),
  overview:    t("Overview",          "Visão geral",          "Überblick",              "Aperçu",               "Overzicht",          "Resumen"),
  curriculum:  t("Curriculum Guide",  "Guia curricular",      "Lehrplan-Leitfaden",     "Guide des programmes", "Curriculumgids",     "Guía curricular"),
  fees:        t("Real Cost of Fees", "Custo real das propinas", "Reale Kosten der Gebühren", "Coût réel des frais", "Werkelijke kosten", "Coste real de las tasas"),
  admissions:  t("Admissions Reality","Realidade das admissões","Zulassungsrealität",    "Réalité des admissions","Toelatingswerkelijkheid","Realidad de las admisiones"),
  methodology: t("Our Methodology",   "A nossa metodologia",  "Unsere Methodik",        "Notre méthodologie",   "Onze methodologie",  "Nuestra metodología"),
  schools:     t("School Profiles",   "Perfis das escolas",   "Schulprofile",           "Profils des écoles",   "Schoolprofielen",    "Perfiles de las escuelas"),
  faq:         t("FAQ",               "FAQ",                  "FAQ",                    "FAQ",                  "FAQ",                "FAQ"),
} as const;

// ── SECTION 1 — OVERVIEW ──────────────────────────────────────────────────────

const overview = {
  h2: t(
    "1. What is the international school market in Portugal?",
    "1. Visão geral: o mercado de escolas internacionais em Portugal",
    "1. Überblick: Portugals internationaler Schulmarkt",
    "1. Aperçu : le marché des écoles internationales au Portugal",
    "1. Overzicht: de internationale schoolmarkt in Portugal",
    "1. Resumen: el mercado de escuelas internacionales en Portugal"
  ),
  p1: t(
    "Within a 45-minute radius of Lisbon, four internationally accredited schools cover the three major curricula sought by relocating families: British (IGCSE + IB Diploma), American (US graduation pathway + IB Diploma), and pure IB. This concentration is exceptional by European standards — comparable regions in Spain, France, or Germany rarely offer this level of choice within a single commuter zone.",
    "Num raio de 45 minutos de Lisboa, quatro escolas com acreditação internacional cobrem os três grandes currículos procurados por famílias em recolocação: britânico (IGCSE + Diploma IB), americano (percurso de graduação americano + Diploma IB) e IB puro. Esta concentração é excecional pelos padrões europeus — regiões comparáveis em Espanha, França ou Alemanha raramente oferecem este nível de escolha numa única zona de deslocação.",
    "Innerhalb eines 45-Minuten-Radius von Lissabon decken vier international akkreditierte Schulen die drei wichtigsten Lehrpläne ab, die umziehende Familien suchen: britisch (IGCSE + IB Diploma), amerikanisch (US-Abschlussweg + IB Diploma) und reines IB. Diese Konzentration ist nach europäischen Maßstäben außergewöhnlich — vergleichbare Regionen in Spanien, Frankreich oder Deutschland bieten selten dieses Maß an Auswahl in einer einzigen Pendlerzone.",
    "Dans un rayon de 45 minutes de Lisbonne, quatre écoles internationalement accréditées couvrent les trois grands programmes recherchés par les familles en relocalisation : britannique (IGCSE + diplôme IB), américain (parcours de diplôme américain + diplôme IB) et IB pur. Cette concentration est exceptionnelle selon les normes européennes — des régions comparables en Espagne, en France ou en Allemagne offrent rarement ce niveau de choix dans une seule zone de navetteurs.",
    "Binnen een straal van 45 minuten van Lissabon bestrijken vier internationaal geaccrediteerde scholen de drie belangrijkste curricula waar verhuizende gezinnen naar op zoek zijn: Brits (IGCSE + IB Diploma), Amerikaans (Amerikaans diplomatraject + IB Diploma) en puur IB. Deze concentratie is uitzonderlijk naar Europese maatstaven — vergelijkbare regio's in Spanje, Frankrijk of Duitsland bieden zelden dit niveau van keuze binnen één forensenzone.",
    "En un radio de 45 minutos de Lisboa, cuatro escuelas con acreditación internacional cubren los tres principales currículos buscados por familias en reubicación: británico (IGCSE + Diploma IB), americano (vía de graduación americana + Diploma IB) e IB puro. Esta concentración es excepcional según los estándares europeos — regiones comparables en España, Francia o Alemania raramente ofrecen este nivel de elección dentro de una sola zona de commuters."
  ),
  // @sync-check: fee span = curatedSchools[3].fees min (United Lisbon) to curatedSchools[1].fees max (TASIS Portugal)
  p2: t(
    `The market is not uniform. Acceptance rates range from ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) to ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Annual fees span €12,000 to €32,000. The right school for your family depends on curriculum alignment with your long-term plan, genuine lifestyle fit, and a realistic assessment of your application strength.`,
    `O mercado não é uniforme. As taxas de aceitação variam de ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) a ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). As propinas anuais vão de €12.000 a €32.000. A escola certa para a sua família depende da compatibilidade curricular com o seu plano a longo prazo, da verdadeira adequação ao estilo de vida e de uma avaliação realista da sua candidatura.`,
    `Der Markt ist nicht einheitlich. Die Aufnahmequoten reichen von ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) bis ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Die Jahresgebühren liegen zwischen €12.000 und €32.000. Die richtige Schule für Ihre Familie hängt von der Lehrplanausrichtung mit Ihrem langfristigen Plan, der echten Lebensqualitätspassung und einer realistischen Einschätzung Ihrer Bewerbungsstärke ab.`,
    `Le marché n'est pas uniforme. Les taux d'acceptation vont de ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) à ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Les frais annuels s'étendent de 12 000 à 32 000 €. La bonne école pour votre famille dépend de l'alignement des programmes avec votre plan à long terme, d'une véritable adéquation de style de vie et d'une évaluation réaliste de votre profil de candidat.`,
    `De markt is niet uniform. De acceptatiepercentages variëren van ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) tot ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). De jaarlijkse schoolkosten liggen tussen €12.000 en €32.000. De juiste school voor uw gezin hangt af van de afstemming van het curriculum op uw langetermijnplan, een echte levensstijlfit en een realistische beoordeling van uw sollicitatiesterkte.`,
    `El mercado no es uniforme. Las tasas de aceptación oscilan entre el ${GUIDE_SCHOOL_FACTS.stJulians.rate} (St. Julian's School) y el ${GUIDE_SCHOOL_FACTS.unitedLisbon.rate} (United Lisbon International School). Las tasas anuales van de €12.000 a €32.000. La escuela adecuada para su familia depende de la alineación curricular con su plan a largo plazo, un ajuste genuino al estilo de vida y una evaluación realista de su candidatura.`
  ),
  // p3 has inline link to /school-finder — split pre / linkText / post
  p3Pre: t(
    "This guide walks through each of those dimensions before presenting the school profiles. If you want a direct match based on your specific situation, use our\u00a0",
    "Este guia percorre cada uma dessas dimensões antes de apresentar os perfis das escolas. Se pretende uma correspondência direta com base na sua situação específica, use o nosso\u00a0",
    "Dieser Leitfaden geht jede dieser Dimensionen durch, bevor er die Schulprofile vorstellt. Wenn Sie eine direkte Übereinstimmung basierend auf Ihrer spezifischen Situation wünschen, nutzen Sie unser\u00a0",
    "Ce guide passe en revue chacune de ces dimensions avant de présenter les profils des écoles. Si vous souhaitez une correspondance directe basée sur votre situation spécifique, utilisez notre\u00a0",
    "Deze gids behandelt elk van die dimensies voordat de schoolprofielen worden gepresenteerd. Als u een directe match op basis van uw specifieke situatie wilt, gebruik dan onze\u00a0",
    "Esta guía recorre cada una de esas dimensiones antes de presentar los perfiles de las escuelas. Si desea una coincidencia directa basada en su situación específica, utilice nuestro\u00a0"
  ),
  p3LinkText: t(
    "60-second School Finder quiz",
    "questionário School Finder de 60 segundos",
    "60-Sekunden-School-Finder-Quiz",
    "quiz School Finder en 60 secondes",
    "60-seconden School Finder quiz",
    "cuestionario School Finder de 60 segundos"
  ),
} as const;

// ── SECTION 2 — CURRICULUM ────────────────────────────────────────────────────

const curriculum = {
  h2: t(
    "2. Which school curriculum is right for your children?",
    "2. Guia curricular: qual percurso é o certo para os seus filhos",
    "2. Lehrplan-Leitfaden: welcher Weg ist der richtige für Ihre Kinder",
    "2. Guide des programmes : quelle filière est la bonne pour vos enfants",
    "2. Curriculumgids: welk traject is het juiste voor uw kinderen",
    "2. Guía curricular: qué vía es la correcta para sus hijos"
  ),
  p1: t(
    "The curriculum decision is the most consequential choice you will make — and the one most families underestimate. It affects university admissions, exam schedules, and how smoothly your children transition if you move again.",
    "A decisão curricular é a escolha mais consequente que vai tomar — e a que a maioria das famílias subestima. Afeta as admissões universitárias, os calendários de exames e a facilidade com que os seus filhos transitam se se mudarem novamente.",
    "Die Lehrplanentscheidung ist die folgenreichste Wahl, die Sie treffen werden — und diejenige, die die meisten Familien unterschätzen. Sie beeinflusst Hochschulzulassungen, Prüfungspläne und wie reibungslos Ihre Kinder wechseln, wenn Sie erneut umziehen.",
    "Le choix du programme est la décision la plus lourde de conséquences que vous prendrez — et celle que la plupart des familles sous-estiment. Il affecte les admissions à l'université, les calendriers d'examens et la fluidité avec laquelle vos enfants s'adaptent si vous déménagez à nouveau.",
    "De curriculumkeuze is de meest ingrijpende beslissing die u zult nemen — en degene die de meeste gezinnen onderschatten. Het beïnvloedt universitaire toelating, examenroosters en hoe soepel uw kinderen de overgang maken als u opnieuw verhuist.",
    "La decisión curricular es la elección más trascendente que tomará — y la que la mayoría de las familias subestima. Afecta a las admisiones universitarias, los calendarios de exámenes y la fluidez con la que sus hijos se adaptan si se trasladan de nuevo."
  ),
  offeredBy: t("Offered by:", "Oferecido por:", "Angeboten von:", "Proposé par :", "Aangeboden door:", "Ofrecido por:"),
  notePrefix: t("Raising Kids in Portugal note:", "Nota Raising Kids in Portugal:", "Raising Kids in Portugal-Hinweis:", "Note Raising Kids in Portugal :", "Raising Kids in Portugal-opmerking:", "Nota Raising Kids in Portugal:"),
  noteText: t(
    " If you're genuinely undecided between British and American tracks, choose a school with a strong IB Diploma programme — all four schools on this list qualify. The IB eliminates the conversion problem if your family moves again.",
    " Se estiver genuinamente indeciso entre os percursos britânico e americano, escolha uma escola com um forte programa de Diploma IB — todas as quatro escolas desta lista qualificam. O IB elimina o problema de conversão se a sua família se mudar novamente.",
    " Wenn Sie wirklich unentschlossen zwischen britischen und amerikanischen Lehrplänen sind, wählen Sie eine Schule mit einem starken IB-Diploma-Programm — alle vier Schulen auf dieser Liste qualifizieren sich. Das IB beseitigt das Umwandlungsproblem, wenn Ihre Familie erneut umzieht.",
    " Si vous êtes vraiment indécis entre les filières britannique et américaine, choisissez une école avec un solide programme de Diplôme IB — les quatre écoles de cette liste y répondent. L'IB élimine le problème de conversion si votre famille déménage à nouveau.",
    " Als u echt onbeslist bent tussen Britse en Amerikaanse trajecten, kies dan een school met een sterk IB Diploma programme — alle vier de scholen op deze lijst kwalificeren. Het IB elimineert het conversieprobleem als uw gezin opnieuw verhuist.",
    " Si está genuinamente indeciso entre las vías británica y americana, elija una escuela con un sólido programa de Diploma IB — las cuatro escuelas de esta lista califican. El IB elimina el problema de conversión si su familia se traslada de nuevo."
  ),
  ibSource: t("IB data source:", "Fonte de dados IB:", "IB-Datenquelle:", "Source des données IB :", "IB-gegevensbron:", "Fuente de datos IB:"),
} as const;

// curriculum cards — array, one entry per card
const curriculumCards = [
  {
    tag:      t("British — IGCSE + A-Levels or IB Diploma", "Britânico — IGCSE + A-Levels ou Diploma IB", "Britisch — IGCSE + A-Levels oder IB Diploma", "Britannique — IGCSE + A-Levels ou diplôme IB", "Brits — IGCSE + A-Levels of IB Diploma", "Británico — IGCSE + A-Levels o Diploma IB"),
    tagColor: "bg-brand-light text-brand" as const,
    school:   t("St. Julian's School", "St. Julian's School", "St. Julian's School", "St. Julian's School", "St. Julian's School", "St. Julian's School"),
    content:  t(
      "The British track (IGCSEs at 14–16, then A-Levels or IB at 16–18) is the smoothest path for families who may return to the UK or apply to British universities. IGCSE results are internationally recognised, but A-Levels remain the gold standard for UK admissions. St. Julian's offers both pathways. If UK university admission is the primary goal, the A-Level route outperforms IB at the most selective institutions.",
      "O percurso britânico (IGCSEs dos 14–16 anos, depois A-Levels ou IB dos 16–18) é o caminho mais direto para famílias que possam regressar ao Reino Unido ou candidatar-se a universidades britânicas. Os resultados IGCSE são internacionalmente reconhecidos, mas os A-Levels continuam a ser o padrão ouro para admissões no Reino Unido. A St. Julian's oferece ambas as vias. Se a admissão numa universidade britânica for o objetivo principal, o percurso A-Level supera o IB nas instituições mais seletivas.",
      "Der britische Weg (IGCSEs im Alter von 14–16, dann A-Levels oder IB im Alter von 16–18) ist der reibungsloseste Weg für Familien, die möglicherweise in das Vereinigte Königreich zurückkehren oder sich an britischen Universitäten bewerben. IGCSE-Ergebnisse sind international anerkannt, aber A-Levels bleiben der Goldstandard für UK-Zulassungen. Die St. Julian's bietet beide Wege an. Wenn die Zulassung an einer britischen Universität das Hauptziel ist, übertrifft der A-Level-Weg das IB an den selektivsten Institutionen.",
      "La filière britannique (IGCSEs entre 14–16 ans, puis A-Levels ou IB entre 16–18 ans) est le chemin le plus fluide pour les familles qui pourraient retourner au Royaume-Uni ou postuler dans des universités britanniques. Les résultats IGCSE sont internationalement reconnus, mais les A-Levels restent l'étalon-or pour les admissions au Royaume-Uni. La St. Julian's propose les deux voies. Si l'admission dans une université britannique est l'objectif principal, la voie A-Level surpasse l'IB dans les établissements les plus sélectifs.",
      "Het Britse traject (IGCSEs op 14–16 jaar, dan A-Levels of IB op 16–18) is de soepelste weg voor gezinnen die mogelijk naar het VK terugkeren of aan Britse universiteiten willen studeren. IGCSE-resultaten zijn internationaal erkend, maar A-Levels blijven de gouden standaard voor VK-toelating. De St. Julian's biedt beide trajecten. Als toelating tot een Britse universiteit het primaire doel is, presteert de A-Level-route beter dan IB bij de meest selectieve instellingen.",
      "La vía británica (IGCSEs a los 14–16 años, luego A-Levels o IB a los 16–18) es el camino más fluido para familias que puedan regresar al Reino Unido o solicitar plaza en universidades británicas. Los resultados IGCSE son reconocidos internacionalmente, pero los A-Levels siguen siendo el estándar de oro para las admisiones en el Reino Unido. La St. Julian's ofrece ambas vías. Si la admisión en una universidad británica es el objetivo principal, la vía A-Level supera al IB en las instituciones más selectivas."
    ),
  },
  {
    tag:      t("American — US diploma + IB Diploma", "Americano — Diploma americano + Diploma IB", "Amerikanisch — US-Diplom + IB Diploma", "Américain — diplôme américain + diplôme IB", "Amerikaans — Amerikaans diploma + IB Diploma", "Americano — Diploma americano + Diploma IB"),
    tagColor: "bg-warm-light text-warm" as const,
    school:   t("TASIS Portugal · CAISL · United Lisbon", "TASIS Portugal · CAISL · United Lisbon", "TASIS Portugal · CAISL · United Lisbon", "TASIS Portugal · CAISL · United Lisbon", "TASIS Portugal · CAISL · United Lisbon", "TASIS Portugal · CAISL · United Lisbon"),
    content:  t(
      "The American track leads to a High School Diploma recognised by US colleges, supplemented by the IB Diploma or AP courses for competitive university applications. CAISL holds US State Department affiliation — a meaningful credential for American families. For families targeting US, Canadian, or Dutch universities, this path is the clearest.",
      "O percurso americano conduz a um Diploma de Ensino Secundário reconhecido pelas faculdades americanas, complementado pelo Diploma IB ou cursos AP para candidaturas universitárias competitivas. A CAISL tem afiliação ao Departamento de Estado dos EUA — uma credencial significativa para famílias americanas. Para famílias que pretendem universidades americanas, canadianas ou neerlandesas, este percurso é o mais claro.",
      "Der amerikanische Weg führt zu einem High-School-Diplom, das von US-Colleges anerkannt wird, ergänzt durch das IB-Diploma oder AP-Kurse für wettbewerbsfähige Universitätsbewerbungen. CAISL hat eine US-State-Department-Zugehörigkeit — ein bedeutendes Credential für amerikanische Familien. Für Familien, die auf US-, kanadische oder niederländische Universitäten abzielen, ist dieser Weg der klarste.",
      "La filière américaine mène à un diplôme de lycée reconnu par les universités américaines, complété par le diplôme IB ou des cours AP pour des candidatures universitaires compétitives. CAISL est affiliée au Département d'État américain — une référence significative pour les familles américaines. Pour les familles visant des universités américaines, canadiennes ou néerlandaises, cette voie est la plus directe.",
      "Het Amerikaanse traject leidt tot een High School Diploma dat erkend wordt door Amerikaanse universiteiten, aangevuld met het IB Diploma of AP-cursussen voor competitieve universiteitssollicitaties. CAISL heeft een US State Department-affiliatie — een betekenisvolle referentie voor Amerikaanse gezinnen. Voor gezinnen die zich richten op Amerikaanse, Canadese of Nederlandse universiteiten is dit traject het meest duidelijk.",
      "La vía americana conduce a un Diploma de Bachillerato reconocido por las universidades americanas, complementado con el Diploma IB o cursos AP para candidaturas universitarias competitivas. CAISL tiene afiliación con el Departamento de Estado de EE.UU. — una credencial significativa para familias americanas. Para familias que apuntan a universidades americanas, canadienses u holandesas, este es el camino más claro."
    ),
  },
  {
    tag:      t("IB Diploma — universally recognised", "Diploma IB — universalmente reconhecido", "IB Diploma — weltweit anerkannt", "Diplôme IB — universellement reconnu", "IB Diploma — universeel erkend", "Diploma IB — universalmente reconocido"),
    tagColor: "bg-trust-light text-trust" as const,
    school:   t("All four schools", "Todas as quatro escolas", "Alle vier Schulen", "Les quatre écoles", "Alle vier scholen", "Las cuatro escuelas"),
    content:  t(
      "All four schools on this list offer the IB Diploma Programme at 16–18. The IB is the most portable qualification available — accepted by universities across the UK, USA, Europe, Australia, and Asia without conversion. For families uncertain about their next destination, the IB provides the best hedge. Average global pass rates are around 78%, with top scores requiring genuine academic commitment.",
      "Todas as quatro escolas desta lista oferecem o Programa de Diploma IB dos 16 aos 18 anos. O IB é a qualificação mais portátil disponível — aceite por universidades em todo o Reino Unido, EUA, Europa, Austrália e Ásia sem conversão. Para famílias incertas sobre o seu próximo destino, o IB oferece a melhor proteção. As taxas de aprovação globais médias são de cerca de 78%, com notas máximas que exigem verdadeiro compromisso académico.",
      "Alle vier Schulen auf dieser Liste bieten das IB-Diploma-Programm im Alter von 16–18 Jahren an. Das IB ist die portabelste verfügbare Qualifikation — ohne Umrechnung von Universitäten in UK, USA, Europa, Australien und Asien anerkannt. Für Familien, die über ihr nächstes Ziel unsicher sind, bietet das IB die beste Absicherung. Die durchschnittliche globale Bestehensquote liegt bei etwa 78%, wobei Topnoten echtes akademisches Engagement erfordern.",
      "Les quatre écoles de cette liste proposent le Programme du Diplôme IB entre 16 et 18 ans. L'IB est la qualification la plus portable disponible — acceptée par les universités du Royaume-Uni, des États-Unis, d'Europe, d'Australie et d'Asie sans conversion. Pour les familles incertaines de leur prochaine destination, l'IB offre la meilleure garantie. Les taux de réussite mondiaux moyens sont d'environ 78%, les meilleurs scores nécessitant un véritable engagement académique.",
      "Alle vier de scholen op deze lijst bieden het IB Diploma Programme aan op 16–18 jaar. Het IB is de meest overdraagbare kwalificatie beschikbaar — geaccepteerd door universiteiten in het VK, de VS, Europa, Australië en Azië zonder conversie. Voor gezinnen die onzeker zijn over hun volgende bestemming, biedt het IB de beste zekerheid. De gemiddelde wereldwijde slagingspercentages zijn ongeveer 78%, waarbij de hoogste scores echte academische inzet vereisen.",
      "Las cuatro escuelas de esta lista ofrecen el Programa del Diploma IB a los 16–18 años. El IB es la cualificación más portable disponible — aceptada por universidades de todo el Reino Unido, EE.UU., Europa, Australia y Asia sin conversión. Para familias inseguras sobre su próximo destino, el IB ofrece la mejor cobertura. Las tasas de aprobación globales promedio son de aproximadamente el 78%, con las mejores notas que requieren un verdadero compromiso académico."
    ),
  },
] as const;

// ── SECTION 3 — FEES ──────────────────────────────────────────────────────────

const fees = {
  h2: t(
    "3. What are the real costs of international school fees in Portugal?",
    "3. O custo real das propinas das escolas internacionais",
    "3. Die realen Kosten internationaler Schulgebühren",
    "3. Le coût réel des frais de scolarité internationaux",
    "3. De werkelijke kosten van internationale schoolkosten",
    "3. El coste real de las tasas de las escuelas internacionales"
  ),
  p1: t(
    "Headline annual tuition is only part of the picture. Based on data from 200+ families, the all-in annual cost of attending an international school in Portugal is typically 15–30% higher than the advertised tuition. Here is what the brochures don't highlight.",
    "A propina anual básica é apenas parte do quadro. Com base em dados de mais de 200 famílias, o custo anual total de frequentar uma escola internacional em Portugal é tipicamente 15–30% superior à propina anunciada. Eis o que os brochures não destacam.",
    "Die jährliche Grundgebühr ist nur ein Teil des Bildes. Basierend auf Daten von mehr als 200 Familien sind die Gesamtjahreskosten für den Besuch einer internationalen Schule in Portugal typischerweise 15–30% höher als die beworbene Unterrichtsgebühr. Hier ist, was die Broschüren nicht hervorheben.",
    "Les frais de scolarité annuels de base ne représentent qu'une partie du tableau. D'après les données de plus de 200 familles, le coût annuel total de la fréquentation d'une école internationale au Portugal est généralement 15–30% plus élevé que les frais annoncés. Voici ce que les brochures ne soulignent pas.",
    "De jaarlijkse basiskosten zijn slechts een deel van het beeld. Op basis van gegevens van meer dan 200 gezinnen zijn de totale jaarlijkse kosten voor het bezoeken van een internationale school in Portugal doorgaans 15–30% hoger dan de geadverteerde schoolkosten. Dit is wat de brochures niet benadrukken.",
    "La matrícula anual base es solo parte del panorama. Basándose en datos de más de 200 familias, el coste anual total de asistir a una escuela internacional en Portugal es típicamente un 15–30% superior a la matrícula anunciada. Esto es lo que los folletos no destacan."
  ),
  thTuition:      t("Tuition (annual)",   "Propina (anual)",       "Gebühr (jährlich)",         "Frais de scolarité (annuels)", "Schoolgeld (jaarlijks)", "Matrícula (anual)"),
  thRegistration: t("Registration fee",  "Taxa de registo",       "Anmeldegebühr",              "Frais d'inscription",         "Inschrijvingskosten",    "Tasa de inscripción"),
  thAllin:        t("All-in estimate",   "Estimativa total",      "Gesamtschätzung",            "Estimation tout compris",     "Totaalschatting",        "Estimación total"),
  p2BoldLabel: t(
    "What the all-in estimate includes:",
    "O que inclui a estimativa total:",
    "Was in der Gesamtschätzung enthalten ist:",
    "Ce que comprend l'estimation tout compris :",
    "Wat de totaalschatting omvat:",
    "Lo que incluye la estimación total:"
  ),
  p2Text: t(
    " tuition, registration fee (one-time), school transport (if you live more than 5 km from campus), lunch programme, and a standard set of extra-curricular activities. It excludes uniforms (€300–600) and premium activities.",
    " propina, taxa de registo (única), transporte escolar (se viver a mais de 5 km do campus), programa de almoço e um conjunto padrão de atividades extracurriculares. Exclui uniformes (€300–600) e atividades premium.",
    " Unterrichtsgebühr, Anmeldegebühr (einmalig), Schultransport (wenn Sie mehr als 5 km vom Campus entfernt wohnen), Mittagsprogramm und ein Standardsatz außerschulischer Aktivitäten. Nicht enthalten sind Uniformen (€300–600) und Premium-Aktivitäten.",
    " frais de scolarité, frais d'inscription (uniques), transport scolaire (si vous habitez à plus de 5 km du campus), programme de déjeuner et un ensemble standard d'activités parascolaires. Hors uniformes (300–600 €) et activités premium.",
    " schoolgeld, inschrijvingskosten (eenmalig), schoolvervoer (als u meer dan 5 km van de campus woont), lunchprogramma en een standaardset buitenschoolse activiteiten. Exclusief uniformen (€300–600) en premiumactiviteiten.",
    " matrícula, tasa de inscripción (única), transporte escolar (si vive a más de 5 km del campus), programa de almuerzo y un conjunto estándar de actividades extraescolares. Excluye uniformes (€300–600) y actividades premium."
  ),
  p3BestValueLabel:    t("Best value:",      "Melhor custo-benefício:",    "Bestes Preis-Leistungs-Verhältnis:", "Meilleur rapport qualité-prix :", "Beste prijs-kwaliteit:",    "Mejor relación calidad-precio:"),
  p3BestValueText:     t(
    " United Lisbon International School — families in Parque das Nações pay no transport costs and benefit from the lowest tuition range on this list.",
    " United Lisbon International School — as famílias no Parque das Nações não pagam custos de transporte e beneficiam da gama de propinas mais baixa desta lista.",
    " United Lisbon International School — Familien in Parque das Nações zahlen keine Transportkosten und profitieren von der niedrigsten Gebührenspanne auf dieser Liste.",
    " United Lisbon International School — les familles du Parque das Nações ne paient pas de frais de transport et bénéficient de la fourchette de frais la plus basse de cette liste.",
    " United Lisbon International School — gezinnen in Parque das Nações betalen geen transportkosten en profiteren van de laagste schoolkostenmarge op deze lijst.",
    " United Lisbon International School — las familias en Parque das Nações no pagan costes de transporte y se benefician de la gama de matrículas más baja de esta lista."
  ),
  p3MostExpensiveLabel: t(" Most expensive:", " Mais cara:", " Am teuersten:", " La plus chère :", " Duurste:", " Más cara:"),
  p3MostExpensiveText:  t(
    " TASIS Portugal — but also the only school here with genuinely boutique class sizes (under 15 per class at most year levels).",
    " TASIS Portugal — mas também a única escola aqui com turmas genuinamente boutique (menos de 15 por turma na maioria dos anos).",
    " TASIS Portugal — aber auch die einzige Schule hier mit wirklich kleinen Klassen (unter 15 pro Klasse in den meisten Jahrgangsstufen).",
    " TASIS Portugal — mais aussi la seule école ici avec des effectifs véritablement boutique (moins de 15 par classe dans la plupart des niveaux).",
    " TASIS Portugal — maar ook de enige school hier met echt kleine klassen (minder dan 15 per klas bij de meeste jaarniveaus).",
    " TASIS Portugal — pero también la única escuela aquí con tamaños de clase verdaderamente boutique (menos de 15 por clase en la mayoría de los niveles)."
  ),
} as const;

// ── SECTION 4 — ADMISSIONS ────────────────────────────────────────────────────

const admissions = {
  h2: t(
    "4. What is the admission process really like?",
    "4. A realidade das admissões",
    "4. Die Zulassungsrealität",
    "4. La réalité des admissions",
    "4. De toelatingswerkelijkheid",
    "4. La realidad de las admisiones"
  ),
  p1: t(
    "The surge in expat families since 2020 has not been matched by a proportional increase in school capacity. Apply early, apply to multiple schools, and understand the timeline. For September entry, most schools open applications October–December of the preceding year.",
    "O aumento de famílias expatriadas desde 2020 não foi acompanhado por um aumento proporcional da capacidade escolar. Candidate-se cedo, candidate-se a várias escolas e compreenda o calendário. Para entrada em setembro, a maioria das escolas abre candidaturas de outubro a dezembro do ano anterior.",
    "Der Anstieg der Expat-Familien seit 2020 wurde nicht durch eine proportionale Erhöhung der Schulkapazität ausgeglichen. Bewerben Sie sich früh, bewerben Sie sich an mehreren Schulen und verstehen Sie den Zeitplan. Für den September-Eintritt öffnen die meisten Schulen die Bewerbungen von Oktober bis Dezember des Vorjahres.",
    "L'afflux de familles expatriées depuis 2020 n'a pas été accompagné d'une augmentation proportionnelle de la capacité scolaire. Postulez tôt, postulez dans plusieurs écoles et comprenez le calendrier. Pour une rentrée en septembre, la plupart des écoles ouvrent les candidatures d'octobre à décembre de l'année précédente.",
    "De toename van expat-gezinnen sinds 2020 is niet evenredig gevolgd door een uitbreiding van de schoolcapaciteit. Solliciteer vroeg, solliciteer bij meerdere scholen en begrijp de tijdlijn. Voor instroom in september openen de meeste scholen de aanmeldingen van oktober tot december van het voorafgaande jaar.",
    "El aumento de familias expatriadas desde 2020 no ha sido correspondido por un aumento proporcional de la capacidad escolar. Solicite pronto, solicite en varias escuelas y comprenda el calendario. Para la entrada en septiembre, la mayoría de las escuelas abren las solicitudes de octubre a diciembre del año anterior."
  ),
  acceptanceLabel: t("Acceptance:", "Aceitação:", "Aufnahme:", "Acceptation :", "Acceptatie:", "Aceptación:"),
  waitLabel:       t("Wait:",       "Espera:",    "Wartezeit:", "Attente :",    "Wachttijd:", "Espera:"),
  ruleH3: t(
    "Raising Kids in Portugal's admissions rule",
    "A regra de admissões da Raising Kids in Portugal",
    "Raising Kids in Portugals Zulassungsregel",
    "La règle d'admission de Raising Kids in Portugal",
    "Raising Kids in Portugal's toelatingregel",
    "La regla de admisiones de Raising Kids in Portugal"
  ),
  ruleText: t(
    "Apply to a minimum of 2–3 schools simultaneously. Request a shadow day at each shortlisted school — where your child attends classes for a full morning — before signing any enrolment contract. Most schools offer this if asked directly at enquiry stage, even if it isn't advertised.",
    "Candidate-se a um mínimo de 2–3 escolas em simultâneo. Solicite um dia de observação em cada escola em lista restrita — onde o seu filho frequenta aulas durante uma manhã inteira — antes de assinar qualquer contrato de matrícula. A maioria das escolas oferece isto se solicitado diretamente na fase de contacto, mesmo que não esteja anunciado.",
    "Bewerben Sie sich gleichzeitig bei mindestens 2–3 Schulen. Fordern Sie einen Schnuppertag an jeder shortgelisteten Schule an — bei dem Ihr Kind einen ganzen Morgen lang am Unterricht teilnimmt —, bevor Sie einen Einschreibungsvertrag unterzeichnen. Die meisten Schulen bieten dies auf direkte Anfrage in der Anfragephase an, auch wenn es nicht beworben wird.",
    "Postulez dans un minimum de 2–3 écoles simultanément. Demandez une journée d'observation dans chaque école présélectionnée — où votre enfant assiste aux cours pendant une matinée entière — avant de signer tout contrat d'inscription. La plupart des écoles le proposent si on le demande directement lors de la phase d'enquête, même si ce n'est pas affiché.",
    "Solliciteer bij minimaal 2–3 scholen tegelijkertijd. Vraag een schaduwdag aan bij elke school op de shortlist — waarbij uw kind een hele ochtend meedoet aan lessen — voordat u een inschrijvingscontract ondertekent. De meeste scholen bieden dit aan als er direct naar wordt gevraagd tijdens de informatiefase, ook als het niet wordt geadverteerd.",
    "Solicite plaza en un mínimo de 2–3 escuelas simultáneamente. Solicite una jornada de observación en cada escuela preseleccionada — donde su hijo asiste a las clases durante toda una mañana — antes de firmar cualquier contrato de matrícula. La mayoría de las escuelas lo ofrecen si se solicita directamente en la fase de consulta, aunque no esté anunciado."
  ),
} as const;

// admissions cards — school names are proper nouns, stay in EN; only verdict is translated
const admissionsCards = [
  {
    school:  "St. Julian's School",
    rate:    GUIDE_SCHOOL_FACTS.stJulians.rate,
    wait:    GUIDE_SCHOOL_FACTS.stJulians.wait,
    verdict: t(
      "Apply immediately regardless of timeline. The waitlist is long and unpredictable.",
      "Candidate-se imediatamente independentemente do calendário. A lista de espera é longa e imprevisível.",
      "Bewerben Sie sich sofort, unabhängig vom Zeitplan. Die Warteliste ist lang und unvorhersehbar.",
      "Postulez immédiatement quel que soit le calendrier. La liste d'attente est longue et imprévisible.",
      "Solliciteer onmiddellijk, ongeacht de tijdlijn. De wachtlijst is lang en onvoorspelbaar.",
      "Solicite inmediatamente independientemente del calendario. La lista de espera es larga e impredecible."
    ),
  },
  {
    school:  "TASIS Portugal",
    rate:    GUIDE_SCHOOL_FACTS.tasis.rate,
    wait:    GUIDE_SCHOOL_FACTS.tasis.wait,
    verdict: t(
      "Apply 12 months before intended start. Shadow days conducted for shortlisted applicants.",
      "Candidate-se 12 meses antes do início previsto. Dias de observação realizados para candidatos em lista restrita.",
      "Bewerben Sie sich 12 Monate vor dem geplanten Beginn. Schnuppertage werden für shortlistete Bewerber angeboten.",
      "Postulez 12 mois avant le début prévu. Des journées d'observation sont organisées pour les candidats présélectionnés.",
      "Solliciteer 12 maanden voor de beoogde startdatum. Schaduwdagen worden gehouden voor geselecteerde kandidaten.",
      "Solicite 12 meses antes del inicio previsto. Se realizan jornadas de observación para los candidatos preseleccionados."
    ),
  },
  {
    school:  "CAISL",
    rate:    GUIDE_SCHOOL_FACTS.caisl.rate,
    wait:    GUIDE_SCHOOL_FACTS.caisl.wait,
    verdict: t(
      "More accessible but still competitive at popular year levels. Best value for American families.",
      "Mais acessível mas ainda competitiva nos anos de escolaridade mais populares. Melhor custo-benefício para famílias americanas.",
      "Zugänglicher, aber bei beliebten Jahrgangsstufen noch immer wettbewerbsfähig. Bestes Preis-Leistungs-Verhältnis für amerikanische Familien.",
      "Plus accessible mais toujours compétitive aux niveaux scolaires populaires. Meilleur rapport qualité-prix pour les familles américaines.",
      "Toegankelijker maar nog steeds competitief op populaire jaarniveaus. Beste prijs-kwaliteitverhouding voor Amerikaanse gezinnen.",
      "Más accesible pero aún competitiva en los niveles de año populares. La mejor relación calidad-precio para familias americanas."
    ),
  },
  {
    school:  "United Lisbon",
    rate:    GUIDE_SCHOOL_FACTS.unitedLisbon.rate,
    wait:    GUIDE_SCHOOL_FACTS.unitedLisbon.wait,
    verdict: t(
      "The most accessible on this list — but growing fast. Apply early for 2026 intake.",
      "A mais acessível desta lista — mas a crescer rapidamente. Candidate-se cedo para a entrada de 2026.",
      "Die zugänglichste auf dieser Liste — aber wächst schnell. Bewerben Sie sich früh für den Einzug 2026.",
      "La plus accessible de cette liste — mais en croissance rapide. Postulez tôt pour l'intégration 2026.",
      "De meest toegankelijke op deze lijst — maar groeit snel. Solliciteer vroeg voor de intake 2026.",
      "La más accesible de esta lista — pero crece rápidamente. Solicite pronto para la incorporación de 2026."
    ),
  },
] as const;

// ── SECTION 5 — METHODOLOGY ───────────────────────────────────────────────────

const methodology = {
  h2: t(
    "5. How Raising Kids in Portugal assessed these schools",
    "5. Como a Raising Kids in Portugal avaliou estas escolas",
    "5. Wie Raising Kids in Portugal diese Schulen bewertet hat",
    "5. Comment Raising Kids in Portugal a évalué ces écoles",
    "5. Hoe Raising Kids in Portugal deze scholen beoordeelde",
    "5. Cómo Raising Kids in Portugal evaluó estas escuelas"
  ),
  p1: t(
    "Every school on this list has been visited in person by a Raising Kids in Portugal consultant at least 3 times between 2023 and 2025. Our assessment combines structured school visits, interviews with current families, and verification of published data against primary sources.",
    "Todas as escolas desta lista foram visitadas pessoalmente por um consultor da Raising Kids in Portugal pelo menos 3 vezes entre 2023 e 2025. A nossa avaliação combina visitas escolares estruturadas, entrevistas com famílias atuais e verificação de dados publicados contra fontes primárias.",
    "Jede Schule auf dieser Liste wurde zwischen 2023 und 2025 mindestens 3 Mal persönlich von einem Raising Kids in Portugal-Berater besucht. Unsere Bewertung kombiniert strukturierte Schulbesuche, Interviews mit aktuellen Familien und die Überprüfung veröffentlichter Daten anhand primärer Quellen.",
    "Chaque école de cette liste a été visitée en personne par un consultant Raising Kids in Portugal au moins 3 fois entre 2023 et 2025. Notre évaluation combine des visites scolaires structurées, des entretiens avec des familles actuelles et la vérification des données publiées par rapport aux sources primaires.",
    "Elke school op deze lijst is tussen 2023 en 2025 minimaal 3 keer persoonlijk bezocht door een Raising Kids in Portugal-consultant. Onze beoordeling combineert gestructureerde schoolbezoeken, interviews met huidige gezinnen en verificatie van gepubliceerde gegevens aan de hand van primaire bronnen.",
    "Cada escuela de esta lista ha sido visitada en persona por un consultor de Raising Kids in Portugal al menos 3 veces entre 2023 y 2025. Nuestra evaluación combina visitas escolares estructuradas, entrevistas con familias actuales y verificación de datos publicados frente a fuentes primarias."
  ),
  p2: t(
    "Schools pay nothing to appear on this list and cannot pay to alter their position, verdict, or any published data. Raising Kids in Portugal's editorial process is fully independent.",
    "As escolas não pagam nada para aparecer nesta lista e não podem pagar para alterar a sua posição, veredicto ou quaisquer dados publicados. O processo editorial da Raising Kids in Portugal é totalmente independente.",
    "Schulen zahlen nichts dafür, auf dieser Liste zu erscheinen, und können nicht zahlen, um ihre Position, ihr Urteil oder veröffentlichte Daten zu ändern. Raising Kids in Portugals redaktioneller Prozess ist vollständig unabhängig.",
    "Les écoles ne paient rien pour figurer sur cette liste et ne peuvent pas payer pour modifier leur position, leur verdict ou les données publiées. Le processus éditorial de Raising Kids in Portugal est entièrement indépendant.",
    "Scholen betalen niets om op deze lijst te verschijnen en kunnen niet betalen om hun positie, oordeel of gepubliceerde gegevens te wijzigen. Het redactionele proces van Raising Kids in Portugal is volledig onafhankelijk.",
    "Las escuelas no pagan nada por aparecer en esta lista y no pueden pagar para modificar su posición, veredicto o cualquier dato publicado. El proceso editorial de Raising Kids in Portugal es completamente independiente."
  ),
} as const;

const methodologyCards = [
  {
    title: t("On-site visits",    "Visitas presenciais",  "Schulbesuche vor Ort",  "Visites sur place",      "Bezoeken ter plaatse", "Visitas in situ"),
    desc:  t(
      "Minimum 3 visits per school, including during term time.",
      "Mínimo de 3 visitas por escola, incluindo durante o período letivo.",
      "Mindestens 3 Besuche pro Schule, auch während der Unterrichtszeit.",
      "Au minimum 3 visites par école, y compris pendant les périodes scolaires.",
      "Minimaal 3 bezoeken per school, ook tijdens het schooljaar.",
      "Mínimo 3 visitas por escuela, incluyendo durante el período lectivo."
    ),
  },
  {
    title: t("Family interviews",  "Entrevistas a famílias", "Familieninterviews",    "Entretiens avec les familles", "Gezinsinterviews",    "Entrevistas a familias"),
    desc:  t(
      "Structured interviews with current and recent families — not admissions staff.",
      "Entrevistas estruturadas com famílias atuais e recentes — não com o pessoal de admissões.",
      "Strukturierte Interviews mit aktuellen und kürzlichen Familien — nicht mit dem Zulassungspersonal.",
      "Entretiens structurés avec des familles actuelles et récentes — pas avec le personnel des admissions.",
      "Gestructureerde interviews met huidige en recente gezinnen — niet met toelatingspersoneel.",
      "Entrevistas estructuradas con familias actuales y recientes — no con el personal de admisiones."
    ),
  },
  {
    title: t("Data verification", "Verificação de dados",  "Datenüberprüfung",      "Vérification des données",    "Gegevensverificatie", "Verificación de datos"),
    desc:  t(
      "Fees, acceptance rates, and IB results verified against primary sources.",
      "Propinas, taxas de aceitação e resultados IB verificados contra fontes primárias.",
      "Gebühren, Aufnahmequoten und IB-Ergebnisse werden anhand primärer Quellen verifiziert.",
      "Frais, taux d'acceptation et résultats IB vérifiés par rapport aux sources primaires.",
      "Schoolkosten, acceptatiepercentages en IB-resultaten geverifieerd aan de hand van primaire bronnen.",
      "Tasas, índices de aceptación y resultados IB verificados frente a fuentes primarias."
    ),
  },
] as const;

// ── SECTION 6 — SCHOOL PROFILES ───────────────────────────────────────────────

const schoolProfiles = {
  h2: t("6. School profiles", "6. Perfis das escolas", "6. Schulprofile", "6. Profils des écoles", "6. Schoolprofielen", "6. Perfiles de las escuelas"),
} as const;

// ── SECTION 7 — FAQ ───────────────────────────────────────────────────────────

const faqSection = {
  h2: t("Frequently Asked Questions", "Perguntas frequentes", "Häufig gestellte Fragen", "Questions fréquemment posées", "Veelgestelde vragen", "Preguntas frecuentes"),
} as const;

const faqItems = [
  {
    q: t(
      "What is the best international school in Portugal?",
      "Qual é a melhor escola internacional em Portugal?",
      "Was ist die beste internationale Schule in Portugal?",
      "Quelle est la meilleure école internationale au Portugal ?",
      "Wat is de beste internationale school in Portugal?",
      "¿Cuál es la mejor escuela internacional en Portugal?"
    ),
    a: t(
      `St. Julian's School in Carcavelos, Cascais — with a ${GUIDE_SCHOOL_FACTS.stJulians.rate} acceptance rate and top IB results — is broadly considered the best. For American curriculum families, CAISL offers the best value with US State Department backing.`,
      `A St. Julian's School em Carcavelos, Cascais — com uma taxa de aceitação de ${GUIDE_SCHOOL_FACTS.stJulians.rate} e os melhores resultados IB — é amplamente considerada a melhor. Para famílias com currículo americano, a CAISL oferece o melhor custo-benefício com o apoio do Departamento de Estado dos EUA.`,
      `Die St. Julian's School in Carcavelos, Cascais — mit einer Aufnahmequote von ${GUIDE_SCHOOL_FACTS.stJulians.rate} und besten IB-Ergebnissen — gilt weithin als die beste. Für Familien mit amerikanischem Lehrplan bietet CAISL den besten Wert mit der Unterstützung des US-Außenministeriums.`,
      `La St. Julian's School à Carcavelos, Cascais — avec un taux d'acceptation de ${GUIDE_SCHOOL_FACTS.stJulians.rate} et les meilleurs résultats IB — est généralement considérée comme la meilleure. Pour les familles suivant le programme américain, CAISL offre le meilleur rapport qualité-prix avec le soutien du Département d'État américain.`,
      `De St. Julian's School in Carcavelos, Cascais — met een acceptatiepercentage van ${GUIDE_SCHOOL_FACTS.stJulians.rate} en de beste IB-resultaten — wordt algemeen beschouwd als de beste. Voor gezinnen met een Amerikaans curriculum biedt CAISL de beste waarde met steun van het US State Department.`,
      `El St. Julian's School en Carcavelos, Cascais — con una tasa de aceptación del ${GUIDE_SCHOOL_FACTS.stJulians.rate} y los mejores resultados IB — se considera ampliamente la mejor. Para familias con currículo americano, CAISL ofrece el mejor valor con el respaldo del Departamento de Estado de EE.UU.`
    ),
  },
  {
    q: t(
      "How much do international schools cost in Portugal?",
      "Quanto custam as escolas internacionais em Portugal?",
      "Was kosten internationale Schulen in Portugal?",
      "Combien coûtent les écoles internationales au Portugal ?",
      "Wat kosten internationale scholen in Portugal?",
      "¿Cuánto cuestan las escuelas internacionales en Portugal?"
    ),
    // @sync-check: €12,000 = curatedSchools[3].fees min (United Lisbon); €32,000 = curatedSchools[1].fees max (TASIS Portugal)
    a: t(
      "Annual fees range from €12,000 (United Lisbon) to €32,000 (TASIS Portugal). Most families budget €15,000–25,000 per child all-in. Many schools also charge a one-time registration fee of €500–3,000.",
      "As propinas anuais variam de €12.000 (United Lisbon) a €32.000 (TASIS Portugal). A maioria das famílias orçamenta €15.000–25.000 por criança no total. Muitas escolas cobram também uma taxa de registo única de €500–3.000.",
      "Die Jahresgebühren reichen von €12.000 (United Lisbon) bis €32.000 (TASIS Portugal). Die meisten Familien planen €15.000–25.000 pro Kind insgesamt ein. Viele Schulen erheben auch eine einmalige Anmeldegebühr von €500–3.000.",
      "Les frais annuels vont de 12 000 € (United Lisbon) à 32 000 € (TASIS Portugal). La plupart des familles budgétisent 15 000–25 000 € par enfant tout compris. De nombreuses écoles facturent également des frais d'inscription uniques de 500–3 000 €.",
      "De jaarlijkse schoolkosten variëren van €12.000 (United Lisbon) tot €32.000 (TASIS Portugal). De meeste gezinnen begroten €15.000–25.000 per kind in totaal. Veel scholen rekenen ook een eenmalige inschrijfkostenvergoeding van €500–3.000.",
      "Las tasas anuales oscilan entre €12.000 (United Lisbon) y €32.000 (TASIS Portugal). La mayoría de las familias presupuestan €15.000–25.000 por niño en total. Muchas escuelas también cobran una tasa de inscripción única de €500–3.000."
    ),
  },
  {
    q: t(
      "Which area is best for families near international schools?",
      "Qual é a melhor área para famílias perto de escolas internacionais?",
      "Welche Gegend eignet sich am besten für Familien in der Nähe internationaler Schulen?",
      "Quelle zone est la meilleure pour les familles proches des écoles internationales ?",
      "Welk gebied is het beste voor gezinnen in de buurt van internationale scholen?",
      "¿Qué zona es la mejor para familias cerca de escuelas internacionales?"
    ),
    a: t(
      "Cascais and Estoril for St. Julian's School (coast lifestyle). Sintra for TASIS and CAISL (nature, hills). Parque das Nações for United Lisbon International School (city living).",
      "Cascais e Estoril para a St. Julian's School (estilo de vida costeiro). Sintra para a TASIS e CAISL (natureza, colinas). Parque das Nações para a United Lisbon International School (vida urbana).",
      "Cascais und Estoril für die St. Julian's School (Küstenlebensstil). Sintra für TASIS und CAISL (Natur, Hügel). Parque das Nações für die United Lisbon International School (Stadtleben).",
      "Cascais et Estoril pour la St. Julian's School (lifestyle côtier). Sintra pour TASIS et CAISL (nature, collines). Parque das Nações pour l'United Lisbon International School (vie citadine).",
      "Cascais en Estoril voor de St. Julian's School (kustlevensstijl). Sintra voor TASIS en CAISL (natuur, heuvels). Parque das Nações voor de United Lisbon International School (stadsleven).",
      "Cascais y Estoril para el St. Julian's School (estilo de vida costero). Sintra para TASIS y CAISL (naturaleza, colinas). Parque das Nações para la United Lisbon International School (vida urbana)."
    ),
  },
  {
    q: t(
      "Do I need to visit schools in person before applying?",
      "Preciso de visitar as escolas pessoalmente antes de me candidatar?",
      "Muss ich Schulen persönlich besuchen, bevor ich mich bewerbe?",
      "Dois-je visiter les écoles en personne avant de postuler ?",
      "Moet ik scholen persoonlijk bezoeken voordat ik solliciteer?",
      "¿Necesito visitar las escuelas en persona antes de solicitar plaza?"
    ),
    a: t(
      "Yes — always. The difference between a school's marketing and its actual atmosphere can be significant. Request a shadow day for your child at each shortlisted school before committing to an enrolment contract.",
      "Sim — sempre. A diferença entre o marketing de uma escola e a sua atmosfera real pode ser significativa. Solicite um dia de observação para o seu filho em cada escola em lista restrita antes de se comprometer com um contrato de matrícula.",
      "Ja — immer. Der Unterschied zwischen dem Marketing einer Schule und ihrer tatsächlichen Atmosphäre kann erheblich sein. Fordern Sie für Ihr Kind einen Schnuppertag an jeder shortgelisteten Schule an, bevor Sie sich zu einem Einschreibungsvertrag verpflichten.",
      "Oui — toujours. La différence entre le marketing d'une école et son atmosphère réelle peut être significative. Demandez une journée d'observation pour votre enfant dans chaque école présélectionnée avant de vous engager dans un contrat d'inscription.",
      "Ja — altijd. Het verschil tussen de marketing van een school en de werkelijke sfeer kan aanzienlijk zijn. Vraag een schaduwdag aan voor uw kind bij elke school op de shortlist voordat u zich verbindt aan een inschrijvingscontract.",
      "Sí — siempre. La diferencia entre el marketing de una escuela y su ambiente real puede ser significativa. Solicite una jornada de observación para su hijo en cada escuela preseleccionada antes de comprometerse con un contrato de matrícula."
    ),
  },
] as const;

// ── RELATED NEIGHBORHOODS ─────────────────────────────────────────────────────

const related = {
  h2:       t("Find the right neighborhood to match", "Encontre o bairro certo para combinar", "Finden Sie das passende Viertel", "Trouvez le bon quartier en correspondance", "Vind de juiste buurt die past", "Encuentre el barrio adecuado para combinar"),
  subtitle: t(
    "School choice drives neighborhood choice. Here are the natural pairings.",
    "A escolha da escola determina a escolha do bairro. Aqui estão as combinações naturais.",
    "Die Schulwahl bestimmt die Stadtviertelwahl. Hier sind die natürlichen Paarungen.",
    "Le choix de l'école détermine le choix du quartier. Voici les associations naturelles.",
    "De schoolkeuze bepaalt de buurtkeuze. Hier zijn de natuurlijke paren.",
    "La elección de la escuela determina la del barrio. Aquí están las combinaciones naturales."
  ),
} as const;

const relatedCards = [
  {
    title: t("Cascais & Estoril", "Cascais & Estoril", "Cascais & Estoril", "Cascais & Estoril", "Cascais & Estoril", "Cascais & Estoril"),
    desc:  t(
      "Coastal living 15–20 min from St. Julian's School. Atlantic beaches, large expat community.",
      "Vida costeira a 15–20 min da St. Julian's School. Praias atlânticas, grande comunidade expatriada.",
      "Küstenleben 15–20 Min. von der St. Julian's School. Atlantikstrände, große Expat-Gemeinschaft.",
      "Vie côtière à 15–20 min de la St. Julian's School. Plages atlantiques, grande communauté d'expatriés.",
      "Kustleven op 15–20 min van de St. Julian's School. Atlantische stranden, grote expat-gemeenschap.",
      "Vida costera a 15–20 min del St. Julian's School. Playas atlánticas, gran comunidad expatriada."
    ),
  },
  {
    title: t("Sintra & Surroundings", "Sintra e Arredores", "Sintra & Umgebung", "Sintra & Environs", "Sintra & Omgeving", "Sintra y Alrededores"),
    desc:  t(
      "Nature and history near TASIS Portugal and CAISL. 10–15 min to both campuses by car.",
      "Natureza e história perto da TASIS Portugal e CAISL. 10–15 min de ambos os campus de carro.",
      "Natur und Geschichte nahe TASIS Portugal und CAISL. 10–15 Min. zu beiden Campussen mit dem Auto.",
      "Nature et histoire près de TASIS Portugal et CAISL. 10–15 min des deux campus en voiture.",
      "Natuur en geschiedenis nabij TASIS Portugal en CAISL. 10–15 min naar beide campussen per auto.",
      "Naturaleza e historia cerca de TASIS Portugal y CAISL. 10–15 min a ambos campus en coche."
    ),
  },
  {
    title: t("Parque das Nações", "Parque das Nações", "Parque das Nações", "Parque das Nações", "Parque das Nações", "Parque das Nações"),
    desc:  t(
      "Modern riverfront living. Walking distance to United Lisbon International School.",
      "Vida moderna à beira do rio. A pé da United Lisbon International School.",
      "Modernes Uferleben. Fußweg zur United Lisbon International School.",
      "Vie moderne en bord de fleuve. À distance de marche de l'United Lisbon International School.",
      "Modern leven aan het water. Op loopafstand van de United Lisbon International School.",
      "Vida moderna junto al río. A distancia a pie de la United Lisbon International School."
    ),
  },
] as const;

// ── PUBLIC API ────────────────────────────────────────────────────────────────

export type SchoolsGuideContent = ReturnType<typeof getSchoolsGuideContent>;

export function getSchoolsGuideContent(locale: string) {
  const l = locale as L;
  const pick = (o: T): string => o[l] ?? o.en;

  return {
    header: {
      updatedDate:          pick(header.updatedDate),
      schoolsReviewedLabel: pick(header.schoolsReviewedLabel),
      byline:               pick(header.byline),
      h1:                   pick(header.h1),
      subtitle:             pick(header.subtitle),
    },
    keyTakeaways: {
      heading: pick(keyTakeaways.heading),
      items: [
        pick(keyTakeaways.item1),
        pick(keyTakeaways.item2),
        pick(keyTakeaways.item3),
        pick(keyTakeaways.item4),
        pick(keyTakeaways.item5),
        pick(keyTakeaways.item6),
        pick(keyTakeaways.item7),
      ],
    },
    toc: {
      heading:     pick(toc.heading),
      overview:    pick(toc.overview),
      curriculum:  pick(toc.curriculum),
      fees:        pick(toc.fees),
      admissions:  pick(toc.admissions),
      methodology: pick(toc.methodology),
      schools:     pick(toc.schools),
      faq:         pick(toc.faq),
    },
    overview: {
      h2:          pick(overview.h2),
      p1:          pick(overview.p1),
      p2:          pick(overview.p2),
      p3Pre:       pick(overview.p3Pre),
      p3LinkText:  pick(overview.p3LinkText),
    },
    curriculum: {
      h2:         pick(curriculum.h2),
      p1:         pick(curriculum.p1),
      offeredBy:  pick(curriculum.offeredBy),
      notePrefix: pick(curriculum.notePrefix),
      noteText:   pick(curriculum.noteText),
      ibSource:   pick(curriculum.ibSource),
      cards: curriculumCards.map(card => ({
        tag:      pick(card.tag),
        tagColor: card.tagColor,
        school:   pick(card.school),
        content:  pick(card.content),
      })),
    },
    fees: {
      h2:                    pick(fees.h2),
      p1:                    pick(fees.p1),
      thTuition:             pick(fees.thTuition),
      thRegistration:        pick(fees.thRegistration),
      thAllin:               pick(fees.thAllin),
      p2BoldLabel:           pick(fees.p2BoldLabel),
      p2Text:                pick(fees.p2Text),
      p3BestValueLabel:      pick(fees.p3BestValueLabel),
      p3BestValueText:       pick(fees.p3BestValueText),
      p3MostExpensiveLabel:  pick(fees.p3MostExpensiveLabel),
      p3MostExpensiveText:   pick(fees.p3MostExpensiveText),
    },
    admissions: {
      h2:              pick(admissions.h2),
      p1:              pick(admissions.p1),
      acceptanceLabel: pick(admissions.acceptanceLabel),
      waitLabel:       pick(admissions.waitLabel),
      ruleH3:          pick(admissions.ruleH3),
      ruleText:        pick(admissions.ruleText),
      cards: admissionsCards.map(card => ({
        school:  card.school,
        rate:    card.rate,
        wait:    card.wait,
        verdict: pick(card.verdict),
      })),
    },
    methodology: {
      h2:    pick(methodology.h2),
      p1:    pick(methodology.p1),
      p2:    pick(methodology.p2),
      cards: methodologyCards.map(card => ({
        title: pick(card.title),
        desc:  pick(card.desc),
      })),
    },
    schoolProfiles: { h2: pick(schoolProfiles.h2) },
    faq: {
      h2:    pick(faqSection.h2),
      items: faqItems.map(item => ({ q: pick(item.q), a: pick(item.a) })),
    },
    related: {
      h2:       pick(related.h2),
      subtitle: pick(related.subtitle),
      cards: relatedCards.map(card => ({
        title: pick(card.title),
        desc:  pick(card.desc),
      })),
    },
  };
}
