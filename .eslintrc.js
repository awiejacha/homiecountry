module.exports = {
  env: {
    es2020: true,
    'jest/globals': true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],
  globals: {
    EventNotSupported: 'writable',
    RetryError: 'writable',
    ValidationError: 'writable',
    btoa: 'writable',
    crypto: 'writable',
    fetch: 'writable',
    moment: 'writable',
    FormData: 'writable',
    onAlias: 'writable',
    onGroup: 'writable',
    onIdentify: 'writable',
    onPage: 'writable',
    onScreen: 'writable',
    onTrack: 'writable',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier'],
  rules: {},
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
};
