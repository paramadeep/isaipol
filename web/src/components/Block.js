import BlockInput from "./BlockInput";
import { Card } from "react-bootstrap";

const Block = ({ block, update }) => (
  <Card data-testid={`${block.name}Block`}>
    <Card.Header>{block.name}</Card.Header>
    <Card.Body>
      <BlockInput
        input={block.input}
        update={update}
        value={block.value}
        type={block.type}
      />
    </Card.Body>
  </Card>
);

export default Block;
