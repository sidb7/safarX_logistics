/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
   coverageDirectory: './coverage/',
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/path/to/dir/"
  ],
   collectCoverage: true,
  moduleNameMapper: {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.css$': '<rootDir>/src/tests/mocks/styleMock.js',
},

 transform: {
  '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
},

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/path/to/ignore/",
    "/other/path/to/ignore/",
  ],
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json',
  //   },
  // },
};