import { render, screen } from "@testing-library/react";
import BlockPicker from "./BlockPicker";
import userEvent from "@testing-library/user-event";

describe("BlockPicker", () => {
  test("should display when asked to show", () => {
    render(<BlockPicker show={true} blocks={[]} />);
    const pickerModel = screen.getByText("Pick to add");
    expect(pickerModel).toBeVisible();
  });
  test("should not display when not asked to show", () => {
    render(<BlockPicker show={false} blocks={[]} />);
    expect(screen.queryByText("Pick to add")).toBeNull();
  });
  test.skip("should call on hide when escape is pressed", () => {
    const mockOnHide = jest.fn();
    render(<BlockPicker show={true} onHide={mockOnHide} blocks={[]} />);
    userEvent.keyboard("{ESC}");
    expect(mockOnHide).toBeCalled();
  });
  test("should display list of blocks passed", () => {
    render(
      <BlockPicker
        blocks={[{ name: "block-a" }, { name: "block-b" }]}
        show={true}
      />
    );
    expect(screen.getByText("block-a")).toBeVisible();
    expect(screen.getByText("block-b")).toBeVisible();
  });
  test("should call back when a block is selected", () => {
    const mockBlockSelection = jest.fn();
    render(
      <BlockPicker
        blocks={[{ name: "block-a" }, { name: "block-b" }]}
        show={true}
        onBlockSelection={mockBlockSelection}
      />
    );
    userEvent.click(screen.getByText("block-a"));
    expect(mockBlockSelection).toBeCalledWith({ name: "block-a" });
  });
});
