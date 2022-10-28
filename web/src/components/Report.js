import { Button, Modal } from "react-bootstrap";

const Report = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sample Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Show cost</h4>
        <p>Table of data</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Report;
