module.exports = {
  testEnvironment: 'node',
  roots: ['./src/'],
  testRegex: '.*\\.test\\.(js|ts)',
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.test.{js,ts}', '!src/runtime/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'clover'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  transformIgnorePatterns: [],
};
