import { render, screen, within } from "@testing-library/react";
import ArrayField from "./ArrayField";
import userEvent from "@testing-library/user-event";

describe("Array Filed", () => {
  test("should render array of input as select", () => {
    render(<ArrayField input={["strawberry"]} />);
    let arrayField = screen.getByTestId("arrayField");
    expect(arrayField).not.toBeNull();
    expect(within(arrayField).getByText("strawberry")).not.toBeNull();
  });
  test("should update when value is filled", () => {
    const mockUpdate = jest.fn();
    render(<ArrayField input={["strawberry", "venial"]} update={mockUpdate} />);
    const arrayField = screen.getByTestId("arrayField");
    userEvent.selectOptions(arrayField, "venial");
    expect(mockUpdate).toBeCalledWith("venial");
  });
});
