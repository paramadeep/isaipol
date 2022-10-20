import { CloseButton } from "react-bootstrap";

export function RemoveBlock({ isDefault, removeBlock }) {
  if (isDefault) {
    return <></>;
  }
  return (
    <CloseButton
      data-testid={`remove-block`}
      onClick={removeBlock}
      className={"float-end align-top"}
      style={{ width: "2px" }}
    />
  );
}
