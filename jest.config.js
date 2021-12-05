/* eslint-disable  */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
};
