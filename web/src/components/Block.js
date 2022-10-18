import BlockInput from "./BlockInput";
import { Card, CloseButton } from "react-bootstrap";

const Block = ({ block, update, remove }) => {
  const getCloseButton = () => {
    if (block.isDefault) {
      return;
    }
    return (
      <CloseButton
        data-testid={`remove-block-${block.name}`}
        onClick={remove}
        className={"float-end align-top"}
        style={{ width: "2px" }}
      />
    );
  };

  return (
    <Card data-testid={`${block.name}Block`}>
      <Card.Body>
        {getCloseButton(block, remove)}
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
};

export default Block;
