import { DragDropContext } from "react-beautiful-dnd";
import ReportRow from "./ReportRow";
import ReportValue from "./ReportValue";
import ReportGroup from "./ReportGroup";
import ReportUnUsed from "./ReportUnUsed";
import { useUpdateAtom } from "jotai/utils";
import {
  reportGroupAtom,
  reportRowAtom,
  reportUnusedAtom,
  reportValueAtom,
} from "../states/reportAtom";

const ReportEditorBody = () => {
  const reportRow = "reportRow";
  const reportValue = "reportValue";
  const reportGroup = "reportGroup";
  const reportUnUsed = "reportUnUsed";
  const compute = {};
  compute[reportRow] = useUpdateAtom(reportRowAtom);
  compute[reportValue] = useUpdateAtom(reportValueAtom);
  compute[reportGroup] = useUpdateAtom(reportGroupAtom);
  compute[reportUnUsed] = useUpdateAtom(reportUnusedAtom);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    compute[result.destination.droppableId]({
      name: result.draggableId,
      index: result.destination.index,
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ReportRow dropId={reportRow}></ReportRow>
      <ReportValue dropId={reportValue}></ReportValue>
      <ReportGroup dropId={reportGroup}></ReportGroup>
      <ReportUnUsed dropId={reportUnUsed}></ReportUnUsed>
    </DragDropContext>
  );
};

export default ReportEditorBody;
