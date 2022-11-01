export function computeLane(lane) {
  const inputs = lane.blocks
    .filter((b) => b.show)
    .reduce((aggregator, block) => {
      aggregator[block.name] = block.value;
      return aggregator;
    }, {});
  const output = lane.blocks
    .filter((b) => b.show)
    .filter((b) => b.compute && typeof b.compute === "function")
    .reduce(
      (output, block) => {
        block.compute(inputs, output);
        return output;
      },
      { ...lane.initialOutput }
    );
  return { inputs, output };
}
