import { render, screen } from "@testing-library/react";
import Blocks from "./Blocks";

jest.mock("./Block", () => {
  return ({ block }) => <div>{`block-${block.name}-${block.input}`}</div>;
});

describe("Blocks", () => {
  test("should render all blocks", () => {
    let blocks = [
      { name: "quantity", input: 10 },
      { name: "dimension", input: 20 },
    ];
    render(<Blocks blocks={blocks} />);
    expect(screen.getByText("block-quantity-10")).toBeVisible();
    expect(screen.getByText("block-dimension-20")).toBeVisible();
  });
});
