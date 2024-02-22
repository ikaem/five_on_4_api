import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  // [...]

  preset: 'ts-jest',
  // extensionsToTreatAsEsm: ['.ts', '.js],
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default jestConfig;

/* AS PER
- https://dev.to/nathan_sheryak/how-to-test-a-typescript-express-api-with-jest-for-dummies-like-me-4epd
- https://stackoverflow.com/questions/76995944/jest-cannot-import-modules-from-typescript-esm-path-mapping
- https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
- https://www.sammeechward.com/testing-an-express-app-with-supertest-and-jest - more tests
- https://medium.com/@odedlevy02/node-how-to-add-per-module-integration-tests-b59c31b47183 - setup in memory database

*/
