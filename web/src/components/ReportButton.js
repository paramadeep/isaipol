import { Button } from "react-bootstrap";
import { useState } from "react";
import Report from "./Report";

const ReportButton = () => {
  const [reportShow, setReportShow] = useState(false);
  return (
    <>
      <Button onClick={() => setReportShow(true)}>Report</Button>
      <Report show={reportShow} onHide={() => setReportShow(false)}></Report>
    </>
  );
};

export default ReportButton;
