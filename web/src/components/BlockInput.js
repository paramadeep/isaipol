import NumberField from "./fields/NumberField";
import ArrayField from "./fields/ArrayField";
import InvalidInputField from "./fields/InvalidInputField";
import { Form } from "react-bootstrap";

const BlockInput = ({ input, update }) => {
  let InputField;
  if (typeof input == "number") {
    InputField = <NumberField input={input} update={update} />;
  } else if (Array.isArray(input)) {
    InputField = <ArrayField input={input} update={update} />;
  } else {
    InputField = <InvalidInputField input={input} />;
  }
  return <Form>{InputField}</Form>;
};

export default BlockInput;
