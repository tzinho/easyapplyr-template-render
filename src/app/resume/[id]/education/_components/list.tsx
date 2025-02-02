"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
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
import { ChevronsUpDown, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { Button, buttonVariants } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";

interface SortableItemProps extends PropsWithChildren {
  id: number;
}

interface Experience {
  id: string;
  resumeId: string;
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

      {children}
    </div>
  );
};

export const List = () => {
  const [items, setItems] = useState<Experience[]>([]);
  const params = useParams<{ id: string }>();
  const educations = api.education.list.useQuery();

  const educationDeleteMutation = api.education.delete.useMutation({
    onSuccess() {
      toast.success("Sucesso deletando o item");
    },
  });

  const educationOrderMutation = api.education.changeOrder.useMutation({
    onSuccess: () => {
      toast.success("Alterado a ordem dos itens com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao atualizar a ordem dos itens!");
    },
  });

  useEffect(() => {
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

  const handleOnDelete = async (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
    void educationDeleteMutation.mutateAsync(id);
  };

  if (educations.isLoading) return null;

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.order === active.id);
      const newIndex = items.findIndex((item) => item.order === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          order: index,
        }),
      );

      setItems(newItems);

      void educationOrderMutation.mutateAsync(newItems);
    }
  };

  return (
    <div className="flex-1">
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
              <div className="flex w-full items-center justify-between">
                <Link
                  href={`/resume/${params.id}/education/edit/${education.id}`}
                >
                  <p>{education.degree}</p>
                  <p>{education.institution}</p>
                </Link>

                <ButtonLoading
                  onClick={() => handleOnDelete(education.id)}
                  size="icon"
                  variant="destructive"
                  className="h-6 w-6"
                  isLoading={educationDeleteMutation.isPending}
                >
                  <Trash className="h-2 w-2" />
                </ButtonLoading>
              </div>
            </SortableItem>
          ))}
        </SortableContext>

        <Link
          href={`/resume/${params.id}/education/create`}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus />
          Adicionar educação
        </Link>
      </DndContext>
    </div>
  );
};
