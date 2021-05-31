import { charactersFrequency, levenshteinSimilarityRatio } from "./utils";

describe("charactersFrequency", () => {
  it("returns an Object with characters frequency", () => {
    const characters = ["a", "a", "b", "c", "c", "c"];

    expect(charactersFrequency(characters)).toStrictEqual({ a: 2, b: 1, c: 3 });
  })

  it("returns an empty Object when an empty array is passed", () => {
    const characters = [];

    expect(charactersFrequency(characters)).toStrictEqual({});
  });

  it("ignores invalid characters", () => {
    const characters = ["a", "a", "b", "c", "c", "c", "@", "."];

    expect(charactersFrequency(characters)).toStrictEqual({ a: 2, b: 1, c: 3 });
  });
});

describe("levenshteinSimilarityRatio", () => {
  it("returns the levenshtein-silimarity-ratio between 2 words", () => {
    expect(levenshteinSimilarityRatio("Javascript", "javascript")).toBe(0.9);
  });

  it("returns 1 when words are identical", () => {
    expect(levenshteinSimilarityRatio("Ruby", "Ruby")).toBe(1);
  });

  it("should return a ratio greater than 0.80", () => {
    expect(levenshteinSimilarityRatio("homer.simpson", "homero.seampsone")).toBeGreaterThan(0.8);

    expect(
      levenshteinSimilarityRatio("homer.simpson@gmail.com", "homero.seampsone@gmail.com")
    ).toBeGreaterThan(0.8);
  })
});
