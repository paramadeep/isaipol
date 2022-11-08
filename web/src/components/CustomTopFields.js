import { useAtomValue } from "jotai/utils";
import { domainAtom } from "../states/domainAtom";
import { FloatingLabel, Form } from "react-bootstrap";

const CustomTopFields = () => {
  const customTopFields = useAtomValue(domainAtom).customTopFields;
  return (
    <>
      {customTopFields.map((field, index) => (
        <FloatingLabel label={field.name} key={index}>
          <Form.Control type="text" />
        </FloatingLabel>
      ))}
    </>
  );
};

export default CustomTopFields;
