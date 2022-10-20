import Blocks from "./Blocks";
import { useMemo } from "react";
import Output from "./Output";
import AddBlock from "./AddBlock";
import { Card } from "react-bootstrap";
import { atom, useAtom } from "jotai";
import { splitAtom } from "jotai/utils";

const Composer = ({ laneAtom }) => {
  const [lane] = useAtom(laneAtom);
  const blockAtomsAtom = useMemo(() => {
    const blocksAtoms = atom(
      (get) => get(laneAtom).blocks,
      (get, set, newBlocks) => {
        const lane = get(laneAtom);
        const newLane = { ...lane, blocks: newBlocks };
        set(laneAtom, newLane);
      }
    );
    return splitAtom(blocksAtoms);
  }, [laneAtom]);
  const [output] = useAtom(
    useMemo(
      () =>
        atom((get) => {
          const lane = get(laneAtom);
          const inputs = lane.blocks.reduce((aggregator, block) => {
            aggregator[block.name] = block.value;
            return aggregator;
          }, {});
          return lane.blocks
            .filter((b) => b.show)
            .filter((b) => b.compute)
            .reduce(
              (output, block) => {
                block.compute(inputs, output);
                return output;
              },
              { ...lane.initialOutput }
            );
        }),
      [laneAtom]
    )
  );

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
