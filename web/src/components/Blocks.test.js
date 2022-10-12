import { render, screen, within } from "@testing-library/react";
import Blocks from "./Blocks";

jest.mock("./Block", () => {
  return {
    Block: ({ block }) => <div>{`Block-${block.name}-${block.input}`}</div>,
  };
});

describe("Blocks", () => {
  test("should render all blocks", () => {
    let blocks = [
      { name: "quantity", input: 10 },
      { name: "dimension", input: 20 },
    ];
    render(<Blocks blocks={blocks} />);
    expect(screen.getByText("Block-quantity-10")).toBeVisible();
    expect(screen.getByText("Block-dimension-20")).toBeVisible();
  });
});
