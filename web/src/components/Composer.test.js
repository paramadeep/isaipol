import { render, screen } from "@testing-library/react";
import { Composer } from "./Composer";
import { Provider } from "jotai";
import outputAtom from "../states/outputAtom";

jest.mock("./Blocks", () => {
  return ({ blocks }) => (
    <div>{`blocks-${blocks.map((b) => b.name).join("-")}`}</div>
  );
});

jest.mock("./Output", () => {
  return ({ display }) => <div>{display}</div>;
});

describe("Composer", () => {
  test("should load default blocks from domain", () => {
    let domain = {
      defaults: ["quantity", "dimension"],
      blocks: [{ name: "quantity" }, { name: "dimension" }, { name: "finish" }],
    };
    render(<Composer domain={domain} />);
    expect(screen.getByText("blocks-quantity-dimension")).toBeVisible();
  });

  test("should load output of domain", () => {
    let domain = {
      defaults: ["quantity"],
      blocks: [
        {
          name: "quantity",
          input: 5,
          compute: (o) => {
            o.cost = o.quantity * 5;
          },
        },
      ],
      display: "cost",
    };
    render(
      <Provider initialValues={[[outputAtom, { quantity: 5 }]]}>
        <Composer domain={domain} />
      </Provider>
    );
    expect(screen.getByText("25")).toBeVisible();
  });
});
