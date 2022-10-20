import BlockInput from "./BlockInput";
import { Card } from "react-bootstrap";
import { useAtomValue } from "jotai";
import RemoveBlock from "./RemoveBlock";
import { useMemo } from "react";
import blockInputAtom from "../states/blockInputAtom";
import getRemoveBlockAtom from "../states/removeBlockAtom";

const Block = ({ blockAtom }) => {
  const block = useAtomValue(blockAtom);
  const removeBlockAtom = useMemo(
    () => getRemoveBlockAtom(blockAtom),
    [blockAtom]
  );
  const updateBlockAtom = useMemo(() => blockInputAtom(blockAtom), [blockAtom]);
  if (!block.show) {
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
