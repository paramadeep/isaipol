import { Table } from "react-bootstrap";
import React from 'react';
import groupBy from 'lodash.groupby'
import { computeNoOfLeafNodes, getNthLayer } from "../services/graph";



export const ReportTable = ({ titles, graph, rowName, valueName }) => {
  console.log("graph");
  console.log(JSON.stringify(graph));
  const tableHeaderStyle = { overflowWrap: "anywhere" };
  const rowLayer = getNthLayer(graph,titles.length);
  if (rowLayer.length === 0) {
    return <></>
  }
  const possibleRows = groupBy(rowLayer,'name');
  const rowValues = Object.keys(possibleRows).map(key=>{
    const values = possibleRows[key].map(node=> Object.keys(node.node)[0])
    return {field: key, values }
  })
  console.log("rowValues");
  console.log(rowValues);
  const titlesRows = titles.map((title, index) => {
    return { title, headerRow: getNthLayer(graph, index, titles.length-1)};
  });
  console.log("titlesRows");
  console.log(titlesRows);
  const valueRowLength = computeNoOfLeafNodes(graph,titles.length+1);
  console.log(valueRowLength);
  return (<Table
    hover={true}
    bordered={true}
    striped={true}
    className="text-center"
    responsive={true}
  >
    <thead>
    {titlesRows.map((titleRow, index) => (
      <tr key={index}>
        <th style={tableHeaderStyle}>{titleRow.title.replaceAll("_", " ")}</th>
        {titleRow.headerRow.map((node, index) => {
          return (
            <th key={index} colSpan={node.noOfLeafNode} style={tableHeaderStyle}>
              {node.name}
            </th>
          );
        })}
      </tr>
    ))}
    <tr>
      <th style={tableHeaderStyle}>{rowName.replaceAll("_", " ")}</th>
      <th colSpan={valueRowLength} style={tableHeaderStyle}>{valueName.replaceAll("_", " ")}</th>
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
  </Table>);
};
