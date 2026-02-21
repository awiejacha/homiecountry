import Country, { InvalidCountryError, afterVatIn, hasLangIn, isDefaultLangOf, countryCodeOf } from './country';

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
    expect(de.getLang()).toBe('DE');
    expect(de.getDefaultLang()).toBe('DE');
    expect(de.hasLang('DE')).toBe(true);
    expect(de.hasLang('EN')).toBe(true);
    expect(de.hasLang('FR')).toBe(false);
    expect(de.isDefaultLang('DE')).toBe(true);
    expect(de.isDefaultLang('EN')).toBe(false);

    const be = new Country('BE');
    expect(be.getLang()).toBe('NL');
    expect(be.getDefaultLang()).toBe('NL');
    expect(be.hasLang('NL')).toBe(true);
    expect(be.hasLang('FR')).toBe(true);
    expect(be.hasLang('EN')).toBe(true);

    const cz = new Country('CZ');
    expect(cz.getLang()).toBe('CS');
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

  describe('exported utility functions', () => {
    test('afterVatIn should calculate net price', () => {
      expect(afterVatIn('GB', 120)).toBeCloseTo(100);
      expect(afterVatIn('Poland', 123)).toBeCloseTo(100);
    });

    test('hasLangIn should check available languages', () => {
      expect(hasLangIn('DE', 'EN')).toBe(true);
      expect(hasLangIn('Germany', 'FR')).toBe(false);
    });

    test('isDefaultLangOf should check default language', () => {
      expect(isDefaultLangOf('FR', 'FR')).toBe(true);
      expect(isDefaultLangOf('France', 'EN')).toBe(false);
    });

    test('countryCodeOf should return main European country code', () => {
      expect(countryCodeOf('PL')).toBe('PL');
      expect(countryCodeOf('Greenland')).toBe('DK');
    });

    test('functions should return null or false for invalid input', () => {
      expect(afterVatIn('INVALID', 100)).toBeNull();
      expect(hasLangIn('US', 'EN')).toBe(false);
      expect(isDefaultLangOf('', 'PL')).toBe(false);
      expect(countryCodeOf('Albania')).toBeNull();
    });
  });
});
