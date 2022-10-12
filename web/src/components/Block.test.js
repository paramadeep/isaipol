import { render, screen, within } from "@testing-library/react";
import { Block } from "./Block";

jest.mock("./BlockInput", () => {
  return { BlockInput: ({ input }) => <div>{`BlockInput${input}`}</div> };
});

describe("Blocks", () => {
  test("should render block title", () => {
    let block = { name: "quantity" };
    render(<Block block={block} />);
    expect(screen.getByTestId("quantityBlock")).toBeVisible();
    expect(screen.getByTestId("quantityBlock")).toHaveTextContent("quantity");
  });

  test("should render input fields", () => {
    render(<Block block={{ name: "q", input: 10 }} />);
    expect(
      within(screen.getByTestId("qBlock")).getByText("BlockInput10")
    ).toBeVisible();
  });
});
