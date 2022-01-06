module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/test", "<rootDir>/examples"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: ".*test\\.(t|j)sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
