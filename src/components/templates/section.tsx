import { type PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { ArrowDownUp } from "lucide-react";

import { cn } from "~/lib/utils";

interface SectionProps extends PropsWithChildren {
  id: string | number;
  disabled?: boolean;
  className?: string;
}

export const Section = ({
  id,
  disabled,
  className,
  children,
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

  if (disabled) return children;

  return (
    <div
      className={cn("group relative", className)}
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      {!disabled && (
        <div className="absolute -left-4 top-0" {...listeners}>
          <ArrowDownUp
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
