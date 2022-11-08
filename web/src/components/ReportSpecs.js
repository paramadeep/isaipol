import { useAtomValue } from "jotai/utils";
import { reportSpecsAtom } from "../states/reportAtom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge } from "react-bootstrap";
import { FaArrowsAlt } from "react-icons/fa";

const ReportSpecs = ({ dropId }) => {
  const reportSpecs = useAtomValue(reportSpecsAtom);
  return (
    <>
      <div>Report Spec Fields :</div>
      <Droppable droppableId={dropId} direction="horizontal">
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: 30 }}
              className="border border-primary"
            >
              {reportSpecs.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <Badge
                      className="m-1"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FaArrowsAlt />
                      {` ${item}`}
                    </Badge>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </>
  );
};
export default ReportSpecs;
