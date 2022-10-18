import { Button } from "react-bootstrap";
import { useState } from "react";
import BlockPicker from "./BlockPicker";

const AddBlock = ({ blocks, addNewBlock }) => {
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const hidePicker = () => {
    setShowBlockPicker(false);
  };
  const onBlockSelection = (block) => {
    addNewBlock(block);
    hidePicker();
  };
  return (
    <>
      <Button onClick={() => setShowBlockPicker(true)}>Add</Button>
      <BlockPicker
        show={showBlockPicker}
        blocks={blocks}
        onBlockSelection={onBlockSelection}
        onHide={hidePicker}
      />
    </>
  );
};
export default AddBlock;
