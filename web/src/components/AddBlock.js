import { Button } from "react-bootstrap";
import { useState } from "react";
import BlockPicker from "./BlockPicker";

const AddBlock = ({ blockAtomsAtom }) => {
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const hidePicker = () => {
    setShowBlockPicker(false);
  };
  return (
    <>
      <Button onClick={() => setShowBlockPicker(true)}>Add</Button>
      <BlockPicker
        show={showBlockPicker}
        blockAtomsAtom={blockAtomsAtom}
        onHide={hidePicker}
      />
    </>
  );
};
export default AddBlock;
