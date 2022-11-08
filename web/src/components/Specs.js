import { reportSpecsAtom } from "../states/reportAtom";
import { useAtomValue } from "jotai/utils";
import { domainAtom } from "../states/domainAtom";
import { Badge } from "react-bootstrap";

const Specs = () => {
  const specsToShow = useAtomValue(reportSpecsAtom);
  const domain = useAtomValue(domainAtom);
  const specs = domain.lanes[0].blocks.filter((b) =>
    specsToShow.includes(b.name)
  );
  return (
    <>
      {specs.map((spec, index) => (
        <Badge bg="dark" className="m-1" key={index}>
          {spec.name} : {spec.value}
        </Badge>
      ))}
    </>
  );
};

export default Specs;
