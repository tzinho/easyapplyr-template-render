import { type PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "~/lib/utils";

interface SectionProps extends PropsWithChildren {
  id: string | number;
  disabled?: boolean;
  className?: string;
}

export const Section = ({
  id,
  disabled,
  children,
  className,
}: SectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    // isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    cursor: disabled ? "not-allowed" : "grab",
    // opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn("cursor-move rounded", className)}
    >
      {children}
    </div>
  );
};
