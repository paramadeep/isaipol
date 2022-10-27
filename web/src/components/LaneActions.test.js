import { render, screen } from "@testing-library/react";
import LaneActions from "./LaneActions";
import userEvent from "@testing-library/user-event";

describe("LaneActions", () => {
  test("should have icon, which on click show actions", () => {
    render(<LaneActions />);
    expect(screen.getByTitle("remove")).toBeValid();
    expect(screen.getByTitle("duplicate")).toBeValid();
  });
  test("should call duplicate on click of duplicate", () => {
    const mockDuplicateLane = jest.fn();
    render(<LaneActions duplicateLane={mockDuplicateLane} />);
    userEvent.click(screen.getByTitle("duplicate"));
    expect(mockDuplicateLane).toBeCalled();
  });
  test("should call remove on click of remove", () => {
    const mockRemove = jest.fn();
    render(<LaneActions remove={mockRemove} />);
    userEvent.click(screen.getByTitle("remove"));
    expect(mockRemove).toBeCalled();
  });
});
