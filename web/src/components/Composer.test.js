import { render, screen } from "@testing-library/react";
import Composer from "./Composer";
import userEvent from "@testing-library/user-event";
import { atom } from "jotai";

jest.mock("./Blocks", () => {
  return ({ blocks, setBlocks, removeBlock }) => (
    <>
      <div
        data-testid={"blocks"}
        onClick={() => setBlocks([{ name: "quantity", input: 5, show: true }])}
      >{`${"blocks"}-${blocks.map((b) => b.name).join("-")}`}</div>
      <button
        data-testid={"remove"}
        onClick={() => removeBlock({ name: "toRemove" })}
      />
    </>
  );
});
jest.mock("./AddBlock", () => {
  return ({ blocks, addNewBlock }) => (
    <div
      data-testid={"add"}
      onClick={() => addNewBlock({ name: "dynamic", input: 5, show: true })}
    >{`${"add"}-${blocks.map((b) => b.name).join("-")}`}</div>
  );
});

jest.mock("./Output", () => {
  return ({ values, fields }) => {
    return <div>{values[fields[0]]}</div>;
  };
});

const getLane = () => ({
  name: "ice cream",
  blocks: [],
  output: [],
});

describe("Composer", () => {
  test("should show title", () => {
    let laneAtom = atom(getLane());
    render(<Composer laneAtom={laneAtom} />);
    expect(screen.getByText("ice cream")).toBeVisible();
  });
  test("should load blocks marked show from lane", () => {
    const lane = getLane();
    lane.blocks = [
      { name: "quantity", input: 5, show: true },
      { name: "dimension", input: 5, show: false },
    ];
    let laneAtom = atom(lane);
    render(<Composer laneAtom={laneAtom} />);
    expect(screen.getByText("blocks-quantity")).toBeVisible();
  });

  test("should update blocks list on blocks component update", () => {
    const lane = getLane();
    const laneAtom = atom(lane);
    render(<Composer laneAtom={laneAtom} />);
    userEvent.click(screen.getByTestId("blocks"));
    expect(screen.getByTestId("blocks")).toHaveTextContent("blocks-quantity");
  });

  test("should exclude default items from addable list", () => {
    const lane = getLane();
    lane.blocks = [{ name: "dynamic", input: 5, isDefault: true }];
    const laneAtom = atom(lane);
    render(<Composer laneAtom={laneAtom} />);
    expect(screen.getByTestId("add")).toHaveTextContent("add-");
  });

  test("should update blocks list on add component update", () => {
    const lane = getLane();
    lane.blocks = [{ name: "dynamic", input: 5, show: false }];
    const laneAtom = atom(lane);
    render(<Composer laneAtom={laneAtom} />);
    const addBlock = screen.getByTestId("add");
    userEvent.click(addBlock);
    expect(screen.getByTestId("blocks")).toHaveTextContent("blocks-dynamic");
  });

  test.todo("should not remove default blocks");
  test("should remove removed block", () => {
    const lane = getLane();
    lane.blocks = [{ name: "toRemove", input: 5, show: true }];
    const laneAtom = atom(lane);
    render(<Composer laneAtom={laneAtom} />);
    userEvent.click(screen.getByTestId("remove"));
    expect(screen.getByText("blocks-")).toBeVisible();
  });

  test("should load output of lane", () => {
    let lane = {
      name: "hi",
      blocks: [
        {
          name: "quantity",
          value: 5,
          compute: (i, o) => {
            o.cost = o.cost + i.quantity * 5;
          },
          show: true,
        },
      ],
      dynamicBlocks: [],
      initialOutput: { cost: 0 },
      output: ["cost"],
    };
    const laneAtom = atom(lane);
    render(<Composer laneAtom={laneAtom} />);
    expect(screen.getByText("25")).toBeVisible();
  });
});
