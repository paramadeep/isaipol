import { atom } from "jotai";
import { domainAtom } from "./domainAtom";

export const updateAllLanesWithCommonValue = (get, blockName, value, set) => {
  const domain = { ...get(domainAtom) };
  const updatedLanes = domain.lanes.map((lane) => {
    const updatedLane = { ...lane };
    const blockToUpdate = updatedLane.blocks.find((block) => {
      return block.name === blockName;
    });
    blockToUpdate.show = true;
    blockToUpdate.value = value;
    return updatedLane;
  });
  set(domainAtom, { ...domain, lanes: updatedLanes });
};

const updateCommonBlockAtom = (commonBlockAtom) =>
  atom(
    (get) => {
      const { input, value, type } = get(commonBlockAtom);
      return { input, value, type };
    },
    (get, set, value) => {
      const commonBlock = get(commonBlockAtom);
      set(commonBlockAtom, { ...commonBlock, value });
      updateAllLanesWithCommonValue(get, commonBlock.name, value, set);
    }
  );

export default updateCommonBlockAtom;
