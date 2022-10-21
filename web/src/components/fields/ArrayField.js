import { Form } from "react-bootstrap";
import { useAtom } from "jotai";

function Options({ options }) {
  return options.map((option, index) => (
    <option value={option} key={index}>
      {option}
    </option>
  ));
}

const ArrayField = ({ blockInputAtom }) => {
  const [block, update] = useAtom(blockInputAtom);
  return (
    <Form.Select
      data-testid={"arrayField"}
      onChange={(e) => update(e.target.value)}
      value={block.value}
    >
      <Options options={block.input} />
    </Form.Select>
  );
};
export default ArrayField;
