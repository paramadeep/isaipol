import NumberField from "./fields/NumberField";
import ArrayField from "./fields/ArrayField";
import { Form } from "react-bootstrap";
import { useAtom } from "jotai";

const BlockInput = ({ blockInputAtom }) => {
  const [{ value, type, input }, updateValue] = useAtom(blockInputAtom);
  let InputField;
  if (type === "number") {
    InputField = <NumberField update={updateValue} value={value} />;
  } else {
    InputField = (
      <ArrayField input={input} update={updateValue} value={value} />
    );
  }
  return <Form>{InputField}</Form>;
};

export default BlockInput;
