export type CountryCode = keyof typeof COUNTRY_MAP;
export type LanguageCode = (typeof COUNTRY_MAP)[CountryCode]['defaultLanguage'];
export class InvalidCountryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCountryError';
    Object.setPrototypeOf(this, InvalidCountryError.prototype);
  }
}
const CODE_MAP = {
  AI: 'GB',
  AT: 'AT',
  AW: 'NL',
  AX: 'FI',
  BE: 'BE',
  BL: 'FR',
  BM: 'GB',
  BQ: 'NL',
  BV: 'NO',
  CH: 'CH',
  CW: 'NL',
  CZ: 'CZ',
  DE: 'DE',
  DK: 'DK',
  ES: 'ES',
  FI: 'FI',
  FK: 'GB',
  FO: 'DK',
  FR: 'FR',
  GB: 'GB',
  GF: 'FR',
  GG: 'GB',
  GI: 'GB',
  GL: 'DK',
  GP: 'FR',
  GR: 'GR',
  GS: 'GB',
  HR: 'HR',
  HU: 'HU',
  IM: 'GB',
  IO: 'GB',
  IT: 'IT',
  JE: 'GB',
  KY: 'GB',
  LU: 'LU',
  MF: 'FR',
  MQ: 'FR',
  MS: 'GB',
  NC: 'FR',
  NL: 'NL',
  NO: 'NO',
  PF: 'FR',
  PL: 'PL',
  PM: 'FR',
  PN: 'GB',
  PT: 'PT',
  RE: 'FR',
  RO: 'RO',
  SE: 'SE',
  SH: 'GB',
  SI: 'SI',
  SJ: 'NO',
  SK: 'SK',
  SX: 'NL',
  TC: 'GB',
  TF: 'FR',
  VG: 'GB',
  WF: 'FR',
  YT: 'FR',
} as const;
export const COUNTRY_MAP: Record<
  string,
  { name: string; defaultLanguage: string; vatRate: number }
> = {
  DE: { name: 'GERMANY', defaultLanguage: 'DE', vatRate: 0.19 },
  CH: { name: 'SWITZERLAND', defaultLanguage: 'DE', vatRate: 0.081 },
  AT: { name: 'AUSTRIA', defaultLanguage: 'DE', vatRate: 0.2 },
  FR: { name: 'FRANCE', defaultLanguage: 'FR', vatRate: 0.2 },
  IT: { name: 'ITALY', defaultLanguage: 'IT', vatRate: 0.22 },
  ES: { name: 'SPAIN', defaultLanguage: 'ES', vatRate: 0.21 },
  NL: { name: 'NETHERLANDS', defaultLanguage: 'NL', vatRate: 0.21 },
  PL: { name: 'POLAND', defaultLanguage: 'PL', vatRate: 0.23 },
  SK: { name: 'SLOVAKIA', defaultLanguage: 'SK', vatRate: 0.2 },
  CZ: { name: 'CZECH REPUBLIC', defaultLanguage: 'CS', vatRate: 0.21 },
  PT: { name: 'PORTUGAL', defaultLanguage: 'PT', vatRate: 0.23 },
  BE: { name: 'BELGIUM', defaultLanguage: 'NL', vatRate: 0.21 },
  LU: { name: 'LUXEMBOURG', defaultLanguage: 'FR', vatRate: 0.17 },
  DK: { name: 'DENMARK', defaultLanguage: 'DA', vatRate: 0.25 },
  SE: { name: 'SWEDEN', defaultLanguage: 'SV', vatRate: 0.25 },
  HR: { name: 'CROATIA', defaultLanguage: 'HR', vatRate: 0.25 },
  FI: { name: 'FINLAND', defaultLanguage: 'FI', vatRate: 0.24 },
  SI: { name: 'SLOVENIA', defaultLanguage: 'SL', vatRate: 0.22 },
  HU: { name: 'HUNGARY', defaultLanguage: 'HU', vatRate: 0.27 },
  NO: { name: 'NORWAY', defaultLanguage: 'NO', vatRate: 0.25 },
  GR: { name: 'GREECE', defaultLanguage: 'EL', vatRate: 0.24 },
  RO: { name: 'ROMANIA', defaultLanguage: 'RO', vatRate: 0.19 },
  GB: { name: 'UNITED KINGDOM', defaultLanguage: 'EN', vatRate: 0.2 },
} as const;
const TERRITORY_MAP: Record<string, string> = {
  GREENLAND: 'GL',
  'FAROE ISLANDS': 'FO',
  'FRENCH GUIANA': 'GF',
  GUADELOUPE: 'GP',
  MARTINIQUE: 'MQ',
  MAYOTTE: 'YT',
  RÉUNION: 'RE',
  'SAINT BARTHÉLEMY': 'BL',
  'SAINT MARTIN': 'MF',
  'SAINT PIERRE AND MIQUELON': 'PM',
  'WALLIS AND FUTUNA': 'WF',
  'FRENCH POLYNESIA': 'PF',
  'NEW CALEDONIA': 'NC',
  'FRENCH SOUTHERN TERRITORIES': 'TF',
  ARUBA: 'AW',
  CURAÇAO: 'CW',
  'SINT MAARTEN': 'SX',
  'CARIBBEAN NETHERLANDS': 'BQ',
  'SVALBARD AND JAN MAYEN': 'SJ',
  'BOUVET ISLAND': 'BV',
  GIBRALTAR: 'GI',
  GUERNSEY: 'GG',
  'ISLE OF MAN': 'IM',
  JERSEY: 'JE',
  ANGUILLA: 'AI',
  BERMUDA: 'BM',
  'BRITISH INDIAN OCEAN TERRITORY': 'IO',
  'BRITISH VIRGIN ISLANDS': 'VG',
  'CAYMAN ISLANDS': 'KY',
  'FALKLAND ISLANDS': 'FK',
  MONTSERRAT: 'MS',
  'PITCAIRN ISLANDS': 'PN',
  'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA': 'SH',
  'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS': 'GS',
  'TURKS AND CAICOS ISLANDS': 'TC',
  'ÅLAND ISLANDS': 'AX',
} as const;
const normalizeDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const map = new Map();
Object.entries(TERRITORY_MAP).forEach(([name, code]) => {
  map.set(normalizeDiacritics(name), CODE_MAP[code]);
  map.set(code, CODE_MAP[code]);
});
Object.entries(COUNTRY_MAP).forEach(([code, { name }]) => {
  map.set(normalizeDiacritics(name), code);
  map.set(code, code);
});
export function getCountryCode(input: string): CountryCode {
  const normalizedInput = normalizeDiacritics(input.toUpperCase());
  if (!map.has(normalizedInput))
    throw new InvalidCountryError(`Invalid country input: ${input}`);
  return map.get(normalizedInput) as CountryCode;
}
export function getDefaultLang(countryCode: CountryCode): string {
  return COUNTRY_MAP[countryCode].defaultLanguage;
}
export function afterVat(countryCode: CountryCode, grossPrice: number): number {
  return grossPrice / (1 + COUNTRY_MAP[countryCode].vatRate);
}
export default class Country {
  private readonly countryCode: CountryCode;
  constructor(input: string) {
    this.countryCode = getCountryCode(input);
  }
  public getCode(): CountryCode {
    return this.countryCode;
  }
  public getDefaultLang(): string {
    return getDefaultLang(this.countryCode);
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
export const countryCodeOf = (c: string): CountryCode | null => {
  try {
    return getCountryCode(c);
  } catch (e) {
    if (e instanceof InvalidCountryError) return null;
    throw e;
  }
};
