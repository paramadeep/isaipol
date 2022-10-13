import { Form } from "react-bootstrap";

export default function NumberField({ input }) {
  return (
    <Form.Control type={"number"} data-testid={"number"} defaultValue={input} />
  );
}
