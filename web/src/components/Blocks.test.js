import { render, screen } from "@testing-library/react";
import Blocks from "./Blocks";
import userEvent from "@testing-library/user-event";
import { Button } from "react-bootstrap";

jest.mock("./Block", () => {
  return ({ block, update, remove }) => (
    <>
      <div
        data-testid={`block-${block.name}`}
        onClick={() => update(100)}
      >{`block-${block.name}-${block.value}`}</div>
      <button
        data-testid={`remove-block-${block.name}`}
        onClick={remove}
      ></button>
    </>
  );
});

describe("Blocks", () => {
  test("should render all blocks", () => {
    let blocks = [
      { name: "quantity", input: 10, value: 30 },
      { name: "dimension", input: 20, value: 40 },
    ];
    render(<Blocks blocks={blocks} />);
    expect(screen.getByText("block-quantity-30")).toBeVisible();
    expect(screen.getByText("block-dimension-40")).toBeVisible();
  });
  test("should update blocks on change", () => {
    const mockUpdate = jest.fn();
    let blocks = [
      { name: "quantity", input: 10, value: 30 },
      { name: "dimension", input: 20, value: 40 },
    ];
    render(<Blocks blocks={blocks} setBlocks={mockUpdate} />);
    userEvent.click(screen.getByTestId("block-quantity"));
    expect(mockUpdate).toBeCalledWith([
      { input: 10, name: "quantity", value: 100 },
      { input: 20, name: "dimension", value: 40 },
    ]);
    userEvent.click(screen.getByTestId("block-dimension"));
    expect(mockUpdate).toBeCalledWith([
      { input: 10, name: "quantity", value: 100 },
      { input: 20, name: "dimension", value: 100 },
    ]);
  });
  test("should remove block on remove", () => {
    const mockRemove = jest.fn();
    let blocks = [
      { name: "quantity", input: 10, value: 30 },
      { name: "dimension", input: 20, value: 40 },
    ];
    render(<Blocks blocks={blocks} removeBlock={mockRemove} />);
    userEvent.click(screen.getByTestId("remove-block-quantity"));
    expect(mockRemove).toBeCalledWith(blocks[0]);
  });
});
