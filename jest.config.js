module.exports = {
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
      '@env': '<rootDir>/src/environments/environment',
      'swiper/css': 'swiper/swiper.min.css',
      '^@commons-lib$': '<rootDir>/projects/commons-lib/src/public-api.ts',
      '^swiper/(.*)$': '<rootDir>/node_modules/swiper/angular/fesm2020/swiper/$1',
      '^swiper_angular$': '<rootDir>/node_modules/swiper/angular/fesm2020/swiper_angular.mjs',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'js', 'html', 'json', 'mjs'],
  coverageReporters: ['html', 'text', 'json', 'lcov'],
  coverageDirectory: 'coverage',
  testMatch: ['**/*.spec.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!swiper)/'
  ]
};