import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import domains from "../services/domain/inlineDomain";

export const domainsAtom = atom(domains);
export const domainNamesAtom = atom((get) =>
  get(domainsAtom).map((d) => d.name)
);
export const selectedDomainAtom = atom();
export const domainAtom =
  atom();
  //   (get) => get(domainsAtom).find((d) => d.name === get(selectedDomainAtom)),
  //   (get, set, val) => {
  //     const newDomains = [...get(domainsAtom)];
  //     let index = newDomains.findIndex(({ name }) => name === val.name);
  //     newDomains.splice(index, 1, val);
  //     return set(domainsAtom, newDomains);
  //   }
export const lanesAtom = atom(
  (get) => get(domainAtom).lanes,
  (get, set, newLanes) => {
    const domain = get(domainAtom);
    const newDomain = { ...domain, lanes: newLanes };
    set(domainAtom, newDomain);
  }
);
export const laneAtomsAtom = splitAtom(lanesAtom);
