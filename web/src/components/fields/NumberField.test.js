import { fireEvent, render, screen } from "@testing-library/react";
import NumberField from "./NumberField";
import { atom } from "jotai";

describe("Number Filed", () => {
  test("should render number input", () => {
    let blockInputAtom = atom({ value: 10 });
    render(<NumberField blockInputAtom={blockInputAtom} />);
    expect(screen.getByDisplayValue(10)).not.toBeNull();
  });
  test("should update when value is filled", () => {
    let blockInputAtom = atom({ value: 10 });
    render(<NumberField blockInputAtom={blockInputAtom} />);
    const numberField = screen.getByTestId("number");
    fireEvent.change(numberField, { target: { value: 11 } });
    expect(numberField).toHaveValue(11);
  });
});
