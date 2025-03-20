"use client";

import { useFormContext } from "react-hook-form";

import { Textarea } from "~/components/form/textarea";
import { Badge } from "~/components/ui/badge";

interface FormFieldsProps {
  index: number;
}

export const FormFields = ({ index }: FormFieldsProps) => {
  const form = useFormContext();

  const appear = form.watch(`skills.${index}.appear`);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        {!appear && <Badge>Não mostra no currículo</Badge>}
      </div>

      <Textarea
        name={`skills.${index}.text`}
        label="Qual a habilidade?"
        className="min-h-[120px] focus-visible:ring-2"
      />
    </div>
  );
};
