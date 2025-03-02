"use client";

import { memo } from "react";
import {
  type FieldValues,
  type SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "~/components/form/input";
import { ButtonLoading } from "~/components/ui/button-loading";
import { cn } from "~/lib/utils";
import { DateTimeRangePicker } from "~/components/form/datetime-range-picker";
import { Badge } from "~/components/ui/badge";
import { Textarea } from "~/components/form/textarea";

interface FormGenerics extends FieldValues {
  activeIndex: string;
  appear: boolean;
}

interface FormProps<T extends FormGenerics> {
  onSubmit: SubmitHandler<T>;
  fields: T[];
  activeIndex: string | null;
  isLoading: boolean;
}

const getStackStyles = (
  currentIndex: number,
  itemIndex: number,
  total: number,
) => {
  const diff = itemIndex - currentIndex;
  const scale = 1 - Math.abs(diff) * 0.05;
  const y = diff * 10;
  const opacity = 1 - Math.abs(diff) * 1;
  const zIndex = total - Math.abs(diff);

  return {
    zIndex,
    scale,
    y,
    opacity,
  };
};

function Form<T extends FormGenerics>({
  onSubmit,
  activeIndex,
  isLoading,
  fields,
}: FormProps<T>) {
  const form = useFormContext<T>();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="h-[485px] space-y-6"
    >
      <div className={cn("relative min-h-[485px]")}>
        <AnimatePresence initial={false} mode="popLayout">
          {fields.map((field, index) => {
            const currentVisible = fields.findIndex(
              (field) => field.activeIndex === activeIndex,
            );

            const stackStyles = getStackStyles(
              currentVisible,
              index,
              fields.length,
            );

            const isActive = field.activeIndex === activeIndex;

            const title =
              form.watch(`projects.${index}.title`) ||
              `Projeto ${fields.length}`;
            const organization =
              form.watch(`projects.${index}.organization`) ||
              `Organização ${fields.length}`;

            const appear = form.watch(`projects.${index}.appear`);

            return (
              <motion.div
                key={field.activeIndex}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  scale: stackStyles.scale,
                  opacity: stackStyles.opacity,
                  y: stackStyles.y,
                  zIndex: stackStyles.zIndex,
                }}
                exit={{
                  scale: 0.95,
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                className="rounded-xl border bg-background/95 p-6 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                <div className="flex justify-between">
                  <p>
                    {title} <span className="text-xs">{organization}</span>
                  </p>
                  {!appear && <Badge>Não mostra no currículo</Badge>}
                </div>

                <Input
                  label={`Qual o projeto foi feito na(o) ${organization}?`}
                  name={`projects.${index}.title`}
                  className="focus-visible:ring-2"
                  required
                />

                <Input
                  label="Em qual organização?"
                  name={`projects.${index}.organization`}
                  className="focus-visible:ring-2"
                  required
                />

                <div className="flex flex-col gap-3 md:flex-row">
                  <Input
                    name={`projects.${index}.url`}
                    label={`Qual a url do projeto?`}
                    className="focus-visible:ring-2"
                  />
                  <DateTimeRangePicker
                    prefix="projects"
                    index={index}
                    label="Quando foi feito o projeto?"
                  />
                </div>

                <ButtonLoading className="mt-3 w-full" isLoading={isLoading}>
                  Salvar na lista de projetos
                </ButtonLoading>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </form>
  );
}

export const CardForm = memo(Form);
