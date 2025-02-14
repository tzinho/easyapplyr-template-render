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
import { SortableItem } from "~/app/_components/sortable-item";
import { type skills } from "~/server/db/schema";

export const List = () => {
  const [items, setItems] = useState<InferSelectModel<typeof skills>[]>([]);
  const params = useParams<{ id: string }>();
  const skillsList = api.skills.list.useQuery({ resumeId: params.id });

  const skillsDeleteMutation = api.skills.delete.useMutation({
    onSuccess() {
      toast.success("Sucesso deletando o item");
    },
  });

  const skillsOrderMutation = api.skills.changeOrder.useMutation({
    onSuccess: () => {
      toast.success("Alterado a ordem dos itens com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao atualizar a ordem dos itens!");
    },
  });

  useEffect(() => {
    if (skillsList.isSuccess) {
      setItems(skillsList.data);
    }
  }, [skillsList.isSuccess, skillsList.data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleOnDelete = async (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
    void skillsDeleteMutation.mutateAsync(id);
  };

  if (skillsList.isLoading) return <h1>Carregando...</h1>;

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

      void skillsOrderMutation.mutateAsync(newItems);
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
          {items.map((skill) => (
            <SortableItem key={skill.id} id={skill.id}>
              <div className="flex w-full items-center justify-between rounded-md border p-3">
                <Link href={`/app/resume/${params.id}/skills/edit/${skill.id}`}>
                  <p>{skill.text}</p>
                </Link>

                <ButtonLoading
                  onClick={() => handleOnDelete(skill.id)}
                  size="icon"
                  variant="destructive"
                  className="h-6 w-6"
                  isLoading={skillsDeleteMutation.isPending}
                >
                  <Trash className="h-2 w-2" />
                </ButtonLoading>
              </div>
            </SortableItem>
          ))}
        </SortableContext>

        <Link
          href={`/app/resume/${params.id}/skills/create`}
          className={cn(buttonVariants({ variant: "default" }), "h-6")}
        >
          <Plus />
          Adicionar habilidade
        </Link>
      </DndContext>
    </div>
  );
};
