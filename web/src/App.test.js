import { render, renderHook, screen } from "@testing-library/react";
import App from "./App";
import { useAtomValue, Provider } from "jotai";
import userEvent from "@testing-library/user-event";
import { domainAtom, laneAtomsAtom } from "./states/domainAtom";

const mockLane = jest.fn();
jest.mock("./components/Lane", () => (a) => mockLane(a));
jest.mock("./services/domain/inlineDomain", () => ({
  lanes: [{ name: 1 }, { name: 2 }],
}));

describe("App", () => {
  test("renders lanes passed", () => {
    const atoms = [];
    mockLane.mockImplementation(({ laneAtom }) => atoms.push(laneAtom));
    render(<App />);
    expect(mockLane).toBeCalledTimes(2);
    const lane1 = renderHook(() => useAtomValue(atoms[0])).result.current;
    const lane2 = renderHook(() => useAtomValue(atoms[1])).result.current;
    expect(lane1.name).toBe(1);
    expect(lane2.name).toBe(2);
  });

  test("should remove lane on remove lane", () => {
    let atoms = [];
    mockLane.mockImplementation(({ laneAtom, remove, index }) => {
      atoms.push(laneAtom);
      return <div onClick={remove}>{`remove-${index}`}</div>;
    });
    render(<App />);
    atoms = [];
    userEvent.click(screen.getByText("remove-0"));
    expect(atoms.length).toBe(1);
    const lane = renderHook(() => useAtomValue(atoms[0])).result.current;
    expect(lane.name).toBe(2);
  });
  test("should insert lane on duplicate", () => {
    let atoms = [];
    mockLane.mockImplementation(({ laneAtom, duplicate, index }) => {
      atoms.push(laneAtom);
      return (
        <div onClick={() => duplicate({ name: 3 })}>{`dispatch-${index}`}</div>
      );
    });
    const initialDomain = {
      lanes: [{ name: 1 }, { name: 2 }],
    };
    render(
      <Provider initialValues={[[domainAtom, initialDomain]]}>
        <App />
      </Provider>
    );
    atoms = [];
    userEvent.click(screen.getByText("dispatch-0"));
    expect(atoms.length).toBe(3);
    const lane3 = renderHook(() => useAtomValue(atoms[2])).result.current;
    expect(lane3.name).toBe(3);
  });
  test("should remove lane on remove", () => {
    let atoms = [];
    mockLane.mockImplementation(({ laneAtom, remove, index }) => {
      atoms.push(laneAtom);
      return <div onClick={remove}>{`dispatch-${index}`}</div>;
    });
    const initialDomain = {
      lanes: [{ name: 1 }, { name: 2 }],
    };
    render(
      <Provider initialValues={[[domainAtom, initialDomain]]}>
        <App />
      </Provider>
    );
    atoms = [];
    userEvent.click(screen.getByText("dispatch-0"));
    expect(atoms.length).toBe(1);
    const lane3 = renderHook(() => useAtomValue(atoms[0])).result.current;
    expect(lane3.name).toBe(2);
  });
});
