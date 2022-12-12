import Lane from "./Lane";
import { Col, Container, Row } from "react-bootstrap";
import { useAtom, useAtomValue } from "jotai";
import { domainAtom, laneAtomsAtom } from "../states/domainAtom";
import Report from "./Report";
import CommonBlocks from "./CommonBlocks";
import SaveButton from "./SaveButton";

const Domain = () => {
  const [laneAtoms, dispatch] = useAtom(laneAtomsAtom);
  const domain = useAtomValue(domainAtom);

  return (
    <Container>
      <div title={`lanes-${domain.lanes.map((l) => l.name).join("-")}`} />
      <SaveButton/>
      <Report />
      <CommonBlocks />
      <Row style={{ flexWrap: "nowrap", overflowX: "auto" }}>
        {laneAtoms.map((laneAtom, index) => (
          <Col key={index} className={"col-sm-3"}>
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

export default Domain;
