import BlockInput from "./BlockInput";
import { Card } from "react-bootstrap";
import { useAtomValue } from "jotai";
import RemoveBlock from "./RemoveBlock";
import { useMemo } from "react";
import blockInputAtom from "../states/blockInputAtom";
import getRemoveBlockAtom from "../states/removeBlockAtom";
import MoveIntoCommons from "./MoveIntoCommons";
import { commonBlockNamesAtom } from "../states/commonBlocksAtom";

const Block = ({ blockAtom }) => {
  const block = useAtomValue(blockAtom);
  const commonBlockNames = useAtomValue(commonBlockNamesAtom);
  const removeBlockAtom = useMemo(
    () => getRemoveBlockAtom(blockAtom),
    [blockAtom]
  );
  const updateBlockAtom = useMemo(() => {
    return blockInputAtom(blockAtom);
  }, [block.value, block.show]);
  if (!block.show || commonBlockNames.includes(block.name)) {
    return <></>;
  }
  return (
    <Card>
      <Card.Body>
        <RemoveBlock removeAtom={removeBlockAtom} />
        <MoveIntoCommons block={block} />
        <Card.Subtitle>{block.name}</Card.Subtitle>
        <BlockInput updateBlockAtom={updateBlockAtom} />
      </Card.Body>
    </Card>
  );
};

export default Block;
