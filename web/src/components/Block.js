import BlockInput from "./BlockInput";
import { Card } from "react-bootstrap";
import { useAtom } from "jotai";
import { RemoveBlock } from "./RemoveBlock";

const Block = ({ blockAtom }) => {
  const [block, setBlock] = useAtom(blockAtom);
  const removeBlock = () => setBlock({ ...block, show: false });
  const updateBlockValue = (value) => setBlock({ ...block, value });
  if (!block.show) {
    return <></>;
  }
  return (
    <Card data-testid={`${block.name}Block`}>
      <Card.Body>
        <RemoveBlock isDefault={block.isDefault} removeBlock={removeBlock} />
        <Card.Subtitle>{block.name}</Card.Subtitle>
        <BlockInput
          input={block.input}
          update={updateBlockValue}
          value={block.value}
          type={block.type}
        />
      </Card.Body>
    </Card>
  );
};

export default Block;
