import { Button } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { domainAtom } from "../states/domainAtom";
import { useAtomValue } from "jotai";

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
  const domain = useAtomValue(domainAtom);
  return (
    <Button
      className={"m-1"}
      onClick={() => {
        const blob = new Blob([JSON.stringify(domain, null, 2)], {
          type: "application/json",
        });
        saveFile(blob);
      }}
    >
      <FaSave />
    </Button>
  );
};

export default SaveButton;
