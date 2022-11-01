import { atom } from "jotai";
import { computeLane } from "./computeLane";

const outputAtom = (laneAtom) =>
  atom((get) => {
    const lane = get(laneAtom);
    return computeLane(lane).output;
  });

export default outputAtom;
