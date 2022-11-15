import { render, renderHook, screen } from "@testing-library/react";
import BlockPickerItem from "./BlockPickerItem";
import { atom } from "jotai";
import userEvent from "@testing-library/user-event";
import { useAtomValue } from "jotai";

describe.skip("Block Picker Item", () => {
  test("should display only of it not already shown", () => {
    let blockAtom = atom({ name: "a", show: true });
    render(<BlockPickerItem blockAtom={blockAtom} />);
    expect(screen.queryByText("a")).toBeNull();
  });
  test("should display if not already shown", () => {
    let blockAtom = atom({ name: "a", show: false });
    render(<BlockPickerItem blockAtom={blockAtom} />);
    expect(screen.queryByText("a")).toBeVisible();
  });
  test("should hide on picking", () => {
    let blockAtom = atom({ name: "a", show: false });
    render(<BlockPickerItem blockAtom={blockAtom} />);
    userEvent.click(screen.queryByText("a"));
    expect(screen.queryByText("a")).toBeNull();
    const { result } = renderHook(() => useAtomValue(blockAtom));
    expect(result.current.show).toBeTruthy();
  });
  test("should filter on search", () => {
    let blockAtom = atom({ name: "ab", show: true });
    render(<BlockPickerItem blockAtom={blockAtom} search="a" />);
    expect(screen.queryByText("ab")).toBeVisible();
  });
  test("should hide on unmatch search", () => {
    let blockAtom = atom({ name: "ab", show: true });
    render(<BlockPickerItem blockAtom={blockAtom} search="c" />);
    expect(screen.queryByText("ab")).toBeNull();
  });
});
