import { NumberField } from "./fields/NumberField";
import { ArrayField } from "./fields/ArrayField";
import { InvalidInputField } from "./fields/InvalidInputField";

export const BlockInput = ({ input }) => {
  let InputField;
  if (typeof input == "number") {
    InputField = <NumberField input={input} />;
  } else if (Array.isArray(input)) {
    InputField = <ArrayField input={input} />;
  } else {
    return <InvalidInputField input={input} />;
  }
  return InputField;
};
