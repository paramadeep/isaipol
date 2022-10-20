import { atom } from "jotai";

export const pickerBlockAtom = (blockAtom) =>
  atom(
    (get) => {
      const { show, name } = get(blockAtom);
      return { show, name };
    },
    (get, set) => {
      const block = get(blockAtom);
      set(blockAtom, { ...block, show: true });
    }
  );
