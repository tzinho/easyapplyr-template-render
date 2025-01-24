"use client";

import { type PropsWithChildren } from "react";
import {
  DndContext,
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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronsUpDown, Plus } from "lucide-react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";

interface SortableItemProps extends PropsWithChildren {
  id: number;
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

export const List = () => {
  const educations = api.education.list.useQuery();
  const form = useForm();
  const { fields, append, update } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  if (educations.isLoading) return null;

  return (
    <DndContext sensors={sensors}>
      <SortableContext
        items={educations.data!.map((item) => item.order)}
        strategy={verticalListSortingStrategy}
      >
        {educations.data!.map((education) => (
          <SortableItem key={education.id} id={education.order}></SortableItem>
        ))}
      </SortableContext>
      <Button>
        <Plus />
        Add education
      </Button>
    </DndContext>
  );
};
