import { render, screen, within } from "@testing-library/react";
import ArrayField from "./ArrayField";

describe("Array Filed", () => {
  test("should render array of input as select", () => {
    render(<ArrayField input={["strawberry"]} />);
    let arrayField = screen.getByTestId("arrayField");
    expect(arrayField).not.toBeNull();
    expect(within(arrayField).getByText("strawberry")).not.toBeNull();
  });
});
