import { useAtomValue } from "jotai";
import { domainAtom } from "../states/domainAtom";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { computeLane } from "../states/computeLane";
import ReportEditor from "./ReportEditor";
import { useRef, useState } from "react";
import {
  reportGroupAtom,
  reportRowAtom,
  reportValueAtom,
} from "../states/reportAtom";
import Specs from "./Specs";
import { FaEdit } from "react-icons/fa";
import CustomTopFields from "./CustomTopFields";
import CustomBottomFields from "./CustomBottomFields";
import ScreenShot from "./ScreenShot";

function getRowValue(localVals, reportValue) {
  if (localVals && localVals.length === 0) {
    return "-";
  }
  const rowValue = localVals[0][reportValue];
  return rowValue ? rowValue : "-";
}

const ReportBody = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const domain = useAtomValue(domainAtom);
  const reportValue = useAtomValue(reportValueAtom);
  const reportRow = useAtomValue(reportRowAtom);
  const reportGroup = useAtomValue(reportGroupAtom);
  const lanes = domain.lanes.map((lane) => {
    const { inputs, output } = computeLane(lane);
    return { ...inputs, ...output };
  });
  const tableHeaderStyle = { overflowWrap: "anywhere" };
  const headerValues = []
  const rowValues = []
  const uniqRowHeaders = [...new Set(lanes.map(lane=>lane[reportRow]))]
  const lanesGroupByReportRow = uniqRowHeaders.map(rowHeader => ({rowHeader, matchingLanes:lanes.filter(lane=>lane[reportRow] && lane[reportRow]===rowHeader)}))
  const availableGroupValues = reportGroup.map((group)=> ({
    group,
    actualValues: [...new Set(lanes.map(lane=>lane[group]))]
  }))
  lanesGroupByReportRow.forEach(laneGroup => {

  })
  // const headerValues = reportGroup.map((field) => ({
  //   field,
  //   values: [...new Set(computedValues.map((val) => val[field]))],
  // }));
  // const columCount = headerValues.reduce(
  //   (init, group) => init * group.values.length,
  //   1
  // );
  // let previousColCount = 1;
  // headerValues.forEach((header) => {
  //   header.colSpan = columCount / (header.values.length * previousColCount);
  //   header.actualValues = [...header.values];
  //   for (let i = 1; i < previousColCount; i++) {
  //     header.actualValues = [...header.actualValues, ...header.values];
  //   }
  //   previousColCount = header.values.length * previousColCount;
  // });
  // let groupFilters = [];
  // headerValues.forEach((header) => {
  //   const headerFilters = header.values.map((value) => ({
  //     field: header.field,
  //     value,
  //   }));
  //   if (groupFilters.length === 0) {
  //     groupFilters = headerFilters.map((filter) => [filter]);
  //     return;
  //   }
  //   const combinedFilters = [];
  //   for (const filter of groupFilters) {
  //     for (const localFilter of headerFilters) {
  //       combinedFilters.push([localFilter, ...filter]);
  //     }
  //   }
  //   groupFilters = [...combinedFilters];
  // });
  // const rows = [...new Set(computedValues.map((val) => val[reportRow]))];
  // const rowFilters = rows.map((row) => ({
  //   field: reportRow,
  //   value: row,
  // }));
  // const rowValues = rowFilters.map((rowFilter) => {
  //   const filteredVals = computedValues.filter(
  //     (val) => val[rowFilter.field].toString() === rowFilter.value.toString()
  //   );
  //   let values;
  //   if (groupFilters.length === 0) {
  //     values = [getRowValue(filteredVals, reportValue)];
  //   } else {
  //     values = groupFilters.map((filters) => {
  //       let localVals = [...filteredVals];
  //       filters.forEach((filter) => {
  //         localVals = localVals.filter(
  //           (val) =>
  //             filter.value &&
  //             filter &&
  //             val[filter.field].toString() === filter.value.toString()
  //         );
  //       });
  //       return getRowValue(localVals, reportValue);
  //     });
  //   }
  //   return { field: rowFilter.value, values };
  // });

  let componentRef = useRef();
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button className={"m-1"} onClick={handleShow}>
              <FaEdit />
            </Button>
            <ReportEditor show={show} onHide={handleClose}></ReportEditor>
            <ScreenShot element={componentRef.current} />
          </Col>
        </Row>
      </Container>
      <Container id="report" sm={1} ref={componentRef}>
        <Row>
          <Col sm={4} className={"mx-auto mb-1"}>
            <Image fluid src={"./report_logo.png"} />
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
              responsive={true}
            >
              <thead>
                {headerValues.map((group, index) => (
                  <tr key={index}>
                    <th style={tableHeaderStyle}>{group.field.replaceAll("_"," ")}</th>
                    {group.actualValues.map((value, index) => {
                      return (
                        <th key={index} colSpan={group.colSpan} style={tableHeaderStyle}>
                          {value}
                        </th>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <th style={tableHeaderStyle}>{reportRow.replaceAll("_"," ")}</th>
                  <th colSpan={previousColCount} style={tableHeaderStyle}>{reportValue.replaceAll("_"," ")}</th>
                </tr>
              </thead>
              <tbody>
                {rowValues.map((row, index) => (
                  <tr key={index}>
                    <td>{row.field}</td>
                    {row.values.map((value, index) => (
                      <td key={index}>{value}</td>
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
