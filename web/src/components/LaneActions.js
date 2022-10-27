import { FaCopy, FaRegTrashAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";

const LaneActions = ({ duplicateLane, remove }) => (
  <>
    <Button
      variant="light"
      className="d-inline-flex align-items-center"
      onClick={remove}
    >
      <FaRegTrashAlt title={"remove"} />
    </Button>
    <Button
      variant="light"
      className="d-inline-flex align-items-center"
      onClick={duplicateLane}
    >
      <FaCopy title={"duplicate"} />
    </Button>
  </>
);

export default LaneActions;
