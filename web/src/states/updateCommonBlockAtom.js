import { atom } from "jotai";
import { domainAtom } from "./domainAtom";

const updateCommonBlockAtom = (commonBlockAtom) =>
  atom(
    (get) => {
      const { input, value, type } = get(commonBlockAtom);
      return { input, value, type };
    },
    (get, set, value) => {
      const commonBlock = get(commonBlockAtom);
      set(commonBlockAtom, { ...commonBlock, value });
      const domain = { ...get(domainAtom) };
      const updatedLanes = domain.lanes.map((lane) => {
        const updatedLane = { ...lane };
        const blockToUpdate = updatedLane.blocks.find(
          (block) => block.name === commonBlock.name
        );
        blockToUpdate.isShown = true;
        blockToUpdate.value = value;
        return updatedLane;
      });
      set(domainAtom, { ...domain, lanes: updatedLanes });
    }
  );

export default updateCommonBlockAtom;
