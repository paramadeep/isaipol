import { useAtomValue } from "jotai";
import { domainAtom } from "../states/domainAtom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { computeLane } from "../states/computeLane";
import ReportEditor from "./ReportEditor";
import { useState } from "react";
import {
  reportGroupAtom,
  reportRowAtom,
  reportValueAtom,
} from "../states/reportAtom";
import Specs from "./Specs";
import { FaEdit, FaPrint } from "react-icons/fa";
import PrintReport from "./PrintReport";
import CustomTopFields from "./CustomTopFields";
import CustomBottomFields from "./CustomBottomFields";

const ReportBody = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const domain = useAtomValue(domainAtom);
  const reportValue = useAtomValue(reportValueAtom);
  const reportRow = useAtomValue(reportRowAtom);
  const reportGroup = useAtomValue(reportGroupAtom);
  const computedValues = domain.lanes.map((lane) => {
    const { inputs, output } = computeLane(lane);
    return { ...inputs, ...output };
  });
  const headerValues = reportGroup.map((field) => ({
    field,
    values: [...new Set(computedValues.map((val) => val[field]))],
  }));
  const columCount = headerValues.reduce(
    (init, group) => init * group.values.length,
    1
  );
  let previousColCount = 1;
  headerValues.forEach((header) => {
    header.colSpan = columCount / (header.values.length * previousColCount);
    header.actualValues = [...header.values];
    for (let i = 1; i < previousColCount; i++) {
      header.actualValues = [...header.actualValues, ...header.values];
    }
    previousColCount = header.values.length * previousColCount;
  });

  let groupFilters = [];
  headerValues.forEach((header) => {
    const headerFilters = header.values.map((value) => ({
      field: header.field,
      value,
    }));
    if (groupFilters.length === 0) {
      groupFilters = headerFilters.map((filter) => [filter]);
      return;
    }
    const combinedFilters = [];
    for (const filter of groupFilters) {
      for (const localFilter of headerFilters) {
        combinedFilters.push([localFilter, ...filter]);
      }
    }
    groupFilters = [...combinedFilters];
  });
  const rows = [...new Set(computedValues.map((val) => val[reportRow]))];
  const rowFilters = rows.map((row) => ({
    field: reportRow,
    value: row,
  }));
  const rowValues = rowFilters.map((rowFilter) => {
    const filteredVals = computedValues.filter(
      (val) => val[rowFilter.field].toString() === rowFilter.value.toString()
    );
    const values = groupFilters.map((filters) => {
      let localVals = [...filteredVals];
      filters.forEach((filter) => {
        localVals = localVals.filter(
          (val) => val[filter.field].toString() === filter.value.toString()
        );
      });
      if (localVals && localVals.length === 0) {
        return "-";
      }
      const rowValue = localVals[0][reportValue];
      return rowValue ? rowValue : "-";
    });
    return { field: rowFilter.value, values };
  });

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button className={"m-1"} onClick={handleShow}>
              <FaEdit />
            </Button>
            <ReportEditor show={show} onHide={handleClose}></ReportEditor>
            <Button className={"m-1"} onClick={handleShow}>
              <FaPrint />
            </Button>
            <PrintReport />
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomTopFields />
            <Specs />
            <Table
              hover={true}
              bordered={true}
              striped={true}
              className="text-center"
            >
              <thead>
                {headerValues.map((group, index) => (
                  <tr key={index}>
                    <th>{group.field}</th>
                    {group.actualValues.map((value, index) => (
                      <th key={index} colSpan={group.colSpan}>
                        {value}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {rowValues.map((row, index) => (
                  <tr key={index}>
                    <td>{row.field}</td>
                    {row.values.map((value, index) => (
                      <th key={index}>{value}</th>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <CustomBottomFields />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReportBody;
