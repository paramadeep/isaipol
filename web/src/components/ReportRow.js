import { useAtomValue } from "jotai";
import { reportRowAtom, reportValueAtom } from "../states/reportAtom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge } from "react-bootstrap";

const ReportRow = ({ dropId }) => {
  const reportRow = useAtomValue(reportRowAtom);
  return (
    <>
      <div>Report Row :</div>
      <Droppable droppableId={dropId} direction="horizontal">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Badge>{reportRow.name}</Badge>
            <p className="fs-6 fw-lighter">(drag on me to replace me)</p>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};
export default ReportRow;
