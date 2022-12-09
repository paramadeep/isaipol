import { useAtomValue } from "jotai/utils";
import { domainAtom, selectedDomainAtom } from "../states/domainAtom";
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
import { useEffect, useState } from "react";
import enrichDomain from "../services/domain/enrichDomain";

const SelectedDomain = () => {
  const selectedDomain = useAtomValue(selectedDomainAtom);
  const [initialDomain, setInitialDomain] = useState();
  const [initialReport, setInitialReport] = useState();
  const [initialCommons, setInitialCommons] = useState();
  useEffect(() => {
    if (selectedDomain) {
      import(/* webpackIgnore: true */`http://localhost:3001/domain/${selectedDomain}`)
        .then(
        (module) => {
          const domain = enrichDomain(module.default);
          setInitialDomain(domain);
          setInitialReport(getInitialReportStruct(domain));
          setInitialCommons(getInitialCommons(domain));
        }
      );
    }
  }, [selectedDomain]);

  if (selectedDomain && initialDomain && initialReport && initialCommons) {
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
