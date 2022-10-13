import NumberField from "./fields/NumberField";
import ArrayField from "./fields/ArrayField";
import InvalidInputField from "./fields/InvalidInputField";
import { Form } from "react-bootstrap";

const BlockInput = ({ input }) => {
  let InputField;
  if (typeof input == "number") {
    InputField = <NumberField input={input} />;
  } else if (Array.isArray(input)) {
    InputField = <ArrayField input={input} />;
  } else {
    InputField = <InvalidInputField input={input} />;
  }
  return <Form>{InputField}</Form>;
};

export default BlockInput;
