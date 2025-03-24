import { type PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

import { cn } from "~/lib/utils";
import { SectionTitle } from "./section-title";

interface SectionProps extends PropsWithChildren {
  id: string | number;
  disabled?: boolean;
  className?: string;
  title?: string;
}

export const Section = ({
  id,
  disabled,
  children,
  title,
  className,
}: SectionProps) => {
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
    <div style={style} ref={setNodeRef} className="px-[1.4cm]">
      <div className="group relative" {...attributes}>
        {!disabled && (
          <div
            className="absolute -left-2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            {...listeners}
          >
            <GripVertical
              className={cn(
                "inset-x-0 size-[75%] cursor-grab opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100",
              )}
            />
          </div>
        )}
        {title && <SectionTitle>{title}</SectionTitle>}
      </div>
      <div>{children}</div>
    </div>
  );
};
