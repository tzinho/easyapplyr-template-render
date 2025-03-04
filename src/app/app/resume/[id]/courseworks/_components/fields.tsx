"use client";

import { useFormContext } from "react-hook-form";
import { DateTimeRangePicker } from "~/components/form/datetime-range-picker";
import { Input } from "~/components/form/input";
import { Badge } from "~/components/ui/badge";
import { useHandler } from "~/providers/handler-provider";

interface FormFieldsProps {
  index: number;
}

export const FormFields = ({ index }: FormFieldsProps) => {
  const { name } = useHandler();
  const form = useFormContext();

  const course = form.watch(`${name}.${index}.name`) || `Curso ${index + 1}`;
  const institution =
    form.watch(`${name}.${index}.where`) || `Intituição ${index + 1}`;

  const appear = form.watch(`${name}.${index}.appear`);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p>
          {course} <span className="text-xs">{institution}</span>
        </p>
        {!appear && <Badge>Não mostra no currículo</Badge>}
      </div>

      <Input
        label={`Qual o grau você conseguiu na(o) ${institution}?`}
        name={`${name}.${index}.name`}
        className="focus-visible:ring-2"
        required
      />

      <Input
        label="Em qual instituição você conseguiu?"
        name={`${name}.${index}.where`}
        className="focus-visible:ring-2"
        required
      />

      <DateTimeRangePicker
        prefix={name}
        index={index}
        label={`Qual o período frequentou a(o) ${institution}?`}
      />
    </div>
  );
};
