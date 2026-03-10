import type { Neighborhood, NeighborhoodTranslation } from "../types";
import rawNeighborhoods from "./raw/neighborhoods-database.json";

export type { Neighborhood };

const DESCRIPTION_FALLBACK_BY_LOCALE: Record<string, (name: string, location?: string) => string> = {
  en: (name, location) => `${name} is located in ${location ?? "Portugal"}.`,
  es: (name, location) => `${name} se encuentra en ${location ?? "Portugal"}.`,
  pt: (name, location) => `${name} fica em ${location ?? "Portugal"}.`,
  de: (name, location) => `${name} befindet sich in ${location ?? "Portugal"}.`,
  fr: (name, location) => `${name} se situe a ${location ?? "Portugal"}.`,
  nl: (name, location) => `${name} ligt in ${location ?? "Portugal"}.`,
};

function localizeCommuteFromEn(locale: string, text: string): string {
  if (!text || locale === "en") return text;

  const replaceAll = (input: string, rules: Array<[RegExp, string]>) =>
    rules.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), input);

  const rulesByLocale: Record<string, Array<[RegExp, string]>> = {
    es: [
      [/\bwalking distance\b/gi, "a distancia a pie"],
      [/\bby car\b/gi, "en coche"],
      [/\bby train\b/gi, "en tren"],
      [/\bto\b/gi, "a"],
    ],
    pt: [
      [/\bwalking distance\b/gi, "a distancia a pe"],
      [/\bby car\b/gi, "de carro"],
      [/\bby train\b/gi, "de comboio"],
      [/\bto\b/gi, "a"],
    ],
    de: [
      [/\bwalking distance\b/gi, "zu Fuss erreichbar"],
      [/\bby car\b/gi, "mit dem Auto"],
      [/\bby train\b/gi, "mit dem Zug"],
      [/\bto\b/gi, "nach"],
    ],
    fr: [
      [/\bwalking distance\b/gi, "a distance a pied"],
      [/\bby car\b/gi, "en voiture"],
      [/\bby train\b/gi, "en train"],
      [/\bto\b/gi, "vers"],
    ],
    nl: [
      [/\bwalking distance\b/gi, "op loopafstand"],
      [/\bby car\b/gi, "met de auto"],
      [/\bby train\b/gi, "met de trein"],
      [/\bto\b/gi, "naar"],
    ],
  };

  const rules = rulesByLocale[locale];
  return rules ? replaceAll(text, rules) : text;
}

/**
 * Returns the best available translation for a neighborhood.
 * Falls back to `en` if the requested locale is not yet translated.
 */
export function getNeighborhoodT(neighborhood: Neighborhood, locale: string): NeighborhoodTranslation {
  const translations = neighborhood.translations as Record<string, NeighborhoodTranslation>;
  const direct = translations[locale];
  if (direct) return direct;

  const en = neighborhood.translations.en;
  const buildDescriptionFallback = DESCRIPTION_FALLBACK_BY_LOCALE[locale] ?? DESCRIPTION_FALLBACK_BY_LOCALE.en;

  return {
    ...en,
    // Keep full original content when locale is missing, but localize commute wording.
    description: en.description ?? buildDescriptionFallback(neighborhood.name, neighborhood.location),
    commuteContext: localizeCommuteFromEn(locale, en.commuteContext ?? ""),
  };
}

