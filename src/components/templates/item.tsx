"use client";

import { type PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

import { cn } from "~/lib/utils";

interface ItemProps extends PropsWithChildren {
  id: number | string;
  disabled?: boolean;
}

export const Item = ({ id, children, disabled }: ItemProps) => {
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
    <div
      className="group relative"
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      {!disabled && (
        <div className="absolute -left-4 top-0" {...listeners}>
          <GripVertical
            className={cn(
              "h-2 w-2 cursor-grab opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100",
              "group-hover:scale-110",
              "active:scale-110",
            )}
            strokeWidth={2}
          />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
