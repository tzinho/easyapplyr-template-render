"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { ChevronUp, ChevronDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import {
  type ExperienceSchema,
  type SkillSchema,
  skillSchema,
} from "~/validators";
import { Switch } from "~/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

import { type Experience } from "~/types/template";
import { Textarea } from "~/components/form/textarea";

interface ExperienceFormProps<T extends FieldValues> {
  handleSubmit: SubmitHandler<T>;
}

function SkillForm({ handleSubmit }: ExperienceFormProps<SkillSchema>) {
  const form = useForm<SkillSchema>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      text: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-6"
      >
        <Textarea
          placeholder="Technical Skills: Google Suite, Tableau"
          name="text"
          label="Quais suas habilidades?"
        />

        <Button type="submit">Adicionar</Button>
      </form>
    </Form>
  );
}

interface SortableItemsProps<T> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
}

const SortableItems = ({ items, setItems }: SortableItemsProps<Experience>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  const handleDelete = (id: string) => {
    setItems((prev: Experience[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="h-fit w-full max-w-[350px] flex-grow-0 rounded-lg bg-white p-4 shadow">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <CollapsibleTrigger asChild>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between text-lg font-medium"
          >
            Suas habilidades
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-b-0">
                <div>
                  <div className="font-medium">{item.text}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-6 bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-6"
                    onClick={() => handleDelete(item.id)}
                  >
                    Deletar
                  </Button>
                  <Button size="sm" variant="outline" className="h-6">
                    Esconder
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="text-sm">Ordernar por data</span>
            <Switch checked={sortByDate} onCheckedChange={setSortByDate} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default function Experiences() {
  const [items, setItems] = useState<Experience[]>([]);

  const handleSubmit: SubmitHandler<ExperienceSchema> = (data) => {
    setItems((prev: Experience[]) => [
      ...prev,
      { ...data, id: crypto.randomUUID(), order: prev.length } as Experience,
    ]);
  };

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <SkillForm handleSubmit={handleSubmit} />
        <SortableItems items={items} setItems={setItems} />
      </div>
    </div>
  );
}
