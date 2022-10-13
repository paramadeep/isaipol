import { render, screen } from "@testing-library/react";
import NumberField from "./NumberField";

describe("Number Filed", () => {
  test("should render number input", () => {
    render(<NumberField input={10} />);
    expect(screen.getByDisplayValue(10)).not.toBeNull();
  });
  // test("should update when value is filled");
});
