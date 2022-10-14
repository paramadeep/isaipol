import enrichDomain from "./enrichDomain";

describe("enrichDomain", () => {
  test("should enrich domain blocks", () => {
    const domain = {
      defaults: [],
      output: [],
      blocks: [{ input: 10 }, { input: [1, 2] }],
    };
    enrichDomain(domain);
    expect(domain.blocks[0].value).toBe(10);
    expect(domain.blocks[1].value).toBe(1);
    expect(domain.blocks[0].type).toBe("number");
    expect(domain.blocks[1].type).toBe("array");
  });
  test("should throw error invalid input", () => {
    const domain = {
      defaults: [],
      output: [],
      blocks: [{ input: "dee" }],
    };
    expect(() => enrichDomain(domain)).toThrow(
      'Invalid Input "dee", only numbers and string arrays are allowed'
    );
  });
});
