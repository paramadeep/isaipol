import { BlockInput } from "./BlockInput";

export function Block({ block }) {
  return (
    <div data-testid={`${block.name}Block`}>
      {block.name}
      <BlockInput input={block.input} />
    </div>
  );
}
