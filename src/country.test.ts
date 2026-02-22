import {
  Country,
  InvalidCountryError,
  COUNTRY_MAP,
  countryCodeFrom,
  maybeCountryCodeFrom,
  defaultLangIn,
  maybeDefaultLangIn,
  afterVatIn,
  maybeAfterVatIn,
} from './country';

describe('CountryCode', () => {
  test('should create CountryCode for European countries', () => {
    const pl = new Country('PL');
    expect(pl.getCode()).toBe('PL');
    expect(String(pl)).toBe('PL');

    const de = new Country('de'); // lower case
    expect(de.getCode()).toBe('DE');
    expect(String(de)).toBe('DE');
  });

  test('should handle dependent territories (Greenland -> Denmark)', () => {
    // Greenland ISO code is GL
    const gl = new Country('GL');
    expect(gl.getCode()).toBe('DK');
    expect(String(gl)).toBe('DK');
  });

  test('should handle dependent territories (Faroe Islands -> Denmark)', () => {
    // Faroe Islands ISO code is FO
    const fo = new Country('FO');
    expect(fo.getCode()).toBe('DK');
    expect(String(fo)).toBe('DK');
  });

  test('should throw InvalidCountryError for non-European countries', () => {
    expect(() => new Country('US')).toThrow(InvalidCountryError);
    expect(() => new Country('JP')).toThrow(InvalidCountryError);
  });

  test('should throw InvalidCountryError for invalid strings', () => {
    expect(() => new Country('INVALID')).toThrow(InvalidCountryError);
    expect(() => new Country('')).toThrow(InvalidCountryError);
  });

  test('should handle UK dependent territories if applicable (e.g., Gibraltar)', () => {
    const gi = new Country('GI');
    expect(gi.getCode()).toBe('GB');
    expect(String(gi)).toBe('GB');
  });

  test('should create CountryCode from full country names', () => {
    const fr = new Country('France');
    expect(fr.getCode()).toBe('FR');

    const im = new Country('Isle of Man');
    expect(im.getCode()).toBe('GB');

    const de = new Country('GERMANY'); // case insensitive
    expect(de.getCode()).toBe('DE');

    const ax = new Country('Åland Islands');
    expect(ax.getCode()).toBe('FI');

    const axWithoutDiacritics = new Country('Aland Islands');
    expect(axWithoutDiacritics.getCode()).toBe('FI');

    const re = new Country('Réunion');
    expect(re.getCode()).toBe('FR');

    const sb = new Country('SAINT BARTHELEMY');
    expect(sb.getCode()).toBe('FR');

    const sbWithDiacritics = new Country('SAINT BARTHÉLEMY');
    expect(sbWithDiacritics.getCode()).toBe('FR');

    const curacao = new Country('CURACAO');
    expect(curacao.getCode()).toBe('NL');
  });

  test('should throw InvalidCountryError for European countries not in config', () => {
    // Albania (AL) is in EUROPEAN_COUNTRY_MAPPING but not in countryLanguageConfig
    expect(() => new Country('AL')).toThrow(InvalidCountryError);
    expect(() => new Country('Albania')).toThrow(InvalidCountryError);
  });

  test('should return correct language information', () => {
    const de = new Country('DE');
    expect(de.getDefaultLang()).toBe('DE');

    const be = new Country('BE');
    expect(be.getDefaultLang()).toBe('NL');

    const cz = new Country('CZ');
    expect(cz.getDefaultLang()).toBe('CS');
  });

  describe('afterVat', () => {
    test('should calculate net price correctly for UK (20% VAT)', () => {
      const gb = new Country('GB');
      // 120 / 1.2 = 100
      expect(gb.afterVat(120)).toBeCloseTo(100);
    });

    test('should calculate net price correctly for Poland (23% VAT)', () => {
      const pl = new Country('PL');
      // 123 / 1.23 = 100
      expect(pl.afterVat(123)).toBeCloseTo(100);
    });

    test('should calculate net price correctly for Germany (19% VAT)', () => {
      const de = new Country('DE');
      // 119 / 1.19 = 100
      expect(de.afterVat(119)).toBeCloseTo(100);
    });

    test('should calculate net price correctly for France (20% VAT)', () => {
      const fr = new Country('France');
      expect(fr.afterVat(120)).toBeCloseTo(100);
    });

    test('should handle dependent territories VAT (Greenland -> Denmark 25%)', () => {
      const gl = new Country('GL');
      expect(gl.getCode()).toBe('DK');
      // 125 / 1.25 = 100
      expect(gl.afterVat(125)).toBeCloseTo(100);
    });
  });
});

