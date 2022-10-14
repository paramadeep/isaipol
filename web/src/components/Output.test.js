import { render, screen, within } from "@testing-library/react";
import Output from "./Output";

describe("Output", () => {
  test("should render output", () => {
    render(<Output values={{ cost: 10, tax: 20 }} fields={["cost", "tax"]} />);
    const outputElement = screen.getByTestId("output");
    expect(within(outputElement).getByText("cost: 10")).toBeVisible();
    expect(within(outputElement).getByText("tax: 20")).toBeVisible();
  });
  test("should exclude unspecified fields", () => {
    render(<Output values={{ cost: 10, tax: 20 }} fields={["cost"]} />);
    const outputElement = screen.getByTestId("output");
    expect(within(outputElement).getByText("cost: 10")).toBeVisible();
    expect(within(outputElement).queryByText("tax: 20")).toBeNull();
  });
});
