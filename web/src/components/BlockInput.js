import NumberField from "./fields/NumberField";
import ArrayField from "./fields/ArrayField";
import { Form } from "react-bootstrap";

const BlockInput = ({ type, update, value, input }) => {
  let InputField;
  if (type === "number") {
    InputField = <NumberField update={update} value={value} />;
  } else {
    InputField = <ArrayField input={input} update={update} value={value} />;
  }
  return <Form>{InputField}</Form>;
};

export default BlockInput;
