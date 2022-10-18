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
  let [blocks, setBlocks] = useState(domain.defaultBlocks);
  let [output, setOutput] = useState({ ...domain.initialOutput });
  let [addableBlocks, setAddableBlocks] = useState(domain.dynamicBlocks);
  useEffect(() => {
    const localOutput = { ...domain.initialOutput };
    const input = getInputs(blocks);
    blocks
      .filter((b) => b.compute != null)
      .forEach((b) => b.compute(input, localOutput));
    setOutput(localOutput);
  }, [blocks, domain.initialOutput]);
  const addNewBlock = (newBlock) => {
    const newBlocks = [...blocks, newBlock];
    const newAddableBlocks = [...addableBlocks].filter(
      (b) => b.name !== newBlock.name
    );
    setBlocks(newBlocks);
    setAddableBlocks(newAddableBlocks);
  };
  return (
    <>
      <Card>
        <Card.Header>{domain.name}</Card.Header>
        <Card.Body>
          <Blocks blocks={blocks} setBlocks={setBlocks} />
          <AddBlock blocks={addableBlocks} addNewBlock={addNewBlock} />
          <Output values={output} fields={domain.output} />
        </Card.Body>
      </Card>
    </>
  );
}
