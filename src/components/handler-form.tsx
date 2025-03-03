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
import { TextareaList } from "~/components/form/textarea-list";
import { DateTimeRangePicker } from "~/components/form/datetime-range-picker";
import { Badge } from "~/components/ui/badge";

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

            const company =
              form.watch(`experiences.${index}.company`) ||
              `Empresa ${fields.length}`;
            const role =
              form.watch(`experiences.${index}.role`) ||
              `Experiência ${fields.length}`;

            const appear = form.watch(`experiences.${index}.appear`);

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
                    {role} <span className="text-xs">{company}</span>
                  </p>
                  {!appear && <Badge>Não mostra no currículo</Badge>}
                </div>

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

                <div className="flex flex-col gap-3 md:flex-row">
                  <Input
                    name={`experiences.${index}.where`}
                    label={`Onde está localizada a ${company}?`}
                    className="focus-visible:ring-2"
                  />
                  <DateTimeRangePicker
                    prefix="experiences"
                    index={index}
                    label={`Qual o período trabalhou na(o) ${company}?`}
                  />
                </div>

                <TextareaList
                  name={`experiences.${index}.did`}
                  label={`O que você fez na(o) ${company}?`}
                  className="min-h-[120px] focus-visible:ring-2"
                  highlightWords={["25%"]}
                />

                <ButtonLoading className="mt-3 w-full" isLoading={isLoading}>
                  Salvar na lista de experiências
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
