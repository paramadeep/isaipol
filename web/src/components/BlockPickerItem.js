import { useAtom } from "jotai";
import { Button } from "react-bootstrap";
import { useMemo } from "react";
import { pickerBlockAtom } from "../states/pickerBlockAtom";

const BlockPickerItem = ({ blockAtom, search }) => {
  const [block, showBlock] = useAtom(
    useMemo(() => pickerBlockAtom(blockAtom), [blockAtom])
  );
  if (block.show) {
    return <></>;
  }
  if (
    search === "" ||
    block.name.toLowerCase().includes(search.toLowerCase())
  ) {
    return (
      <Button className={"m-1"} onClick={showBlock}>
        {block.name}
      </Button>
    );
  }
  return <></>;
};
export default BlockPickerItem;
