import { useAtomValue } from "jotai";
import { reportValueAtom } from "../states/reportAtom";
import { Droppable } from "react-beautiful-dnd";
import { Badge } from "react-bootstrap";

const ReportValue = ({ dropId }) => {
  const reportValue = useAtomValue(reportValueAtom);
  return (
    <>
      <div>Report Value :</div>
      <Droppable droppableId={dropId} direction="horizontal">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Badge>{reportValue}</Badge>
            <p className="fs-6 fw-lighter">(drag on me to replace me)</p>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};
export default ReportValue;
