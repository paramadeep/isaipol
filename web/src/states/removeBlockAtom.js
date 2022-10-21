import { atom } from "jotai";

const removeBlockAtom = (blockAtom) =>
  atom(
    (get) => ({ isRemovable: !get(blockAtom).isDefault }),
    (get, set) => {
      const oldBlock = get(blockAtom);
      set(blockAtom, { ...oldBlock, show: false });
    }
  );
export default removeBlockAtom;
