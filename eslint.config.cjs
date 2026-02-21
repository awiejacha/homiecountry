const { defineConfig, globalIgnores } = require('eslint/config');
const globals = require('globals');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-plugin-prettier');
const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
module.exports = defineConfig([
  {
    languageOptions: {
      globals: { ...jest.environments.globals.globals, ...globals.node },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {},
    },
    extends: compat.extends('prettier'),
    plugins: { jest, prettier },
    rules: {},
    settings: { 'import/resolver': { typescript: {} } },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': typescriptEslint },
    extends: compat.extends('plugin:@typescript-eslint/recommended'),
  },
  globalIgnores(['dist/**/*', 'coverage/**/*']),
  globalIgnores(['**/node_modules']),
]);
