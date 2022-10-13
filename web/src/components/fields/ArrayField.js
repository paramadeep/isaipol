import { Form } from "react-bootstrap";

function Options({ options }) {
  return options.map((option, index) => <option key={index}>{option}</option>);
}

const ArrayField = ({ input }) => (
  <Form.Select data-testid={"arrayField"}>
    <Options options={input} />
  </Form.Select>
);
export default ArrayField;
