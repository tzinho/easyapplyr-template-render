"use client";

import { type SubmitHandler, useFormContext, useWatch } from "react-hook-form";

import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { ButtonLoading } from "~/components/ui/button-loading";

interface ExperienceFormProps {
  onSubmit: SubmitHandler<any>;
  activeIndex: string | null;
}

export const ExperienceForm = ({
  onSubmit,
  activeIndex,
}: ExperienceFormProps) => {
  const form = useFormContext();

  const fields = useWatch({
    control: form.control,
    name: "experiences",
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="relative min-h-[460px]">
        {fields.map((field, index) => {
          const isActive = field._id === activeIndex;
          const currentVisible = fields.findIndex(
            (field) => field._id === activeIndex,
          );

          const zIndex = fields.length - Math.abs(currentVisible - index);
          const company =
            form.watch(`experiences.${index}.company`) || "Empresa 1";
          const role =
            form.watch(`experiences.${index}.role`) || "Experiência 1";

          return (
            <div key={field._id}>
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

      <ButtonLoading className="w-full">
        Salvar na lista de experiências
      </ButtonLoading>
    </form>
  );
};
