import { Button, Modal } from "react-bootstrap";
import ReportEditorBody from "./ReportEditorBody";

const ReportEditor = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Report </Modal.Title>
        <div>(Drag To Edit)</div>
      </Modal.Header>
      <Modal.Body>
        <ReportEditorBody></ReportEditorBody>
      </Modal.Body>
    </Modal>
  );
};

export default ReportEditor;
