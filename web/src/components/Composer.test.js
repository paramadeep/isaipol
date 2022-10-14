import { render, screen } from "@testing-library/react";
import { Composer } from "./Composer";
import enrichDomain from "../services/domain/enrichDomain";
import userEvent from "@testing-library/user-event";

jest.mock("./Blocks", () => {
  return ({ blocks, setBlocks }) => (
    <div
      data-testid={"blocks"}
      onClick={() => setBlocks([{ name: "quantity", input: 5 }])}
    >{`blocks-${blocks.map((b) => b.name).join("-")}`}</div>
  );
});

jest.mock("./Output", () => {
  return ({ values, fields }) => {
    return <div>{values[fields[0]]}</div>;
  };
});

describe("Composer", () => {
  test("should load default blocks from domain", () => {
    let domain = {
      defaults: ["quantity", "dimension"],
      blocks: [
        { name: "quantity", input: 5 },
        { name: "dimension", input: 5 },
        { name: "finish", input: 5 },
      ],
      output: [],
    };
    enrichDomain(domain);
    render(<Composer domain={domain} />);
    expect(screen.getByText("blocks-quantity-dimension")).toBeVisible();
  });

  test("should update blocks on call of setBlock", () => {
    let domain = {
      defaults: ["quantity", "dimension"],
      blocks: [
        { name: "quantity", input: 5 },
        { name: "dimension", input: 5 },
      ],
      output: [],
    };
    enrichDomain(domain);
    render(<Composer domain={domain} />);
    userEvent.click(screen.getByTestId("blocks"));
    expect(screen.getByText("blocks-quantity")).toBeVisible();
  });

  test("should load output of domain", () => {
    let domain = {
      defaults: ["quantity"],
      blocks: [
        {
          name: "quantity",
          input: 5,
          compute: (i, o) => {
            o.cost = o.cost + i.quantity * 5;
          },
        },
      ],
      output: ["cost"],
    };
    enrichDomain(domain);
    render(<Composer domain={domain} />);
    expect(screen.getByText("25")).toBeVisible();
  });
});
