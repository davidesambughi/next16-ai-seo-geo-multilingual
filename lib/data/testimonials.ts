import type { Testimonial, TestimonialTranslation } from "../types";

export type { Testimonial };

/**
 * Returns the best available translation for a testimonial quote.
 * Falls back to `en` if the requested locale is not yet translated.
 */
export function getTestimonialT(testimonial: Testimonial, locale: string): TestimonialTranslation {
  return (testimonial.translations as Record<string, TestimonialTranslation>)[locale]
    ?? testimonial.translations.en;
}

/** Featured pull quotes — 3 large, full editorial weight */
export const featuredTestimonials: Testimonial[] = [
  {
    id: 1,
    attribution: "Caroline & James H.",
    detail: "London → Cascais, 2024",
    translations: {
      en: { quote: "We spent months researching schools before finding Raising Kids in Portugal. Within a week of using the guide, we had shortlisted St. Julian's and CAISL, visited both, and made our decision. The acceptance rate data alone saved us from an embarrassing situation." },
      pt: { quote: "Passámos meses a pesquisar escolas antes de encontrar o Raising Kids in Portugal. Em menos de uma semana a usar o guia, já tínhamos selecionado o St. Julian's e a CAISL, visitado ambas e tomado a nossa decisão. Os dados sobre a taxa de aceitação sozinhos pouparam-nos de uma situação embaraçosa." },
      de: { quote: "Wir verbrachten Monate mit der Schulrecherche, bevor wir Raising Kids in Portugal fanden. Innerhalb einer Woche mit dem Leitfaden hatten wir St. Julian's und CAISL in die engere Wahl gezogen, beide besucht und unsere Entscheidung getroffen. Allein die Zulassungsquoten-Daten retteten uns vor einer peinlichen Situation." },
      fr: { quote: "Nous avons passé des mois à chercher des écoles avant de découvrir Raising Kids in Portugal. En une semaine d'utilisation du guide, nous avions présélectionné St. Julian's et CAISL, visité les deux et pris notre décision. Les données sur les taux d'admission à elles seules nous ont évité une situation embarrassante." },
      nl: { quote: "We besteedden maanden aan schoolonderzoek voordat we Raising Kids in Portugal vonden. Binnen een week na gebruik van de gids hadden we St. Julian's en CAISL in de shortlist, beide bezocht en onze beslissing genomen. De acceptatiepercentagegegevens alleen al behoedden ons voor een pijnlijke situatie." },
      es: { quote: "Pasamos meses investigando colegios antes de encontrar Raising Kids in Portugal. En una semana usando la guía, habíamos preseleccionado St. Julian's y CAISL, visitado ambos y tomado nuestra decisión. Los datos sobre la tasa de admisión por sí solos nos salvaron de una situación embarazosa." },
    },
  },
  {
    id: 2,
    attribution: "Pieter V.",
    detail: "Amsterdam → Parque das Nações, 2024",
    translations: {
      en: { quote: "What I trusted about Raising Kids in Portugal is what it doesn't do — no sponsored content, no affiliate links, no sales pressure. The school comparison is honest. We enrolled at United Lisbon International School and it was exactly as described." },
      pt: { quote: "O que me inspirou confiança no Raising Kids in Portugal foi o que ele não faz — sem conteúdo patrocinado, sem links de afiliados, sem pressão comercial. A comparação de escolas é honesta. Inscrevemos na United Lisbon International School e era exatamente como descrito." },
      de: { quote: "Was mich bei Raising Kids in Portugal überzeugte, ist das, was es nicht tut — keine gesponserten Inhalte, keine Affiliate-Links, kein Verkaufsdruck. Der Schulvergleich ist ehrlich. Wir meldeten unsere Kinder an der United Lisbon International School an und es war genau so wie beschrieben." },
      fr: { quote: "Ce qui m'a fait confiance en Raising Kids in Portugal, c'est ce qu'il ne fait pas — pas de contenu sponsorisé, pas de liens affiliés, pas de pression commerciale. La comparaison des écoles est honnête. Nous nous sommes inscrits à United Lisbon International School et c'était exactement comme décrit." },
      nl: { quote: "Wat ik vertrouwde aan Raising Kids in Portugal is wat het niet doet — geen gesponsorde inhoud, geen affiliate links, geen verkoopdruk. De schoolvergelijking is eerlijk. We zijn ingeschreven bij United Lisbon International School en het was precies zoals beschreven." },
      es: { quote: "Lo que me generó confianza en Raising Kids in Portugal es lo que no hace — sin contenido patrocinado, sin enlaces de afiliado, sin presión de ventas. La comparación de colegios es honesta. Nos inscribimos en United Lisbon International School y era exactamente como se describía." },
    },
  },
  {
    id: 3,
    attribution: "David O.",
    detail: "Dubai → Lisbon, 2024",
    translations: {
      en: { quote: "I've used relocation consultants before and paid a lot of money for generic advice. Raising Kids in Portugal's free guide was more specific and honest than anything I paid for. Parque das Nações was the right call — I can walk my son to United Lisbon every morning." },
      pt: { quote: "Já usei consultores de relocalização e paguei muito dinheiro por conselhos genéricos. O guia gratuito do Raising Kids in Portugal foi mais específico e honesto do que qualquer coisa pela qual paguei. Parque das Nações foi a decisão certa — consigo levar o meu filho à United Lisbon a pé todas as manhãs." },
      de: { quote: "Ich habe früher Umzugsberater genutzt und viel Geld für allgemeine Ratschläge gezahlt. Raising Kids in Portugals kostenloser Leitfaden war spezifischer und ehrlicher als alles, wofür ich bezahlt habe. Parque das Nações war die richtige Wahl — ich kann meinen Sohn jeden Morgen zu Fuß zur United Lisbon begleiten." },
      fr: { quote: "J'ai fait appel à des consultants en relocalisation avant et payé beaucoup pour des conseils génériques. Le guide gratuit de Raising Kids in Portugal était plus précis et honnête que tout ce que j'ai payé. Parque das Nações était le bon choix — je peux accompagner mon fils à United Lisbon à pied chaque matin." },
      nl: { quote: "Ik heb eerder verhuisconsultants gebruikt en veel betaald voor algemeen advies. De gratis gids van Raising Kids in Portugal was specifieker en eerlijker dan alles waarvoor ik betaalde. Parque das Nações was de juiste keuze — ik kan mijn zoon elke ochtend te voet naar United Lisbon begeleiden." },
      es: { quote: "He usado consultores de reubicación antes y pagué mucho dinero por consejos genéricos. La guía gratuita de Raising Kids in Portugal fue más específica y honesta que cualquier cosa por la que pagué. Parque das Nações fue la decisión correcta — puedo llevar a mi hijo a United Lisbon caminando cada mañana." },
    },
  },
];

