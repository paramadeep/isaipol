import GoogleDriveLoader from "./GoogleDriveLoader";
import { FileLoader } from "./FileLoader";
import { Col, Container, Row } from "react-bootstrap";
import { useAtomValue } from "jotai/utils";
import { selectedDomainAtom } from "../states/domainAtom";

const DomainLoader = () => {
  const selectedDomain = useAtomValue(selectedDomainAtom);
  if (selectedDomain){
    return <></>;
  }
 return (
   <Container  className="text-center fluid">
     <Row>
       <Col></Col>
       <Col>
         <div className={"m-2 fs-1 fw-bold"}>Pick Your Domain File</div>
       </Col>
       <Col></Col>
     </Row>
     <Row>
       <Col></Col>
       <Col>
         <FileLoader/>
       </Col>
       <Col></Col>
     </Row>
     <Row>
       <Col></Col>
       <Col>
         <GoogleDriveLoader/>
       </Col>
       <Col></Col>
     </Row>
   </Container>
 )

};

export default DomainLoader;
