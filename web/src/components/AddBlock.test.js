import { render, screen } from "@testing-library/react";
import AddBlock from "./AddBlock";
import userEvent from "@testing-library/user-event";

const mockBlockPicker = jest.fn();
jest.mock("./BlockPicker", () => (a) => mockBlockPicker(a));
describe("Add Block", () => {
  test("should render bock picker", () => {
    mockBlockPicker.mockReturnValue(<div>picker</div>);
    render(<AddBlock blockAtomsAtom={"1"} />);
    expect(screen.getByText("picker")).toBeVisible();
    expect(mockBlockPicker).toBeCalledWith(
      expect.objectContaining({
        show: false,
        blockAtomsAtom: "1",
      })
    );
  });
  test("on click on add button should display block picker", () => {
    render(<AddBlock blockAtomsAtom={"1"} />);
    userEvent.click(screen.getByText("Add"));
    expect(mockBlockPicker).toBeCalledWith(
      expect.objectContaining({
        show: true,
        blockAtomsAtom: "1",
      })
    );
  });

  test("should hide picker on hide picker", () => {
    mockBlockPicker.mockImplementation(({ show, blockAtomsAtom, onHide }) => {
      return <div onClick={onHide}> {`picker-${show}-${blockAtomsAtom}`} </div>;
    });
    render(<AddBlock blockAtomsAtom={"1"} />);
    userEvent.click(screen.getByText("Add"));
    userEvent.click(screen.getByText("picker-true-1"));
    expect(screen.getByText("picker-false-1")).toBeVisible();
  });
  test.todo("should disable add, when there is no block to add");
});
