import { charactersFrequency } from "./utils";

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
