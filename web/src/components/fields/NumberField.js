import { Form } from "react-bootstrap";

export default function NumberField({ input }) {
  return <Form.Control type={"number"} defaultValue={input} />;
}