const curatedNeighborhoods: Neighborhood[] = [
  {
    id: "1",
    slug: "cascais",
    name: "Cascais",
    location: "Lisbon Coast",
    coordinates: { lat: 38.6969, lng: -9.4227 },
    translations: {
      en: {
        vibe: "Relaxed Coastal Luxury",
        description:
          "Portugal's most sought-after expat address. Cascais blends sandy Atlantic beaches, a bustling marina, and a historic town centre — all 30 minutes from Lisbon by train. It is home to the largest expat community in the country and hosts St. Julian's School, one of Europe's top-ranked international schools.",
        highlights: ["Beautiful Beaches", "International Community", "Safe & Walkable"],
        commuteContext: "15 min to St. Julian's School by car · 30 min to Lisbon Oriente by train",
        vibeAdjectives: ["Safe", "Walkable", "Expat Hub", "Beach Town", "Dog-Friendly"],
        amenities: ["🏖 Atlantic beaches", "🏫 St. Julian's School", "🚋 Train to Lisbon", "⛵ Marina", "🛒 Cascais Shopping"],
      },
      pt: {
        vibe: "Luxo Costeiro Descontraído",
        description:
          "O endereço de expatriados mais procurado de Portugal. Cascais combina praias atlânticas de areia dourada, uma marina animada e um centro histórico — tudo a 30 minutos de Lisboa de comboio. É lar da maior comunidade expat do país e acolhe o St. Julian's School, uma das melhores escolas internacionais da Europa.",
        highlights: ["Praias Deslumbrantes", "Comunidade Internacional", "Seguro e Pedonal"],
        commuteContext: "15 min ao St. Julian's School de carro · 30 min a Lisboa Oriente de comboio",
        vibeAdjectives: ["Seguro", "Pedonal", "Hub Expat", "Cidade de Praia", "Dog-Friendly"],
        amenities: ["🏖 Praias atlânticas", "🏫 St. Julian's School", "🚋 Comboio para Lisboa", "⛵ Marina", "🛒 Cascais Shopping"],
      },
      de: {
        vibe: "Entspannter Küstenluxus",
        description:
          "Portugals begehrteste Expat-Adresse. Cascais verbindet sandige Atlantikstrände, eine geschäftige Marina und ein historisches Stadtzentrum — alles 30 Minuten von Lissabon mit dem Zug. Es beherbergt die größte Expat-Gemeinde des Landes und die St. Julian's School, eine der bestplatzierten Internationalschulen Europas.",
        highlights: ["Schöne Strände", "Internationale Gemeinschaft", "Sicher & Fußläufig"],
        commuteContext: "15 Min. zur St. Julian's School mit dem Auto · 30 Min. nach Lissabon Oriente mit dem Zug",
        vibeAdjectives: ["Sicher", "Fußläufig", "Expat-Hub", "Strandstadt", "Hundefreundlich"],
        amenities: ["🏖 Atlantikstrände", "🏫 St. Julian's School", "🚋 Zug nach Lissabon", "⛵ Marina", "🛒 Cascais Shopping"],
      },
      fr: {
        vibe: "Luxe Côtier Détendu",
        description:
          "L'adresse expatriée la plus prisée du Portugal. Cascais marie plages de sable atlantique, une marina animée et un centre-ville historique — à seulement 30 minutes de Lisbonne en train. C'est le foyer de la plus grande communauté d'expatriés du pays et accueille la St. Julian's School, l'une des meilleures écoles internationales d'Europe.",
        highlights: ["Belles Plages", "Communauté Internationale", "Sûr & Marchable"],
        commuteContext: "15 min à St. Julian's School en voiture · 30 min à Lisbonne Oriente en train",
        vibeAdjectives: ["Sûr", "Marchable", "Hub Expatrié", "Ville de Plage", "Dog-Friendly"],
        amenities: ["🏖 Plages atlantiques", "🏫 St. Julian's School", "🚋 Train pour Lisbonne", "⛵ Marina", "🛒 Cascais Shopping"],
      },
      nl: {
        vibe: "Ontspannen Kustluxe",
        description:
          "Het meest gevraagde expat-adres van Portugal. Cascais combineert zandige Atlantische stranden, een bruisende jachthaven en een historisch stadscentrum — alles op 30 minuten van Lissabon per trein. Het is de thuisbasis van de grootste expatgemeenschap van het land en herbergt de St. Julian's School, een van de best gerangschikte internationale scholen van Europa.",
        highlights: ["Prachtige Stranden", "Internationale Gemeenschap", "Veilig & Voetgangervriendelijk"],
        commuteContext: "15 min naar St. Julian's School met de auto · 30 min naar Lissabon Oriente per trein",
        vibeAdjectives: ["Veilig", "Voetgangervriendelijk", "Expat-Hub", "Strandstad", "Hondvriendelijk"],
        amenities: ["🏖 Atlantische stranden", "🏫 St. Julian's School", "🚋 Trein naar Lissabon", "⛵ Jachthaven", "🛒 Cascais Shopping"],
      },
      es: {
        vibe: "Lujo Costero Relajado",
        description:
          "La dirección de expatriados más codiciada de Portugal. Cascais combina playas de arena atlántica, una animada marina y un centro histórico — todo a 30 minutos de Lisboa en tren. Es el hogar de la mayor comunidad de expatriados del país y acoge el St. Julian's School, uno de los colegios internacionales mejor clasificados de Europa.",
        highlights: ["Hermosas Playas", "Comunidad Internacional", "Seguro y Peatonal"],
        commuteContext: "15 min al St. Julian's School en coche · 30 min a Lisboa Oriente en tren",
        vibeAdjectives: ["Seguro", "Peatonal", "Hub de Expatriados", "Ciudad de Playa", "Apto para Perros"],
        amenities: ["🏖 Playas atlánticas", "🏫 St. Julian's School", "🚋 Tren a Lisboa", "⛵ Marina", "🛒 Cascais Shopping"],
      },
    },
  },
  {
    id: "2",
    slug: "estoril",
    name: "Estoril",
    location: "Lisbon Coast",
    coordinates: { lat: 38.7063, lng: -9.3967 },
    translations: {
      en: {
        vibe: "Elegant & Quiet",
        description:
          "Neighbour to Cascais and just as beautiful — without the tourist crowds. Estoril is famous for its grand casino gardens, Belle Époque architecture, and pristine beaches. It shares the Cascais Line train, making Lisbon and St. Julian's School equally accessible.",
        highlights: ["Grand Casino & Gardens", "Golf Courses", "Beach Access"],
        commuteContext: "20 min to St. Julian's School by car · 28 min to Lisbon Oriente by train",
        vibeAdjectives: ["Quiet", "Elegant", "Upscale", "Peaceful", "Beachfront"],
        amenities: ["🏖 Estoril beach", "🎰 Casino Gardens", "⛳ Golf courses", "🚋 Train to Lisbon", "🏫 Near St. Julian's"],
      },
      pt: {
        vibe: "Elegante e Tranquilo",
        description:
          "Vizinho de Cascais e igualmente bonito — sem as multidões turísticas. Estoril é famoso pelos seus grandiosos jardins do casino, arquitetura Belle Époque e praias imaculadas. Partilha a linha de Cascais, tornando Lisboa e o St. Julian's School igualmente acessíveis.",
        highlights: ["Casino e Jardins", "Campos de Golfe", "Acesso à Praia"],
        commuteContext: "20 min ao St. Julian's School de carro · 28 min a Lisboa Oriente de comboio",
        vibeAdjectives: ["Tranquilo", "Elegante", "Exclusivo", "Sereno", "À Beira-Mar"],
        amenities: ["🏖 Praia do Estoril", "🎰 Jardins do Casino", "⛳ Campos de golfe", "🚋 Comboio para Lisboa", "🏫 Perto do St. Julian's"],
      },
      de: {
        vibe: "Elegant & Ruhig",
        description:
          "Nachbar von Cascais und genauso schön — ohne die Touristenmassen. Estoril ist berühmt für seine prachtvollen Casinogärten, Belle-Époque-Architektur und makellose Strände. Es teilt die Cascais-Linie, wodurch Lissabon und die St. Julian's School gleichermaßen erreichbar sind.",
        highlights: ["Grand Casino & Gärten", "Golfplätze", "Strandzugang"],
        commuteContext: "20 Min. zur St. Julian's School mit dem Auto · 28 Min. nach Lissabon Oriente mit dem Zug",
        vibeAdjectives: ["Ruhig", "Elegant", "Gehoben", "Friedlich", "Strandnah"],
        amenities: ["🏖 Estoril-Strand", "🎰 Casinogärten", "⛳ Golfplätze", "🚋 Zug nach Lissabon", "🏫 Nahe St. Julian's"],
      },
      fr: {
        vibe: "Élégant & Tranquille",
        description:
          "Voisin de Cascais et tout aussi beau — sans les foules touristiques. Estoril est célèbre pour ses somptueux jardins de casino, son architecture Belle Époque et ses plages immaculées. Il partage la ligne de Cascais, rendant Lisbonne et la St. Julian's School également accessibles.",
        highlights: ["Grand Casino & Jardins", "Golfs", "Accès à la Plage"],
        commuteContext: "20 min à St. Julian's School en voiture · 28 min à Lisbonne Oriente en train",
        vibeAdjectives: ["Tranquille", "Élégant", "Haut de Gamme", "Paisible", "Front de Mer"],
        amenities: ["🏖 Plage d'Estoril", "🎰 Jardins du Casino", "⛳ Golfs", "🚋 Train pour Lisbonne", "🏫 Près de St. Julian's"],
      },
      nl: {
        vibe: "Elegant & Rustig",
        description:
          "Buur van Cascais en net zo mooi — zonder de toeristische drukte. Estoril staat bekend om zijn grandioze casinotuinen, Belle Époque-architectuur en ongerepte stranden. Het deelt de Cascais-lijn, waardoor Lissabon en de St. Julian's School even goed bereikbaar zijn.",
        highlights: ["Grand Casino & Tuinen", "Golfbanen", "Strandtoegang"],
        commuteContext: "20 min naar St. Julian's School met de auto · 28 min naar Lissabon Oriente per trein",
        vibeAdjectives: ["Rustig", "Elegant", "Exclusief", "Vredig", "Aan het Strand"],
        amenities: ["🏖 Estoril strand", "🎰 Casinotuinen", "⛳ Golfbanen", "🚋 Trein naar Lissabon", "🏫 Nabij St. Julian's"],
      },
      es: {
        vibe: "Elegante y Tranquilo",
        description:
          "Vecino de Cascais e igual de hermoso — sin las multitudes turísticas. Estoril es famoso por sus grandiosos jardines del casino, arquitectura Belle Époque y playas inmaculadas. Comparte la línea de Cascais, haciendo igual de accesibles Lisboa y el St. Julian's School.",
        highlights: ["Gran Casino y Jardines", "Campos de Golf", "Acceso a la Playa"],
        commuteContext: "20 min al St. Julian's School en coche · 28 min a Lisboa Oriente en tren",
        vibeAdjectives: ["Tranquilo", "Elegante", "Exclusivo", "Apacible", "Primera Línea de Playa"],
        amenities: ["🏖 Playa de Estoril", "🎰 Jardines del Casino", "⛳ Campos de golf", "🚋 Tren a Lisboa", "🏫 Cerca de St. Julian's"],
      },
    },
  },
  {
    id: "3",
    slug: "campodeourique",
    name: "Campo de Ourique",
    location: "Central Lisbon",
    coordinates: { lat: 38.7205, lng: -9.1624 },
    translations: {
      en: {
        vibe: "Village in the City",
        description:
          "Lisbon's most liveable neighbourhood — a flat, grid-like area that feels like a self-contained village inside the city. Famous for its Mercado de Campo de Ourique, independent cafés, and an exceptionally strong sense of community. Perfect for families who want urban convenience with a calm, safe pace.",
        highlights: ["Campo de Ourique Market", "Flat & Walkable", "Traditional Shops"],
        commuteContext: "20 min to United Lisbon International School by metro · 35 min to Cascais schools by car",
        vibeAdjectives: ["Walkable", "Family-Friendly", "Artsy", "Safe", "Community"],
        amenities: ["🛒 Mercado de Campo de Ourique", "🏫 Near city schools", "🚇 Metro access", "☕ Café culture", "🌳 Jardim da Parada"],
      },
      pt: {
        vibe: "Aldeia na Cidade",
        description:
          "O bairro mais habitável de Lisboa — uma área plana e quadriculada que parece uma aldeia autónoma dentro da cidade. Famoso pelo Mercado de Campo de Ourique, cafés independentes e um sentido de comunidade excepcionalmente forte. Perfeito para famílias que querem comodidade urbana com um ritmo calmo e seguro.",
        highlights: ["Mercado de Campo de Ourique", "Plano e Pedonal", "Comércio Tradicional"],
        commuteContext: "20 min à United Lisbon International School de metro · 35 min às escolas de Cascais de carro",
        vibeAdjectives: ["Pedonal", "Família-Friendly", "Artístico", "Seguro", "Comunitário"],
        amenities: ["🛒 Mercado de Campo de Ourique", "🏫 Perto das escolas da cidade", "🚇 Acesso ao metro", "☕ Cultura de café", "🌳 Jardim da Parada"],
      },
      de: {
        vibe: "Dorf in der Stadt",
        description:
          "Lissabons lebenswertestes Viertel — ein flaches, rasterartiges Gebiet, das sich wie ein eigenständiges Dorf innerhalb der Stadt anfühlt. Bekannt für sein Mercado de Campo de Ourique, unabhängige Cafés und ein außergewöhnlich starkes Gemeinschaftsgefühl. Perfekt für Familien, die städtischen Komfort mit einem ruhigen, sicheren Tempo wünschen.",
        highlights: ["Campo de Ourique Markt", "Flach & Fußläufig", "Traditionelle Geschäfte"],
        commuteContext: "20 Min. zur United Lisbon International School mit der U-Bahn · 35 Min. zu den Schulen in Cascais mit dem Auto",
        vibeAdjectives: ["Fußläufig", "Familienfreundlich", "Künstlerisch", "Sicher", "Gemeinschaft"],
        amenities: ["🛒 Mercado de Campo de Ourique", "🏫 Nahe Stadtschulen", "🚇 U-Bahn-Zugang", "☕ Cafékultur", "🌳 Jardim da Parada"],
      },
      fr: {
        vibe: "Village dans la Ville",
        description:
          "Le quartier le plus agréable à vivre de Lisbonne — une zone plate et quadrillée qui ressemble à un village autonome au cœur de la ville. Célèbre pour son Mercado de Campo de Ourique, ses cafés indépendants et un sens communautaire exceptionnellement fort. Parfait pour les familles qui souhaitent la commodité urbaine avec un rythme calme et sûr.",
        highlights: ["Marché de Campo de Ourique", "Plat & Marchable", "Commerces Traditionnels"],
        commuteContext: "20 min à United Lisbon International School en métro · 35 min aux écoles de Cascais en voiture",
        vibeAdjectives: ["Marchable", "Familial", "Artistique", "Sûr", "Communauté"],
        amenities: ["🛒 Mercado de Campo de Ourique", "🏫 Près des écoles urbaines", "🚇 Accès métro", "☕ Culture café", "🌳 Jardim da Parada"],
      },
      nl: {
        vibe: "Dorp in de Stad",
        description:
          "Lissabons meest leefbare wijk — een vlakke, rasterachtige buurt die aanvoelt als een op zichzelf staand dorp in de stad. Bekend om zijn Mercado de Campo de Ourique, onafhankelijke cafés en een uitzonderlijk sterk gemeenschapsgevoel. Perfect voor gezinnen die stedelijk gemak willen met een rustig, veilig tempo.",
        highlights: ["Campo de Ourique Markt", "Vlak & Voetgangervriendelijk", "Traditionele Winkels"],
        commuteContext: "20 min naar United Lisbon International School met de metro · 35 min naar scholen in Cascais met de auto",
        vibeAdjectives: ["Voetgangervriendelijk", "Gezinsvriendelijk", "Artistiek", "Veilig", "Gemeenschap"],
        amenities: ["🛒 Mercado de Campo de Ourique", "🏫 Nabij stadsscholen", "🚇 Metrotoegang", "☕ Cafécultuur", "🌳 Jardim da Parada"],
      },
      es: {
        vibe: "Pueblo en la Ciudad",
        description:
          "El barrio más habitable de Lisboa — una zona plana y cuadriculada que se siente como un pueblo independiente dentro de la ciudad. Famoso por su Mercado de Campo de Ourique, cafeterías independientes y un sentido de comunidad excepcionalmente fuerte. Perfecto para familias que quieren comodidad urbana con un ritmo tranquilo y seguro.",
        highlights: ["Mercado de Campo de Ourique", "Plano y Peatonal", "Comercios Tradicionales"],
        commuteContext: "20 min a United Lisbon International School en metro · 35 min a los colegios de Cascais en coche",
        vibeAdjectives: ["Peatonal", "Familiar", "Artístico", "Seguro", "Comunidad"],
        amenities: ["🛒 Mercado de Campo de Ourique", "🏫 Cerca de colegios urbanos", "🚇 Acceso al metro", "☕ Cultura de café", "🌳 Jardim da Parada"],
      },
    },
  },
  {
    id: "4",
    slug: "parquedasnacoes",
    name: "Parque das Nações",
    location: "East Lisbon",
    coordinates: { lat: 38.7686, lng: -9.0969 },
    translations: {
      en: {
        vibe: "Modern & Spacious",
        description:
          "Built for Expo 98 and still Lisbon's most contemporary neighbourhood. Wide riverfront promenades, modern apartments, the Oceanarium, and excellent metro connections make it a natural choice for tech-sector expats. United Lisbon International School is within walking distance.",
        highlights: ["Riverfront Parks", "Modern Apartments", "Shopping Center"],
        commuteContext: "Walking distance to United Lisbon International School · 15 min to Lisbon airport",
        vibeAdjectives: ["Modern", "Spacious", "Tech Hub", "Riverfront", "International"],
        amenities: ["🌊 Tagus riverfront", "🏫 United Lisbon School (walking)", "✈️ 15 min to airport", "🛒 Vasco da Gama Shopping", "🐟 Oceanarium"],
      },
      pt: {
        vibe: "Moderno e Espaçoso",
        description:
          "Construído para a Expo 98 e ainda o bairro mais contemporâneo de Lisboa. Amplas esplanadas junto ao rio, apartamentos modernos, o Oceanário e excelentes ligações de metro fazem dele a escolha natural para expatriados do setor tecnológico. A United Lisbon International School fica a poucos minutos a pé.",
        highlights: ["Parques Ribeirinhos", "Apartamentos Modernos", "Centro Comercial"],
        commuteContext: "A pé até à United Lisbon International School · 15 min ao aeroporto de Lisboa",
        vibeAdjectives: ["Moderno", "Espaçoso", "Hub Tecnológico", "Ribeirinho", "Internacional"],
        amenities: ["🌊 Orla do Tejo", "🏫 United Lisbon School (a pé)", "✈️ 15 min ao aeroporto", "🛒 Vasco da Gama Shopping", "🐟 Oceanário"],
      },
      de: {
        vibe: "Modern & Weitläufig",
        description:
          "Für die Expo 98 gebaut und immer noch Lissabons zeitgenössischstes Viertel. Breite Uferpromenaden, moderne Wohnungen, das Ozeanarium und ausgezeichnete U-Bahn-Verbindungen machen es zur natürlichen Wahl für Expats aus dem Technologiesektor. Die United Lisbon International School ist fußläufig erreichbar.",
        highlights: ["Flussuferparks", "Moderne Wohnungen", "Einkaufszentrum"],
        commuteContext: "Fußläufig zur United Lisbon International School · 15 Min. zum Lissaboner Flughafen",
        vibeAdjectives: ["Modern", "Weitläufig", "Tech-Hub", "Flussnah", "International"],
        amenities: ["🌊 Tejo-Uferpromenade", "🏫 United Lisbon School (zu Fuß)", "✈️ 15 Min. zum Flughafen", "🛒 Vasco da Gama Shopping", "🐟 Ozeanarium"],
      },
      fr: {
        vibe: "Moderne & Spacieux",
        description:
          "Construit pour l'Expo 98 et toujours le quartier le plus contemporain de Lisbonne. De larges promenades en bord de fleuve, des appartements modernes, l'Aquarium et d'excellentes connexions métro en font le choix naturel pour les expatriés du secteur technologique. L'United Lisbon International School est à distance de marche.",
        highlights: ["Parcs au Bord du Fleuve", "Appartements Modernes", "Centre Commercial"],
        commuteContext: "À distance de marche de l'United Lisbon International School · 15 min de l'aéroport de Lisbonne",
        vibeAdjectives: ["Moderne", "Spacieux", "Hub Technologique", "En Bord de Fleuve", "International"],
        amenities: ["🌊 Promenade du Tage", "🏫 United Lisbon School (à pied)", "✈️ 15 min de l'aéroport", "🛒 Vasco da Gama Shopping", "🐟 Aquarium"],
      },
      nl: {
        vibe: "Modern & Ruim",
        description:
          "Gebouwd voor Expo 98 en nog steeds Lissabons meest hedendaagse wijk. Brede rivierpromenades, moderne appartementen, het Oceanarium en uitstekende metroverbindingen maken het de natuurlijke keuze voor expats in de techsector. United Lisbon International School is op loopafstand.",
        highlights: ["Rivieroeversparken", "Moderne Appartementen", "Winkelcentrum"],
        commuteContext: "Op loopafstand van United Lisbon International School · 15 min naar Lissabon vliegveld",
        vibeAdjectives: ["Modern", "Ruim", "Tech-Hub", "Aan de Rivier", "Internationaal"],
        amenities: ["🌊 Tagus rivieroever", "🏫 United Lisbon School (te voet)", "✈️ 15 min naar vliegveld", "🛒 Vasco da Gama Shopping", "🐟 Oceanarium"],
      },
      es: {
        vibe: "Moderno y Espacioso",
        description:
          "Construido para la Expo 98 y todavía el barrio más contemporáneo de Lisboa. Amplios paseos junto al río, apartamentos modernos, el Oceanario y excelentes conexiones de metro lo convierten en la elección natural para los expatriados del sector tecnológico. El United Lisbon International School está a distancia a pie.",
        highlights: ["Parques Fluviales", "Apartamentos Modernos", "Centro Comercial"],
        commuteContext: "A pie hasta United Lisbon International School · 15 min al aeropuerto de Lisboa",
        vibeAdjectives: ["Moderno", "Espacioso", "Hub Tecnológico", "Frente al Río", "Internacional"],
        amenities: ["🌊 Paseo del Tajo", "🏫 United Lisbon School (a pie)", "✈️ 15 min al aeropuerto", "🛒 Vasco da Gama Shopping", "🐟 Oceanario"],
      },
    },
  },
  {
    id: "5",
    slug: "sintra",
    name: "Sintra",
    location: "Greater Lisbon",
    coordinates: { lat: 38.7998, lng: -9.3878 },
    translations: {
      en: {
        vibe: "Fairytale & Nature",
        description:
          "A UNESCO World Heritage site nestled in misty forested hills with romantic palaces and centuries of history. Living in Sintra offers a unique connection to nature and slower pace — and direct access to both TASIS Portugal and CAISL, two of Portugal's most respected international schools.",
        highlights: ["Historic Palaces", "Forested Hills", "Cooler Climate"],
        commuteContext: "10 min to TASIS Portugal · 15 min to CAISL · 45 min to Lisbon by train",
        vibeAdjectives: ["Nature", "Historic", "Peaceful", "Cool Climate", "Unique"],
        amenities: ["🏰 UNESCO palaces", "🏫 TASIS Portugal & CAISL", "🌲 Arrábida forests", "🚋 Train to Lisbon", "🏖 20 min to beaches"],
      },
      pt: {
        vibe: "Conto de Fadas & Natureza",
        description:
          "Um Património Mundial da UNESCO encaixado em colinas nebulosas com palácios românticos e séculos de história. Viver em Sintra oferece uma ligação única à natureza e um ritmo mais lento — com acesso direto ao TASIS Portugal e à CAISL, duas das escolas internacionais mais respeitadas de Portugal.",
        highlights: ["Palácios Históricos", "Colinas Arborizadas", "Clima Mais Fresco"],
        commuteContext: "10 min ao TASIS Portugal · 15 min à CAISL · 45 min a Lisboa de comboio",
        vibeAdjectives: ["Natureza", "Histórico", "Tranquilo", "Clima Fresco", "Único"],
        amenities: ["🏰 Palácios UNESCO", "🏫 TASIS Portugal & CAISL", "🌲 Florestas da Arrábida", "🚋 Comboio para Lisboa", "🏖 20 min às praias"],
      },
      de: {
        vibe: "Märchen & Natur",
        description:
          "Ein UNESCO-Weltkulturerbe in nebligen bewaldeten Hügeln mit romantischen Palästen und jahrhundertelanger Geschichte. Das Leben in Sintra bietet eine einzigartige Verbindung zur Natur und ein langsameres Tempo — sowie direkten Zugang zu TASIS Portugal und CAISL, zwei der angesehensten Internationalschulen Portugals.",
        highlights: ["Historische Paläste", "Bewaldete Hügel", "Kühleres Klima"],
        commuteContext: "10 Min. nach TASIS Portugal · 15 Min. nach CAISL · 45 Min. nach Lissabon mit dem Zug",
        vibeAdjectives: ["Natur", "Historisch", "Friedlich", "Kühles Klima", "Einzigartig"],
        amenities: ["🏰 UNESCO-Paläste", "🏫 TASIS Portugal & CAISL", "🌲 Arrábida-Wälder", "🚋 Zug nach Lissabon", "🏖 20 Min. bis zum Strand"],
      },
      fr: {
        vibe: "Conte de Fées & Nature",
        description:
          "Un site du Patrimoine Mondial de l'UNESCO niché dans des collines boisées brumeuses avec des palais romantiques et des siècles d'histoire. Vivre à Sintra offre un lien unique avec la nature et un rythme plus lent — avec un accès direct à TASIS Portugal et CAISL, deux des écoles internationales les plus respectées du Portugal.",
        highlights: ["Palais Historiques", "Collines Boisées", "Climat Plus Frais"],
        commuteContext: "10 min à TASIS Portugal · 15 min à CAISL · 45 min à Lisbonne en train",
        vibeAdjectives: ["Nature", "Historique", "Paisible", "Climat Frais", "Unique"],
        amenities: ["🏰 Palais UNESCO", "🏫 TASIS Portugal & CAISL", "🌲 Forêts de l'Arrábida", "🚋 Train pour Lisbonne", "🏖 20 min des plages"],
      },
      nl: {
        vibe: "Sprookje & Natuur",
        description:
          "Een UNESCO Werelderfgoed genesteld in mistige beboste heuvels met romantische paleizen en eeuwen van geschiedenis. Wonen in Sintra biedt een unieke verbinding met de natuur en een rustiger tempo — met directe toegang tot TASIS Portugal en CAISL, twee van de meest gerespecteerde internationale scholen van Portugal.",
        highlights: ["Historische Paleizen", "Beboste Heuvels", "Koeler Klimaat"],
        commuteContext: "10 min naar TASIS Portugal · 15 min naar CAISL · 45 min naar Lissabon per trein",
        vibeAdjectives: ["Natuur", "Historisch", "Vredig", "Koel Klimaat", "Uniek"],
        amenities: ["🏰 UNESCO paleizen", "🏫 TASIS Portugal & CAISL", "🌲 Arrábida bossen", "🚋 Trein naar Lissabon", "🏖 20 min naar stranden"],
      },
      es: {
        vibe: "Cuento de Hadas y Naturaleza",
        description:
          "Un Patrimonio Mundial de la UNESCO enclavado en neblinosas colinas boscosas con palacios románticos y siglos de historia. Vivir en Sintra ofrece una conexión única con la naturaleza y un ritmo más lento — y acceso directo al TASIS Portugal y a CAISL, dos de los colegios internacionales más respetados de Portugal.",
        highlights: ["Palacios Históricos", "Colinas Boscosas", "Clima Más Fresco"],
        commuteContext: "10 min al TASIS Portugal · 15 min a CAISL · 45 min a Lisboa en tren",
        vibeAdjectives: ["Naturaleza", "Histórico", "Tranquilo", "Clima Fresco", "Único"],
        amenities: ["🏰 Palacios UNESCO", "🏫 TASIS Portugal & CAISL", "🌲 Bosques de la Arrábida", "🚋 Tren a Lisboa", "🏖 20 min a las playas"],
      },
    },
  },
];

