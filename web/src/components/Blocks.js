import Block from "./Block";
import { useAtom } from "jotai";

const Blocks = ({ blockAtomsAtom }) => {
  const [blockAtoms] = useAtom(blockAtomsAtom);
  return (
    <>
      {blockAtoms.map((blockAtom, index) => (
        <Block blockAtom={blockAtom} key={index} />
      ))}{" "}
    </>
  );
};

export default Blocks;
