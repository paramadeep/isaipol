import { useAtomValue } from "jotai";
import { reportUnusedAtom } from "../states/reportAtom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge, Form } from "react-bootstrap";
import { FaArrowsAlt } from "react-icons/fa";
import { useState } from "react";

const ReportUnUsed = ({ dropId }) => {
  const reportUnUsed = useAtomValue(reportUnusedAtom);
  const [filter, setFilter] = useState("");
  const [blocksToShow, setBlocksToShow] = useState(reportUnUsed);
  const handleFilter = (e) => {
    e.preventDefault();
    const enteredValue = e.target.value;
    setFilter(enteredValue);
    if (!enteredValue || enteredValue.trim() === "") {
      setBlocksToShow(reportUnUsed);
      return;
    }
    const newBlocksToShow = reportUnUsed.filter((block) =>
      block.toLowerCase().includes(enteredValue.toLowerCase())
    );
    setBlocksToShow(newBlocksToShow);
  };

  return (
    <>
      <div>UnUsed Fields :</div>
      <Form.Control
        type={"text"}
        placeholder="type to filter"
        value={filter}
        onChange={handleFilter}
      />
      <Droppable droppableId={dropId} direction="horizontal">
        {(provided) => (
          <>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: 30 }}
              className="border border-primary"
            >
              {blocksToShow.map((item, index) => (
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
