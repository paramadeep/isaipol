import { render, screen } from "@testing-library/react";
import { Composer } from "./Composer";
import userEvent from "@testing-library/user-event";

const updatableComponent = (componentName) => {
  return ({ blocks, setBlocks }) => (
    <div
      data-testid={componentName}
      onClick={() => setBlocks([{ name: "quantity", input: 5 }])}
    >{`${componentName}-${blocks.map((b) => b.name).join("-")}`}</div>
  );
};

jest.mock("./Blocks", () => {
  return updatableComponent("blocks");
});
jest.mock("./AddBlock", () => {
  return updatableComponent("add");
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

  test("should update blocks list on add component update", () => {
    const domain = getDomain();
    domain.defaultBlocks = [{ name: "default", input: 5 }];
    domain.dynamicBlocks = [{ name: "dynamic", input: 5 }];
    render(<Composer domain={domain} />);
    const addBlock = screen.getByTestId("add");
    expect(addBlock).toHaveTextContent("dynamic");
    expect(addBlock).not.toHaveTextContent("default");
    userEvent.click(addBlock);
    expect(screen.getByTestId("blocks")).toHaveTextContent("blocks-quantity");
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
