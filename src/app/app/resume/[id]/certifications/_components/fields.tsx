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

  const name =
    form.watch(`certifications.${index}.name`) || `Certificação ${index + 1}`;
  const where =
    form.watch(`certifications.${index}.where`) || `Instituição ${index + 1}`;

  const appear = form.watch(`certifications.${index}.appear`);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p>
          {name} <span className="text-xs">{where}</span>
        </p>
        {!appear && <Badge>Não mostra no currículo</Badge>}
      </div>

      <Input
        label={`Qual o nome do certificado você conseguiu na(o) ${where}?`}
        name={`certifications.${index}.name`}
        className="focus-visible:ring-2"
        required
      />

      <Input
        label="Em qual instituição você conseguiu?"
        name={`certifications.${index}.where`}
        className="focus-visible:ring-2"
        required
      />

      <DateTimeRangePicker
        prefix="certifications"
        index={index}
        label={`Qual o período frequentou a(o) ${where}?`}
      />

      <Textarea
        name={`certifications.${index}.description`}
        label="Insira mais informações"
        className="min-h-[120px] focus-visible:ring-2"
      />
    </div>
  );
};
