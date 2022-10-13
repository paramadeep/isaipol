import Blocks from "./Blocks";

export function Composer({ domain }) {
  const defaultBlocks = domain.blocks.filter((block) =>
    domain.defaults.includes(block.name)
  );
  return (
    <>
      <Blocks blocks={defaultBlocks} />
    </>
  );
}
