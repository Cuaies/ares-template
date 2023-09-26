/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: [
    "<rootDir>/src/modules/logger/tests",
    "<rootDir>/src/modules/events/tests",
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "mocks/*",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/ts",
    "<rootDir>/src/modules/logger/messages",
  ],
  setupFiles: ["<rootDir>/src/init/config.ts"],
};
