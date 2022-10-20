import { render, renderHook } from "@testing-library/react";
import { useAtom } from "jotai";
import { laneAtomsAtom } from "./domainAtom";
import App from "../App";

describe("domain atom", () => {
  test.only("some", () => {
    render(<App />);
  });
});
