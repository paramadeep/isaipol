import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import { updateAllLanesWithCommonValue } from "./updateCommonBlockAtom";
import { domainAtom } from "./domainAtom";

export const commonBlocksAtom = atom();
export const commonBlockAtomsAtom = splitAtom(commonBlocksAtom);
export const commonBlockNamesAtom = atom((get) =>
  get(commonBlocksAtom).map((block) => block.name)
);

function updateDomainDefaults(get, set) {
  const domain = { ...get(domainAtom) };
  domain.commons = get(commonBlockNamesAtom);
  set(domainAtom, domain);
}

export const moveOutCommonBlockAtom = atom(null, (get, set, blockName) => {
  const commonBlocks = [...get(commonBlocksAtom)];
  set(
    commonBlocksAtom,
    commonBlocks.filter((block) => block.name !== blockName)
  );
  updateDomainDefaults(get, set);
  const blockToUpdate = commonBlocks.find((block) => block.name === blockName);
  updateAllLanesWithCommonValue(
    get,
    blockToUpdate.name,
    blockToUpdate.value,
    set
  );
});

export const getInitialCommons = (domain) => {
  if (!domain.commons){
    domain.commons = []
    return []
  }
  return domain.lanes[0].blocks
    .filter((block) => domain.commons.includes(block.name))
    .map((block) => {
      const { name, type, input, value } = block;
      return { name, type, input, value, show: true };
    });
};

export const moveIntoCommonsAtom = atom(null, (get, set, block) => {
  const commonBlocks = [...get(commonBlocksAtom)];
  const { name, type, input, value } = block;
  commonBlocks.push({ name, type, input, value, show: true });
  set(commonBlocksAtom, commonBlocks);
  updateAllLanesWithCommonValue(get, block.name, block.value, set);
  updateDomainDefaults(get, set)
});
