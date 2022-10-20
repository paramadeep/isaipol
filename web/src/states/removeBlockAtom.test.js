import { atom, useAtomValue } from "jotai";
import getBlockInputAtom from "./blockInputAtom";
import { act, renderHook } from "@testing-library/react";
import { useUpdateAtom } from "jotai/utils";
import RemoveBlockAtom from "./removeBlockAtom";

describe("block input atom", () => {
  test("should return fields for block input", () => {
    const blockAtom = atom({ isDefault: true, show: true });
    const removeBlockAtom = RemoveBlockAtom(blockAtom);
    const actual = renderHook(() => useAtomValue(removeBlockAtom)).result
      .current;
    expect(actual).toEqual({ isRemovable: true });
  });
  test("should change show fields to false of base block atom", () => {
    const blockAtom = atom({ show: true, value: 3 });
    const removeBlockAtom = RemoveBlockAtom(blockAtom);
    const removeAtom = renderHook(() => useUpdateAtom(removeBlockAtom)).result
      .current;
    act(() => {
      removeAtom();
    });
    const actual = renderHook(() => useAtomValue(blockAtom)).result.current;
    expect(actual).toEqual({
      show: false,
      value: 3,
    });
  });
});
