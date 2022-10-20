import { atom, useAtomValue } from "jotai";
import getBlockInputAtom from "./blockInputAtom";
import { act, renderHook } from "@testing-library/react";
import { useUpdateAtom } from "jotai/utils";

describe("block input atom", () => {
  test("should return fields for block input", () => {
    const blockAtom = atom({ input: 1, value: 2, type: 3, show: true });
    const blockInputAtom = getBlockInputAtom(blockAtom);
    const actual = renderHook(() => useAtomValue(blockInputAtom)).result
      .current;
    expect(actual).toEqual({
      input: 1,
      value: 2,
      type: 3,
    });
  });
  test("should update value field of base bock atom", () => {
    const blockAtom = atom({ input: 1, value: 2, type: 3, show: true });
    const blockInputAtom = getBlockInputAtom(blockAtom);
    const updateAtom = renderHook(() => useUpdateAtom(blockInputAtom)).result
      .current;
    act(() => {
      updateAtom(4);
    });
    const actual = renderHook(() => useAtomValue(blockAtom)).result.current;
    expect(actual).toEqual({
      input: 1,
      value: 4,
      type: 3,
      show: true,
    });
  });
});
