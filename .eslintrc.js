module.exports = {
  env: { es2022: true, 'jest/globals': true, node: true },
  extends: ['prettier'],
  globals: {},
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  plugins: ['jest', 'prettier'],
  rules: {},
  settings: { 'import/resolver': { typescript: {} } },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
  ignorePatterns: ['dist/**/*', 'coverage/**/*'],
};
