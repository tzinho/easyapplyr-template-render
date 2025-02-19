"use client";

import { useState } from "react";
import {
  EyeClosedIcon,
  GripVertical,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { PageContentEditor } from "~/components/page";
import { Form } from "~/components/ui/form";
import { experienceSchema, type ExperienceSchema } from "~/validators";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { ButtonLoading } from "~/components/ui/button-loading";

export const Body = () => {
  const [currentVisible, setCurrentVisible] = useState<number>(0);

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experiences: [
        {
          role: "Experiência 1",
          company: "Detalhes",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const handleOnClick = (index: number) => {
    setCurrentVisible(index);
    // form.reset(item);
  };

  const handleOnAdd = () => {
    append({
      role: `Experiência ${fields.length + 1}`,
      company: "Detalhes",
      where: "",
      did: "",
    });

    setCurrentVisible(fields.length);
  };

  const handleOnRemove = (index: number) => remove(index);

  const handleOnSubmit = (values) => {
    console.log("[values]: ", values);
  };

  return (
    <PageContentEditor>
      <Form {...form}>
        <div className="w-full md:max-w-[306px]">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Suas experiências</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        className="h-5 w-5"
                        onClick={handleOnAdd}
                        disabled={!fields.length}
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Adicionar uma experiência</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {fields.map((item, index) => {
                const isActive = currentVisible === index;
                const role = form.watch(`experiences.${index}.role`);
                const company = form.watch(`experiences.${index}.company`);

                return (
                  <div
                    className="group flex w-full items-center gap-1"
                    key={item.id}
                  >
                    <GripVertical className="h-4 w-4 cursor-grab opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <div
                      onClick={() => handleOnClick(index)}
                      className="flex flex-1 cursor-pointer items-center justify-between rounded-md border px-2 py-1"
                    >
                      <div>
                        <p className="text-sm">{role}</p>
                        <span className="text-xs">{company}</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  size="icon"
                                  className="h-5 w-5"
                                  variant="ghost"
                                >
                                  <MoreHorizontal />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-fit px-3 py-2">
                                <div className="flex flex-col gap-1">
                                  <Button
                                    className="flex items-center justify-start gap-3"
                                    variant="ghost"
                                  >
                                    <EyeClosedIcon />
                                    <div className="flex items-center">
                                      <Label
                                        htmlFor="close"
                                        className="cursor-pointer"
                                      >
                                        Esconder no currículo
                                      </Label>
                                      <Switch id="close" />
                                    </div>
                                  </Button>
                                  <Separator />
                                  <Button
                                    className="flex items-center justify-start gap-3"
                                    variant="ghost"
                                    onClick={() => handleOnRemove(index)}
                                  >
                                    <Trash className="h-4 w-4" />
                                    <Label className="cursor-pointer">
                                      Deletar
                                    </Label>
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ações</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-6"
          >
            <div className="relative min-h-[460px]">
              {fields.map((field, index) => {
                const isActive = currentVisible === index;
                const zIndex = fields.length - Math.abs(currentVisible - index);
                const company = form.watch(`experiences.${index}.company`);
                const role = form.watch(`experiences.${index}.role`);

                return (
                  <div key={field.id}>
                    <div
                      className="absolute inset-0 space-y-4 rounded-lg bg-white transition-all duration-300"
                      style={{
                        opacity: isActive ? 1 : 0.6,
                        zIndex,
                        pointerEvents: isActive ? "auto" : "none",
                        padding: "1rem",
                      }}
                    >
                      <p>
                        {role} <span className="text-xs">{company}</span>
                      </p>
                      <Input
                        label={`Qual a sua função na(o) ${company ? company : "Empresa A"}?`}
                        name={`experiences.${index}.role`}
                        className="focus-visible:ring-2"
                        required
                      />
                      <Input
                        label="Em qual empresa você trabalhou?"
                        name={`experiences.${index}.company`}
                        className="focus-visible:ring-2"
                        required
                      />
                      <Input
                        name={`experiences.${index}.where`}
                        label={`Onde está localizada a ${company ? company : "Empresa A"}?`}
                        className="focus-visible:ring-2"
                      />
                      <Textarea
                        name={`experiences.${index}.did`}
                        label={`O que você fez na ${company ? company : "Empresa A"}?`}
                        className="min-h-[120px] focus-visible:ring-2"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <ButtonLoading className="w-full">
              Salvar na lista de experiências
            </ButtonLoading>
          </form>
        </div>
      </Form>
    </PageContentEditor>
  );
};
