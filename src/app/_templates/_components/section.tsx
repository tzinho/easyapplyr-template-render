import { type PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";

interface SectionProps extends PropsWithChildren {
  id: string | number;
  disabled?: boolean;
}

export const Section = ({ id, disabled, children }: SectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    cursor: disabled ? "not-allowed" : "grab",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move rounded border bg-gray-50 p-4"
    >
      {children}
    </div>
  );
};
