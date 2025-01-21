"use client";

import { useState } from "react";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";
import { SortableItem } from "./sortable-item";

interface ListProps<T> {
  items: T[];
  itemSelectedId: string | null;
  onEditClick: (item: T) => void;
}

interface Item {
  id: string;
  order: number;
  appear: boolean;
}

export function List<T extends Item>({
  items,
  itemSelectedId,
  onEditClick,
}: ListProps<T>) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sortByDate, setSortByDate] = useState(false);
  const utils = api.useUtils();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      console.log(newItems);
    }
  };

  return (
    <div className="h-fit w-full max-w-sm rounded-lg bg-white p-3 shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 flex w-full items-center justify-between text-sm font-medium"
      >
        Your Experiences
        {isExpanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {isExpanded && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item?.order)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  <div key={item.id} className="border-b pb-4 last:border-b-0">
                    <div className="font-medium">{item.role}</div>
                    <div className="mb-2 text-sm text-gray-600">
                      {item.company}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-blue-500 text-white hover:bg-blue-600"
                        disabled={item.id === itemSelectedId}
                        onClick={() => onEditClick(item)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={item.id === itemSelectedId}
                        onClick={async () => {
                          console.log("delete item", item);
                        }}
                      >
                        Deletar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          console.log("hide item", item);
                        }}
                      >
                        {item.appear ? "Esconder" : "Mostrar"}
                      </Button>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="text-sm">Sort by date</span>
            <Switch checked={sortByDate} onCheckedChange={setSortByDate} />
          </div>
        </DndContext>
      )}
    </div>
  );
}
