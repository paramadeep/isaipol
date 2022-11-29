import { Badge } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import { useUpdateAtom } from "jotai/utils";
import { moveIntoCommonsAtom } from "../states/commonBlocksAtom";

const MoveIntoCommons = ({ block }) => {
  const moveIntoCommons = useUpdateAtom(moveIntoCommonsAtom);
  return (
    <Badge
      className={"float-end bg-dark m-1 "}
      onClick={() => moveIntoCommons(block)}
    >
      <FaArrowUp />
    </Badge>
  );
};

export default MoveIntoCommons;
