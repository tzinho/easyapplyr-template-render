import { type PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronsUpDown } from "lucide-react";

interface SortableItemProps extends PropsWithChildren {
  id: string;
}

export const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="group flex justify-start gap-3 py-3" style={style}>
      <div ref={setNodeRef} {...attributes} {...listeners}>
        <ChevronsUpDown className="h-4 w-4 opacity-0 transition-opacity delay-150 duration-300 ease-in-out group-hover:opacity-100" />
      </div>
      {children}
    </div>
  );
};
