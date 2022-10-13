import Block from "./Block";

const Blocks = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => (
        <Block block={block} key={index} />
      ))}{" "}
    </>
  );
};

export default Blocks;
