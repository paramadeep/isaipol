import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Lane from "./components/Lane";
import { Col, Container, Row } from "react-bootstrap";
import { useAtom } from "jotai";
import { laneAtomsAtom } from "./states/domainAtom";

const App = () => {
  const [laneAtoms, dispatch] = useAtom(laneAtomsAtom);

  return (
    <Container>
      <Row className={"justify-content-center"}>
        {laneAtoms.map((laneAtom, index) => (
          <Col key={index} className={"col-lg-4"}>
            <Lane
              index={index}
              laneAtom={laneAtom}
              remove={() => dispatch({ type: "remove", atom: laneAtom })}
              duplicate={(lane) => dispatch({ type: "insert", value: lane })}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
