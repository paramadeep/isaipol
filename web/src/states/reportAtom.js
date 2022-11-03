import { atom } from "jotai";

export const getInitialReportStruct = (domain) => {
  const initialValue = [
    ...domain.blocks.map((b) => b.name),
    ...domain.output,
  ].map((field) => ({
    name: field,
    isGroup: false,
    isValue: false,
    isRow: false,
    groupIndex: null,
  }));
  initialValue.find((f) => f.name === domain.reportRow).isRow = true;
  initialValue.find((f) => f.name === domain.reportValue).isValue = true;
  domain.reportGroup.forEach((group, index) => {
    const field = initialValue.find((b) => b.name === group);
    field.isGroup = true;
    field.groupIndex = index;
  });
  initialValue
    .filter((f) => domain.reportGroup.includes(f.name))
    .forEach((f) => (f.isGroup = true));
  return initialValue;
};

export const reportStructureAtom = atom();
export const reportValueAtom = atom(
  (get) => get(reportStructureAtom).find((f) => f.isValue).name,
  (get, set, { name }) => {
    const newStructure = [...get(reportStructureAtom)];
    newStructure.filter((f) => f.isValue).forEach((f) => (f.isValue = false));
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isValue = true;
    fieldToUpdate.isRow = false;
    fieldToUpdate.isGroup = false;
    fieldToUpdate.groupIndex = null;
    set(reportStructureAtom, newStructure);
  }
);
export const reportRowAtom = atom(
  (get) => get(reportStructureAtom).find((f) => f.isRow).name,
  (get, set, { name, index }) => {
    const newStructure = [...get(reportStructureAtom)];
    newStructure.filter((f) => f.isRow).forEach((f) => (f.isRow = false));
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isRow = true;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = false;
    fieldToUpdate.groupIndex = null;
    set(reportStructureAtom, newStructure);
  }
);
export const reportGroupAtom = atom(
  (get) =>
    get(reportStructureAtom)
      .filter((f) => f.isGroup)
      .sort((a, b) => a.groupIndex - b.groupIndex)
      .map((f) => f.name),
  (get, set, { name, index }) => {
    const newStructure = [...get(reportStructureAtom)];
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
    set(reportStructureAtom, newStructure);
  }
);
export const reportUnusedAtom = atom(
  (get) =>
    get(reportStructureAtom)
      .filter((f) => !(f.isRow || f.isValue || f.isGroup))
      .map((f) => f.name),
  (get, set, { name }) => {
    const newStructure = [...get(reportStructureAtom)];
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isRow = false;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = false;
    fieldToUpdate.groupIndex = null;
    set(reportStructureAtom, newStructure);
  }
);
