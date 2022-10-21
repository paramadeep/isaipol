import { render, screen, within } from "@testing-library/react";
import ArrayField from "./ArrayField";
import userEvent from "@testing-library/user-event";
import { atom } from "jotai";

describe("Array Filed", () => {
  test("should render array of input as select", () => {
    const blockInputAtom = atom({
      input: ["strawberry", "vanilla"],
      value: "vanilla",
    });
    render(<ArrayField blockInputAtom={blockInputAtom} />);
    let arrayField = screen.getByTestId("arrayField");
    expect(arrayField).not.toBeNull();
    expect(within(arrayField).getAllByRole("option").length).toBe(2);
    expect(within(arrayField).getByText("strawberry")).not.toBeNull();
    expect(within(arrayField).getByText("vanilla")).not.toBeNull();
    expect(screen.getByRole("option", { name: "vanilla" }).selected).toBe(true);
  });

  test("should update when value is filled", () => {
    const baseBlock = atom({
      input: ["strawberry", "vanilla"],
      value: "strawberry",
    });
    const blockInputAtom = atom(
      (get) => get(baseBlock),
      (g, s, value) => {
        s(baseBlock, { ...g(baseBlock), value });
      }
    );
    render(<ArrayField blockInputAtom={blockInputAtom} />);
    expect(screen.getByRole("option", { name: "strawberry" }).selected).toBe(
      true
    );
    const arrayField = screen.getByTestId("arrayField");
    expect(screen.getByRole("option", { name: "strawberry" }).selected).toBe(
      true
    );
    userEvent.selectOptions(arrayField, "vanilla");
    expect(screen.getByRole("option", { name: "vanilla" }).selected).toBe(true);
  });
});
