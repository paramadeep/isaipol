import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DomainSelector from "./DomainSelector";
import {
  domainAtom,
  domainsAtom,
  selectedDomainAtom,
} from "../states/domainAtom";
import { Provider } from "jotai";
import { useAtomValue } from "jotai/utils";
import Domain from "./Domain";
import {
  getInitialReportStruct,
  reportStructureAtom,
} from "../states/reportAtom";

function SelectedDomain() {
  const selectedDomain = useAtomValue(selectedDomainAtom);
  const domains = useAtomValue(domainsAtom);
  if (selectedDomain) {
    const initialDomain = { ...domains.find((d) => d.name === selectedDomain) };
    const initialReport = getInitialReportStruct(initialDomain);
    return (
      <Provider
        initialValues={[
          [domainAtom, initialDomain],
          [reportStructureAtom, initialReport],
        ]}
      >
        <Domain />
      </Provider>
    );
  }
}

const App = () => {
  return (
    <>
      <DomainSelector />
      <SelectedDomain />
    </>
  );
};

export default App;
