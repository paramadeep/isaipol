import { render, screen } from "@testing-library/react";
import AddBlock from "./AddBlock";
import userEvent from "@testing-library/user-event";

jest.mock(
  "./BlockPicker",
  () =>
    ({ blocks, show, onBlockSelection, onHide }) =>
      (
        <>
          <button
            data-testid={"picker"}
            onClick={() => onBlockSelection("newBlock")}
          >
            {`picker-${blocks.map((b) => b.name).join("-")}-${show}`}
          </button>
          <button data-testid={"picker-close"} onClick={onHide}></button>
        </>
      )
);
describe("Add Block", () => {
  test("should pass model with list of blocks", () => {
    let blocks = [{ name: "a" }, { name: "b" }];
    render(<AddBlock blocks={blocks} addNewBlock={() => {}} />);
    expect(screen.getByTestId("picker")).toHaveTextContent("picker-a-b-false");
  });
  test("on click on add button should display model with list of passed blocks", () => {
    let blocks = [{ name: "a" }, { name: "b" }];
    render(<AddBlock blocks={blocks} addNewBlock={() => {}} />);
    userEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("picker")).toHaveTextContent("picker-a-b-true");
  });
  test("on block selection, hide picker and call add block", () => {
    let blocks = [{ name: "a" }, { name: "b" }];
    const mockAddBlock = jest.fn();
    render(<AddBlock blocks={blocks} addNewBlock={mockAddBlock} />);
    userEvent.click(screen.getByText("Add"));
    const picker = screen.getByTestId("picker");
    expect(picker).toHaveTextContent("picker-a-b-true");
    userEvent.click(picker);
    expect(picker).toHaveTextContent("picker-a-b-false");
    expect(mockAddBlock).toBeCalledWith("newBlock");
  });
  test("on hide picker, hide picker and don't add block", () => {
    let blocks = [{ name: "a" }, { name: "b" }];
    const mockAddBlock = jest.fn();
    render(<AddBlock blocks={blocks} addNewBlock={mockAddBlock} />);
    userEvent.click(screen.getByText("Add"));
    userEvent.click(screen.getByTestId("picker-close"));
    expect(screen.getByTestId("picker")).toHaveTextContent("picker-a-b-false");
    expect(mockAddBlock).not.toBeCalled();
  });
  test.todo("should disable add, when there is no block to add");
});
