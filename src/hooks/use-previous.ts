import { useRef } from "react";

export const usePreviousValues = () => {
  const previousValues = useRef<null | Record<string, unknown>[]>(null);

  const update = (newFields: { id: string; [key: string]: unknown }[]) => {
    const fieldsToSave = newFields.map((field) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = field;
      return rest;
    });

    previousValues.current = fieldsToSave as Record<string, unknown>[];
  };

  return { update, previousValues: previousValues.current };
};
