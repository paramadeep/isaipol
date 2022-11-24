import { Form } from "react-bootstrap";
import { useAtom } from "jotai";

export default function NumberField({ blockInputAtom }) {
  const [{ value }, update] = useAtom(blockInputAtom);
  const handleChange = (e) => {
    e.preventDefault();
    update(Number(e.target.value));
  };
  return (
    <Form.Control
      type={"number"}
      data-testid={"number"}
      defaultValue={value}
      onChange={handleChange}
    />
  );
}
