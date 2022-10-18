import { render, screen, waitFor } from "@testing-library/react";
import { Composer } from "./Composer";
import userEvent from "@testing-library/user-event";

jest.mock("./Blocks", () => {
  return ({ blocks, setBlocks, removeBlock }) => (
    <>
      <div
        data-testid={"blocks"}
        onClick={() => setBlocks([{ name: "quantity", input: 5 }])}
      >{`${"blocks"}-${blocks.map((b) => b.name).join("-")}`}</div>
      <button
        data-testid={"remove"}
        onClick={() => removeBlock({ name: "dynamic" })}
      />
    </>
  );
});
jest.mock("./AddBlock", () => {
  return ({ blocks, addNewBlock }) => (
    <div
      data-testid={"add"}
      onClick={() => addNewBlock({ name: "dynamic", input: 5 })}
    >{`${"add"}-${blocks.map((b) => b.name).join("-")}`}</div>
  );
});

jest.mock("./Output", () => {
  return ({ values, fields }) => {
    return <div>{values[fields[0]]}</div>;
  };
});

const getDomain = () => ({
  name: "ice cream",
  defaultBlocks: [],
  dynamicBlocks: [],
  output: [],
});

describe("Composer", () => {
  test("should show title", () => {
    let domain = getDomain();
    render(<Composer domain={domain} />);
    expect(screen.getByText("ice cream")).toBeVisible();
  });
  test("should load default blocks from domain", () => {
    const domain = getDomain();
    domain.defaultBlocks = [
      { name: "quantity", input: 5 },
      { name: "dimension", input: 5 },
    ];
    render(<Composer domain={domain} />);
    expect(screen.getByText("blocks-quantity-dimension")).toBeVisible();
  });

  test("should update blocks list on blocks component update", () => {
    const domain = getDomain();
    domain.defaultBlocks = [
      { name: "quantity", input: 5 },
      { name: "dimension", input: 5 },
    ];
    render(<Composer domain={domain} />);
    userEvent.click(screen.getByTestId("blocks"));
    expect(screen.getByTestId("blocks")).toHaveTextContent("blocks-quantity");
  });

  const baseAddTest = () => {
    const domain = getDomain();
    domain.defaultBlocks = [{ name: "default", input: 5 }];
    domain.dynamicBlocks = [{ name: "dynamic", input: 5 }];
    render(<Composer domain={domain} />);
    const addBlock = screen.getByTestId("add");
    expect(addBlock).toHaveTextContent("dynamic");
    expect(addBlock).not.toHaveTextContent("default");
    userEvent.click(addBlock);
  };

  test("should update blocks list on add component update", () => {
    baseAddTest();
    expect(screen.getByTestId("blocks")).toHaveTextContent(
      "blocks-default-dynamic"
    );
  });

  test("should remove blocks from add blocks when it gets added to displayed block", async () => {
    baseAddTest();
    expect(screen.getByTestId("add")).not.toHaveTextContent("add-dynamic");
  });

  test.todo("should not remove default blocks");
  test("should remove removed block", () => {
    const domain = getDomain();
    render(<Composer domain={domain} />);
    userEvent.click(screen.getByTestId("add"));
    userEvent.click(screen.getByTestId("remove"));
    expect(screen.getByText("blocks-")).toBeVisible();
  });

  test("should load output of domain", () => {
    let domain = {
      name: "hi",
      defaultBlocks: [
        {
          name: "quantity",
          value: 5,
          compute: (i, o) => {
            o.cost = o.cost + i.quantity * 5;
          },
        },
      ],
      dynamicBlocks: [],
      initialOutput: { cost: 0 },
      output: ["cost"],
    };
    render(<Composer domain={domain} />);
    expect(screen.getByText("25")).toBeVisible();
  });
});
