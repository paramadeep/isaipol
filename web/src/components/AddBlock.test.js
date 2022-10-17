import { render } from "@testing-library/react";
import AddBlock from "./AddBlock";

describe("Add Block", () => {
  test("should display model with list of passed blocks", () => {
    let blocks = [];
    let setBlock = [];
    render(<AddBlock blocks={blocks} setBlocks={setBlock} />);
  });
});
