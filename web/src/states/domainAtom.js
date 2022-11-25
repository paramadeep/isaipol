import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import domains from "../services/domain/inlineDomain";

export const domainsAtom = atom(domains);
export const domainNamesAtom = atom((get) =>
  get(domainsAtom).map((d) => d.name)
);
export const selectedDomainAtom = atom();
export const domainAtom = atom();

export const lanesAtom = atom(
  (get) => get(domainAtom).lanes,
  (get, set, lanes) => {
    const domain = get(domainAtom);
    const newDomain = { ...domain, lanes };
    set(domainAtom, newDomain);
  }
);
export const customBottomFieldsAtom = atom(
  (get) => get(domainAtom).customBottomFields,
  (get, set, customBottomFields) => {
    const domain = { ...get(domainAtom) };
    set(domainAtom, { ...domain, customBottomFields });
  }
);
export const customTopFieldsAtom = atom(
  (get) => get(domainAtom).customTopFields,
  (get, set, customTopFields) => {
    const domain = { ...get(domainAtom) };
    set(domainAtom, { ...domain, customTopFields });
  }
);
export const customBottomFieldAtomsAtom = splitAtom(customBottomFieldsAtom);
export const customTopFieldAtomsAtom = splitAtom(customTopFieldsAtom);
export const laneAtomsAtom = splitAtom(lanesAtom);

const commonBlocksAtom = atom(
  (get) => {
    return get(domainAtom)
      .lanes[0].blocks.filter((block) => block.isDefault)
      .map((block) => {
        const { name, type, input, value } = block;
        return { name, type, input, value, show: true };
      });
  },
  (get, set, value) => {}
);
export const commonBlockAtomsAtom = splitAtom(commonBlocksAtom);
export const commonBlockNamesAtom = atom((get) =>
  get(commonBlocksAtom).map((block) => block.name)
);
