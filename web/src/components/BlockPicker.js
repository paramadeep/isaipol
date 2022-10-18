import { Button, Modal } from "react-bootstrap";

const BlockPicker = ({ show, onBlockSelection, blocks, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pick to add
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {blocks.map((block, index) => (
          <Button key={index} onClick={() => onBlockSelection(block)}>
            {block.name}
          </Button>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default BlockPicker;
