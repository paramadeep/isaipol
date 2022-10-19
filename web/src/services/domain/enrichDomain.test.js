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
  test("should return default/dynamic blocks", () => {
    const domain = {
      defaults: ["a"],
      output: [],
      blocks: [
        { name: "a", input: 10 },
        { name: "b", input: 1 },
      ],
    };
    enrichDomain(domain);
    expect(domain.blocks.find((b) => b.name === "a").show).toBeTruthy();
    expect(domain.blocks.find((b) => b.name === "b").show).toBeFalsy();
    expect(domain.blocks.find((b) => b.name === "a").isDefault).toBeTruthy();
    expect(domain.blocks.find((b) => b.name === "b").isDefault).toBeFalsy();
  });
  test("should add lane if not exist", () => {
    const domain = {
      defaults: [],
      output: ["o"],
      blocks: [{ name: "a", input: 10 }],
    };
    enrichDomain(domain);
    expect(domain.lanes.length).toBe(1);
    expect(domain.lanes[0].id).toBe(1);
    expect(domain.lanes[0].blocks).toBe(domain.blocks);
    expect(domain.lanes[0].output).toBe(domain.output);
  });
  test("should not add lane if it exist", () => {
    const domain = {
      defaults: [],
      output: [],
      blocks: [{ name: "a", input: 10 }],
      lanes: [{ id: 2 }],
    };
    enrichDomain(domain);
    expect(domain.lanes.length).toBe(1);
    expect(domain.lanes[0].id).toBe(2);
  });
});
