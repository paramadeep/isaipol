import Blocks from "./Blocks";
import { useEffect, useState } from "react";
import Output from "./Output";

function getInputs(blocks) {
  const inputMap = {};
  blocks.map((b) => (inputMap[b.name] = b.value));
  return inputMap;
}

export function Composer({ domain }) {
  let [blocks] = useState(domain.defaultBlocks);
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
      <Blocks blocks={blocks} />
      <Output values={output} fields={domain.output} />
    </>
  );
}
