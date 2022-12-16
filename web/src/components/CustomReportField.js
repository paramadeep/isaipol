import { useAtom } from "jotai";
import { FloatingLabel, Form } from "react-bootstrap";

const CustomReportField = ({ customFieldAtom }) => {
  const [customTopField, setCustomField] = useAtom(customFieldAtom);
  const update = (value) => {
    setCustomField({ ...customTopField, value });
  };

  return (
    <FloatingLabel label={customTopField.name}>
      <Form.Control
        type="textarea"
        value={customTopField.value}
        onChange={(e) => update(e.target.value)}
      />
    </FloatingLabel>
  );
};
export default CustomReportField;
