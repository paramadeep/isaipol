import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUpdateAtom } from "jotai/utils";
import { domainAtom } from "../states/domainAtom";
import Domain from "./Domain";

const mockLane = jest.fn();
const mockReport = jest.fn();
let mockSave = jest.fn();

jest.mock("./Lane", () => (a) => mockLane(a));
jest.mock("./Report", () => (a) => mockReport(a));
jest.mock("./SaveButton", () => (a) => mockSave(a));

const getDomain = () => ({
  lanes: [
    { name: 1, bla: 1 },
    { name: 2, bla: 2 },
  ],
});

function resetAtom() {
  renderHook(() => {
    const domain = getDomain();
    useUpdateAtom(domainAtom)(domain);
  });
}

describe("App", () => {
  beforeEach(() => {
    resetAtom();
    jest.resetAllMocks();
  });
  test("renders lanes passed", () => {
    render(<Domain />);
    expect(mockLane).toBeCalledTimes(2);
    expect(screen.getByTitle("lanes-1-2")).toBeVisible();
  });
  test("should insert lane on duplicate", () => {
    mockLane.mockImplementation(({ duplicate, index }) => {
      return (
        <div onClick={() => duplicate({ name: 3 })}>{`dispatch-${index}`}</div>
      );
    });
    render(<Domain />);
    userEvent.click(screen.getByText("dispatch-0"));
    expect(screen.getByTitle("lanes-1-2-3")).toBeVisible();
  });
  test("should remove lane on remove", () => {
    mockLane.mockReset().mockImplementation(({ remove, index }) => {
      return <div onClick={remove}>{`dispatch-${index}`}</div>;
    });
    render(<Domain />);
    userEvent.click(screen.getByText("dispatch-0"));
    expect(screen.getByTitle("lanes-2")).toBeVisible();
  });
  test("should render reports", () => {
    render(<Domain />);
    expect(mockReport).toBeCalledWith({});
  });
  test.skip("should render save", () => {
    render(<Domain />);
    expect(mockSave).toBeCalledWith({});
  });
});
