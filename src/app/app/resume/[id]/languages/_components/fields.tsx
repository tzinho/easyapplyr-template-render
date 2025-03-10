"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "~/components/form/input";
import { Badge } from "~/components/ui/badge";
import { useHandler } from "~/providers/handler-provider";

interface FormFieldsProps {
  index: number;
}

export const FormFields = ({ index }: FormFieldsProps) => {
  const { name } = useHandler();
  const form = useFormContext();

  const language = form.watch(`${name}.${index}.name`) || `Língua ${index + 1}`;
  const appear = form.watch(`${name}.${index}.appear`);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p>{language}</p>
        {!appear && <Badge>Não mostra no currículo</Badge>}
      </div>

      <Input
        label={`Qual a língua?`}
        name={`${name}.${index}.name`}
        className="focus-visible:ring-2"
        required
      />
    </div>
  );
};
