import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Lane from "./components/Lane";
import { Col, Container, Row } from "react-bootstrap";
import { useAtom } from "jotai";
import { laneAtomsAtom } from "./states/domainAtom";

const App = () => {
  const [lanesAtom] = useAtom(laneAtomsAtom);

  return (
    <Container>
      <Row className={"justify-content-center"}>
        {lanesAtom.map((laneAtom, index) => (
          <Col key={index} className={"col-lg-4"}>
            <Lane laneAtom={laneAtom} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
