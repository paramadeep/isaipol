import { render, screen, within } from "@testing-library/react";
import Block from "./Block";
import { atom } from "jotai";

const mockBlockInput = jest.fn();
const mockRemoveBlock = jest.fn();
const mockBlockInputAtom = jest.fn();
const mockRemoveBlockAtom = jest.fn();

jest.mock("./BlockInput", () => (a) => mockBlockInput(a));
jest.mock("./RemoveBlock", () => (a) => mockRemoveBlock(a));
jest.mock("../states/BlockInputAtom", () => (a) => mockBlockInputAtom(a));
jest.mock("../states/RemoveBlockAtom", () => (a) => mockRemoveBlockAtom(a));

describe("Blocks", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockBlockInput.mockReturnValue(<></>);
    mockRemoveBlock.mockReturnValue(<></>);
    mockBlockInputAtom.mockReturnValue("");
    mockRemoveBlockAtom.mockReturnValue("");
  });

  test("should not render block with show false", () => {
    let blockAtom = atom({ name: "quantity", show: false });
    render(<Block blockAtom={blockAtom} />);
    expect(screen.queryByText("quantity")).toBeNull();
    expect(mockBlockInput).not.toBeCalled();
    expect(mockRemoveBlock).not.toBeCalled();
  });

  test("should render block title", () => {
    let blockAtom = atom({ name: "quantity", show: true });
    render(<Block blockAtom={blockAtom} />);
    expect(screen.getByText("quantity")).toBeVisible();
  });

  test("should render input field", () => {
    let blockAtom = atom({ show: true });
    mockBlockInputAtom.mockReset().mockReturnValue("1");
    mockBlockInput.mockReset().mockReturnValue(<div>input</div>);
    render(<Block blockAtom={blockAtom} />);
    expect(screen.getByText("input")).toBeVisible();
    expect(mockBlockInput).toBeCalledWith({ updateBlockAtom: "1" });
    expect(mockBlockInputAtom).toBeCalledWith(blockAtom);
  });

  test("should render remove field", () => {
    let blockAtom = atom({ show: true });
    mockRemoveBlockAtom.mockReset().mockReturnValue("1");
    mockRemoveBlock.mockReset().mockReturnValue(<div>remove</div>);
    render(<Block blockAtom={blockAtom} />);
    expect(screen.getByText("remove")).toBeVisible();
    expect(mockRemoveBlock).toBeCalledWith({ removeAtom: "1" });
    expect(mockRemoveBlockAtom).toBeCalledWith(blockAtom);
  });
});
