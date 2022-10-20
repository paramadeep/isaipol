import { atom } from "jotai";

const outputAtom = (laneAtom) =>
  atom((get) => {
    const lane = get(laneAtom);
    const inputs = lane.blocks.reduce((aggregator, block) => {
      aggregator[block.name] = block.value;
      return aggregator;
    }, {});
    return lane.blocks
      .filter((b) => b.show)
      .filter((b) => b.compute && typeof b.compute === "function")
      .reduce(
        (output, block) => {
          block.compute(inputs, output);
          return output;
        },
        { ...lane.initialOutput }
      );
  });

export default outputAtom;