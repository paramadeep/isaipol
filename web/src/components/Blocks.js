import { BlockInput } from "./BlockInput";

const Blocks = ({ blocks }) => {
  let blocksList = blocks.map((block, index) => (
    <div data-testid={`${block.name}Block`} key={index}>
      {block.name}
      <BlockInput input={block.input} />
    </div>
  ));
  return <>{blocksList}</>;
};

export default Blocks;
