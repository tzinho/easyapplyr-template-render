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

  const title = form.watch(`${name}.${index}.title`) || `Projeto ${index + 1}`;
  const organization =
    form.watch(`${name}.${index}.organization`) || `Organização ${index + 1}`;

  const appear = form.watch(`${name}.${index}.appear`);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p>
          {title} <span className="text-xs">{organization}</span>
        </p>
        {!appear && <Badge>Não mostra no currículo</Badge>}
      </div>

      <Input
        label={`Qual o projeto foi feito na(o) ${organization}?`}
        name={`${name}.${index}.title`}
        className="focus-visible:ring-2"
        required
      />

      <Input
        label="Em qual organização?"
        name={`${name}.${index}.organization`}
        className="focus-visible:ring-2"
        required
      />

      <div className="flex flex-col gap-3 md:flex-row">
        <Input
          name={`${name}.${index}.url`}
          label={`Qual a url do projeto?`}
          className="focus-visible:ring-2"
        />
        <DateTimeRangePicker
          prefix={name}
          index={index}
          label="Quando foi feito o projeto?"
        />
      </div>
    </div>
  );
};
