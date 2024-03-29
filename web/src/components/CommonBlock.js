import { Card } from "react-bootstrap";
import { useAtomValue } from "jotai/utils";
import BlockInput from "./BlockInput";
import { useMemo } from "react";
import updateCommonBlockAtom from "../states/updateCommonBlockAtom";
import MoveOutOfCommon from "./MoveOutOfCommon";

const CommonBlock = ({ blockAtom }) => {
  const commonBlock = useAtomValue(blockAtom);
  const updateBlockAtom = useMemo(
    () => updateCommonBlockAtom(blockAtom),
    [blockAtom]
  );
  return (
    <Card>
      <Card.Body>
        <MoveOutOfCommon blockName={commonBlock.name} />
        <Card.Subtitle>{commonBlock.name}</Card.Subtitle>
        <BlockInput sm={2} updateBlockAtom={updateBlockAtom} />
      </Card.Body>
    </Card>
  );
};

export default CommonBlock;
