import { customTopFieldAtomsAtom } from "../states/domainAtom";
import CustomReportField from "./CustomReportField";
import { useAtom } from "jotai";

const CustomTopFields = () => {
  const [customTopFieldAtoms] = useAtom(customTopFieldAtomsAtom);
  return (
    <>
      {customTopFieldAtoms.map((customTopFieldAtom, index) => (
        <CustomReportField customFieldAtom={customTopFieldAtom} key={index} />
      ))}
    </>
  );
};

export default CustomTopFields;
