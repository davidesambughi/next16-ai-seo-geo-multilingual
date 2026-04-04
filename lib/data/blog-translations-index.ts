/**
 * Index of all blog translations
 * Imports translations from language-specific files and maps them to articles
 */

import { howToChooseSchoolPT, howToChooseSchoolDE, cascaisVsEstorilPT, cascaisVsEstorilDE } from './blog-translations';
import { howToChooseSchoolFR, cascaisVsEstorilFR } from './blog-translations-fr';
import { howToChooseSchoolNL, cascaisVsEstorilNL } from './blog-translations-nl';
import { howToChooseSchoolES, cascaisVsEstorilES } from './blog-translations-es';
import { trueCostFeesPT, trueCostFeesDE } from './blog-translations-article3';
import { trueCostFeesFR, trueCostFeesNL, trueCostFeesES } from './blog-translations-article3-fr-nl-es';
import { whatAgeEnrolPT, whatAgeEnrolDE } from './blog-translations-article4';
import { whatAgeEnrolFR, whatAgeEnrolNL, whatAgeEnrolES } from './blog-translations-article4-fr-nl-es';
import { healthcarePT, healthcareDE } from './blog-translations-article5';
import { healthcareFR } from './blog-translations-article5-fr';
import { healthcareNL } from './blog-translations-article5-nl';
import { healthcareES } from './blog-translations-article5-es';

export const blogTranslationsMap = {
  'how-to-choose-international-school-portugal': {
    pt: howToChooseSchoolPT,
    de: howToChooseSchoolDE,
    fr: howToChooseSchoolFR,
    nl: howToChooseSchoolNL,
    es: howToChooseSchoolES,
  },
  'cascais-vs-estoril-expat-families': {
    pt: cascaisVsEstorilPT,
    de: cascaisVsEstorilDE,
    fr: cascaisVsEstorilFR,
    nl: cascaisVsEstorilNL,
    es: cascaisVsEstorilES,
  },
  'true-cost-international-school-fees-portugal': {
    pt: trueCostFeesPT,
    de: trueCostFeesDE,
    fr: trueCostFeesFR,
    nl: trueCostFeesNL,
    es: trueCostFeesES,
  },
  'what-age-enrol-child-international-school-portugal': {
    pt: whatAgeEnrolPT,
    de: whatAgeEnrolDE,
    fr: whatAgeEnrolFR,
    nl: whatAgeEnrolNL,
    es: whatAgeEnrolES,
  },
  'healthcare-children-portugal-expat-families': {
    pt: healthcarePT,
    de: healthcareDE,
    fr: healthcareFR,
    nl: healthcareNL,
    es: healthcareES,
  },
};
