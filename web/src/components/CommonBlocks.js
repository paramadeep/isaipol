import { Accordion } from "react-bootstrap";
import { commonBlockAtomsAtom } from "../states/domainAtom";
import { useAtom } from "jotai";
import CommonBlock from "./CommonBlock";

const CommonBlocks = () => {
  const [commonBlockAtoms] = useAtom(commonBlockAtomsAtom);
  return (
    <Accordion>
      <Accordion.Item eventKey="one">
        <Accordion.Header>Common Values</Accordion.Header>
        <Accordion.Body>
          {commonBlockAtoms.map((blockAtom, index) => (
            <CommonBlock key={index} blockAtom={blockAtom} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CommonBlocks;
