import Block from "./Block";

const Blocks = ({ blocks, setBlocks }) => {
  const updateBlock = (blockName, value) => {
    const newBlocks = [...blocks];
    newBlocks.find((b) => b.name == blockName).value = value;
    setBlocks(newBlocks);
  };
  return (
    <>
      {blocks.map((block, index) => (
        <Block
          block={block}
          key={index}
          update={(value) => {
            updateBlock(block.name, value);
          }}
        />
      ))}{" "}
    </>
  );
};

export default Blocks;
