import { useAtomValue } from "jotai";
import { domainAtom } from "../states/domainAtom";
import { Button, Table } from "react-bootstrap";
import { computeLane } from "../states/computeLane";

const ReportBody = () => {
  const domain = useAtomValue(domainAtom);
  const computedValues = domain.lanes.map((lane) => {
    const { inputs, output } = computeLane(lane);
    return { ...inputs, ...output };
  });
  const headerValues = domain.reportGroup.map((field) => ({
    field,
    values: [...new Set(computedValues.map((val) => val[field]))],
  }));
  const columCount = headerValues.reduce(
    (init, group) => init * group.values.length,
    1
  );
  let previousColCount = 1;
  let valueSplit = [...computedValues];
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
    if (groupFilters.length == 0) {
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
  const rows = [...new Set(computedValues.map((val) => val[domain.reportRow]))];
  const rowFilters = rows.map((row) => ({
    field: domain.reportRow,
    value: row,
  }));
  const rowValues = rowFilters.map((rowFilter) => {
    const filteredVals = computedValues.filter(
      (val) => val[rowFilter.field] == rowFilter.value
    );
    const values = groupFilters.map((filters) => {
      let localVals = [...filteredVals];
      filters.forEach((filter) => {
        localVals = localVals.filter(
          (val) => val[filter.field] == filter.value
        );
      });
      if (localVals && localVals.length === 0) {
        return "-";
      }
      const rowValue = localVals[0][domain.reportValue];
      return rowValue ? rowValue : "-";
    });
    return { field: rowFilter.value, values };
  });

  return (
    <>
      <Button className={"m-1"}>Edit</Button>
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
    </>
  );
};

export default ReportBody;
