import { useAtomValue } from "jotai";
import { domainAtom } from "../states/domainAtom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { computeLane } from "../states/computeLane";

const ReportBody = () => {
  const domain = useAtomValue(domainAtom);
  const computedValues = domain.lanes.map((lane) => {
    const { inputs, output } = computeLane(lane);
    return { ...inputs, ...output };
  });
  const groupValues = {};
  domain.reportGroup.map((field) => {
    groupValues[field] = [...new Set(computedValues.map((val) => val[field]))];
  });
  return (
    <>
      <Button className={"m-1"}>Edit</Button>
      <Table hover={true} bordered={true} className="text-center">
        <thead>
          <tr>
            <th>Coating</th>
            <th colSpan={6}>Aqua</th>
            <th colSpan={6}>Varnish</th>
          </tr>
          <tr>
            <th>Finish</th>
            <th colSpan={3}>Matt</th>
            <th colSpan={3}>Gloss</th>
            <th colSpan={3}>Matt</th>
            <th colSpan={3}>Gloss</th>
          </tr>
          <tr>
            <th>Colors</th>
            <th>Four</th>
            <th>Double</th>
            <th>Single</th>
            <th>Four</th>
            <th>Double</th>
            <th>Single</th>
            <th>Four</th>
            <th>Double</th>
            <th>Single</th>
            <th>Four</th>
            <th>Double</th>
            <th>Single</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>500</th>
            <th>20</th>
            <th>30</th>
            <th>40</th>
            <th>30</th>
            <th>44</th>
            <th>22</th>
            <th>53</th>
            <th>24</th>
            <th>45</th>
            <th>64</th>
            <th>22</th>
            <th>66</th>
          </tr>
          <tr>
            <th>1000</th>
            <th>20</th>
            <th>30</th>
            <th>40</th>
            <th>30</th>
            <th>44</th>
            <th>22</th>
            <th>53</th>
            <th>24</th>
            <th>45</th>
            <th>64</th>
            <th>22</th>
            <th>66</th>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ReportBody;
