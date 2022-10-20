import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider, useAtomValue } from "jotai";
import { domainAtom } from "./states/domainAtom";

test("renders learn react link", () => {
  const domain = {
    name: "ice cream",
    lanes: [{ name: 1 }, { name: 2 }],
  };
  render(
    <Provider initialValues={[[domainAtom, domain]]}>
      <App />
    </Provider>
  );
  // expect(screen.getByText("Composer-1")).toBeVisible();
  // expect(screen.getByText("Composer-2")).toBeVisible();
  expect(screen.getAllByTestId("composer").length).toBe(2);
});

jest.mock("./components/Lane", () => ({ laneAtom }) => {
  return <div data-testid={"composer"}>{`Composer-${laneAtom}`}</div>;
});
