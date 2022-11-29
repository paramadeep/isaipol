import { FaArrowDown } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import { useUpdateAtom } from "jotai/utils";
import { moveOutCommonBlockAtom } from "../states/commonBlocksAtom";

const MoveOutOfCommon = ({ blockName }) => {
  const removeFromCommonBlock = useUpdateAtom(moveOutCommonBlockAtom);

  return (
    <Badge
      className={"float-end bg-dark m-1"}
      onClick={() => removeFromCommonBlock(blockName)}
    >
      <FaArrowDown />
    </Badge>
  );
};

export default MoveOutOfCommon;
