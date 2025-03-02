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

            const degree =
              form.watch(`educations.${index}.degree`) ||
              `Gray ${fields.length}`;
            const institution =
              form.watch(`educations.${index}.institution`) ||
              `Intituição ${fields.length}`;

            const appear = form.watch(`educations.${index}.appear`);

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
                    {degree} <span className="text-xs">{institution}</span>
                  </p>
                  {!appear && <Badge>Não mostra no currículo</Badge>}
                </div>

                <Input
                  label={`Qual o grau você conseguiu na(o) ${institution}?`}
                  name={`educations.${index}.degree`}
                  className="focus-visible:ring-2"
                  required
                />

                <Input
                  label="Em qual instituição você conseguiu?"
                  name={`educations.${index}.institution`}
                  className="focus-visible:ring-2"
                  required
                />

                <div className="flex flex-col gap-3 md:flex-row">
                  <Input
                    name={`educations.${index}.where`}
                    label={`Onde está localizada a ${institution}?`}
                    className="focus-visible:ring-2"
                  />
                  <DateTimeRangePicker
                    prefix="educations"
                    index={index}
                    label={`Qual o período frequentou a(o) ${institution}?`}
                  />
                </div>

                <Textarea
                  name={`educations.${index}.description`}
                  label={`Insira mais informações`}
                  className="min-h-[120px] focus-visible:ring-2"
                />

                <ButtonLoading className="mt-3 w-full" isLoading={isLoading}>
                  Salvar na lista de educações
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
