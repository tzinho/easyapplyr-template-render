"use client";

import { memo, useEffect, useState } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { ButtonLoading } from "~/components/ui/button-loading";
import { cn } from "~/lib/utils";

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
  const opacity = 1 - Math.abs(diff) * 0.2;
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
  console.log("**ExperienceForm**");
  const form = useFormContext();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div
        className={cn(
          "relative min-h-[53vh]",
          Object.keys(form.formState.errors).length && "min-h-[59vh]",
        )}
      >
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

            // const zIndex = fields.length - Math.abs(currentVisible - index);
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <ButtonLoading className="w-full" isLoading={isLoading}>
        Salvar na lista de experiências
      </ButtonLoading>
    </form>
  );
};

// export const ExperienceForm = memo(Form, (oldProps, newProps) => {
//   // console.log("oldProps", oldProps);
//   // console.log("newProps", newProps);
//   if (oldProps.activeIndex !== newProps.activeIndex) return false;
//   if (oldProps.fields.length !== newProps.fields.length) return false;
//   return true;
// });
