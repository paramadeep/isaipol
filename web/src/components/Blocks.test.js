import { render, screen, within } from "@testing-library/react";
import Blocks from "./Blocks";

describe("Blocks", () => {
  test("should render all blocks", () => {
    let blocks = [{ name: "quantity" }, { name: "dimension" }];
    render(<Blocks blocks={blocks} />);
    expect(screen.getByTestId("quantityBlock")).not.toBeNull();
    expect(screen.getByTestId("quantityBlock")).toHaveTextContent("quantity");
    expect(screen.getByTestId("dimensionBlock")).toHaveTextContent("dimension");
    expect(screen.getByTestId("dimensionBlock")).not.toBeNull();
  });

  test("should render input fields", () => {
    render(<Blocks blocks={[{ name: "q", input: 10 }]} />);
    expect(
      within(screen.getByTestId("qBlock")).getByDisplayValue("10")
    ).not.toBeNull();
  });
});
