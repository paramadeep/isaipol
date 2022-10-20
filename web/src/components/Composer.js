import Blocks from "./Blocks";
import { useMemo } from "react";
import Output from "./Output";
import AddBlock from "./AddBlock";
import { Card } from "react-bootstrap";
import { useAtom, useAtomValue } from "jotai";
import { BlockAtomsAtom } from "../states/blockAtomsAtom";
import { OutputAtom } from "../states/OutputAtom";

const Composer = ({ laneAtom }) => {
  const [lane] = useAtom(laneAtom);
  const blockAtomsAtom = useMemo(() => BlockAtomsAtom(laneAtom), [laneAtom]);
  const output = useAtomValue(useMemo(() => OutputAtom(laneAtom), [laneAtom]));

  return (
    <>
      <Card>
        <Card.Header>{lane.name}</Card.Header>
        <Card.Body>
          <Blocks blockAtomsAtom={blockAtomsAtom} />
          <AddBlock blockAtomsAtom={blockAtomsAtom} />
          <Output values={output} fields={lane.output} />
        </Card.Body>
      </Card>
    </>
  );
};

export default Composer;
