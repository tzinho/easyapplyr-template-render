"use client";

import { useEffect, useState } from "react";
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
  arrayMove,
} from "@dnd-kit/sortable";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { type InferSelectModel } from "drizzle-orm";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import { type experiences } from "~/server/db/schema";
import { Skeleton } from "~/components/ui/skeleton";
import { SortableItem } from "~/components/templates/sortable-item";

export const List = () => {
  const params = useParams<{ id: string }>();
  const [items, setItems] = useState<InferSelectModel<typeof experiences>[]>(
    [],
  );

  const experiencesList = api.experiences.list.useQuery({
    resumeId: params.id,
  });

  const experienceDeleteMutation = api.educations.delete.useMutation({
    onSuccess() {
      toast.success("Sucesso deletando o item");
    },
  });

  const experienceOrderMutation = api.experiences.changeOrder.useMutation({
    onSuccess: () => {
      toast.success("Alterado a ordem dos itens com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao atualizar a ordem dos itens!");
    },
  });

  useEffect(() => {
    if (experiencesList.isSuccess) {
      setItems(experiencesList.data);
    }
  }, [experiencesList.isSuccess, experiencesList.data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleOnDelete = async (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
    void experienceDeleteMutation.mutateAsync(id);
  };

  if (experiencesList.isLoading)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          order: index,
        }),
      );

      setItems(newItems);

      void experienceOrderMutation.mutateAsync(newItems);
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
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((experience) => (
            <SortableItem key={experience.id} id={experience.id}>
              <div className="flex w-full items-center justify-between rounded-md border p-3">
                <Link
                  href={`/app/resume/${params.id}/experiences/edit/${experience.id}`}
                >
                  <p>{experience.role}</p>
                  <p>{experience.company}</p>
                </Link>

                <ButtonLoading
                  onClick={() => handleOnDelete(experience.id)}
                  size="icon"
                  variant="destructive"
                  className="h-6 w-6"
                  isLoading={experienceDeleteMutation.isPending}
                >
                  <Trash className="h-2 w-2" />
                </ButtonLoading>
              </div>
            </SortableItem>
          ))}
        </SortableContext>

        <Link
          href={`/app/resume/${params.id}/experiences/create`}
          className={cn(buttonVariants({ variant: "default" }), "h-6")}
        >
          <Plus />
          Adicionar experiência
        </Link>
      </DndContext>
    </div>
  );
};
