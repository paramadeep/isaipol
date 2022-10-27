import Blocks from "./Blocks";
import { useMemo } from "react";
import Output from "./Output";
import AddBlock from "./AddBlock";
import { Card } from "react-bootstrap";
import { useAtom, useAtomValue } from "jotai";
import getBlockAtomsAtom from "../states/blockAtomsAtom";
import outputAtom from "../states/outputAtom";
import LaneActions from "./LaneActions";

const Lane = ({ laneAtom, remove, duplicate }) => {
  const [lane] = useAtom(laneAtom);
  const duplicateLane = () => duplicate(lane);
  const blockAtomsAtom = useMemo(() => getBlockAtomsAtom(laneAtom), [laneAtom]);
  const output = useAtomValue(useMemo(() => outputAtom(laneAtom), [laneAtom]));

  return (
    <>
      <Card>
        <Card.Header>
          <LaneActions remove={remove} duplicateLane={duplicateLane} />
        </Card.Header>
        <Card.Body>
          <Blocks blockAtomsAtom={blockAtomsAtom} />
          <AddBlock blockAtomsAtom={blockAtomsAtom} />
          <Output values={output} fields={lane.output} />
        </Card.Body>
      </Card>
    </>
  );
};

export default Lane;
