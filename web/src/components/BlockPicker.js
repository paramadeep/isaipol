import { Modal } from "react-bootstrap";
import { useAtom } from "jotai";
import BlockPickerItem from "./BlockPickerItem";

const BlockPicker = ({ show, blockAtomsAtom, onHide }) => {
  const [blockAtoms] = useAtom(blockAtomsAtom);
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
        {blockAtoms.map((blockAtom, index) => (
          <BlockPickerItem blockAtom={blockAtom} key={index} />
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default BlockPicker;
