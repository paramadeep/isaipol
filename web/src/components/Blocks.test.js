import { render, renderHook, screen } from "@testing-library/react";
import Blocks from "./Blocks";
import { atom, useAtomValue } from "jotai";
import { splitAtom } from "jotai/utils";

const mockBlock = jest.fn();

jest.mock("./Block", () => (a) => mockBlock(a));

function validateBlockAtom(callIndex, blockValue) {
  const firstCallParams = mockBlock.mock.calls[callIndex];
  expect(firstCallParams.length).toBe(1);
  const actual = firstCallParams[0].blockAtom;
  expect(actual).not.toBeNull();
  expect(renderHook(() => useAtomValue(actual)).result.current).toBe(
    blockValue
  );
}

describe("Blocks", () => {
  test("should render all blocks passed", () => {
    let blockAtomsAtom = splitAtom(atom([1, 2]));
    mockBlock.mockReturnValue(<div>a</div>);
    render(<Blocks blockAtomsAtom={blockAtomsAtom} />);
    expect(screen.queryAllByText("a").length).toBe(2);
    validateBlockAtom(0, 1);
    validateBlockAtom(1, 2);
  });
});