/** Supporting quotes — 3 compact, 3-col grid */
export const supportingTestimonials: Testimonial[] = [
  {
    id: 4,
    attribution: "Amélie & François D.",
    detail: "Paris → Sintra, 2023",
    translations: {
      en: { quote: "TASIS Portugal wasn't on our radar at all until Raising Kids in Portugal's guide. The 'parent whisper' quotes felt genuine — not marketing copy. We visited, loved it, applied, and our daughter started in September." },
      pt: { quote: "O TASIS Portugal não estava de todo no nosso radar até ao guia do Raising Kids in Portugal. As citações do 'parent whisper' pareceram genuínas — não texto de marketing. Visitámos, adorámos, candidatámos e a nossa filha começou em setembro." },
      de: { quote: "TASIS Portugal war gar nicht auf unserem Radar, bis wir den Raising Kids in Portugal-Leitfaden lasen. Die 'Elternflüster'-Zitate wirkten authentisch — kein Marketingtext. Wir besuchten die Schule, liebten sie, bewarben uns und unsere Tochter begann im September." },
      fr: { quote: "TASIS Portugal n'était pas du tout sur notre radar jusqu'au guide de Raising Kids in Portugal. Les citations 'parent whisper' semblaient authentiques — pas du texte marketing. Nous avons visité, adoré, postulé et notre fille a commencé en septembre." },
      nl: { quote: "TASIS Portugal stond helemaal niet op onze radar totdat we de gids van Raising Kids in Portugal lazen. De 'parent whisper'-citaten voelden authentiek aan — geen marketingtekst. We bezochten het, hielden ervan, solliciteerden en onze dochter begon in september." },
      es: { quote: "TASIS Portugal no estaba en absoluto en nuestro radar hasta la guía de Raising Kids in Portugal. Las citas de 'parent whisper' parecían genuinas — no texto de marketing. Visitamos, nos encantó, solicitamos plaza y nuestra hija empezó en septiembre." },
    },
  },
  {
    id: 5,
    attribution: "Markus & Claudia S.",
    detail: "Munich → Cascais, 2023",
    translations: {
      en: { quote: "Three kids, three different ages, two curriculum preferences — our situation was complicated. The school finder quiz helped us realise that St. Julian's IB + British path was actually the right compromise." },
      pt: { quote: "Três filhos, três idades diferentes, duas preferências de currículo — a nossa situação era complicada. O quiz School Finder ajudou-nos a perceber que o caminho IB + britânico do St. Julian's era realmente o compromisso certo." },
      de: { quote: "Drei Kinder, drei verschiedene Altersgruppen, zwei Lehrplanpräferenzen — unsere Situation war kompliziert. Das Schulfinderquiz half uns zu erkennen, dass der St. Julian's IB- und Britische Weg tatsächlich der richtige Kompromiss war." },
      fr: { quote: "Trois enfants, trois âges différents, deux préférences curriculaires — notre situation était compliquée. Le quiz School Finder nous a aidés à réaliser que le parcours IB + britannique de St. Julian's était en fait le bon compromis." },
      nl: { quote: "Drie kinderen, drie verschillende leeftijden, twee leerplanvoorkeuren — onze situatie was ingewikkeld. De School Finder quiz hielp ons te beseffen dat het St. Julian's IB + Britse pad eigenlijk het juiste compromis was." },
      es: { quote: "Tres hijos, tres edades diferentes, dos preferencias curriculares — nuestra situación era complicada. El quiz School Finder nos ayudó a darnos cuenta de que el camino IB + británico de St. Julian's era realmente el compromiso correcto." },
    },
  },
  {
    id: 6,
    attribution: "Katherine M.",
    detail: "New York → Estoril, 2024",
    translations: {
      en: { quote: "I needed clarity, not more noise. Raising Kids in Portugal gave me a real cost breakdown — not just headline fees — and explained what a shadow day is and how to request one. Those details made a huge difference." },
      pt: { quote: "Precisava de clareza, não de mais ruído. O Raising Kids in Portugal deu-me uma análise real dos custos — não apenas taxas superficiais — e explicou o que é um shadow day e como solicitá-lo. Esses detalhes fizeram uma enorme diferença." },
      de: { quote: "Ich brauchte Klarheit, keinen weiteren Lärm. Raising Kids in Portugal gab mir eine echte Kostenaufschlüsselung — nicht nur Schlagzeilengebühren — und erklärte, was ein Shadow Day ist und wie man ihn beantragt. Diese Details machten einen riesigen Unterschied." },
      fr: { quote: "J'avais besoin de clarté, pas de bruit supplémentaire. Raising Kids in Portugal m'a fourni une vraie ventilation des coûts — pas seulement des frais en titre — et expliqué ce qu'est une journée d'observation et comment en faire la demande. Ces détails ont fait une énorme différence." },
      nl: { quote: "Ik had duidelijkheid nodig, geen extra ruis. Raising Kids in Portugal gaf me een echte kostenspecificatie — niet alleen titelgebonden kosten — en legde uit wat een schaduwdag is en hoe je er een kunt aanvragen. Die details maakten een enorm verschil." },
      es: { quote: "Necesitaba claridad, no más ruido. Raising Kids in Portugal me dio un desglose real de costes — no solo las cuotas principales — y explicó qué es un día de observación y cómo solicitarlo. Esos detalles marcaron una gran diferencia." },
    },
  },
];
