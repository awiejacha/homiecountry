// eslint-disable-next-line max-classes-per-file
export class InvalidCountryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCountryError';
    Object.setPrototypeOf(this, InvalidCountryError.prototype);
  }
}
const EUROPEAN_COUNTRY_MAPPING = { AI: 'GB', AT: 'AT', AW: 'NL', AX: 'FI', BE: 'BE', BL: 'FR', BM: 'GB', BQ: 'NL', BV: 'NO', CH: 'CH', CW: 'NL', CZ: 'CZ', DE: 'DE', DK: 'DK', ES: 'ES', FI: 'FI', FK: 'GB', FO: 'DK', FR: 'FR', GB: 'GB', GF: 'FR', GG: 'GB', GI: 'GB', GL: 'DK', GP: 'FR', GR: 'GR', GS: 'GB', HR: 'HR', HU: 'HU', IM: 'GB', IO: 'GB', IT: 'IT', JE: 'GB', KY: 'GB', LU: 'LU', MF: 'FR', MQ: 'FR', MS: 'GB', NC: 'FR', NL: 'NL', NO: 'NO', PF: 'FR', PL: 'PL', PM: 'FR', PN: 'GB', PT: 'PT', RE: 'FR', RO: 'RO', SE: 'SE', SH: 'GB', SI: 'SI', SJ: 'NO', SK: 'SK', SX: 'NL', TC: 'GB', TF: 'FR', VG: 'GB', WF: 'FR', YT: 'FR' } as const;
export const countryLanguageConfig = { DE: { name: 'GERMANY', language: 'DE', defaultLanguage: 'DE', availableLanguages: ['DE', 'EN'], vatRate: 0.19 }, CH: { name: 'SWITZERLAND', language: 'DE', defaultLanguage: 'DE', availableLanguages: ['DE', 'EN'], vatRate: 0.081 }, AT: { name: 'AUSTRIA', language: 'DE', defaultLanguage: 'DE', availableLanguages: ['DE', 'EN'], vatRate: 0.2 }, FR: { name: 'FRANCE', language: 'FR', defaultLanguage: 'FR', availableLanguages: ['FR', 'EN'], vatRate: 0.2 }, IT: { name: 'ITALY', language: 'IT', defaultLanguage: 'IT', availableLanguages: ['IT', 'EN'], vatRate: 0.22 }, ES: { name: 'SPAIN', language: 'ES', defaultLanguage: 'ES', availableLanguages: ['ES', 'EN'], vatRate: 0.21 }, NL: { name: 'NETHERLANDS', language: 'NL', defaultLanguage: 'NL', availableLanguages: ['NL', 'EN'], vatRate: 0.21 }, PL: { name: 'POLAND', language: 'PL', defaultLanguage: 'PL', availableLanguages: ['PL', 'EN'], vatRate: 0.23 }, SK: { name: 'SLOVAKIA', language: 'SK', defaultLanguage: 'SK', availableLanguages: ['SK', 'EN'], vatRate: 0.2 }, CZ: { name: 'CZECH REPUBLIC', language: 'CS', defaultLanguage: 'CS', availableLanguages: ['CS', 'EN'], vatRate: 0.21 }, PT: { name: 'PORTUGAL', language: 'PT', defaultLanguage: 'PT', availableLanguages: ['PT', 'EN'], vatRate: 0.23 }, BE: { name: 'BELGIUM', language: 'NL', defaultLanguage: 'NL', availableLanguages: ['NL', 'FR', 'EN'], vatRate: 0.21 }, LU: { name: 'LUXEMBOURG', language: 'FR', defaultLanguage: 'FR', availableLanguages: ['FR', 'EN'], vatRate: 0.17 }, DK: { name: 'DENMARK', language: 'DA', defaultLanguage: 'DA', availableLanguages: ['DA', 'EN'], vatRate: 0.25 }, SE: { name: 'SWEDEN', language: 'SV', defaultLanguage: 'SV', availableLanguages: ['SV', 'EN'], vatRate: 0.25 }, HR: { name: 'CROATIA', language: 'HR', defaultLanguage: 'HR', availableLanguages: ['HR', 'EN'], vatRate: 0.25 }, FI: { name: 'FINLAND', language: 'FI', defaultLanguage: 'FI', availableLanguages: ['FI', 'EN'], vatRate: 0.24 }, SI: { name: 'SLOVENIA', language: 'SL', defaultLanguage: 'SL', availableLanguages: ['SL', 'EN'], vatRate: 0.22 }, HU: { name: 'HUNGARY', language: 'HU', defaultLanguage: 'HU', availableLanguages: ['HU', 'EN'], vatRate: 0.27 }, NO: { name: 'NORWAY', language: 'NO', defaultLanguage: 'NO', availableLanguages: ['NO', 'EN'], vatRate: 0.25 }, GR: { name: 'GREECE', language: 'EL', defaultLanguage: 'EL', availableLanguages: ['EL', 'EN'], vatRate: 0.24 }, RO: { name: 'ROMANIA', language: 'RO', defaultLanguage: 'RO', availableLanguages: ['RO', 'EN'], vatRate: 0.19 }, GB: { name: 'UNITED KINGDOM', language: 'EN', defaultLanguage: 'EN', availableLanguages: ['EN'], vatRate: 0.2 } } as const;
export type CountryCode = keyof typeof countryLanguageConfig;
export type LanguageCode = typeof countryLanguageConfig[CountryCode]['availableLanguages'][number];
const TERRITORY_NAME_TO_CODE: Record<string, string> = { GREENLAND: 'GL', 'FAROE ISLANDS': 'FO', 'FRENCH GUIANA': 'GF', GUADELOUPE: 'GP', MARTINIQUE: 'MQ', MAYOTTE: 'YT', RÉUNION: 'RE', 'SAINT BARTHÉLEMY': 'BL', 'SAINT MARTIN': 'MF', 'SAINT PIERRE AND MIQUELON': 'PM', 'WALLIS AND FUTUNA': 'WF', 'FRENCH POLYNESIA': 'PF', 'NEW CALEDONIA': 'NC', 'FRENCH SOUTHERN TERRITORIES': 'TF', ARUBA: 'AW', CURAÇAO: 'CW', 'SINT MAARTEN': 'SX', 'CARIBBEAN NETHERLANDS': 'BQ', 'SVALBARD AND JAN MAYEN': 'SJ', 'BOUVET ISLAND': 'BV', GIBRALTAR: 'GI', GUERNSEY: 'GG', 'ISLE OF MAN': 'IM', JERSEY: 'JE', ANGUILLA: 'AI', BERMUDA: 'BM', 'BRITISH INDIAN OCEAN TERRITORY': 'IO', 'BRITISH VIRGIN ISLANDS': 'VG', 'CAYMAN ISLANDS': 'KY', 'FALKLAND ISLANDS': 'FK', MONTSERRAT: 'MS', 'PITCAIRN ISLANDS': 'PN', 'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA': 'SH', 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS': 'GS', 'TURKS AND CAICOS ISLANDS': 'TC', 'ÅLAND ISLANDS': 'AX' };
const COUNTRY_NAME_TO_CODE: Record<string, string> = { ...TERRITORY_NAME_TO_CODE };
const normalizeDiacritics = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

let isInitialized = false;
function initializeMappings() {
  if (isInitialized) return;
  Object.keys(TERRITORY_NAME_TO_CODE).forEach((n) => {
    COUNTRY_NAME_TO_CODE[normalizeDiacritics(n)] = TERRITORY_NAME_TO_CODE[n];
  });
  Object.keys(countryLanguageConfig).forEach((code) => {
    const { name } = countryLanguageConfig[code as CountryCode];
    COUNTRY_NAME_TO_CODE[name] = code;
    COUNTRY_NAME_TO_CODE[normalizeDiacritics(name)] = code;
  });
  isInitialized = true;
}

export function getCountryCode(input: string): CountryCode {
  initializeMappings();
  const normalizedInput = normalizeDiacritics(input.toUpperCase());
  const codeFromMapping = EUROPEAN_COUNTRY_MAPPING[normalizedInput as keyof typeof EUROPEAN_COUNTRY_MAPPING];
  const codeFromName = COUNTRY_NAME_TO_CODE[normalizedInput];
  const finalCode = codeFromMapping || (codeFromName && EUROPEAN_COUNTRY_MAPPING[codeFromName as keyof typeof EUROPEAN_COUNTRY_MAPPING]);
  if (!finalCode || !(finalCode in countryLanguageConfig)) throw new InvalidCountryError(`Invalid European country code, territory or name: ${input}`);
  return finalCode as CountryCode;
}

export function getLang(countryCode: CountryCode): string {
  return countryLanguageConfig[countryCode].language;
}

export function getDefaultLang(countryCode: CountryCode): string {
  return countryLanguageConfig[countryCode].defaultLanguage;
}

export function hasLang(countryCode: CountryCode, lang: string): boolean {
  return (countryLanguageConfig[countryCode].availableLanguages as readonly string[]).includes(lang);
}

export function isDefaultLang(countryCode: CountryCode, lang: string): boolean {
  return countryLanguageConfig[countryCode].defaultLanguage === lang;
}

export function afterVat(countryCode: CountryCode, grossPrice: number): number {
  return grossPrice / (1 + countryLanguageConfig[countryCode].vatRate);
}

export default class Country {
  private readonly countryCode: CountryCode;

  constructor(input: string) {
    this.countryCode = getCountryCode(input);
  }

  public getCode(): CountryCode {
    return this.countryCode;
  }

  public getLang(): string {
    return getLang(this.countryCode);
  }

  public getDefaultLang(): string {
    return getDefaultLang(this.countryCode);
  }

  public hasLang(lang: string): boolean {
    return hasLang(this.countryCode, lang);
  }

  public isDefaultLang(lang: string): boolean {
    return isDefaultLang(this.countryCode, lang);
  }

  public afterVat(grossPrice: number): number {
    return afterVat(this.countryCode, grossPrice);
  }

  public toString(): string {
    return this.getCode();
  }

  public valueOf(): string {
    return this.getCode();
  }
}

export const afterVatIn = (c: string, g: number): number | null => {
  try {
    return afterVat(getCountryCode(c), g);
  } catch (e) {
    if (e instanceof InvalidCountryError) return null;
    throw e;
  }
};
export const hasLangIn = (c: string, l: string): boolean => {
  try {
    return hasLang(getCountryCode(c), l);
  } catch (e) {
    if (e instanceof InvalidCountryError) return false;
    throw e;
  }
};
export const isDefaultLangOf = (c: string, l: string): boolean => {
  try {
    return isDefaultLang(getCountryCode(c), l);
  } catch (e) {
    if (e instanceof InvalidCountryError) return false;
    throw e;
  }
};
export const countryCodeOf = (c: string): CountryCode | null => {
  try {
    return getCountryCode(c);
  } catch (e) {
    if (e instanceof InvalidCountryError) return null;
    throw e;
  }
};
