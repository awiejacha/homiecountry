export type CountryCode = (typeof COUNTRY_MAP)[keyof typeof COUNTRY_MAP]['mapsTo'];
export type LanguageCode = Extract<
  (typeof COUNTRY_MAP)[CountryCode],
  { defLang: string }
>['defLang'];
export class InvalidCountryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCountryError';
    Object.setPrototypeOf(this, InvalidCountryError.prototype);
  }
}
type CountryConfig = { name: string; defLang: string; vat: number; mapsTo: string };
type TerritoryConfig = { name: string; mapsTo: string };
const COUNTRY_MAP: Record<string, CountryConfig | TerritoryConfig> = {
  // Countries
  AT: { name: 'AUSTRIA', defLang: 'DE', vat: 0.2, mapsTo: 'AT' },
  BE: { name: 'BELGIUM', defLang: 'NL', vat: 0.21, mapsTo: 'BE' },
  CH: { name: 'SWITZERLAND', defLang: 'DE', vat: 0.081, mapsTo: 'CH' },
  CZ: { name: 'CZECH REPUBLIC', defLang: 'CS', vat: 0.21, mapsTo: 'CZ' },
  DE: { name: 'GERMANY', defLang: 'DE', vat: 0.19, mapsTo: 'DE' },
  DK: { name: 'DENMARK', defLang: 'DA', vat: 0.25, mapsTo: 'DK' },
  ES: { name: 'SPAIN', defLang: 'ES', vat: 0.21, mapsTo: 'ES' },
  FI: { name: 'FINLAND', defLang: 'FI', vat: 0.24, mapsTo: 'FI' },
  FR: { name: 'FRANCE', defLang: 'FR', vat: 0.2, mapsTo: 'FR' },
  GB: { name: 'UNITED KINGDOM', defLang: 'EN', vat: 0.2, mapsTo: 'GB' },
  GR: { name: 'GREECE', defLang: 'EL', vat: 0.24, mapsTo: 'GR' },
  HR: { name: 'CROATIA', defLang: 'HR', vat: 0.25, mapsTo: 'HR' },
  HU: { name: 'HUNGARY', defLang: 'HU', vat: 0.27, mapsTo: 'HU' },
  IT: { name: 'ITALY', defLang: 'IT', vat: 0.22, mapsTo: 'IT' },
  LU: { name: 'LUXEMBOURG', defLang: 'FR', vat: 0.17, mapsTo: 'LU' },
  NL: { name: 'NETHERLANDS', defLang: 'NL', vat: 0.21, mapsTo: 'NL' },
  NO: { name: 'NORWAY', defLang: 'NO', vat: 0.25, mapsTo: 'NO' },
  PL: { name: 'POLAND', defLang: 'PL', vat: 0.23, mapsTo: 'PL' },
  PT: { name: 'PORTUGAL', defLang: 'PT', vat: 0.23, mapsTo: 'PT' },
  RO: { name: 'ROMANIA', defLang: 'RO', vat: 0.19, mapsTo: 'RO' },
  SE: { name: 'SWEDEN', defLang: 'SV', vat: 0.25, mapsTo: 'SE' },
  SI: { name: 'SLOVENIA', defLang: 'SL', vat: 0.22, mapsTo: 'SI' },
  SK: { name: 'SLOVAKIA', defLang: 'SK', vat: 0.2, mapsTo: 'SK' },
  // Territories
  AI: { name: 'ANGUILLA', mapsTo: 'GB' },
  AW: { name: 'ARUBA', mapsTo: 'NL' },
  AX: { name: 'ÅLAND ISLANDS', mapsTo: 'FI' },
  BL: { name: 'SAINT BARTHÉLEMY', mapsTo: 'FR' },
  BM: { name: 'BERMUDA', mapsTo: 'GB' },
  BQ: { name: 'CARIBBEAN NETHERLANDS', mapsTo: 'NL' },
  BV: { name: 'BOUVET ISLAND', mapsTo: 'NO' },
  CW: { name: 'CURAÇAO', mapsTo: 'NL' },
  FK: { name: 'FALKLAND ISLANDS', mapsTo: 'GB' },
  FO: { name: 'FAROE ISLANDS', mapsTo: 'DK' },
  GF: { name: 'FRENCH GUIANA', mapsTo: 'FR' },
  GG: { name: 'GUERNSEY', mapsTo: 'GB' },
  GI: { name: 'GIBRALTAR', mapsTo: 'GB' },
  GL: { name: 'GREENLAND', mapsTo: 'DK' },
  GP: { name: 'GUADELOUPE', mapsTo: 'FR' },
  GS: { name: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', mapsTo: 'GB' },
  IM: { name: 'ISLE OF MAN', mapsTo: 'GB' },
  IO: { name: 'BRITISH INDIAN OCEAN TERRITORY', mapsTo: 'GB' },
  JE: { name: 'JERSEY', mapsTo: 'GB' },
  KY: { name: 'CAYMAN ISLANDS', mapsTo: 'GB' },
  MF: { name: 'SAINT MARTIN', mapsTo: 'FR' },
  MQ: { name: 'MARTINIQUE', mapsTo: 'FR' },
  MS: { name: 'MONTSERRAT', mapsTo: 'GB' },
  NC: { name: 'NEW CALEDONIA', mapsTo: 'FR' },
  PF: { name: 'FRENCH POLYNESIA', mapsTo: 'FR' },
  PM: { name: 'SAINT PIERRE AND MIQUELON', mapsTo: 'FR' },
  PN: { name: 'PITCAIRN ISLANDS', mapsTo: 'GB' },
  RE: { name: 'RÉUNION', mapsTo: 'FR' },
  SH: { name: 'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA', mapsTo: 'GB' },
  SJ: { name: 'SVALBARD AND JAN MAYEN', mapsTo: 'NO' },
  SX: { name: 'SINT MAARTEN', mapsTo: 'NL' },
  TC: { name: 'TURKS AND CAICOS ISLANDS', mapsTo: 'GB' },
  TF: { name: 'FRENCH SOUTHERN TERRITORIES', mapsTo: 'FR' },
  VG: { name: 'BRITISH VIRGIN ISLANDS', mapsTo: 'GB' },
  WF: { name: 'WALLIS AND FUTUNA', mapsTo: 'FR' },
  YT: { name: 'MAYOTTE', mapsTo: 'FR' },
} as const;
const normalizeDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const map = new Map();
Object.entries(COUNTRY_MAP).forEach(([code, config]) => {
  map.set(normalizeDiacritics(config.name), config.mapsTo);
  map.set(code, config.mapsTo);
});
export const countryCodeFrom = (input: string): CountryCode => {
  const normalizedInput = normalizeDiacritics(input.toUpperCase());
  if (!map.has(normalizedInput))
    throw new InvalidCountryError(`Invalid country input: ${input}`);
  return map.get(normalizedInput) as CountryCode;
};
export const maybeCountryCodeFrom = (c: string): CountryCode | null => {
  try {
    return countryCodeFrom(c);
  } catch (e) {
    if (e instanceof InvalidCountryError) return null;
    throw e;
  }
};
export const defaultLangIn = (countryCode: CountryCode): LanguageCode =>
  (COUNTRY_MAP[countryCode] as CountryConfig).defLang;
export const maybeDefaultLangIn = (input: string): LanguageCode | null => {
  try {
    return defaultLangIn(countryCodeFrom(input));
  } catch (e) {
    if (e instanceof InvalidCountryError) return null;
    throw e;
  }
};
export const afterVatIn = (countryCode: CountryCode, grossPrice: number): number =>
  grossPrice / (1 + (COUNTRY_MAP[countryCode] as CountryConfig).vat);
export const maybeAfterVatIn = (input: string, g: number): number | null => {
  try {
    return afterVatIn(countryCodeFrom(input), g);
  } catch (e) {
    if (e instanceof InvalidCountryError) return null;
    throw e;
  }
};
export class Country {
  private readonly countryCode: CountryCode;
  constructor(input: string) {
    this.countryCode = countryCodeFrom(input);
  }
  public getCode(): CountryCode {
    return this.countryCode;
  }
  public getDefaultLang(): string {
    return defaultLangIn(this.countryCode);
  }
  public afterVat(grossPrice: number): number {
    return afterVatIn(this.countryCode, grossPrice);
  }
  public toString(): string {
    return this.getCode();
  }
  public valueOf(): string {
    return this.getCode();
  }
}
