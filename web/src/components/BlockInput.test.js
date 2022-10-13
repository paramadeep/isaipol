import { render, screen } from "@testing-library/react";
import BlockInput from "./BlockInput";

jest.mock("./fields/NumberField", () => {
  return ({ input }) => <div>{`Number${input}`}</div>;
});

jest.mock("./fields/ArrayField", () => {
  return ({ input }) => <div>{`Array${input.length}`}</div>;
});

jest.mock("./fields/InvalidInputField", () => {
  return ({ input }) => <div>{`Invalid-${input}`}</div>;
});

describe("Block Input", () => {
  test("should render number field for numeric input", () => {
    render(<BlockInput input={10} />);
    expect(screen.getByText("Number10")).not.toBeNull();
  });
  test("should render dropdown field for array input", () => {
    render(<BlockInput input={[10]} />);
    expect(screen.getByText("Array1")).not.toBeNull();
  });
  test("should show invalid field when input is not", () => {
    render(<BlockInput input={"dingdong"} />);
    expect(screen.getByText("Invalid-dingdong")).not.toBeNull();
  });
});
