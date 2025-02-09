import { type PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";

interface SortableItemProps extends PropsWithChildren {
  id: number;
}

export const SortableItem = ({ id, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={cn(
        "group flex cursor-pointer justify-start gap-3 py-3",
        isDragging && "opacity-50",
      )}
      style={style}
    >
      <div ref={setNodeRef} {...attributes} {...listeners}>
        <ChevronsUpDown className="h-4 w-4 cursor-move opacity-0 transition-opacity delay-150 duration-300 ease-in-out group-hover:opacity-100" />
      </div>

      {children}
    </div>
  );
};
