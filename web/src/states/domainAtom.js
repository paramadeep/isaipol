import { atom } from "jotai";
import { splitAtom } from "jotai/utils";

export const domainNamesAtom = atom(["iceCream"]);
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
