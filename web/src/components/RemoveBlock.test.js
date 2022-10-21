import { render, renderHook, screen } from "@testing-library/react";
import RemoveBlock from "./RemoveBlock";
import { atom, useAtomValue } from "jotai";
import removeBlockAtom from "../states/removeBlockAtom";
import userEvent from "@testing-library/user-event";

describe("remove block", () => {
  test("should not render default block", () => {
    let removeAtom = removeBlockAtom(atom({ isDefault: true }));
    render(<RemoveBlock removeAtom={removeAtom} />);
    expect(screen.queryByTestId("remove-block")).toBeNull();
  });
  test("should remove on click of removable block", () => {
    const blockAtom = atom({ isDefault: false, show: true });
    let removeAtom = removeBlockAtom(blockAtom);
    render(<RemoveBlock removeAtom={removeAtom} />);
    userEvent.click(screen.getByTestId("remove-block"));
    expect(
      renderHook(() => useAtomValue(blockAtom)).result.current.show
    ).toBeFalsy();
  });
});
