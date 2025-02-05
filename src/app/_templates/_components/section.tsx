import { type PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";

interface SectionProps extends PropsWithChildren {
  id: string | number;
  disabled?: boolean;
}

export const Section = ({ id, disabled, children }: SectionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    cursor: disabled ? "not-allowed" : "grab",
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </div>
  );
};
