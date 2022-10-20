import { atom, useAtomValue, useAtom } from "jotai";
import getBlockAtomsAtom from "./blockAtomsAtom";
import { act, renderHook } from "@testing-library/react";
import { useUpdateAtom } from "jotai/utils";

function baseBlockAtoms() {
  const blockAtomsAtom = getBlockAtomsAtom(
    atom({ blocks: [{ a: 1 }, { b: 1 }] })
  );
  const { result } = renderHook(() => useAtom(blockAtomsAtom)[0]);
  return result.current;
}

describe("block atoms atom", () => {
  test("should return list of block atoms of a lane", () => {
    const blockAtoms = baseBlockAtoms();
    expect(blockAtoms.length).toBe(2);
    expect(renderHook(() => useAtomValue(blockAtoms[0])).result.current.a).toBe(
      1
    );
    expect(renderHook(() => useAtomValue(blockAtoms[1])).result.current.b).toBe(
      1
    );
  });
  test("should update only the block updated in base lane", () => {
    const laneAtom = atom({ blocks: [{ a: 1 }, { b: 1 }] });
    const blockAtomsAtom = getBlockAtomsAtom(laneAtom);
    const { result } = renderHook(() => useAtom(blockAtomsAtom)[0]);
    const blockAtoms = result.current;
    const updateBlock = renderHook(() => useUpdateAtom(blockAtoms[1])).result
      .current;
    act(() => {
      updateBlock({ b: 2 });
    });
    const updatedBlocks = renderHook(() => useAtomValue(laneAtom)).result
      .current.blocks;
    expect(updatedBlocks[1].b).toBe(2);
    expect(updatedBlocks[0].a).toBe(1);
  });
});
