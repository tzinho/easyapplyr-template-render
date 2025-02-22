"use client";

import { type SubmitHandler, useFormContext, useWatch } from "react-hook-form";

import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { ButtonLoading } from "~/components/ui/button-loading";
import { cn } from "~/lib/utils";

interface ExperienceFormProps {
  onSubmit: SubmitHandler<any>;
  activeIndex: string | null;
  isLoading: boolean;
}

export const ExperienceForm = ({
  onSubmit,
  activeIndex,
  isLoading,
}: ExperienceFormProps) => {
  const form = useFormContext();

  const fields = useWatch({
    control: form.control,
    name: "experiences",
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div
        className={cn(
          "relative min-h-[53vh]",
          Object.keys(form.formState.errors).length && "min-h-[59vh]",
        )}
      >
        {fields.map((field, index) => {
          const isActive = field.activeIndex === activeIndex;
          const currentVisible = fields.findIndex(
            (field) => field.activeIndex === activeIndex,
          );

          const zIndex = fields.length - Math.abs(currentVisible - index);
          const company =
            (form.watch(`experiences.${index}.company`) as string) ||
            `Empresa ${fields.length}`;
          const role =
            (form.watch(`experiences.${index}.role`) as string) ||
            `Experiência ${fields.length}`;

          return (
            <div key={field.activeIndex}>
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
                  label={`Qual a sua função na(o) ${company}?`}
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
                  label={`Onde está localizada a ${company}?`}
                  className="focus-visible:ring-2"
                />
                <Textarea
                  name={`experiences.${index}.did`}
                  label={`O que você fez na(o) ${company}?`}
                  className="min-h-[120px] focus-visible:ring-2"
                />
              </div>
            </div>
          );
        })}
      </div>

      <ButtonLoading className="w-full" isLoading={isLoading}>
        Salvar na lista de experiências
      </ButtonLoading>
    </form>
  );
};
