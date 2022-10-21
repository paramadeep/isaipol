import NumberField from "./fields/NumberField";
import ArrayField from "./fields/ArrayField";
import { Form } from "react-bootstrap";
import { useAtom } from "jotai";

const BlockInput = ({ updateBlockAtom }) => {
  const [block] = useAtom(updateBlockAtom);
  let InputField;
  if (block.type === "number") {
    InputField = <NumberField blockInputAtom={updateBlockAtom} />;
  } else {
    InputField = <ArrayField blockInputAtom={updateBlockAtom} />;
  }
  return <Form>{InputField}</Form>;
};

export default BlockInput;
