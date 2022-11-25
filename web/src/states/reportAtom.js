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
    isSpec: false,
    groupIndex: null,
    specIndex: null,
  }));
  initialValue.find((f) => f.name === domain.reportRow).isRow = true;
  initialValue.find((f) => f.name === domain.reportValue).isValue = true;
  domain.reportGroup.forEach((group, index) => {
    const field = initialValue.find((b) => b.name === group);
    field.isGroup = true;
    field.groupIndex = index;
  });
  domain.reportSpecs.forEach((group, index) => {
    const field = initialValue.find((b) => b.name === group);
    field.isSpec = true;
    field.specIndex = index;
  });
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
    fieldToUpdate.specIndex = null;
    fieldToUpdate.isSpec = false;
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
    fieldToUpdate.specIndex = null;
    fieldToUpdate.isSpec = false;
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
    fieldToUpdate.specIndex = null;
    fieldToUpdate.isSpec = false;
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
      .filter((f) => !(f.isRow || f.isValue || f.isGroup || f.isSpec))
      .map((f) => f.name),
  (get, set, { name }) => {
    const newStructure = [...get(reportStructureAtom)];
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isRow = false;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = false;
    fieldToUpdate.groupIndex = null;
    fieldToUpdate.specIndex = null;
    fieldToUpdate.isSpec = false;
    console.log(fieldToUpdate);
    set(reportStructureAtom, newStructure);
  }
);
export const reportSpecsAtom = atom(
  (get) =>
    get(reportStructureAtom)
      .filter((f) => f.isSpec)
      .sort((a, b) => a.groupIndex - b.groupIndex)
      .map((f) => f.name),
  (get, set, { name, index }) => {
    const newStructure = [...get(reportStructureAtom)];
    const oldSpecs = [
      ...newStructure
        .filter((f) => f.isSpec)
        .sort((a, b) => a.groupIndex - b.groupIndex)
        .map((f) => f.name),
    ];
    const fieldToUpdate = newStructure.find((f) => f.name === name);
    fieldToUpdate.isRow = false;
    fieldToUpdate.isValue = false;
    fieldToUpdate.isGroup = false;
    fieldToUpdate.groupIndex = null;
    const isSwap = oldSpecs.includes(name);
    if (isSwap) {
      const oldPosition = oldSpecs.findIndex((f) => f === name);
      oldSpecs.splice(oldPosition, 1);
    }
    oldSpecs.splice(index, 0, name);
    oldSpecs.forEach((group, index) => {
      const field = newStructure.find((b) => b.name === group);
      field.isSpec = true;
      field.specIndex = index;
    });
    set(reportStructureAtom, newStructure);
  }
);
