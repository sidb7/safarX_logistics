import { sum } from "./../../src/sum";

describe("App", function () {
  it("should display pass in number", function () {
    expect(sum(10, 20)).toBe(30);
  });
});

export {};
