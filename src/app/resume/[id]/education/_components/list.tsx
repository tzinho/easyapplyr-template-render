"use client";

import React, { type PropsWithChildren } from "react";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

interface SortableItemProps extends PropsWithChildren {
  id: number;
}

interface Experience {
  id: string;
  resumeId: string;
  column: number | null;
  order: number;
  description: string | null;
  appear: boolean | null;
  degree: string | null;
  institution: string | null;
  year: string | null;
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

      <Link href="#">{children}</Link>
    </div>
  );
};

export const List = () => {
  const [items, setItems] = React.useState<Experience[]>([]);
  const params = useParams<{ id: string }>();
  const educations = api.education.list.useQuery();
  const utils = api.useUtils();

  const educationOrderMutation = api.education.changeOrder.useMutation({
    onSuccess: () => {
      toast.success("Update the educations items with success!");
      // void utils.education.list.invalidate();
    },
    onError: () => {
      toast.error("Occured an error to update the order of items");
    },
  });

  React.useEffect(() => {
    if (educations.isSuccess) {
      setItems(educations.data);
    }
  }, [educations.isSuccess, educations.data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  if (educations.isLoading) return null;

  // console.log("initialOrder", educations.data);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.order === active.id);
        const newIndex = items.findIndex((item) => item.order === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex).map(
          (item, index) => ({
            ...item,
            order: index,
          }),
        );

        console.log("newItems", newItems);

        void educationOrderMutation.mutateAsync(newItems);

        return newItems;
      });

      // const orderUpdates = items.map((item, index) => ({
      //   id: item.id,
      //   order: item.order,
      // }));

      // await educationOrderMutation.mutateAsync(items);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.order)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((education) => (
          <SortableItem key={education.id} id={education.order}>
            {education.degree} - {education.id}
          </SortableItem>
        ))}
      </SortableContext>

      <Link href={`/resume/${params.id}/education/create`}>
        <Plus />
        Add education
      </Link>
    </DndContext>
  );
};
