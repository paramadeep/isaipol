import { useAtomValue } from "jotai";
import { reportUnusedAtom } from "../states/reportAtom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge } from "react-bootstrap";
import { FaArrowsAlt } from "react-icons/fa";

const ReportUnUsed = ({ dropId }) => {
  const reportUnUsed = useAtomValue(reportUnusedAtom);
  return (
    <>
      <div>UnUsed Fields :</div>
      <Droppable droppableId={dropId} direction="horizontal">
        {(provided) => (
          <>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: 30 }}
              className="border border-primary"
            >
              {reportUnUsed.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided, snapshot) => (
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
          </>
        )}
      </Droppable>
    </>
  );
};
export default ReportUnUsed;
