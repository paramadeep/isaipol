import { atom } from "jotai";
import { domainAtom } from "./domainAtom";
import { reportGroupAtom, reportRowAtom, reportValueAtom } from "./reportAtom";
import { computeLane } from "../states/computeLane";
import { computeGraph } from "./computeGraph";


export const reportGraphAtom = atom((get)=>{
  const domain = get(domainAtom);
  const reportGroup = get(reportGroupAtom);
  const reportRow = get(reportRowAtom);
  const reportValue = get(reportValueAtom);
  const lanes = domain.lanes.map((lane) => {
      const { inputs, output } = computeLane(lane);
      return { ...inputs, ...output };
    });
  const titles = [...reportGroup,reportRow]
  const graph = computeGraph(lanes, titles);
  return {titles,graph,reportValue}
})


