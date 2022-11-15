import { Form, Modal } from "react-bootstrap";
import { useAtom } from "jotai";
import BlockPickerItem from "./BlockPickerItem";
import { useState } from "react";

const BlockPicker = ({ show, blockAtomsAtom, onHide }) => {
  const [blockAtoms] = useAtom(blockAtomsAtom);
  const [search, setSearch] = useState("");

  return (
    <Modal show={show} onHide={onHide} size="md">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pick to add
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="search block to add"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        {blockAtoms.map((blockAtom, index) => (
          <BlockPickerItem blockAtom={blockAtom} search={search} key={index} />
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default BlockPicker;
