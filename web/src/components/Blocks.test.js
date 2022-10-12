import { render, screen, within } from "@testing-library/react";
import Blocks from "./Blocks";

jest.mock("./BlockInput", () => {
  return { BlockInput: ({ input }) => <div>{`BlockInput${input}`}</div> };
});

describe("Blocks", () => {
  test("should render all blocks", () => {
    let blocks = [{ name: "quantity" }, { name: "dimension" }];
    render(<Blocks blocks={blocks} />);
    expect(screen.getByTestId("quantityBlock")).toBeVisible();
    expect(screen.getByTestId("quantityBlock")).toHaveTextContent("quantity");
    expect(screen.getByTestId("dimensionBlock")).toHaveTextContent("dimension");
    expect(screen.getByTestId("dimensionBlock")).toBeVisible();
  });

  test("should render input fields", () => {
    render(<Blocks blocks={[{ name: "q", input: 10 }]} />);
    expect(
      within(screen.getByTestId("qBlock")).getByText("BlockInput10")
    ).toBeVisible();
  });
});
