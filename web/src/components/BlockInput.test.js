import { render, screen } from "@testing-library/react";
import BlockInput from "./BlockInput";
import { atom } from "jotai";

const mockNumberField = jest.fn();
const mockArrayField = jest.fn();

jest.mock("./fields/NumberField", () => (a) => mockNumberField(a));
jest.mock("./fields/ArrayField", () => (a) => mockArrayField(a));

describe("Block Input", () => {
  test("should render number field for numeric input", () => {
    mockNumberField.mockReturnValue(<></>);
    const blockInputAtom = atom({ type: "number", input: 19, value: 12 });
    render(<BlockInput blockInputAtom={blockInputAtom} />);
    expect(mockNumberField).toBeCalledWith({ blockInputAtom });
  });
  test("should render dropdown field for array input", () => {
    mockArrayField.mockReturnValue(<></>);
    const blockInputAtom = atom({ type: "array", input: 19, value: 12 });
    render(<BlockInput blockInputAtom={blockInputAtom} />);
    expect(mockArrayField).toBeCalledWith({ blockInputAtom });
  });
});
