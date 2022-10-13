import { render, screen } from "@testing-library/react";
import { Composer } from "./Composer";

jest.mock("./Blocks", () => {
  return ({ blocks }) => (
    <div>{`blocks-${blocks.map((b) => b.name).join("-")}`}</div>
  );
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
});
