import { Form } from "react-bootstrap";
import { useAtom } from "jotai";

export default function NumberField({ blockInputAtom }) {
  const [{ value }, update] = useAtom(blockInputAtom);
  return (
    <Form.Control
      type={"number"}
      data-testid={"number"}
      defaultValue={value}
      onChange={(e) => update(Number(e.target.value))}
    />
  );
}
