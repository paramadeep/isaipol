import { Form } from "react-bootstrap";

function Options({ options }) {
  return options.map((option, index) => <option key={index}>{option}</option>);
}

const ArrayField = ({ input, update }) => (
  <Form.Select
    data-testid={"arrayField"}
    onChange={(e) => update(e.target.value)}
  >
    <Options options={input} />
  </Form.Select>
);
export default ArrayField;
