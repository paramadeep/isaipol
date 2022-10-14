import { render, screen, within } from "@testing-library/react";
import ArrayField from "./ArrayField";
import userEvent from "@testing-library/user-event";

describe("Array Filed", () => {
  test("should render array of input as select", () => {
    render(<ArrayField input={["strawberry", "venila"]} value={"venila"} />);
    let arrayField = screen.getByTestId("arrayField");
    expect(arrayField).not.toBeNull();
    expect(within(arrayField).getAllByRole("option").length).toBe(2);
    expect(within(arrayField).getByText("strawberry")).not.toBeNull();
    expect(within(arrayField).getByText("venila")).not.toBeNull();
    expect(screen.getByRole("option", { name: "venila" }).selected).toBe(true);
  });

  test("should update when value is filled", () => {
    const mockUpdate = jest.fn();
    render(
      <ArrayField
        input={["strawberry", "venila"]}
        update={mockUpdate}
        value={"strawberry"}
      />
    );
    const arrayField = screen.getByTestId("arrayField");
    expect(screen.getByRole("option", { name: "strawberry" }).selected).toBe(
      true
    );
    userEvent.selectOptions(arrayField, "venila");
    expect(mockUpdate).toBeCalledWith("venila");
  });
});
