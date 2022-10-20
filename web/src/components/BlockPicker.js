import { Button, Modal } from "react-bootstrap";

const BlockPicker = ({ show, blockAtomsAtom, onHide }) => {
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
        {/*{blockAtomsAtom.map((blockAtom, index) => {*/}
        {/*  const [block,updateBlock] = useAtom(blockAtom);*/}
        {/*  return (*/}
        {/*    < Button;*/}
        {/*} key={index} onClick={() => onBlockSelection(block)}>*/}
        {/*    {block.name}*/}
        {/*  </Button>*/}
        {/*))}*/}
      </Modal.Body>
    </Modal>
  );
};

export default BlockPicker;
