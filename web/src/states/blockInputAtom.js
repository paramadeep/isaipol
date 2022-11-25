import { atom } from "jotai";

const blockInputAtom = (blockAtom) => {
  return atom(
    (get) => {
      const { input, value, type } = get(blockAtom);
      return { input, value, type };
    },
    (get, set, value) => {
      set(blockAtom, { ...get(blockAtom), value });
    }
  );
};
export default blockInputAtom;
