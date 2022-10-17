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
  useEffect(() => {
    const localOutput = { ...domain.initialOutput };
    const input = getInputs(blocks);
    blocks
      .filter((b) => b.compute != null)
      .forEach((b) => b.compute(input, localOutput));
    setOutput(localOutput);
  }, [blocks, domain.initialOutput]);
  return (
    <>
      <Card>
        <Card.Header>{domain.name}</Card.Header>
        <Card.Body>
          <Blocks blocks={blocks} setBlocks={setBlocks} />
          <AddBlock blocks={domain.dynamicBlocks} setBlocks={setBlocks} />
          <Output values={output} fields={domain.output} />
        </Card.Body>
      </Card>
    </>
  );
}
