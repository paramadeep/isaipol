import { useAtomValue } from "jotai";
import { reportUnusedAtom } from "../states/reportAtom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge, Form } from "react-bootstrap";
import { FaArrowsAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const ReportUnUsed = ({ dropId }) => {
  const reportUnUsed = useAtomValue(reportUnusedAtom);
  console.log(reportUnUsed);
  const [filter, setFilter] = useState("");
  const [blocksToShow, setBlocksToShow] = useState(reportUnUsed);
  const handleFilter = (e) => {
    e.preventDefault();
    const enteredValue = e.target.value;
    setFilter(enteredValue);
  };
  useEffect(() => {
    if (!filter || filter.trim() === "") {
      setBlocksToShow(reportUnUsed);
      return;
    }
    setBlocksToShow(
      reportUnUsed.filter((block) =>
        block.toLowerCase().includes(filter.trim().toLowerCase())
      )
    );
  }, [reportUnUsed, filter]);

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
