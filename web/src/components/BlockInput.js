import NumberField from "./fields/NumberField";
import ArrayField from "./fields/ArrayField";
import { useAtom } from "jotai";

const fieldPicker = { number: NumberField, array: ArrayField };
const BlockInput = ({ updateBlockAtom }) => {
  const [block] = useAtom(updateBlockAtom);
  const InputField = fieldPicker[block.type];

  return (
    <>
      <InputField blockInputAtom={updateBlockAtom} />
    </>
  );
};

export default BlockInput;
