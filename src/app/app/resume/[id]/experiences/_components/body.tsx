"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { PageContentEditor } from "~/components/page";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { experienceSchema, type ExperienceSchema } from "~/validators";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";

export const Body = () => {
  const [items, setItems] = useState<ExperienceSchema & { id: number }[]>([
    {
      id: 0,
      role: "Experiência",
      company: "Empresa",
    },
  ]);
  const selected = useRef<number | null>(null);

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
  });

  const handleOnSubmit: SubmitHandler<ExperienceSchema> = async (values) => {
    console.log("selected.current", selected.current);
    if (typeof selected.current === "number") {
      setItems((items) => {
        return items.map((item) => {
          if (item.id === selected.current) {
            return { ...values, id: item.id };
          }
          return item;
        });
      });
    } else {
      setItems((items) => [
        ...items,
        {
          ...values,
          id: items.length,
        },
      ]);
    }
  };

  const handleOnClick = (item) => {
    selected.current = item.id;
    form.reset(item);
  };

  const handleOnAdd = () => {
    selected.current = null;
    form.reset({
      role: "",
      company: "",
      where: "",
      did: "",
    });
  };

  return (
    <PageContentEditor>
      <Form {...form}>
        <div className="w-full max-w-[306px]">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Suas experiências</CardTitle>
                <Button size="icon" className="h-5 w-5" onClick={handleOnAdd}>
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleOnClick(item)}
                  className="flex cursor-pointer items-center justify-between rounded-md border px-2 py-1"
                >
                  <div>
                    <p className="text-sm">{item.role}</p>
                    <span className="text-xs">{item.company}</span>
                  </div>
                  <Button size="icon" className="h-5 w-5" variant="ghost">
                    <MoreHorizontal />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="flex flex-col items-end"
          >
            <Input name="role" label="Função" required />
            <Input name="company" label="Empresa" required />
            <Input name="where" label="Onde?" />
            <Textarea name="did" label="O que você fez na empresa?" />
            <ButtonLoading>Salvar a experiência</ButtonLoading>
          </form>
        </div>
      </Form>
    </PageContentEditor>
  );
};
