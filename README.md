# @awiejacha/homiecountry

Handy utilities for resolving European country codes, checking available languages, and calculating prices after VAT.

## Installation

```bash
npm install @awiejacha/homiecountry
```

## Features

- **Tree-Shaking Support**: Designed to be effectively bundled, ensuring only the functions you import are included in your final build, minimizing bundle size.
- **Country Code Resolution**: Map full country names, territories, and various formats to standard European country codes.
- **Language Support**: Check default and available languages for each country.
- **VAT Calculation**: Instantly compute the net price (after VAT) for a given gross price in a specific country.
- **Object-Oriented & Functional APIs**: Choose between a stateful `Country` class or pure functions.
- **Safe Execution**: Provides non-throwing `...In` / `...Of` variants for safer operations without `try/catch`.

## API Documentation

### 1. The `Country` Class

If you prefer an object-oriented approach, the `Country` class is the primary entry point. It wraps a specific country code and provides methods to query its properties.

```typescript
import Country from '@awiejacha/homiecountry';

// Instantiate with a country code, full name, or European territory
const poland = new Country('POLAND'); 
const germany = new Country('DE');
const reunion = new Country('RÉUNION'); // Resolves to 'FR'

console.log(poland.getCode()); // 'PL'
console.log(poland.getLang()); // 'PL'
console.log(poland.hasLang('EN')); // true
console.log(poland.afterVat(123)); // 100
```

#### Class Methods

- `getCode(): CountryCode` - Returns the resolved country code.
- `getLang(): string` - Returns the primary language.
- `getDefaultLang(): string` - Returns the default language.
- `hasLang(lang: string): boolean` - Checks if the language is available in the country.
- `isDefaultLang(lang: string): boolean` - Checks if the provided language is the default language.
- `afterVat(grossPrice: number): number` - Calculates the net price after removing the country's VAT from the gross price.
- `toString(): string` / `valueOf(): string` - Returns the country code representation.

---

### 2. Functional API (Throws on Invalid Input)

For functional programming patterns. These functions will throw an `InvalidCountryError` if the country code cannot be resolved.

```typescript
import { 
  getCountryCode, 
  getLang, 
  getDefaultLang, 
  hasLang, 
  isDefaultLang, 
  afterVat 
} from '@awiejacha/homiecountry';

// Resolve a country code
const code = getCountryCode('FRENCH GUIANA'); // 'FR'

// Query properties
console.log(getLang('FR')); // 'FR'
console.log(getDefaultLang('FR')); // 'FR'
console.log(hasLang('FR', 'EN')); // true
console.log(isDefaultLang('FR', 'EN')); // false

// VAT calculation
const netPrice = afterVat('DE', 119); // 100
```

---

### 3. Safe Functional API (Returns null/false on Invalid Input)

If you are dealing with untrusted user input and want to avoid try/catch blocks, use these safe variants.

```typescript
import { 
  countryCodeOf, 
  afterVatIn, 
  hasLangIn, 
  isDefaultLangOf 
} from '@awiejacha/homiecountry';

// Returns null instead of throwing an error
const code = countryCodeOf('INVALID_COUNTRY'); // null
const validCode = countryCodeOf('SPAIN'); // 'ES'

// Safe VAT calculation
const netPrice = afterVatIn('ITALY', 122); // 100
const invalidPrice = afterVatIn('NARNIA', 122); // null

// Safe language checks
const hasIt = hasLangIn('SPAIN', 'ES'); // true
const invalidHas = hasLangIn('NARNIA', 'EN'); // false
const isDefault = isDefaultLangOf('SPAIN', 'ES'); // true
```

---

### 4. Types and Constants

The library exports several useful types and constants for TypeScript users.

```typescript
import { 
  CountryCode, 
  LanguageCode, 
  countryLanguageConfig,
  InvalidCountryError
} from '@awiejacha/homiecountry';

// CountryCode: 'DE' | 'CH' | 'AT' | 'FR' | ...
// LanguageCode: 'DE' | 'EN' | 'FR' | ...
```
