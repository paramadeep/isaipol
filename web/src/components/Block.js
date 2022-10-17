import BlockInput from "./BlockInput";
import { Card, CloseButton } from "react-bootstrap";

const Block = ({ block, update }) => (
  <Card data-testid={`${block.name}Block`}>
    <Card.Body>
      <CloseButton className={"float-end align-top"} style={{ width: "2px" }} />
      <Card.Subtitle>{block.name}</Card.Subtitle>
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
