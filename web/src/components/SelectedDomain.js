import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { domainAtom, selectedDomainAtom } from "../states/domainAtom";
import {
  getInitialReportStruct,
  reportStructureAtom,
} from "../states/reportAtom";
import Domain from "./Domain";
import {
  commonBlocksAtom,
  getInitialCommons,
} from "../states/commonBlocksAtom";
import { useEffect, useState } from "react";
import enrichDomain from "../services/domain/enrichDomain";

const SelectedDomain = () => {
  const selectedDomain = useAtomValue(selectedDomainAtom);
  const setDomain = useUpdateAtom(domainAtom);
  const setCommons = useUpdateAtom(commonBlocksAtom);
  const setReport = useUpdateAtom(reportStructureAtom);
  const [initialDomain, setInitialDomain] = useState();
  const [initialReport, setInitialReport] = useState();
  const [initialCommons, setInitialCommons] = useState();
  useEffect(() => {
    if (selectedDomain) {
      import(/* webpackIgnore: true */`http://localhost:3001/domain/${selectedDomain}`)
        .then(
        (module) => {
          const domain = enrichDomain(module.default);
          setDomain(domain)
          setInitialDomain(true)
          setReport(getInitialReportStruct(domain));
          setInitialReport(true)
          setCommons(getInitialCommons(domain));
          setInitialCommons(true)
        }
      );
    }
  }, [selectedDomain]);

  if (selectedDomain && initialDomain && initialReport && initialCommons) {
    return (
        <Domain />
    );
  }
};
export default SelectedDomain;
