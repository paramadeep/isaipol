import BlockInput from "./BlockInput";
import { Card } from "react-bootstrap";
import { useAtomValue } from "jotai";
import RemoveBlock from "./RemoveBlock";
import { useMemo } from "react";
import blockInputAtom from "../states/blockInputAtom";
import getRemoveBlockAtom from "../states/removeBlockAtom";
import { commonBlockNamesAtom } from "../states/domainAtom";

const Block = ({ blockAtom }) => {
  const block = useAtomValue(blockAtom);
  const commonBlockNames = useAtomValue(commonBlockNamesAtom);
  const removeBlockAtom = useMemo(
    () => getRemoveBlockAtom(blockAtom),
    [blockAtom]
  );
  const updateBlockAtom = useMemo(() => {
    return blockInputAtom(blockAtom);
  }, [block.value]);
  if (!block.show || commonBlockNames.includes(block.name)) {
    return <></>;
  }
  return (
    <Card>
      <Card.Body>
        <RemoveBlock removeAtom={removeBlockAtom} />
        <Card.Subtitle>{block.name}</Card.Subtitle>
        <BlockInput updateBlockAtom={updateBlockAtom} />
      </Card.Body>
    </Card>
  );
};

export default Block;
