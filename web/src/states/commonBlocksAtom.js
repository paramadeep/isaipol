import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import { updateAllLanesWithCommonValue } from "./updateCommonBlockAtom";

export const commonBlocksAtom = atom();
export const commonBlockAtomsAtom = splitAtom(commonBlocksAtom);
export const commonBlockNamesAtom = atom((get) =>
  get(commonBlocksAtom).map((block) => block.name)
);

export const moveOutCommonBlockAtom = atom(null, (get, set, blockName) => {
  const commonBlocks = [...get(commonBlocksAtom)];
  set(
    commonBlocksAtom,
    commonBlocks.filter((block) => block.name !== blockName)
  );
  const blockToUpdate = commonBlocks.find((block) => block.name === blockName);
  updateAllLanesWithCommonValue(
    get,
    blockToUpdate.name,
    blockToUpdate.value,
    set
  );
});

export const getInitialCommons = (domain) =>
  domain.lanes[0].blocks
    .filter((block) => block.isDefault)
    .map((block) => {
      const { name, type, input, value } = block;
      return { name, type, input, value, show: true };
    });

export const moveIntoCommonsAtom = atom(null, (get, set, block) => {
  const commonBlocks = [...get(commonBlocksAtom)];
  const { name, type, input, value } = block;
  commonBlocks.push({ name, type, input, value, show: true });
  set(commonBlocksAtom, commonBlocks);
  updateAllLanesWithCommonValue(get, block.name, block.value, set);
});
