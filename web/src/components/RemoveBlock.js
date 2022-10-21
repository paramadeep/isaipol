import { CloseButton } from "react-bootstrap";
import { useAtom } from "jotai";

const RemoveBlock = ({ removeAtom }) => {
  const [{ isRemovable }, removeBlock] = useAtom(removeAtom);
  if (!isRemovable) {
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
};
export default RemoveBlock;
