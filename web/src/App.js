import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Composer } from "./components/Composer";
import { useState } from "react";
import loadedDomain from "./services/domain/inlineDomain";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  let [domain] = useState(loadedDomain);
  return (
    <Container>
      <Row className={"justify-content-center"}>
        <Col className={"col-lg-4"}>
          <Composer domain={domain} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
