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
  groupIndex: null,
}));
initialValue.find((f) => f.name === inlineDomain.reportRow).isRow = true;
initialValue.find((f) => f.name === inlineDomain.reportValue).isValue = true;
inlineDomain.reportGroup.map((group, index) => {
  const field = initialValue.find((b) => b.name === group);
  field.isGroup = true;
  field.groupIndex = index;
});
initialValue
  .filter((f) => inlineDomain.reportGroup.includes(f.name))
  .forEach((f) => (f.isGroup = true));
export const reportStructure = atom(initialValue);
export const reportValueAtom = atom(
  (get) => get(reportStructure).find((f) => f.isValue),
  (get, set, { name }) => {
    const newStructure = [...get(reportStructure)];
    newStructure.filter((f) => f.isValue).forEach((f) => (f.isValue = false));
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isValue = true;
    fieldToUpdate.isRow = false;
    fieldToUpdate.isGroup = false;
    fieldToUpdate.groupIndex = null;
    set(reportStructure, newStructure);
  }
);
export const reportRowAtom = atom(
  (get) => get(reportStructure).find((f) => f.isRow),
  (get, set, { name, index }) => {
    const newStructure = [...get(reportStructure)];
    newStructure.filter((f) => f.isRow).forEach((f) => (f.isRow = false));
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isRow = true;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = false;
    fieldToUpdate.groupIndex = null;
    set(reportStructure, newStructure);
  }
);
export const reportGroupAtom = atom(
  (get) =>
    get(reportStructure)
      .filter((f) => f.isGroup)
      .sort((a, b) => a.groupIndex - b.groupIndex),
  (get, set, { name, index }) => {
    const newStructure = [...get(reportStructure)];
    const oldGroup = [
      ...newStructure
        .filter((f) => f.isGroup)
        .sort((a, b) => a.groupIndex - b.groupIndex)
        .map((f) => f.name),
    ];
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isRow = false;
    fieldToUpdate.isValue = false;
    const isSwap = oldGroup.includes(name);
    if (isSwap) {
      const oldPosition = oldGroup.findIndex((f) => f === name);
      oldGroup.splice(oldPosition, 1);
    }
    oldGroup.splice(index, 0, name);
    oldGroup.forEach((group, index) => {
      const field = newStructure.find((b) => b.name === group);
      field.isGroup = true;
      field.groupIndex = index;
    });
    set(reportStructure, newStructure);
  }
);
export const reportUnusedAtom = atom(
  (get) =>
    get(reportStructure).filter((f) => !(f.isRow || f.isValue || f.isGroup)),
  (get, set, { name }) => {
    const newStructure = [...get(reportStructure)];
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isRow = false;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = false;
    fieldToUpdate.groupIndex = null;
    set(reportStructure, newStructure);
  }
);
