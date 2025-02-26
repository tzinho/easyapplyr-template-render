"use client";

import { type SubmitHandler, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "~/components/form/input";
import { ButtonLoading } from "~/components/ui/button-loading";
import { cn } from "~/lib/utils";
import { TextareaList } from "~/components/form/textarea-list";
import { DateTimeRangePicker } from "~/components/form/datetime-range-picker";

interface ExperienceFormProps {
  onSubmit: SubmitHandler<any>;
  activeIndex: string | null;
  isLoading: boolean;
  fields: any[];
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
  // previously
  // const opacity = 1 - Math.abs(diff) * 0.2;
  const zIndex = total - Math.abs(diff);

  return {
    zIndex,
    scale,
    y,
    opacity,
  };
};

export const ExperienceForm = ({
  onSubmit,
  activeIndex,
  isLoading,
  fields,
}: ExperienceFormProps) => {
  const form = useFormContext();

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
              (form.watch(`experiences.${index}.company`) as string) ||
              `Empresa ${fields.length}`;
            const role =
              (form.watch(`experiences.${index}.role`) as string) ||
              `Experiência ${fields.length}`;

            return (
              <motion.div
                key={field.id}
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

                <div className="flex gap-3 sm:flex-col md:flex-row">
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
};
