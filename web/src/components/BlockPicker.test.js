import { render, renderHook, screen } from "@testing-library/react";
import BlockPicker from "./BlockPicker";
import userEvent from "@testing-library/user-event";
import { splitAtom } from "jotai/utils";
import { atom, useAtom, useAtomValue } from "jotai";

const mockBlockPickerItem = jest.fn();
jest.mock("./BlockPickerItem", () => (a) => mockBlockPickerItem(a));
const blockAtomsAtom = splitAtom(atom([1, 2]));

describe("BlockPicker", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockBlockPickerItem.mockReturnValue(<></>);
  });
  test("should display when asked to show", () => {
    render(<BlockPicker show={true} blockAtomsAtom={blockAtomsAtom} />);
    expect(screen.getByText("Pick to add")).toBeVisible();
  });
  test("should not display when not asked to show", () => {
    render(<BlockPicker show={false} blockAtomsAtom={blockAtomsAtom} />);
    expect(screen.queryByText("Pick to add")).toBeNull();
  });
  test.skip("should call on hide when escape is pressed", () => {
    const mockOnHide = jest.fn();
    render(<BlockPicker show={true} onHide={mockOnHide} blocks={[]} />);
    userEvent.keyboard("{ESC}");
    expect(mockOnHide).toBeCalled();
  });
  test("should display list of blocks passed", () => {
    const atoms = [];
    mockBlockPickerItem.mockImplementation(({ blockAtom }) => {
      atoms.push(blockAtom);
      return <div>blocks</div>;
    });
    render(<BlockPicker show={true} blockAtomsAtom={blockAtomsAtom} />);
    expect(screen.getAllByText("blocks").length).toBe(2);
    expect(renderHook(() => useAtom(atoms[0])).result.current[0]).toBe(1);
    expect(renderHook(() => useAtom(atoms[1])).result.current[0]).toBe(2);
  });
});
