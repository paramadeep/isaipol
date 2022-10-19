import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Composer from "./components/Composer";
import { Col, Container, Row } from "react-bootstrap";
import { useAtom } from "jotai";
import domainAtom from "./states/domainAtom";

const App = () => {
  const [domain, _] = useAtom(domainAtom);
  return (
    <Container>
      <Row className={"justify-content-center"}>
        {domain.lanes.map((lane, index) => (
          <Col key={index} className={"col-lg-4"}>
            <Composer lane={lane} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
