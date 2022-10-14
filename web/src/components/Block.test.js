import { render, screen, within } from "@testing-library/react";
import Block from "./Block";

jest.mock("./BlockInput", () => {
  return ({ input, update, value, type }) => (
    <div>{`BlockInput-${input}-${update}-${value}-${type}`}</div>
  );
});

describe("Blocks", () => {
  test("should render block title", () => {
    let block = { name: "quantity" };
    render(<Block block={block} />);
    expect(screen.getByTestId("quantityBlock")).toBeVisible();
    expect(screen.getByTestId("quantityBlock")).toHaveTextContent("quantity");
  });

  test("should render input fields", () => {
    render(
      <Block
        block={{ name: "q", value: "value", input: "input", type: "type" }}
        update={"update"}
      />
    );
    expect(
      within(screen.getByTestId("qBlock")).getByText(
        "BlockInput-input-update-value-type"
      )
    ).toBeVisible();
  });
});
