"use client";

import { memo, type ReactNode } from "react";
import {
  type FieldValues,
  type SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import { ButtonLoading } from "~/components/ui/button-loading";
import { cn } from "~/lib/utils";
import { useHandlerInner } from "~/providers/handler-provider";

interface FormGenerics extends FieldValues {
  appear: boolean;
}

interface FormProps<T extends FormGenerics> {
  onSubmit: SubmitHandler<T>;
  isLoading: boolean;
  submitText: string;
  render: ({ index }: { index: number }) => ReactNode;
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
  isLoading,
  submitText,
  render,
}: FormProps<T>) {
  const form = useFormContext<T>();
  const { activeIndex, fields } = useHandlerInner();

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
                className="flex flex-col rounded-xl border bg-background/95 p-6 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                {render({ index })}
                <ButtonLoading isLoading={isLoading} className="mt-3 self-end">
                  {submitText}
                </ButtonLoading>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </form>
  );
}

export const FormList = memo(Form);
