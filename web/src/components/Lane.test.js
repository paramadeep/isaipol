import { render, screen } from "@testing-library/react";
import Lane from "./Lane";
import userEvent from "@testing-library/user-event";
import { atom } from "jotai";

const mockBlocks = jest.fn();
const mockAddBlocks = jest.fn();
const mockOutput = jest.fn();
const mockOutputAtom = jest.fn();
const mockBlockAtomsAtom = jest.fn();

jest.mock("./AddBlock", () => (a) => mockAddBlocks(a));
jest.mock("./Blocks", () => (a) => mockBlocks(a));
jest.mock("./Output", () => (a) => mockOutput(a));
jest.mock("../states/outputAtom", () => (a) => mockOutputAtom(a));
jest.mock("../states/blockAtomsAtom", () => (b) => mockBlockAtomsAtom(b));

const getLane = () => ({
  name: "ice cream",
  blocks: [],
  output: [],
});

describe("Composer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockOutputAtom.mockReturnValue(atom(""));
    mockBlockAtomsAtom.mockReturnValue(atom(""));
    mockBlocks.mockReturnValue(<></>);
    mockAddBlocks.mockReturnValue(<></>);
    mockOutput.mockReturnValue(<></>);
  });

  test("should show title", () => {
    let laneAtom = atom(getLane());
    render(<Lane laneAtom={laneAtom} />);
    expect(screen.getByText("ice cream")).toBeVisible();
  });

  test("should call outputAtom with laneAtom", () => {
    let laneAtom = atom(getLane());
    render(<Lane laneAtom={laneAtom} />);
    expect(mockOutputAtom).toBeCalledWith(laneAtom);
  });

  test("should call blockAtomsAtom with laneAtom", () => {
    let laneAtom = atom(getLane());
    render(<Lane laneAtom={laneAtom} />);
    expect(mockBlockAtomsAtom).toBeCalledWith(laneAtom);
  });

  test("should load blocks in lane", () => {
    let laneAtom = atom(getLane());
    const blockValue = "1";
    mockBlockAtomsAtom.mockReset().mockReturnValue(blockValue);
    mockBlocks.mockReset().mockReturnValue(<div>block</div>);
    render(<Lane laneAtom={laneAtom} />);
    expect(screen.getByText("block")).toBeVisible();
    expect(mockBlocks).toBeCalledWith({ blockAtomsAtom: blockValue });
  });

  test("should load add blocks in lane", () => {
    let laneAtom = atom(getLane());
    const blockValue = "1";
    mockBlockAtomsAtom.mockReset().mockReturnValue(blockValue);
    mockAddBlocks.mockReset().mockReturnValue(<div>addBlock</div>);
    render(<Lane laneAtom={laneAtom} />);
    expect(screen.getByText("addBlock")).toBeVisible();
    expect(mockBlocks).toBeCalledWith({ blockAtomsAtom: blockValue });
  });

  test("should load output in lane", () => {
    const lane = getLane();
    lane.output = "laneOut";
    let laneAtom = atom(lane);
    const outputValue = "1";
    mockOutputAtom.mockReset().mockReturnValue(atom((get) => outputValue));
    mockOutput.mockReset().mockReturnValue(<div>output</div>);
    render(<Lane laneAtom={laneAtom} />);
    expect(screen.getByText("output")).toBeVisible();
    expect(mockOutput).toBeCalledWith({
      values: outputValue,
      fields: "laneOut",
    });
  });
});
