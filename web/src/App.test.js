import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./services/domain/inlineDomain", () => {
  return {
    name: "ice cream",
  };
});

jest.mock("./components/Composer", () => {
  return { Composer: ({ domain }) => <div>{`Composer-${domain.name}`}</div> };
});

test("renders learn react link", () => {
  render(<App />);
  expect(screen.getByText("Composer-ice cream")).toBeVisible();
});
