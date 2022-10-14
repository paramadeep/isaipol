import { Form } from "react-bootstrap";

export default function NumberField({ value, update }) {
  return (
    <Form.Control
      type={"number"}
      data-testid={"number"}
      defaultValue={value}
      onChange={(e) => update(e.target.value)}
    />
  );
}
