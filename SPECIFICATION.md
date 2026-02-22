# Specification

This document details the business logic, constraints, and mappings implemented by `@awiejacha/homiecountry`.

## Bundling and Tree-Shaking

The library is structured to export pure functions alongside the `Country` class, allowing modern bundlers (like Webpack, Rollup, or esbuild) to effectively tree-shake unused code. This ensures that the footprint added to your application's bundle is strictly limited to the code you actually import and use.

## Supported Countries

The library supports standard European countries and their dependent territories. Countries are mapped to their respective ISO alpha-2 codes (e.g., `DE`, `FR`, `PL`).

Dependent territories (like French Guiana, Martinique, Gibraltar) are mapped to their parent European country's ISO code for tax and operational purposes within the scope of this package.

For instance:

- `RÉUNION` -> `FR`
- `BERMUDA` -> `GB`
- `SVALBARD AND JAN MAYEN` -> `NO`
- `ARUBA` -> `NL`

All country matching is performed case-insensitively and diacritics are normalized (e.g., `RÉUNION` becomes `REUNION`).

## Language Configurations

Every supported country has a defined `defLang`.

| Country        | Code | Default Lang |
| -------------- | ---- | ------------ |
| Germany        | DE   | DE           |
| Switzerland    | CH   | DE           |
| Austria        | AT   | DE           |
| France         | FR   | FR           |
| Italy          | IT   | IT           |
| Spain          | ES   | ES           |
| Netherlands    | NL   | NL           |
| Poland         | PL   | PL           |
| Slovakia       | SK   | SK           |
| Czech Republic | CZ   | CS           |
| Portugal       | PT   | PT           |
| Belgium        | BE   | NL           |
| Luxembourg     | LU   | FR           |
| Denmark        | DK   | DA           |
| Sweden         | SE   | SV           |
| Croatia        | HR   | HR           |
| Finland        | FI   | FI           |
| Slovenia       | SI   | SL           |
| Hungary        | HU   | HU           |
| Norway         | NO   | NO           |
| Greece         | GR   | EL           |
| Romania        | RO   | RO           |
| United Kingdom | GB   | EN           |

## VAT Rates

The library encodes the default VAT (Value Added Tax) rate for each supported country. This allows accurate calculation of net prices from gross prices using the formula:

`net = gross / (1 + vatRate)`

### Supported VAT Rates

- DE: 19% (0.19)
- CH: 8.1% (0.081)
- AT: 20% (0.2)
- FR: 20% (0.2)
- IT: 22% (0.22)
- ES: 21% (0.21)
- NL: 21% (0.21)
- PL: 23% (0.23)
- SK: 20% (0.2)
- CZ: 21% (0.21)
- PT: 23% (0.23)
- BE: 21% (0.21)
- LU: 17% (0.17)
- DK: 25% (0.25)
- SE: 25% (0.25)
- HR: 25% (0.25)
- FI: 24% (0.24)
- SI: 22% (0.22)
- HU: 27% (0.27)
- NO: 25% (0.25)
- GR: 24% (0.24)
- RO: 19% (0.19)
- GB: 20% (0.2)

## Error Handling

When evaluating invalid inputs (e.g., an unsupported country or territory), functions in the core API will throw an `InvalidCountryError`. Safe wrappers (`maybe...`) catch this specific error and return `null` to prevent runtime crashes.
