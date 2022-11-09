import CustomReportField from "./CustomReportField";
import { useAtom } from "jotai";
import { customBottomFieldAtomsAtom } from "../states/domainAtom";

const CustomBottomFields = () => {
  const [customBottomFieldAtoms] = useAtom(customBottomFieldAtomsAtom);
  return (
    <>
      {customBottomFieldAtoms.map((customBottomFieldAtom, index) => (
        <CustomReportField
          customFieldAtom={customBottomFieldAtom}
          key={index}
        />
      ))}
    </>
  );
};

export default CustomBottomFields;
