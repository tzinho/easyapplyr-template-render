"use client";

import { useFormContext } from "react-hook-form";

import { Textarea } from "~/components/form/textarea";
import { DateTimeRangePicker } from "~/components/form/datetime-range-picker";
import { Input } from "~/components/form/input";
import { Badge } from "~/components/ui/badge";

interface FormFieldsProps {
  index: number;
}

export const FormFields = ({ index }: FormFieldsProps) => {
  const form = useFormContext();

  const degree =
    form.watch(`educations.${index}.degree`) || `Grau ${index + 1}`;
  const institution =
    form.watch(`educations.${index}.institution`) || `Intituição ${index + 1}`;

  const appear = form.watch(`educations.${index}.appear`);

  return (
    <div className="flex flex-col gap-3">
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
    </div>
  );
};