describe('COUNTRY_MAP', () => {
  test('should contain valid configurations for exported countries', () => {
    expect(COUNTRY_MAP['DE']).toEqual({ name: 'GERMANY', defLang: 'DE', vat: 0.19 });
    expect(COUNTRY_MAP['GB']).toEqual({ name: 'UNITED KINGDOM', defLang: 'EN', vat: 0.2 });
    expect(COUNTRY_MAP['PL']).toEqual({ name: 'POLAND', defLang: 'PL', vat: 0.23 });
  });

  test('should not contain non-configured ISO codes', () => {
    expect(COUNTRY_MAP).not.toHaveProperty('US');
    expect(COUNTRY_MAP).not.toHaveProperty('XX');
  });
});

describe('countryCodeFrom', () => {
  test('should return exactly the same CountryCode when given valid inputs', () => {
    expect(countryCodeFrom('PL')).toBe('PL');
    expect(countryCodeFrom('GERMANY')).toBe('DE');
    expect(countryCodeFrom('RÉUNION')).toBe('FR');
    expect(countryCodeFrom('GL')).toBe('DK');
  });

  test('should throw InvalidCountryError on invalid input', () => {
    expect(() => countryCodeFrom('INVALID_CODE')).toThrow(InvalidCountryError);
    expect(() => countryCodeFrom('US')).toThrow(InvalidCountryError);
    expect(() => countryCodeFrom('')).toThrow(InvalidCountryError);
  });
});

describe('maybeCountryCodeFrom', () => {
  test('should return main European country code for valid input', () => {
    expect(maybeCountryCodeFrom('PL')).toBe('PL');
    expect(maybeCountryCodeFrom('Greenland')).toBe('DK');
  });

  test('should return null for invalid input', () => {
    expect(maybeCountryCodeFrom('INVALID')).toBeNull();
    expect(maybeCountryCodeFrom('Albania')).toBeNull();
  });
});

describe('defaultLangIn', () => {
  test('should return default language for a valid country code', () => {
    expect(defaultLangIn('DE')).toBe('DE');
    expect(defaultLangIn('FR')).toBe('FR');
    expect(defaultLangIn('BE')).toBe('NL');
  });
});

describe('maybeDefaultLangIn', () => {
  test('should return default language for a valid country input string', () => {
    expect(maybeDefaultLangIn('Germany')).toBe('DE');
    expect(maybeDefaultLangIn('FR')).toBe('FR');
    expect(maybeDefaultLangIn('Bermuda')).toBe('EN'); // Map to GB -> EN
  });

  test('should return null for invalid country input string', () => {
    expect(maybeDefaultLangIn('INVALID')).toBeNull();
    expect(maybeDefaultLangIn('US')).toBeNull();
  });
});

describe('afterVatIn', () => {
  test('should calculate net price correctly for valid CountryCode', () => {
    expect(afterVatIn('GB', 120)).toBeCloseTo(100);
    expect(afterVatIn('PL', 123)).toBeCloseTo(100);
  });
});

describe('maybeAfterVatIn', () => {
  test('should calculate net price correctly for valid country string', () => {
    expect(maybeAfterVatIn('GB', 120)).toBeCloseTo(100);
    expect(maybeAfterVatIn('Poland', 123)).toBeCloseTo(100);
  });

  test('should return null for invalid country input string', () => {
    expect(maybeAfterVatIn('INVALID', 100)).toBeNull();
    expect(maybeAfterVatIn('Albania', 100)).toBeNull();
  });
});
