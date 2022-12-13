import { Button } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { useAtomValue } from "jotai";
import saveDomainAtom from "../states/saveDomainAtom";

const saveFile = async (blob) => {
  try {
    const handle = await window.showSaveFilePicker({
      types: [
        {
          accept: {
            // Omitted
          },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return handle;
  } catch (err) {
    console.error(err.name, err.message);
  }
};

const SaveButton = () => {
  const domain = useAtomValue(saveDomainAtom);
  const saveDomain = ()=>{
    const blob = new Blob([domain], {
      type: "application/javascript",
    });
    saveFile(blob).catch(console.error)
  }

  return (
    <>
      <Button
        className={"m-1"}
        onClick={saveDomain}
      >
        <FaSave />
      </Button>
    </>
  );
};

export default SaveButton;
