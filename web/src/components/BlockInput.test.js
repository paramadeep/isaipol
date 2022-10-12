import { render, screen } from "@testing-library/react";
import { BlockInput } from "./BlockInput";

jest.mock("./fields/NumberField", () => {
  return { NumberField: ({ input }) => <div>{`Number${input}`}</div> };
});

jest.mock("./fields/ArrayField", () => {
  return { ArrayField: ({ input }) => <div>{`Array${input.length}`}</div> };
});

describe("Block Input", () => {
  test("should render number field for numeric input", () => {
    render(<BlockInput input={10} />);
    expect(screen.getByText("Number10")).not.toBeNull();
  });
  test("should render dropdown field for array input", () => {
    render(
      <BlockInput input={[{ name: "pista", input: ["10"], default: true }]} />
    );
    expect(screen.getByText("Array1")).not.toBeNull();
  });
});
