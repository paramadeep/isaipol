import NumberField from "./fields/NumberField";
import ArrayField from "./fields/ArrayField";
import { Form } from "react-bootstrap";
import { useAtomValue } from "jotai";

const BlockInput = ({ blockInputAtom }) => {
  const { type } = useAtomValue(blockInputAtom);
  let InputField;
  if (type === "number") {
    InputField = <NumberField blockInputAtom={blockInputAtom} />;
  } else {
    InputField = <ArrayField blockInputAtom={blockInputAtom} />;
  }
  return <Form>{InputField}</Form>;
};

export default BlockInput;
