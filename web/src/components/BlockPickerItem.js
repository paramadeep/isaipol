import { useAtom } from "jotai";
import { Button } from "react-bootstrap";
import { useMemo } from "react";
import { pickerBlockAtom } from "../states/pickerBlockAtom";

const BlockPickerItem = ({ blockAtom }) => {
  const [block, showBlock] = useAtom(
    useMemo(() => pickerBlockAtom(blockAtom), [blockAtom])
  );
  if (block.show) {
    return <></>;
  }
  return (
    <Button className={"m-1"} onClick={showBlock}>
      {block.name}
    </Button>
  );
};
export default BlockPickerItem;
