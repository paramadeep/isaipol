import { Form } from "react-bootstrap";

export default function NumberField({ input, update }) {
  return (
    <Form.Control
      type={"number"}
      data-testid={"number"}
      defaultValue={input}
      onChange={(e) => update(e.target.value)}
    />
  );
}
