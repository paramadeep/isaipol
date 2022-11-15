import { Accordion } from "react-bootstrap";
import ReportBody from "./ReportBody";

const ReportButton = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Report</Accordion.Header>
        <Accordion.Body>
          <ReportBody />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ReportButton;
