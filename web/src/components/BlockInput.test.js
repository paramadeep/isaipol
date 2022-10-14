import { render, screen } from "@testing-library/react";
import BlockInput from "./BlockInput";

jest.mock("./fields/NumberField", () => {
  return ({ value, update }) => <div>{`Number${value}-${update}`}</div>;
});

jest.mock("./fields/ArrayField", () => {
  return ({ input, update, value }) => (
    <div>{`Array${input.join("-")}-${update}-${value}`}</div>
  );
});

describe("Block Input", () => {
  test("should render number field for numeric input", () => {
    render(<BlockInput type={"number"} input={19} update={11} value={12} />);
    expect(screen.getByText("Number12-11")).not.toBeNull();
  });
  test("should render dropdown field for array input", () => {
    render(
      <BlockInput type={"array"} input={[10, 11]} update={12} value={13} />
    );
    expect(screen.getByText("Array10-11-12-13")).not.toBeNull();
  });
});
