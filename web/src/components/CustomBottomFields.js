import { useAtomValue } from "jotai/utils";
import { domainAtom } from "../states/domainAtom";
import { FloatingLabel, Form } from "react-bootstrap";

const CustomBottomFields = () => {
  const customBottomFields = useAtomValue(domainAtom).customBottomFields;
  return (
    <>
      {customBottomFields.map((field, index) => (
        <FloatingLabel label={field.name} key={index}>
          <Form.Control type="text" />
        </FloatingLabel>
      ))}
    </>
  );
};

export default CustomBottomFields;
