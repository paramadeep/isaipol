import { useAtomValue } from "jotai";
import { reportGroupAtom } from "../states/reportAtom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge } from "react-bootstrap";
import { FaArrowsAlt } from "react-icons/fa";

const ReportGroup = ({ dropId }) => {
  const reportGroup = useAtomValue(reportGroupAtom);
  return (
    <>
      <div>Report Group Fields :</div>
      <Droppable droppableId={dropId} direction="horizontal">
        {(provided, snapshot) => {
          console.log(snapshot);
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: 30 }}
              className="border border-primary"
            >
              {reportGroup.map((item, index) => (
                <Draggable
                  key={item.name}
                  draggableId={item.name}
                  index={index}
                >
                  {(provided) => (
                    <Badge
                      className="m-1"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FaArrowsAlt title={item.name} />
                      {` ${item.name}`}
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
export default ReportGroup;
