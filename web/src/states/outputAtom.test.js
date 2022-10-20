import { atom, useAtomValue } from "jotai";
import { renderHook } from "@testing-library/react";
import outputAtom from "./outputAtom";
import { useMemo } from "react";

const baseBlock = {
  name: "a",
  value: 1,
  show: false,
  compute: (i, o) => {
    o.b = 10;
  },
  output: ["b"],
};
const lane = () => ({
  blocks: [{ ...baseBlock }],
  initialOutput: { b: 0 },
});

describe("Output Atom", () => {
  test("should ignore blocks that are not shown", () => {
    const laneAtom = atom(lane());
    const { result } = renderHook(() =>
      useAtomValue(useMemo(() => outputAtom(laneAtom), [laneAtom]))
    );
    expect(result.current.b).toBe(0);
  });
  test("should ignore blocks without compute function", () => {
    const laneAtom = atom({
      ...lane(),
      blocks: [{ name: "a", value: 1, show: true }],
    });
    const { result } = renderHook(() =>
      useAtomValue(useMemo(() => outputAtom(laneAtom), [laneAtom]))
    );
    expect(result.current.b).toBe(0);
  });
  test("should use value of input blocks, even not shown", () => {
    const laneAtom = atom({
      ...lane(),
      blocks: [
        { name: "a", value: 1, show: false },
        {
          name: "c",
          value: 2,
          show: true,
          compute: (i, o) => {
            o.b = o.b + i.c + i.a;
          },
        },
      ],
    });
    const { result } = renderHook(() =>
      useAtomValue(useMemo(() => outputAtom(laneAtom), [laneAtom]))
    );
    expect(result.current.b).toBe(3);
  });
  test("should process all blocks with compute", () => {
    const laneAtom = atom({
      ...lane(),
      blocks: [
        { show: true, compute: (i, o) => o.b++ },
        { show: true, compute: (i, o) => o.b++ },
        { show: true, compute: (i, o) => o.b++ },
      ],
    });
    const { result } = renderHook(() =>
      useAtomValue(useMemo(() => outputAtom(laneAtom), [laneAtom]))
    );
    expect(result.current.b).toBe(3);
  });
});
