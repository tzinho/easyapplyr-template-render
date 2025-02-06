import { type PropsWithChildren } from "react";
import {
  type DragEndEvent,
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

interface TwoColumnProps extends PropsWithChildren {
  handleDragEnd: (event: DragEndEvent) => void;
}

export const TwoColumn = ({ handleDragEnd, children }: TwoColumnProps) => {
  // const { sensors, handleDragEnd, items } = useDragEndOneColumn<SectionType>({
  //   type: "sections",
  // });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};