function buildCommuteContext(n: any): string {
  const parts: string[] = [];
  const c = n.location?.commute_to_lisbon_center;
  if (c?.nearest_metro_station) parts.push(`Metro: ${c.nearest_metro_station}`);
  if (c?.nearest_train_station) parts.push(`Train: ${c.nearest_train_station}`);
  if (c?.by_car_min) parts.push(`${c.by_car_min} min to Lisbon by car`);
  else if (c?.by_train_min) parts.push(`${c.by_train_min} min to Lisbon by train`);
  if (n.location?.airport_distance_km) {
    parts.push(`${n.location.airport_distance_km} km to ${n.location.airport_name ?? "airport"}`);
  }
  return parts.join(" · ") || (n.location?.region ?? n.location?.district ?? "Portugal");
}

const importedNeighborhoods: Neighborhood[] = (rawNeighborhoods as any[]).map((n) => {
  const re = n.real_estate;
  const fl = n.family_living;
  const dem = n.demographics;
  const col = n.cost_of_living;
  const ec = n.expat_community;
  const tr = n.transport;

  return {
    id: n.id,
    slug: n.id,
    name: n.name,
    location: n.location?.city
      ? `${n.location.city}${n.location.region && n.location.region !== n.location.city ? `, ${n.location.region}` : ""}`
      : "Portugal",
    coordinates: n.location?.coordinates ?? { lat: 39.3999, lng: -8.2245 },

    // ── Structured data ────────────────────────────────────────────
    realEstate: re ? {
      avgRent1BedEur:       re.avg_rent_1bed_eur      ?? undefined,
      avgRent2BedEur:       re.avg_rent_2bed_eur      ?? undefined,
      avgRent3BedEur:       re.avg_rent_3bed_eur      ?? undefined,
      avgPricePerSqmBuyEur: re.avg_price_per_sqm_buy_eur ?? undefined,
      priceRangeLabel:      re.price_range_label      ?? undefined,
      priceTrendYoyPct:     re.price_trend_yoy_pct    ?? undefined,
      dataDate:             re.data_date              ?? undefined,
    } : undefined,

    familyLiving: fl ? {
      familyFriendlyScore: fl.family_friendly_score ?? undefined,
      safetyScore:         fl.safety_score          ?? undefined,
      walkabilityScore:    fl.walkability_score      ?? undefined,
      greenSpacesScore:    fl.green_spaces_score     ?? undefined,
      beachAccess:         fl.beach_access           ?? undefined,
      beachDistanceKm:     fl.beach_distance_km      ?? undefined,
      noiseLevel:          fl.noise_level            ?? undefined,
    } : undefined,

    demographics: dem ? {
      expatPopulationPct:              dem.expat_population_pct ?? undefined,
      predominantExpatNationalities:   dem.predominant_expat_nationalities?.length
                                         ? dem.predominant_expat_nationalities
                                         : undefined,
      englishFriendliness:             dem.english_friendliness ?? undefined,
    } : undefined,

    costOfLiving: col ? {
      totalMonthlyEstimateEur:    col.monthly_family_budget_estimate_eur?.total_estimate ?? undefined,
      comparedToLisbonCenterPct:  col.compared_to_lisbon_center_pct ?? undefined,
      costLevel:                  col.cost_level ?? undefined,
    } : undefined,

    expatCommunity: ec ? {
      strength:             ec.expat_community_strength  ?? undefined,
      digitalNomadFriendly: ec.digital_nomad_friendly    ?? undefined,
      nhrTaxRegimePopular:  ec.nhr_tax_regime_popular    ?? undefined,
    } : undefined,

    transport: tr ? {
      publicTransportQuality: tr.public_transport_quality ?? undefined,
      metroAccess:            tr.metro_access             ?? undefined,
      trainLines:             tr.train_lines?.length ? tr.train_lines : undefined,
    } : undefined,

    // ── i18n translations ──────────────────────────────────────────
    translations: {
      en: {
        vibe:         n.type ?? (n.lifestyle?.best_for?.[0] ?? "Residential"),
        description:  n.lifestyle?.vibe_description
                        ?? `${n.name} is located in ${n.location?.region ?? "Portugal"}.`,
        highlights:   ((n.pros_cons?.pros ?? []) as string[]).slice(0, 4),
        cons:         ((n.pros_cons?.cons ?? []) as string[]).slice(0, 4),
        commuteContext: buildCommuteContext(n),
        vibeAdjectives: ((n.lifestyle?.best_for ?? []) as string[]).slice(0, 5),
        amenities:    ((n.lifestyle?.local_highlights ?? []) as string[])
                        .slice(0, 6)
                        .map((h) => `📍 ${h}`),
      },
    },
  };
});

const curatedSlugs = new Set(curatedNeighborhoods.map((n) => n.slug));
const curatedNames = new Set(curatedNeighborhoods.map((n) => n.name.toLowerCase()));
const filteredImports = importedNeighborhoods.filter(
  (n) => !curatedSlugs.has(n.slug) && !curatedNames.has(n.name.toLowerCase())
);

export const neighborhoodsData: Neighborhood[] = [...curatedNeighborhoods, ...filteredImports];
