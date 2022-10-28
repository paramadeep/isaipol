import { atom } from "jotai";
import inlineDomain from "../services/domain/inlineDomain";
import { splitAtom } from "jotai/utils";

export const domainAtom = atom({ ...inlineDomain });
export const lanesAtom = atom(
  (get) => get(domainAtom).lanes,
  (get, set, newLanes) => {
    const domain = get(domainAtom);
    const newDomain = { ...domain, lanes: newLanes };
    set(domainAtom, newDomain);
  }
);
export const laneAtomsAtom = splitAtom(lanesAtom);
