import { fireEvent, render, screen } from "@testing-library/react";
import NumberField from "./NumberField";

describe("Number Filed", () => {
  test("should render number input", () => {
    render(<NumberField input={10} />);
    expect(screen.getByDisplayValue(10)).not.toBeNull();
  });
  test("should update when value is filled", () => {
    const mockUpdate = jest.fn();
    render(<NumberField input={10} update={mockUpdate} />);
    const numberField = screen.getByTestId("number");
    fireEvent.change(numberField, { target: { value: 11 } });
    expect(mockUpdate).toBeCalledWith("11");
  });
});
