import { atom } from "jotai";
import inlineDomain from "../services/domain/inlineDomain";

const initialValue = [
  ...inlineDomain.blocks.map((b) => b.name),
  ...inlineDomain.output,
].map((field) => ({
  name: field,
  isGroup: false,
  isValue: false,
  isRow: false,
}));
initialValue.find((f) => f.name === inlineDomain.reportRow).isRow = true;
initialValue.find((f) => f.name === inlineDomain.reportValue).isValue = true;
initialValue
  .filter((f) => inlineDomain.reportGroup.includes(f.name))
  .forEach((f) => (f.isGroup = true));
export const reportStructure = atom(initialValue);
export const reportValueAtom = atom(
  (get) => get(reportStructure).find((f) => f.isValue),
  (get, set, field) => {
    const newStructure = [...get(reportStructure)];
    newStructure.filter((f) => f.isValue).forEach((f) => (f.isValue = false));
    const fieldToUpdate = newStructure.find((f) => f.name === field);
    fieldToUpdate.isValue = true;
    fieldToUpdate.isRow = false;
    fieldToUpdate.isGroup = false;
    set(reportStructure, newStructure);
  }
);
export const reportRowAtom = atom(
  (get) => get(reportStructure).find((f) => f.isRow),
  (get, set, field) => {
    const newStructure = [...get(reportStructure)];
    newStructure.filter((f) => f.isRow).forEach((f) => (f.isRow = false));
    const fieldToUpdate = newStructure.find((f) => f.name === field);
    fieldToUpdate.isRow = true;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = false;
    set(reportStructure, newStructure);
  }
);
export const reportGroupAtom = atom(
  (get) => get(reportStructure).filter((f) => f.isGroup),
  (get, set, field) => {
    const newStructure = [...get(reportStructure)];
    const fieldToUpdate = newStructure.find((f) => f.name === field);
    fieldToUpdate.isRow = false;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = true;
    set(reportStructure, newStructure);
  }
);
export const reportUnusedAtom = atom(
  (get) =>
    get(reportStructure).filter((f) => !(f.isRow || f.isValue || f.isGroup)),
  (get, set, field) => {
    const newStructure = [...get(reportStructure)];
    const fieldToUpdate = newStructure.find((f) => f.name === field);
    fieldToUpdate.isRow = false;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = false;
    set(reportStructure, newStructure);
  }
);
