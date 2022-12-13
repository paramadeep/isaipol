import { Button } from "react-bootstrap";
import { FaFile } from "react-icons/fa";
import { useRef } from "react";
import axios from "axios";
import { useUpdateAtom } from "jotai/utils";
import { rawDomainFileAtom, selectedDomainAtom } from "../states/domainAtom";

export const FileLoader = () => {
  const fileInputRef = useRef();
  const setSelectedDomain = useUpdateAtom(selectedDomainAtom)
  const setRawDomain = useUpdateAtom(rawDomainFileAtom);
  const loadLocalFile = () => {
      fileInputRef.current.click()
  };
  const reader = new FileReader();
  reader.addEventListener('load', function (e) {
    const fileContent = e.target.result;
    setRawDomain(fileContent)
    updateDomainToServer();
  });

  function updateDomainToServer() {
    axios.postForm("http://localhost:3001/local-file", {
      "file": fileInputRef.current.files[0]
    }).then((resp) => {
      setSelectedDomain(resp.data.domainRef);
    });
  }

  const handleFileSelection = async ()=>{
    reader.readAsBinaryString(fileInputRef.current.files[0]);
  }

  return <div>
    <Button className="m-2" onClick={loadLocalFile}>Load from local file <FaFile/> </Button>
    <input type="file" id="localFile" className="d-none" name="domainFile" onChange={handleFileSelection} ref={fileInputRef}/>
  </div>
};
