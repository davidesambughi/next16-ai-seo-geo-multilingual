/**
 * Homepage prose content — all 6 locales in one file.
 *
 * Architecture: Option C extended — locale-keyed strings, same pattern as lib/schools-data.ts.
 * Usage:  const c = getHomeContent(locale)  →  c.block1H2, c.block1P1, …
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

// ── BLOCK 1 — WHY PORTUGAL ────────────────────────────────────────────────────

const block1 = {
  h2: t(
    "Why Portugal has become the first choice for relocating families",
    "Por que Portugal se tornou a primeira escolha para famílias em recolocação",
    "Warum Portugal zur ersten Wahl für umziehende Familien geworden ist",
    "Pourquoi le Portugal est devenu le premier choix pour les familles qui s'expatrient",
    "Waarom Portugal de eerste keuze is geworden voor verhuizende gezinnen",
    "Por qué Portugal se ha convertido en la primera opción para familias en reubicación"
  ),

  p1: t(
    "Something shifted around 2022. The data was already pointing in one direction — and by 2024, Portugal had moved from an aspirational destination to the most researched relocation option in Europe among international families with school-age children. The reasons are layered, but they are not accidental, and they are unlikely to reverse.",
    "Algo mudou por volta de 2022. Os dados já apontavam numa direção — e em 2024, Portugal passou de um destino aspiracional para a opção de recolocação mais pesquisada na Europa entre famílias internacionais com filhos em idade escolar. As razões são múltiplas, mas não são acidentais, e é improvável que se revertam.",
    "Um 2022 herum änderte sich etwas. Die Daten wiesen bereits in eine Richtung — und bis 2024 hatte Portugal sich von einem Wunschziel zum meistgesuchten Umsiedlungsziel in Europa unter internationalen Familien mit schulpflichtigen Kindern entwickelt. Die Gründe sind vielschichtig, aber nicht zufällig, und eine Umkehr ist unwahrscheinlich.",
    "Quelque chose a changé vers 2022. Les données pointaient déjà dans une direction — et d'ici 2024, le Portugal était passé d'une destination aspirationnelle à l'option de relocalisation la plus recherchée en Europe parmi les familles internationales avec des enfants en âge scolaire. Les raisons sont multiples, mais elles ne sont pas accidentelles, et il est peu probable qu'elles s'inversent.",
    "Rond 2022 veranderde er iets. De gegevens wezen al in één richting — en tegen 2024 was Portugal uitgegroeid van een ambitieuze bestemming tot de meest onderzochte verhuisoptie in Europa onder internationale gezinnen met schoolgaande kinderen. De redenen zijn gelaagd, maar niet toevallig, en het is onwaarschijnlijk dat ze zich zullen keren.",
    "Algo cambió alrededor de 2022. Los datos ya apuntaban en una dirección — y para 2024, Portugal había pasado de ser un destino aspiracional a la opción de reubicación más investigada en Europa entre familias internacionales con hijos en edad escolar. Las razones son múltiples, pero no son accidentales, y es poco probable que se reviertan."
  ),

  // p2 contains an inline anchor — split into pre / linkText / post
  p2Pre: t(
    "Relocating to Portugal with a family means landing in a country that ranks among the top seven safest globally (",
    "Mudar-se para Portugal com a família significa chegar a um país que está entre os sete mais seguros do mundo (",
    "Mit der Familie nach Portugal umzuziehen bedeutet, in einem Land zu landen, das zu den sieben sichersten weltweit gehört (",
    "S'installer au Portugal en famille signifie arriver dans un pays qui figure parmi les sept plus sûrs au monde (",
    "Met het gezin naar Portugal verhuizen betekent terechtkomen in een land dat tot de zeven veiligste ter wereld behoort (",
    "Mudarse a Portugal en familia significa llegar a un país que se encuentra entre los siete más seguros del mundo ("
  ),
  p2LinkText: t(
    "Global Peace Index 2025, Institute for Economics and Peace",
    "Índice Global da Paz 2025, Instituto para a Economia e a Paz",
    "Global Peace Index 2025, Institute for Economics and Peace",
    "Indice mondial de la paix 2025, Institut pour l'économie et la paix",
    "Global Peace Index 2025, Institute for Economics and Peace",
    "Índice Global de Paz 2025, Instituto para la Economía y la Paz"
  ),
  p2Post: t(
    "), records more than 300 sunny days per year in the Lisbon area, and offers a concentration of world-class international schools within a 45-minute radius of a major European capital. That specific combination — safety, climate, education quality, and urban accessibility — does not exist in the same proportion anywhere else on the continent.",
    "), regista mais de 300 dias de sol por ano na área de Lisboa e oferece uma concentração de escolas internacionais de excelência num raio de 45 minutos de uma grande capital europeia. Essa combinação específica — segurança, clima, qualidade de ensino e acessibilidade urbana — não existe na mesma proporção em nenhum outro lugar do continente.",
    "), verzeichnet mehr als 300 Sonnentage pro Jahr in der Region Lissabon und bietet eine Konzentration erstklassiger internationaler Schulen innerhalb eines 45-Minuten-Radius einer bedeutenden europäischen Hauptstadt. Diese spezifische Kombination — Sicherheit, Klima, Bildungsqualität und städtische Erreichbarkeit — existiert in diesem Verhältnis nirgendwo sonst auf dem Kontinent.",
    "), qui enregistre plus de 300 jours ensoleillés par an dans la région de Lisbonne, et qui offre une concentration d'écoles internationales de premier rang dans un rayon de 45 minutes d'une grande capitale européenne. Cette combinaison spécifique — sécurité, climat, qualité de l'éducation et accessibilité urbaine — n'existe pas dans les mêmes proportions ailleurs sur le continent.",
    "), telt meer dan 300 zonnedagen per jaar in de regio Lissabon, en biedt een concentratie van wereldklasse internationale scholen binnen een straal van 45 minuten van een grote Europese hoofdstad. Die specifieke combinatie — veiligheid, klimaat, onderwijskwaliteit en stedelijke bereikbaarheid — bestaat nergens anders op het continent in dezelfde verhouding.",
    "), registra más de 300 días soleados al año en el área de Lisboa y ofrece una concentración de escuelas internacionales de clase mundial en un radio de 45 minutos de una importante capital europea. Esa combinación específica — seguridad, clima, calidad educativa y accesibilidad urbana — no existe en las mismas proporciones en ningún otro lugar del continente."
  ),

  p3: t(
    "The Lisbon area is home to four leading international schools: St.\u00a0Julian's School in Carcavelos (British curriculum and IB Diploma), TASIS Portugal and Carlucci American International School (CAISL) in Sintra (American and IB curricula), and United Lisbon International School in Parque das Nações (American and IB). For a family relocating from London, Amsterdam, Munich, or New York, the curriculum compatibility is not a compromise — it is often an upgrade in terms of class size, pastoral care, and international community.",
    "A área de Lisboa alberga quatro escolas internacionais de referência: a St.\u00a0Julian's School em Carcavelos (currículo britânico e Diploma IB), a TASIS Portugal e a Carlucci American International School (CAISL) em Sintra (currículos americano e IB), e a United Lisbon International School no Parque das Nações (americano e IB). Para uma família que se muda de Londres, Amsterdão, Munique ou Nova Iorque, a compatibilidade curricular não é um compromisso — é muitas vezes uma melhoria em termos de dimensão das turmas, acompanhamento pedagógico e comunidade internacional.",
    "Die Region Lissabon beherbergt vier führende internationale Schulen: die St.\u00a0Julian's School in Carcavelos (britischer Lehrplan und IB Diploma), TASIS Portugal und die Carlucci American International School (CAISL) in Sintra (amerikanische und IB-Lehrpläne) sowie die United Lisbon International School in Parque das Nações (amerikanisch und IB). Für eine Familie, die aus London, Amsterdam, München oder New York umzieht, ist die Lehrplankompatibilität kein Kompromiss — sie ist oft eine Verbesserung in Bezug auf Klassengröße, pädagogische Betreuung und internationale Gemeinschaft.",
    "La région de Lisbonne abrite quatre grandes écoles internationales : la St.\u00a0Julian's School à Carcavelos (programme britannique et diplôme IB), TASIS Portugal et la Carlucci American International School (CAISL) à Sintra (programmes américain et IB), et l'United Lisbon International School dans le Parque das Nações (américain et IB). Pour une famille qui s'installe depuis Londres, Amsterdam, Munich ou New York, la compatibilité des programmes n'est pas un compromis — c'est souvent une amélioration en termes de taille des classes, d'accompagnement pédagogique et de communauté internationale.",
    "De regio Lissabon herbergt vier toonaangevende internationale scholen: de St.\u00a0Julian's School in Carcavelos (Brits curriculum en IB Diploma), TASIS Portugal en de Carlucci American International School (CAISL) in Sintra (Amerikaans en IB-curriculum), en de United Lisbon International School in Parque das Nações (Amerikaans en IB). Voor een gezin dat verhuist vanuit Londen, Amsterdam, München of New York is de curriculumcompatibiliteit geen compromis — het is vaak een verbetering wat betreft klassengrootte, begeleiding en internationale gemeenschap.",
    "El área de Lisboa alberga cuatro escuelas internacionales de primer nivel: el St.\u00a0Julian's School en Carcavelos (currículo británico y Diploma IB), TASIS Portugal y la Carlucci American International School (CAISL) en Sintra (currículos americano e IB), y la United Lisbon International School en Parque das Nações (americano e IB). Para una familia que se traslada desde Londres, Ámsterdam, Múnich o Nueva York, la compatibilidad curricular no es un compromiso — a menudo es una mejora en términos de tamaño de clase, atención pedagógica y comunidad internacional."
  ),

  p4: t(
    "The cost asymmetry is real, though frequently misunderstood. Portugal is not inexpensive in absolute terms — particularly when international school fees, which range from €12,000 to €32,000 per child per year, are factored in. What it offers is quality-adjusted value: a lifestyle comparable to the London commuter belt or the Geneva suburbs, at roughly half the total cost of living, in a climate measurably better for outdoor family life.",
    "A assimetria de custos é real, embora frequentemente mal compreendida. Portugal não é barato em termos absolutos — especialmente quando se contabilizam as propinas das escolas internacionais, que variam entre €12.000 e €32.000 por criança por ano. O que oferece é valor ajustado à qualidade: um estilo de vida comparável ao da cintura suburbana de Londres ou dos subúrbios de Genebra, a cerca de metade do custo de vida total, num clima visivelmente mais favorável à vida ao ar livre em família.",
    "Die Kostenasymmetrie ist real, wird jedoch häufig missverstanden. Portugal ist in absoluten Zahlen nicht billig — insbesondere wenn internationale Schulgebühren, die zwischen 12.000 und 32.000 € pro Kind und Jahr liegen, eingerechnet werden. Was es bietet, ist qualitätsbereinigter Wert: ein Lebensstil, der dem Londoner Pendlerbereich oder den Genfer Vororten vergleichbar ist, bei etwa der Hälfte der Gesamtlebenshaltungskosten, in einem Klima, das messbar besser für das Familienleben im Freien ist.",
    "L'asymétrie des coûts est réelle, même si elle est souvent mal comprise. Le Portugal n'est pas bon marché en termes absolus — particulièrement lorsque les frais de scolarité des écoles internationales, qui varient de 12 000 à 32 000 € par enfant et par an, sont pris en compte. Ce qu'il offre, c'est une valeur ajustée à la qualité : un mode de vie comparable à la banlieue londonienne ou aux faubourgs genevois, à environ la moitié du coût total de la vie, dans un climat nettement meilleur pour la vie familiale en plein air.",
    "De kostenasymmetrie is reëel, al wordt ze vaak verkeerd begrepen. Portugal is in absolute termen niet goedkoop — zeker niet wanneer internationale schoolkosten, die variëren van €12.000 tot €32.000 per kind per jaar, worden meegerekend. Wat het biedt is kwaliteitsgecorrigeerde waarde: een levensstijl vergelijkbaar met de Londense forensengordel of de Zwitserse buitenwijken van Genève, voor ongeveer de helft van de totale kosten van levensonderhoud, in een klimaat dat aantoonbaar beter is voor een actief gezinsleven buiten.",
    "La asimetría de costes es real, aunque frecuentemente malentendida. Portugal no es barato en términos absolutos — especialmente cuando se tienen en cuenta las tarifas de las escuelas internacionales, que oscilan entre €12.000 y €32.000 por niño al año. Lo que ofrece es valor ajustado a la calidad: un estilo de vida comparable al cinturón de commuters de Londres o los suburbios de Ginebra, a aproximadamente la mitad del coste total de vida, en un clima notablemente mejor para la vida familiar al aire libre."
  ),

  stat1Desc: t(
    "Portugal's global safety ranking — Global Peace Index 2025. One of the safest countries in the world to raise children.",
    "Classificação global de segurança de Portugal — Índice Global da Paz 2025. Um dos países mais seguros do mundo para criar filhos.",
    "Portugals globales Sicherheitsranking — Global Peace Index 2025. Eines der sichersten Länder der Welt, um Kinder großzuziehen.",
    "Classement mondial de sécurité du Portugal — Indice mondial de la paix 2025. L'un des pays les plus sûrs du monde pour élever des enfants.",
    "Portugal's mondiale veiligheidsrangschikking — Global Peace Index 2025. Een van de veiligste landen ter wereld om kinderen groot te brengen.",
    "Clasificación mundial de seguridad de Portugal — Índice Global de Paz 2025. Uno de los países más seguros del mundo para criar hijos."
  ),

  stat2Desc: t(
    "Sunny days per year in Lisbon. Atlantic climate — mild winters, warm summers, year-round outdoor life for families.",
    "Dias de sol por ano em Lisboa. Clima atlântico — invernos amenos, verões quentes, vida ao ar livre durante todo o ano para as famílias.",
    "Sonnentage pro Jahr in Lissabon. Atlantisches Klima — milde Winter, warme Sommer, ganzjähriges Familienleben im Freien.",
    "Jours ensoleillés par an à Lisbonne. Climat atlantique — hivers doux, étés chauds, vie en plein air toute l'année pour les familles.",
    "Zonnige dagen per jaar in Lissabon. Atlantisch klimaat — zachte winters, warme zomers, het hele jaar door buiten leven als gezin.",
    "Días soleados al año en Lisboa. Clima atlántico — inviernos suaves, veranos cálidos, vida al aire libre durante todo el año para las familias."
  ),

  imageCaption: t(
    "Lisbon’s iconic yellow trams on a tree-lined street — a glimpse of the timeless lifestyle that makes staying an easy choice",
    "Os icónicos elétricos amarelos de Lisboa numa rua arborizada — um vislumbre do estilo de vida intemporal que torna a permanência uma escolha fácil.",
    "Lissabons ikonische gelbe Straßenbahnen auf einer von Bäumen gesäumten Straße — ein Einblick in den zeitlosen Lebensstil, der das Bleiben zu einer einfachen Entscheidung macht.",
    "Les tramways jaunes emblématiques de Lisbonne dans une rue bordée d'arbres — un aperçu du style de vie intemporel qui rend le séjour facile.",
    "De iconische gele trams van Lissabon in een straat met bomen — een glimp van de tijdloze levensstijl die het makkelijk maakt om te blijven.",
    "Los tranvías amarillos icónicos de Lisboa en una calle arbolada — un vistazo al estilo de vida atemporal que hace que quedarse sea una decisión fácil."
  ),

  imageAlt: t(
    "Family in Lisbon, Portugal — Raising Kids in Portugal relocation 2026",
    "Família em Lisboa, Portugal — Raising Kids in Portugal recolocação 2026",
    "Familie in Lissabon, Portugal — Raising Kids in Portugal Umzug 2026",
    "Famille à Lisbonne, Portugal — Raising Kids in Portugal relocalisation 2026",
    "Gezin in Lissabon, Portugal — Raising Kids in Portugal verhuizing 2026",
    "Familia en Lisboa, Portugal — Raising Kids in Portugal reubicación 2026"
  ),
} as const;

// ── BLOCK 2 — THE SCHOOL-FIRST PRINCIPLE ─────────────────────────────────────

const block2 = {
  h2: t(
    "The school decision is the relocation decision",
    "A escolha da escola é a decisão de recolocação",
    "Die Schulentscheidung ist die Umzugsentscheidung",
    "Le choix de l'école est la décision de relocalisation",
    "De schoolkeuze is de verhuisbeslissing",
    "La decisión escolar es la decisión de reubicación"
  ),

  p1: t(
    "Every family we work with arrives believing the school choice and the neighborhood choice are two parallel decisions. They are not. In the Lisbon area, the school drives the neighborhood — because the morning school run, if misjudged, can absorb 90 minutes of daily family life in traffic. This is the single most consequential structural mistake that relocating families make, and it is almost entirely preventable with the right sequencing of decisions.",
    "Todas as famílias com quem trabalhamos chegam convictas de que a escolha da escola e a escolha do bairro são duas decisões paralelas. Não são. Na área de Lisboa, a escola determina o bairro — porque o percurso escolar matinal, se mal calculado, pode consumir 90 minutos da vida familiar diária no trânsito. Este é o erro estrutural mais consequente que as famílias em recolocação cometem, e é quase inteiramente evitável com a sequência certa de decisões.",
    "Jede Familie, mit der wir arbeiten, kommt in der Überzeugung an, dass die Schulwahl und die Stadtviertelwahl zwei parallele Entscheidungen sind. Das sind sie nicht. Im Großraum Lissabon bestimmt die Schule das Viertel — denn der morgendliche Schulweg kann, wenn er falsch eingeschätzt wird, 90 Minuten des täglichen Familienlebens im Verkehr verschlingen. Dies ist der folgenreichste strukturelle Fehler, den umziehende Familien machen, und er ist mit der richtigen Reihenfolge der Entscheidungen fast vollständig vermeidbar.",
    "Chaque famille avec laquelle nous travaillons arrive en croyant que le choix de l'école et le choix du quartier sont deux décisions parallèles. Ce n'est pas le cas. Dans la région de Lisbonne, l'école détermine le quartier — car le trajet scolaire du matin, s'il est mal évalué, peut absorber 90 minutes de la vie familiale quotidienne dans les embouteillages. C'est l'erreur structurelle la plus lourde de conséquences que commettent les familles qui s'expatrient, et elle est presque entièrement évitable avec le bon ordre de décisions.",
    "Elk gezin waarmee we werken, komt aan in de overtuiging dat de schoolkeuze en de buurtkeuze twee parallelle beslissingen zijn. Dat zijn ze niet. In de regio Lissabon bepaalt de school de buurt — want de ochtendreis naar school kan, als die verkeerd wordt ingeschat, 90 minuten van het dagelijkse gezinsleven in het verkeer opslorpen. Dit is de meest ingrijpende structurele fout die verhuizende gezinnen maken, en hij is met de juiste volgorde van beslissingen bijna volledig te voorkomen.",
    "Cada familia con la que trabajamos llega creyendo que la elección de la escuela y la elección del barrio son dos decisiones paralelas. No lo son. En el área de Lisboa, la escuela determina el barrio — porque el trayecto escolar matutino, si se calcula mal, puede absorber 90 minutos de la vida familiar diaria en el tráfico. Este es el error estructural más trascendente que cometen las familias en reubicación, y es casi completamente evitable con la secuencia correcta de decisiones."
  ),

  p2: t(
    "St.\u00a0Julian's School, in Carcavelos, draws its community primarily from Cascais and Estoril — a 15-to-20 minute coastal drive. TASIS Portugal and CAISL, both in Sintra, are most naturally paired with a residence in Sintra itself or the surrounding hills. United Lisbon International School, in Parque das Nações, is walkable from the riverfront apartments surrounding it. Choose a neighborhood first, and you risk a daily commute that erodes the quality of life the move was supposed to provide.",
    "A St.\u00a0Julian's School, em Carcavelos, atrai a sua comunidade principalmente de Cascais e Estoril — uma deslocação costeira de 15 a 20 minutos. A TASIS Portugal e a CAISL, ambas em Sintra, combinam naturalmente com uma residência em Sintra ou nas colinas circundantes. A United Lisbon International School, no Parque das Nações, é acessível a pé a partir dos apartamentos ribeirinhos que a rodeiam. Escolher primeiro o bairro é arriscar uma deslocação diária que corrói a qualidade de vida que a mudança deveria proporcionar.",
    "Die St.\u00a0Julian's School in Carcavelos zieht ihre Gemeinschaft hauptsächlich aus Cascais und Estoril — eine 15 bis 20-minütige Küstenfahrt. TASIS Portugal und CAISL, beide in Sintra, lassen sich am natürlichsten mit einem Wohnsitz in Sintra selbst oder den umliegenden Hügeln kombinieren. Die United Lisbon International School in Parque das Nações ist von den umliegenden Flussufer-Apartments zu Fuß erreichbar. Wählt man zuerst ein Viertel, riskiert man einen täglichen Pendelweg, der die Lebensqualität mindert, die der Umzug eigentlich bringen sollte.",
    "La St.\u00a0Julian's School, à Carcavelos, attire sa communauté principalement depuis Cascais et Estoril — un trajet côtier de 15 à 20 minutes. TASIS Portugal et CAISL, toutes deux à Sintra, se marient naturellement avec une résidence à Sintra même ou dans les collines environnantes. L'United Lisbon International School, dans le Parque das Nações, est accessible à pied depuis les appartements riverains qui l'entourent. Choisir d'abord un quartier, c'est risquer un trajet quotidien qui érode la qualité de vie que le déménagement était censé apporter.",
    "De St.\u00a0Julian's School in Carcavelos trekt haar gemeenschap voornamelijk uit Cascais en Estoril — een kustrit van 15 tot 20 minuten. TASIS Portugal en CAISL, beide in Sintra, passen het meest natuurlijk bij een woning in Sintra zelf of de omliggende heuvels. De United Lisbon International School in Parque das Nações is lopend bereikbaar vanuit de omringende appartementen langs de rivier. Eerst een buurt kiezen betekent het risico lopen van een dagelijks woon-werkverkeer dat de levenskwaliteit uitholt die de verhuizing moest bieden.",
    "El St.\u00a0Julian's School, en Carcavelos, atrae a su comunidad principalmente desde Cascais y Estoril — un trayecto costero de 15 a 20 minutos. TASIS Portugal y CAISL, ambas en Sintra, se combinan más naturalmente con una residencia en la propia Sintra o en las colinas circundantes. La United Lisbon International School, en Parque das Nações, es accesible a pie desde los apartamentos ribereños que la rodean. Elegir primero el barrio supone arriesgarse a un trayecto diario que erosiona la calidad de vida que se supone debía proporcionar la mudanza."
  ),

  p3: t(
    "Most international schools near Lisbon open applications for September entry in October or November of the preceding year. St.\u00a0Julian's often closes its waitlist well before January. The families who arrive well-placed are those who applied 12 to 18 months in advance, to two or three schools simultaneously. The application is not a formality — it is the first real commitment of the relocation.",
    "A maioria das escolas internacionais perto de Lisboa abre as candidaturas para entrada em setembro em outubro ou novembro do ano anterior. A St.\u00a0Julian's fecha frequentemente a sua lista de espera bem antes de janeiro. As famílias que chegam bem posicionadas são aquelas que se candidataram com 12 a 18 meses de antecedência, a duas ou três escolas em simultâneo. A candidatura não é uma formalidade — é o primeiro compromisso real da recolocação.",
    "Die meisten internationalen Schulen in der Nähe von Lissabon öffnen die Bewerbungen für den September-Eintritt im Oktober oder November des Vorjahres. Die Warteliste der St.\u00a0Julian's schließt oft weit vor Januar. Die Familien, die gut positioniert ankommen, sind diejenigen, die 12 bis 18 Monate im Voraus, bei zwei oder drei Schulen gleichzeitig, beworben haben. Die Bewerbung ist keine Formalität — sie ist das erste echte Engagement des Umzugs.",
    "La plupart des écoles internationales proches de Lisbonne ouvrent les candidatures pour une rentrée en septembre en octobre ou novembre de l'année précédente. La liste d'attente de la St.\u00a0Julian's est souvent fermée bien avant janvier. Les familles qui arrivent bien positionnées sont celles qui ont postulé 12 à 18 mois à l'avance, dans deux ou trois écoles simultanément. La candidature n'est pas une formalité — c'est le premier engagement réel de la relocalisation.",
    "De meeste internationale scholen nabij Lissabon openen de aanmeldingen voor instroom in september in oktober of november van het voorafgaande jaar. De wachtlijst van de St.\u00a0Julian's sluit vaak ruim voor januari. De gezinnen die goed gepositioneerd aankomen, zijn degenen die 12 tot 18 maanden van tevoren, bij twee of drie scholen tegelijkertijd, hebben gesolliciteerd. De aanmelding is geen formaliteit — het is de eerste echte verbintenis van de verhuizing.",
    "La mayoría de las escuelas internacionales cercanas a Lisboa abren las solicitudes para entrada en septiembre en octubre o noviembre del año anterior. La St.\u00a0Julian's suele cerrar su lista de espera bastante antes de enero. Las familias que llegan bien posicionadas son las que solicitaron plaza con 12 a 18 meses de antelación, en dos o tres escuelas simultáneamente. La solicitud no es una formalidad — es el primer compromiso real de la reubicación."
  ),

  statDesc: t(
    "Acceptance rate at St.\u00a0Julian's School — the most selective international school in Portugal. Apply to two or three schools simultaneously, and apply early.",
    "Taxa de aceitação na St.\u00a0Julian's School — a escola internacional mais seletiva de Portugal. Candidate-se a duas ou três escolas em simultâneo e candidate-se cedo.",
    "Aufnahmequote an der St.\u00a0Julian's School — der selektivsten internationalen Schule in Portugal. Bewerben Sie sich gleichzeitig bei zwei oder drei Schulen und bewerben Sie sich früh.",
    "Taux d'acceptation à la St.\u00a0Julian's School — l'école internationale la plus sélective du Portugal. Candidatez dans deux ou trois écoles simultanément, et candidatez tôt.",
    "Acceptatiepercentage bij de St.\u00a0Julian's School — de meest selectieve internationale school in Portugal. Solliciteer bij twee of drie scholen tegelijkertijd en doe dit vroeg.",
    "Tasa de aceptación en el St.\u00a0Julian's School — la escuela internacional más selectiva de Portugal. Solicite plaza en dos o tres escuelas simultáneamente y hágalo con antelación."
  ),

  blockquote: t(
    "\u201cChoose the school first. The neighborhood follows. The commute is the quality of life.\u201d",
    "\u201cEscolha primeiro a escola. O bairro segue-se. O percurso diário é a qualidade de vida.\u201d",
    "\u201eWählen Sie zuerst die Schule. Das Viertel folgt. Der Pendelweg ist die Lebensqualität.\u201c",
    "\u00abChoisissez d'abord l'école. Le quartier suit. Le trajet quotidien, c'est la qualité de vie.\u00bb",
    "\u2018Kies eerst de school. De buurt volgt. Het woon-werkverkeer is de kwaliteit van leven.\u2019",
    "\u201cElije primero la escuela. El barrio viene después. El trayecto diario es la calidad de vida.\u201d"
  ),

  blockquoteAuthor: t(
    "Raising Kids in Portugal research principle",
    "Princípio de pesquisa Raising Kids in Portugal",
    "Raising Kids in Portugal-Forschungsprinzip",
    "Principe de recherche Raising Kids in Portugal",
    "Raising Kids in Portugal onderzoeksprincipe",
    "Principio de investigación Raising Kids in Portugal"
  ),
} as const;

// ── QUIZ BRIDGE ───────────────────────────────────────────────────────────────

const quizBridge = {
  // Contains an inline link to /school-finder — split into pre / linkText / post
  pre: t(
    "Not sure which school fits your family\u2019s priorities \u2014 curriculum, lifestyle, or budget? Our\u00a0",
    "Não tem a certeza de qual escola se adequa às prioridades da sua família — currículo, estilo de vida ou orçamento? O nosso\u00a0",
    "Nicht sicher, welche Schule zu den Prioritäten Ihrer Familie passt — Lehrplan, Lebensstil oder Budget? Unser\u00a0",
    "Vous ne savez pas quelle école correspond aux priorités de votre famille — programme, style de vie ou budget\u00a0? Notre\u00a0",
    "Weet u niet welke school past bij de prioriteiten van uw gezin — curriculum, levensstijl of budget? Onze\u00a0",
    "¿No sabe qué escuela se adapta a las prioridades de su familia — currículo, estilo de vida o presupuesto? Nuestro\u00a0"
  ),
  linkText: t(
    "School Finder",
    "School Finder",
    "School Finder",
    "School Finder",
    "School Finder",
    "School Finder"
  ),
  post: t(
    "\u00a0matches your situation to the right school and neighborhood in 60 seconds.",
    "\u00a0encontra a escola e o bairro certos para a sua situação em 60 segundos.",
    "\u00a0bringt Ihre Situation mit der richtigen Schule und dem richtigen Viertel in 60 Sekunden zusammen.",
    "\u00a0trouve l'école et le quartier qui correspondent à votre situation en 60 secondes.",
    "\u00a0koppelt uw situatie aan de juiste school en buurt in 60 seconden.",
    "\u00a0conecta su situación con la escuela y el barrio adecuados en 60 segundos."
  ),
} as const;

// ── RESPIRO IMAGE ─────────────────────────────────────────────────────────────

const respiro = {
  alt: t(
    "Family life in Portugal — Raising Kids in Portugal relocation",
    "Vida familiar em Portugal — Raising Kids in Portugal recolocação",
    "Familienleben in Portugal — Raising Kids in Portugal Umzug",
    "Vie de famille au Portugal — Raising Kids in Portugal relocalisation",
    "Gezinsleven in Portugal — Raising Kids in Portugal verhuizing",
    "Vida familiar en Portugal — Raising Kids in Portugal reubicación"
  ),
} as const;

// ── BLOCK 3 — INDEPENDENT INTELLIGENCE ───────────────────────────────────────

const block3 = {
  h2: t(
    "What independent intelligence looks like in practice",
    "Como se parece a inteligência independente na prática",
    "Wie unabhängige Intelligence in der Praxis aussieht",
    "À quoi ressemble l'intelligence indépendante en pratique",
    "Hoe onafhankelijke intelligentie er in de praktijk uitziet",
    "Cómo se ve la inteligencia independiente en la práctica"
  ),

  p1: t(
    "Raising Kids in Portugal was built from a specific frustration: the near-total absence of honest, structured, non-commercial information for families seriously considering a move to Portugal. The market offered two things — relocation agencies with financial relationships with specific schools and landlords, and expat forums where individual experience often ran ahead of verified fact. Neither served families making a decision worth hundreds of thousands of euros in school fees, housing deposits, and life reorganisation.",
    "A Raising Kids in Portugal nasceu de uma frustração específica: a quase total ausência de informação honesta, estruturada e não comercial para famílias que consideram seriamente uma mudança para Portugal. O mercado oferecia duas coisas — agências de recolocação com relações financeiras com escolas e senhorios específicos, e fóruns de expatriados onde a experiência individual muitas vezes avançava à frente dos factos verificados. Nenhuma delas servia famílias que tomavam uma decisão no valor de centenas de milhares de euros em propinas, depósitos de habitação e reorganização de vida.",
    "Raising Kids in Portugal entstand aus einer spezifischen Frustration: dem nahezu vollständigen Fehlen ehrlicher, strukturierter, nicht-kommerzieller Informationen für Familien, die ernsthaft einen Umzug nach Portugal in Betracht ziehen. Der Markt bot zwei Dinge — Umzugsagenturen mit finanziellen Beziehungen zu bestimmten Schulen und Vermietern, und Expat-Foren, in denen persönliche Erfahrungen oft den verifizierten Fakten vorauseilten. Keine davon half Familien, die eine Entscheidung über Hunderttausende von Euro an Schulgebühren, Wohnungsdepositen und Lebensumgestaltung trafen.",
    "Raising Kids in Portugal est né d'une frustration spécifique : l'absence quasi totale d'informations honnêtes, structurées et non commerciales pour les familles qui envisagent sérieusement un déménagement au Portugal. Le marché offrait deux choses — des agences de relocalisation ayant des liens financiers avec certaines écoles et propriétaires, et des forums d'expatriés où les expériences individuelles devançaient souvent les faits vérifiés. Aucun des deux ne servait les familles prenant une décision valant des centaines de milliers d'euros en frais de scolarité, cautions de logement et réorganisation de vie.",
    "Raising Kids in Portugal is voortgekomen uit een specifieke frustratie: de bijna totale afwezigheid van eerlijke, gestructureerde, niet-commerciële informatie voor gezinnen die serieus overwegen naar Portugal te verhuizen. De markt bood twee dingen — verhuisbureaus met financiële relaties met specifieke scholen en verhuurders, en expat-forums waar persoonlijke ervaringen vaak de geverifieerde feiten vooruitliepen. Geen van beide diende gezinnen die een beslissing namen ter waarde van honderdduizenden euro's aan schoolkosten, huurdeposito's en levensreorganisatie.",
    "Raising Kids in Portugal nació de una frustración específica: la ausencia casi total de información honesta, estructurada y no comercial para familias que consideran seriamente mudarse a Portugal. El mercado ofrecía dos cosas — agencias de reubicación con relaciones financieras con escuelas y propietarios específicos, y foros de expatriados donde la experiencia individual a menudo se adelantaba a los hechos verificados. Ninguno de los dos servía a familias que tomaban una decisión que valía cientos de miles de euros en tasas escolares, depósitos de vivienda y reorganización de vida."
  ),

  p2: t(
    "Every school profile in our guides reflects in-person visits, direct conversations with admissions teams and parent communities, and careful verification of the data points that actually matter: real acceptance rates (not the selective figures schools publish), the full fee structure including registration and capital levy charges, curriculum transition considerations for children arriving mid-programme, and the texture of each school's culture that does not appear in any prospectus.",
    "Cada perfil de escola nos nossos guias reflete visitas presenciais, conversas diretas com equipas de admissões e comunidades de pais, e uma cuidadosa verificação dos dados que realmente importam: taxas de aceitação reais (não os valores seletivos que as escolas publicam), a estrutura completa de propinas incluindo encargos de registo e capital, considerações sobre a transição curricular para crianças que chegam a meio de um programa, e a textura da cultura de cada escola que não aparece em nenhum prospeto.",
    "Jedes Schulprofil in unseren Leitfäden spiegelt persönliche Besuche, direkte Gespräche mit Zulassungsteams und Elterngemeinschaften sowie eine sorgfältige Überprüfung der wirklich wichtigen Datenpunkte wider: reale Aufnahmequoten (nicht die selektiven Zahlen, die Schulen veröffentlichen), die vollständige Gebührenstruktur einschließlich Anmeldegebühren und Kapitalabgaben, Überlegungen zum Lehrplanwechsel für Kinder, die mitten im Programm ankommen, und die Textur der Schulkultur, die in keinem Prospekt erscheint.",
    "Chaque profil d'école dans nos guides reflète des visites en personne, des conversations directes avec les équipes d'admission et les communautés de parents, et une vérification minutieuse des données qui comptent vraiment : les taux d'acceptation réels (pas les chiffres sélectifs que les écoles publient), la structure complète des frais incluant les frais d'inscription et les contributions en capital, les considérations de transition curriculaire pour les enfants arrivant en cours de programme, et la texture de la culture de chaque école qui n'apparaît dans aucun prospectus.",
    "Elk schoolprofiel in onze gidsen weerspiegelt bezoeken ter plaatse, directe gesprekken met toelatingsteams en oudergemeenschappen, en zorgvuldige verificatie van de gegevenspunten die er echt toe doen: werkelijke toelatingscijfers (niet de selectieve cijfers die scholen publiceren), de volledige kostenstructuur inclusief registratie- en kapitaallevijes, overwegingen bij de curriculumovergang voor kinderen die halverwege een programma aankomen, en de sfeer van de schoolcultuur die in geen enkele brochure staat.",
    "Cada perfil de escuela en nuestras guías refleja visitas en persona, conversaciones directas con equipos de admisiones y comunidades de padres, y una cuidadosa verificación de los datos que realmente importan: tasas de aceptación reales (no las cifras selectivas que publican las escuelas), la estructura completa de tarifas incluyendo cargos de registro y capital, consideraciones sobre la transición curricular para niños que llegan a mitad de programa, y la textura de la cultura de cada escuela que no aparece en ningún prospecto."
  ),

  // p3 contains an inline anchor to AIMA — split into pre / linkText / post
  p3Pre: t(
    "No school pays for placement here. No property company refers traffic to these guides. There are no affiliate links. The neighborhood commute data is observed at actual school-run times, not mapping software estimates in off-peak conditions. The visa information — covering the D7 Passive Income Visa, the D8 Digital Nomad Visa, and the restructured Golden Visa program — is reviewed against\u00a0",
    "Nenhuma escola paga para ser incluída aqui. Nenhuma empresa imobiliária encaminha tráfego para estes guias. Não há links de afiliados. Os dados de deslocação para os bairros são observados nos horários reais de saída das escolas, não em estimativas de software de mapeamento em condições fora do pico. A informação sobre vistos — cobrindo o Visto D7 de Rendimento Passivo, o Visto D8 de Nómada Digital e o programa de Golden Visa reestruturado — é revista com base nas\u00a0",
    "Keine Schule zahlt für eine Platzierung hier. Kein Immobilienunternehmen leitet Traffic an diese Leitfäden weiter. Es gibt keine Affiliate-Links. Die Pendeldaten der Stadtteile werden zu tatsächlichen Schulwegezeiten beobachtet, nicht mit Schätzungen der Mapping-Software in Nebenzeiten. Die Visainformationen — einschließlich des D7-Visums für passives Einkommen, des D8-Visums für digitale Nomaden und des umstrukturierten Golden-Visa-Programms — werden gegen die\u00a0",
    "Aucune école ne paie pour être classée ici. Aucune société immobilière ne dirige du trafic vers ces guides. Il n'y a pas de liens d'affiliation. Les données de trajet des quartiers sont observées aux horaires réels des trajets scolaires, pas selon les estimations des logiciels de cartographie en conditions hors pointe. Les informations sur les visas — couvrant le visa D7 de revenus passifs, le visa D8 de nomade numérique, et le programme Golden Visa restructuré — sont examinées par rapport aux\u00a0",
    "Geen enkele school betaalt voor plaatsing hier. Geen enkel vastgoedbedrijf verwijst verkeer naar deze gidsen. Er zijn geen affiliate-links. De pendeltijden van de wijken worden waargenomen op werkelijke schoolreistijden, niet op schattingen van kaartsoftware in daluren. De visuminformatie — met betrekking tot het D7-visum voor passief inkomen, het D8-visum voor digitale nomaden en het geherstructureerde Golden Visa-programma — wordt getoetst aan de officiële\u00a0",
    "Ninguna escuela paga por ser incluida aquí. Ninguna empresa inmobiliaria dirige tráfico a estas guías. No hay enlaces de afiliados. Los datos de desplazamiento de los barrios se observan a los horarios reales de los trayectos escolares, no en estimaciones de software de cartografía en condiciones fuera de hora punta. La información sobre visados — que cubre el Visado D7 de Ingresos Pasivos, el Visado D8 de Nómada Digital y el programa Golden Visa reestructurado — se revisa según las\u00a0"
  ),
  p3LinkText: t(
    "official AIMA guidance",
    "orientações oficiais da AIMA",
    "offiziellen AIMA-Richtlinien",
    "directives officielles de l'AIMA",
    "AIMA-richtlijnen",
    "directrices oficiales de la AIMA"
  ),
  p3Post: t(
    "\u00a0and updated when the rules change, as they did significantly between 2023 and 2025.",
    "\u00a0e atualizada quando as regras mudam, como aconteceu de forma significativa entre 2023 e 2025.",
    "\u00a0geprüft und aktualisiert, wenn sich die Regeln ändern, wie es zwischen 2023 und 2025 erheblich geschehen ist.",
    "\u00a0et mises à jour lorsque les règles changent, comme cela s'est produit de manière significative entre 2023 et 2025.",
    "\u00a0en bijgewerkt wanneer de regels veranderen, zoals ingrijpend is gebeurd tussen 2023 en 2025.",
    "\u00a0y se actualiza cuando cambian las reglas, como ocurrió de manera significativa entre 2023 y 2025."
  ),

  quote: t(
    "The information that matters most — visa changes, admission openings, school fee updates — moves faster than most guides can keep pace with. Join the families already following Raising Kids in Portugal\u2019s research updates for 2026.",
    "A informação que mais importa — alterações de visto, aberturas de admissão, atualizações de propinas — move-se mais depressa do que a maioria dos guias consegue acompanhar. Junte-se às famílias que já seguem as atualizações de pesquisa da Raising Kids in Portugal para 2026.",
    "Die wichtigsten Informationen — Visaänderungen, Zulassungseröffnungen, Schulgebührenaktualisierungen — bewegen sich schneller, als die meisten Leitfäden mithalten können. Schließen Sie sich den Familien an, die Raising Kids in Portugals Forschungsupdates für 2026 bereits verfolgen.",
    "Les informations les plus importantes — changements de visa, ouvertures d'admissions, mises à jour des frais scolaires — évoluent plus vite que la plupart des guides ne peuvent suivre. Rejoignez les familles qui suivent déjà les mises à jour de recherche de Raising Kids in Portugal pour 2026.",
    "De informatie die er het meest toe doet — visumwijzigingen, openingen voor toelating, updates van schoolkosten — beweegt sneller dan de meeste gidsen kunnen bijhouden. Sluit u aan bij de gezinnen die de onderzoeksupdates van Raising Kids in Portugal voor 2026 al volgen.",
    "La información que más importa — cambios de visado, aperturas de admisión, actualizaciones de tasas escolares — se mueve más rápido de lo que la mayoría de las guías puede seguir. Únase a las familias que ya siguen las actualizaciones de investigación de Raising Kids in Portugal para 2026."
  ),
} as const;

// ── PUBLIC API ────────────────────────────────────────────────────────────────

export type HomeContent = ReturnType<typeof getHomeContent>;

export function getHomeContent(locale: string) {
  const l = locale as L;
  const pick = (o: T): string => o[l] ?? o.en;

  return {
    block1: {
      h2:           pick(block1.h2),
      p1:           pick(block1.p1),
      p2Pre:        pick(block1.p2Pre),
      p2LinkText:   pick(block1.p2LinkText),
      p2Post:       pick(block1.p2Post),
      p3:           pick(block1.p3),
      p4:           pick(block1.p4),
      stat1Desc:    pick(block1.stat1Desc),
      stat2Desc:    pick(block1.stat2Desc),
      imageCaption: pick(block1.imageCaption),
      imageAlt:     pick(block1.imageAlt),
    },
    block2: {
      h2:              pick(block2.h2),
      p1:              pick(block2.p1),
      p2:              pick(block2.p2),
      p3:              pick(block2.p3),
      statDesc:        pick(block2.statDesc),
      blockquote:      pick(block2.blockquote),
      blockquoteAuthor: pick(block2.blockquoteAuthor),
    },
    quizBridge: {
      pre:      pick(quizBridge.pre),
      linkText: pick(quizBridge.linkText),
      post:     pick(quizBridge.post),
    },
    respiroAlt: pick(respiro.alt),
    block3: {
      h2:         pick(block3.h2),
      p1:         pick(block3.p1),
      p2:         pick(block3.p2),
      p3Pre:      pick(block3.p3Pre),
      p3LinkText: pick(block3.p3LinkText),
      p3Post:     pick(block3.p3Post),
      quote:      pick(block3.quote),
    },
  };
}
