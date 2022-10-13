import Blocks from "./Blocks";
import { useEffect, useState } from "react";
import Output from "./Output";
import { useAtom } from "jotai";
import outputAtom from "../states/outputAtom";

export function Composer({ domain }) {
  let [blocks, setBlocks] = useState([]);
  let [computes, setComputes] = useState([]);
  let [output, setOutput] = useAtom(outputAtom);
  useEffect(() => {
    const defaultBlocks = domain.blocks.filter((block) =>
      domain.defaults.includes(block.name)
    );
    setBlocks(defaultBlocks);
  }, []);
  useEffect(() => {
    const computeBlocks = blocks
      .filter((b) => b.compute != null)
      .map((b) => b.compute);
    setComputes(computeBlocks);
  }, [blocks]);
  useEffect(() => {
    let localOut = { ...output };
    computes.forEach((comp) => comp(localOut));
    setOutput(localOut);
  }, [computes]);
  return (
    <>
      <Blocks blocks={blocks} />
      <Output display={output[domain.display]} />
    </>
  );
}
