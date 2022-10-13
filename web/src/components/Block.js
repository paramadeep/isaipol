import BlockInput from "./BlockInput";
import { Card } from "react-bootstrap";

const Block = ({ block }) => (
  <Card data-testid={`${block.name}Block`}>
    <Card.Header>{block.name}</Card.Header>
    <Card.Body>
      <BlockInput input={block.input} />
    </Card.Body>
  </Card>
);

export default Block;
