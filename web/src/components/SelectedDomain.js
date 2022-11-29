import { useAtomValue } from "jotai/utils";
import {
  domainAtom,
  domainsAtom,
  selectedDomainAtom,
} from "../states/domainAtom";
import {
  getInitialReportStruct,
  reportStructureAtom,
} from "../states/reportAtom";
import { Provider } from "jotai";
import Domain from "./Domain";
import {
  commonBlocksAtom,
  getInitialCommons,
} from "../states/commonBlocksAtom";

const SelectedDomain = () => {
  const selectedDomain = useAtomValue(selectedDomainAtom);
  const domains = useAtomValue(domainsAtom);
  if (selectedDomain) {
    const initialDomain = { ...domains.find((d) => d.name === selectedDomain) };
    const initialReport = getInitialReportStruct(initialDomain);
    const initialCommons = getInitialCommons(initialDomain);
    return (
      <Provider
        initialValues={[
          [domainAtom, initialDomain],
          [reportStructureAtom, initialReport],
          [commonBlocksAtom, initialCommons],
        ]}
      >
        <Domain />
      </Provider>
    );
  }
};
export default SelectedDomain;
