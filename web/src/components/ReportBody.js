import { useAtomValue } from "jotai";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import ReportEditor from "./ReportEditor";
import { useRef, useState } from "react";
import Specs from "./Specs";
import { FaEdit } from "react-icons/fa";
import CustomTopFields from "./CustomTopFields";
import CustomBottomFields from "./CustomBottomFields";
import ScreenShot from "./ScreenShot";
import { reportGraphAtom } from "../states/reportGraphAtom";
import { ReportTable } from "./ReportTable";

const ReportBody = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {reportGroup,graph,reportRow,reportValue} = useAtomValue(reportGraphAtom);
  console.log(reportGroup,graph,reportRow,reportValue);
  let componentRef = useRef();
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button className={"m-1"} onClick={handleShow}>
              <FaEdit />
            </Button>
            <ReportEditor show={show} onHide={handleClose}></ReportEditor>
            <ScreenShot element={componentRef.current} />
          </Col>
        </Row>
      </Container>
      <Container id="report" sm={1} ref={componentRef}>
        <Row>
          <Col sm={4} className={"mx-auto mb-1"}>
            <Image fluid src={"./report_logo.png"} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomTopFields />
            <Specs />
            <ReportTable titles={reportGroup} graph={graph} rowName={reportRow} valueName={reportValue}/>
            <CustomBottomFields />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReportBody;
