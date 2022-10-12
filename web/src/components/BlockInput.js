import { useMemo } from "react";
import { NumberField } from "./fields/NumberField";
import { ArrayField } from "./fields/ArrayField";
import { InvalidInputField } from "./fields/InvalidInputField";

const constructInputField = (input) => {
  return () => {
    if (typeof input == "number") {
      return <NumberField input={input} />;
    }
    if (Array.isArray(input)) {
      return <ArrayField input={input} />;
    }
    return <InvalidInputField input={input} />;
  };
};

export const BlockInput = ({ input }) => {
  const InputField = useMemo(constructInputField(input), [input]);
  return InputField;
};
