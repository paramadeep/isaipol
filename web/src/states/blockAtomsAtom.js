import { atom } from "jotai";
import { splitAtom } from "jotai/utils";

const blockAtomsAtom = (laneAtom) => {
  const blocksAtoms = atom(
    (get) => get(laneAtom).blocks,
    (get, set, newBlocks) => {
      const lane = get(laneAtom);
      const newLane = { ...lane, blocks: newBlocks };
      set(laneAtom, newLane);
    }
  );
  return splitAtom(blocksAtoms);
};

export default blockAtomsAtom;
