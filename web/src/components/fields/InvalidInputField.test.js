import { render, screen } from "@testing-library/react";
import { InvalidInputField } from "./InvalidInputField";

describe("Invalid Input Field", () => {
  test("should display invalid invalid test message", () => {
    render(<InvalidInputField input={{ a: 10 }} />);
    expect(
      screen.getByText("Please verify your domain, input field")
    ).toBeVisible();
  });
});
