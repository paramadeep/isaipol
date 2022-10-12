import { Block } from "./Block";

export const Blocks = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => (
        <Block block={block} key={index} />
      ))}{" "}
    </>
  );
};
