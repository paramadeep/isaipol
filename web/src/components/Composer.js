import Blocks from "./Blocks";
import { useEffect, useState } from "react";
import Output from "./Output";
import AddBlock from "./AddBlock";
import { Card } from "react-bootstrap";

function getInputs(blocks) {
  const inputMap = {};
  blocks.map((b) => (inputMap[b.name] = b.value));
  return inputMap;
}

export function Composer({ domain }) {
  let [blocks, setBlocks] = useState(domain.blocks);
  let [output, setOutput] = useState({ ...domain.initialOutput });
  useEffect(() => {
    const localOutput = { ...domain.initialOutput };
    const input = getInputs(blocks);
    blocks
      .filter((b) => b.show)
      .filter((b) => b.compute != null)
      .forEach((b) => b.compute(input, localOutput));
    setOutput(localOutput);
  }, [blocks, domain.initialOutput]);
  const addNewBlock = (newBlock) => {
    const newBlocks = [...blocks];
    newBlocks.find((b) => b.name === newBlock.name).show = true;
    setBlocks(newBlocks);
  };
  const removeBlock = (blockToRemove) => {
    const newBlocks = [...blocks];
    newBlocks.find((b) => b.name === blockToRemove.name).show = false;
    setBlocks(newBlocks);
  };
  return (
    <>
      <Card>
        <Card.Header>{domain.name}</Card.Header>
        <Card.Body>
          <Blocks
            blocks={blocks.filter((block) => block.show)}
            setBlocks={setBlocks}
            removeBlock={removeBlock}
          />
          <AddBlock
            blocks={blocks.filter((block) => !(block.show || block.default))}
            addNewBlock={addNewBlock}
          />
          <Output values={output} fields={domain.output} />
        </Card.Body>
      </Card>
    </>
  );
}
